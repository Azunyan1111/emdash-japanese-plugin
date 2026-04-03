import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import type { CatalogEntry } from "./catalog/types.js";
import { collectTranslatableEntries, mergeExtractedEntries } from "./extractor.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginSrcDir = __dirname;
const packagesDir = path.resolve(pluginSrcDir, "../emdash/packages");
const adminSrcDir = path.resolve(packagesDir, "admin/src");
const coreAdminRouteFile = path.resolve(packagesDir, "core/src/astro/routes/admin.astro");
const catalogDir = path.resolve(pluginSrcDir, "catalog");
const catalogIndexFile = path.resolve(catalogDir, "index.ts");
const legacyCatalogFile = path.resolve(pluginSrcDir, "catalog.ts");
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const CONCURRENCY = 6;
const RETRY_LIMIT = 3;

const MANUAL_TRANSLATION_OVERRIDES: Record<string, string> = {
	"Dashboard": "ダッシュボード",
	"Content": "コンテンツ",
	"Media": "メディア",
	"Comments": "コメント",
	"Users": "ユーザー",
	"Settings": "設定",
	"Plugins": "プラグイン",
	"Themes": "テーマ",
	"Search": "検索",
	"Search content...": "コンテンツを検索...",
	"Save": "保存",
	"Cancel": "キャンセル",
	"Delete": "削除",
	"Edit": "編集",
	"Close": "閉じる",
	"Back": "戻る",
	"Next": "次へ",
	"Continue": "続ける",
	"Create": "作成",
	"Update": "更新",
	"Publish": "公開",
	"Draft": "下書き",
	"Scheduled": "予約済み",
	"Archived": "アーカイブ済み",
	"Setup": "セットアップ",
	"Log in": "ログイン",
	"Sign in": "サインイン",
	"Sign up": "サインアップ",
	"Log out": "ログアウト",
	"Email": "メールアドレス",
	"Email address": "メールアドレス",
	"Password": "パスワード",
	"Passkey": "パスキー",
	"Passkeys": "パスキー",
	"WordPress": "WordPress",
	"GitHub": "GitHub",
	"EmDash": "EmDash",
	"Loading EmDash...": "EmDash を読み込み中...",
	"EmDash Admin": "EmDash 管理画面",
	"Welcome to EmDash": "EmDash へようこそ",
	"— EmDash": "— EmDash",
	"EmDash CMS": "EmDash CMS",
	"EmDash Exporter": "EmDash Exporter",
	"X-EmDash-Request": "X-EmDash-Request",
};

interface ProtectedValue {
	text: string;
	tokens: string[];
}

function normalizeProtectedTerms(target: string): string {
	return target
		.replaceAll("エムダッシュ", "EmDash")
		.replaceAll("X-EmDash-リクエスト", "X-EmDash-Request");
}

function protectTokens(source: string): ProtectedValue {
	const tokens: string[] = [];
	let text = source;
	const patterns = [
		/\{[^}]+\}/g,
		/%(?:\d+\$)?[sdif]/g,
		/\[\[[^\]]+\]\]/g,
		/<\/?[A-Za-z][^>]*>/g,
		/&[a-z0-9#]+;/gi,
	];

	for (const pattern of patterns) {
		text = text.replace(pattern, (match) => {
			const tokenIndex = tokens.push(match) - 1;
			return `__EMDASH_TOKEN_${tokenIndex}__`;
		});
	}

	return { text, tokens };
}

function restoreTokens(translated: string, tokens: string[]): string {
	return translated.replace(/__EMDASH_TOKEN_(\d+)__/g, (_, indexText) => {
		const index = Number(indexText);
		return tokens[index] ?? _;
	});
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function requestTranslation(source: string): Promise<string> {
	const url = new URL(GOOGLE_TRANSLATE_ENDPOINT);
	url.searchParams.set("client", "gtx");
	url.searchParams.set("sl", "en");
	url.searchParams.set("tl", "ja");
	url.searchParams.set("dt", "t");
	url.searchParams.set("q", source);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Translation request failed with status ${response.status}`);
	}

	const payload = await response.json() as unknown;
	if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
		throw new Error("Unexpected translation payload");
	}

	return payload[0]
		.map((part) => (Array.isArray(part) ? String(part[0] ?? "") : ""))
		.join("");
}

async function translateSource(source: string): Promise<string> {
	const manual = MANUAL_TRANSLATION_OVERRIDES[source];
	if (manual) {
		return normalizeProtectedTerms(manual);
	}

	const protectedValue = protectTokens(source);
	for (let attempt = 0; attempt < RETRY_LIMIT; attempt += 1) {
		try {
			const translated = await requestTranslation(protectedValue.text);
			return normalizeProtectedTerms(restoreTokens(translated.trim(), protectedValue.tokens));
		} catch (error) {
			if (attempt === RETRY_LIMIT - 1) {
				throw error;
			}
			await delay(300 * (attempt + 1));
		}
	}

	return source;
}

async function fillMissingTargets(entries: CatalogEntry[]): Promise<CatalogEntry[]> {
	const pending = entries.filter((entry) => entry.target.trim().length === 0);
	let cursor = 0;

	const workers = Array.from({ length: Math.min(CONCURRENCY, pending.length) }, async () => {
		while (cursor < pending.length) {
			const entry = pending[cursor];
			cursor += 1;
			if (!entry) {
				continue;
			}
			entry.target = await translateSource(entry.source);
		}
	});

	await Promise.all(workers);

	return entries;
}

async function listSourceFiles(rootDir: string): Promise<string[]> {
	const queue = [rootDir];
	const files: string[] = [];

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) {
			continue;
		}

		const entries = await readdir(current, { withFileTypes: true });
		for (const entry of entries) {
			const nextPath = path.join(current, entry.name);
			if (entry.isDirectory()) {
				queue.push(nextPath);
				continue;
			}
			if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
				files.push(nextPath);
			}
		}
	}

	return files.sort();
}

async function readExistingTargetsFromModule(moduleFile: string): Promise<Map<string, string>> {
	try {
		const module = await import(pathToFileURL(moduleFile).href);
		const entries: CatalogEntry[] = module.adminTranslationCatalog ?? [];
		return new Map(entries.map((entry) => [entry.source, normalizeProtectedTerms(entry.target)]));
	} catch {
		return new Map();
	}
}

async function readExistingTargets(): Promise<Map<string, string>> {
	const currentTargets = await readExistingTargetsFromModule(catalogIndexFile);
	if (currentTargets.size > 0) {
		return currentTargets;
	}

	return readExistingTargetsFromModule(legacyCatalogFile);
}

function formatCatalogFile(entries: CatalogEntry[], importPath: string): string {
	return `import type { CatalogEntry } from "${importPath}";

const entries: CatalogEntry[] = ${JSON.stringify(entries, null, "\t")} as CatalogEntry[];

export default entries;
`;
}

function formatCatalogIndex(files: Array<{ sourceFile: string; importPath: string }>): string {
	const imports = files
		.map(({ importPath }, index) => `import entries${index} from "${importPath}";`)
		.join("\n");

	return `import type { CatalogEntry } from "./types.js";
${imports ? `\n${imports}\n` : "\n"}
export const adminTranslationCatalogByFile: Record<string, CatalogEntry[]> = {
${files.map(({ sourceFile }, index) => `\t"${sourceFile}": entries${index},`).join("\n")}
};

export const adminTranslationCatalog: CatalogEntry[] = Object.values(adminTranslationCatalogByFile).flat();
`;
}

function getCatalogOutputPath(sourceFile: string): string {
	return path.join(catalogDir, sourceFile.replace(/\.(tsx|ts|astro)$/u, ".ts"));
}

function getImportPath(fromFile: string, toFile: string): string {
	const relativePath = path.relative(path.dirname(fromFile), toFile).replaceAll(path.sep, "/");
	return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

async function writeCatalogFiles(groupedEntries: Map<string, CatalogEntry[]>): Promise<void> {
	await rm(catalogDir, { recursive: true, force: true });
	await mkdir(catalogDir, { recursive: true });
	await writeFile(
		path.join(catalogDir, "types.ts"),
		`export interface CatalogOccurrence {
	file: string;
	line: number;
	kind: "jsx-text" | "attribute" | "literal";
}

export interface CatalogEntry {
	source: string;
	target: string;
	occurrences: CatalogOccurrence[];
}
`,
		"utf-8",
	);

	const indexImports: Array<{ sourceFile: string; importPath: string }> = [];
	const sortedSourceFiles = [...groupedEntries.keys()].sort((left, right) => left.localeCompare(right));
	for (const sourceFile of sortedSourceFiles) {
		const outputPath = getCatalogOutputPath(sourceFile);
		await mkdir(path.dirname(outputPath), { recursive: true });
		const entries = groupedEntries.get(sourceFile) ?? [];
		const importPath = getImportPath(outputPath, path.join(catalogDir, "types.ts")).replace(/\.ts$/u, ".js");
		await writeFile(outputPath, formatCatalogFile(entries, importPath), "utf-8");
		indexImports.push({
			sourceFile,
			importPath: getImportPath(catalogIndexFile, outputPath).replace(/\.ts$/u, ".js"),
		});
	}

	await writeFile(catalogIndexFile, formatCatalogIndex(indexImports), "utf-8");
}

async function extractCoreAdminRoute(): Promise<CatalogEntry[]> {
	const sourceText = await readFile(coreAdminRouteFile, "utf-8");
	const entries: CatalogEntry[] = [];

	for (const [source, line] of [
		["EmDash Admin", 25],
		["Loading EmDash...", 75],
	] as const) {
		if (!sourceText.includes(source)) {
			continue;
		}
		entries.push({
			source,
			target: "",
			occurrences: [
				{
					file: "packages/core/src/astro/routes/admin.astro",
					line,
					kind: "literal",
				},
			],
		});
	}

	return entries;
}

async function main(): Promise<void> {
	const existingTargets = await readExistingTargets();
	const sourceFiles = await listSourceFiles(adminSrcDir);
	const extracted = [];

	for (const filePath of sourceFiles) {
		const sourceText = await readFile(filePath, "utf-8");
		const relativePath = path.relative(packagesDir, filePath).replaceAll(path.sep, "/");
		extracted.push(...collectTranslatableEntries(sourceText, relativePath));
	}

	const merged = mergeExtractedEntries(extracted);
	const coreEntries = await extractCoreAdminRoute();
	const mergedBySource = [...merged, ...coreEntries].reduce<Map<string, CatalogEntry>>((map, entry) => {
		const existing = map.get(entry.source);
		if (existing) {
			existing.occurrences.push(...entry.occurrences);
			return map;
		}

		map.set(entry.source, {
			source: entry.source,
			target: normalizeProtectedTerms(existingTargets.get(entry.source) ?? ""),
			occurrences: [...entry.occurrences],
		});
		return map;
	}, new Map());

	const groupedEntries = new Map<string, CatalogEntry[]>();
	for (const entry of mergedBySource.values()) {
		const occurrencesByFile = new Map<string, typeof entry.occurrences>();
		for (const occurrence of entry.occurrences) {
			const current = occurrencesByFile.get(occurrence.file) ?? [];
			current.push(occurrence);
			occurrencesByFile.set(occurrence.file, current);
		}

		for (const [file, occurrences] of occurrencesByFile) {
			const fileEntries = groupedEntries.get(file) ?? [];
			fileEntries.push({
				source: entry.source,
				target: entry.target,
				occurrences: occurrences.sort((left, right) => left.line - right.line),
			});
			groupedEntries.set(file, fileEntries);
		}
	}

	for (const entries of groupedEntries.values()) {
		entries.sort((left, right) => left.source.localeCompare(right.source));
	}

	for (const [file, entries] of groupedEntries) {
		groupedEntries.set(file, await fillMissingTargets(entries));
	}

	await writeCatalogFiles(groupedEntries);
}

void main();
