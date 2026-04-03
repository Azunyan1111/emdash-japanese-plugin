import ts from "typescript";

export interface ExtractedOccurrence {
	file: string;
	line: number;
	kind: "jsx-text" | "attribute" | "literal";
}

export interface ExtractedEntry {
	source: string;
	occurrences: ExtractedOccurrence[];
}

const TRANSLATABLE_ATTRIBUTES = new Set(["placeholder", "title", "aria-label", "label", "alt"]);

function normalizeWhitespace(value: string): string {
	return value.replace(/\s+/g, " ").trim();
}

function shouldIgnoreValue(value: string): boolean {
	const normalized = normalizeWhitespace(value);
	if (!normalized) {
		return true;
	}
	if (!/[A-Za-z]/.test(normalized)) {
		return true;
	}
	if (/^(https?:|data:|mailto:|tel:)/i.test(normalized)) {
		return true;
	}
	if (/^[/@.#]/.test(normalized) || /^\.\.?\//.test(normalized)) {
		return true;
	}
	if (/^#[\da-f]{3,8}$/i.test(normalized)) {
		return true;
	}
	if (/^[a-z0-9-]+:[a-z0-9-]+/i.test(normalized)) {
		return true;
	}
	if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_./:-]+$/.test(normalized)) {
		return true;
	}
	if (/^[a-z0-9_.-]+$/.test(normalized) && /[_./:-]/.test(normalized)) {
		return true;
	}
	if (/^[A-Z0-9_]+$/.test(normalized) && normalized.length > 4) {
		return true;
	}
	if (/^\[[^\]]+\]$/.test(normalized)) {
		return true;
	}
	if (/^\{[A-Za-z0-9_.-]+\}$/.test(normalized)) {
		return true;
	}
	if (/^&[a-z0-9#]+;$/i.test(normalized)) {
		return true;
	}
	if (/^\([a-z-]+\s*:\s*[^)]+\)$/i.test(normalized)) {
		return true;
	}

	return false;
}

function getLine(sourceFile: ts.SourceFile, node: ts.Node): number {
	return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function getAttributeName(node: ts.StringLiteralLike): string | null {
	if (!ts.isJsxAttribute(node.parent)) {
		return null;
	}
	if (!ts.isIdentifier(node.parent.name)) {
		return null;
	}
	return node.parent.name.text;
}

function getOccurrenceKind(node: ts.Node): ExtractedOccurrence["kind"] {
	if (ts.isJsxText(node)) {
		return "jsx-text";
	}
	if (ts.isStringLiteralLike(node) && getAttributeName(node)) {
		return "attribute";
	}
	return "literal";
}

function shouldIncludeLiteral(node: ts.StringLiteralLike, value: string): boolean {
	if (shouldIgnoreValue(value)) {
		return false;
	}

	if (
		ts.isImportDeclaration(node.parent) ||
		ts.isExportDeclaration(node.parent) ||
		ts.isExternalModuleReference(node.parent) ||
		ts.isLiteralTypeNode(node.parent)
	) {
		return false;
	}

	const attributeName = getAttributeName(node);
	if (attributeName) {
		return TRANSLATABLE_ATTRIBUTES.has(attributeName);
	}

	return true;
}

export function collectTranslatableEntries(
	sourceText: string,
	filePath: string,
): ExtractedEntry[] {
	const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
	const sourceFile = ts.createSourceFile(
		filePath,
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		scriptKind,
	);
	const entries = new Map<string, ExtractedEntry>();

	const addEntry = (rawValue: string, node: ts.Node) => {
		const source = normalizeWhitespace(rawValue);
		if (!source || shouldIgnoreValue(source)) {
			return;
		}

		const existing = entries.get(source);
		const occurrence: ExtractedOccurrence = {
			file: filePath,
			line: getLine(sourceFile, node),
			kind: getOccurrenceKind(node),
		};

		if (existing) {
			existing.occurrences.push(occurrence);
			return;
		}

		entries.set(source, {
			source,
			occurrences: [occurrence],
		});
	};

	const visit = (node: ts.Node) => {
		if (ts.isJsxText(node)) {
			addEntry(node.getText(sourceFile), node);
		} else if (ts.isStringLiteralLike(node) && shouldIncludeLiteral(node, node.text)) {
			addEntry(node.text, node);
		}

		ts.forEachChild(node, visit);
	};

	visit(sourceFile);

	return [...entries.values()].sort((left, right) => left.source.localeCompare(right.source));
}

export function mergeExtractedEntries(entries: ExtractedEntry[]): ExtractedEntry[] {
	const merged = new Map<string, ExtractedEntry>();

	for (const entry of entries) {
		const existing = merged.get(entry.source);
		if (existing) {
			existing.occurrences.push(...entry.occurrences);
			continue;
		}

		merged.set(entry.source, {
			source: entry.source,
			occurrences: [...entry.occurrences],
		});
	}

	return [...merged.values()]
		.map((entry) => ({
			source: entry.source,
			occurrences: entry.occurrences.sort((left, right) => {
				if (left.file === right.file) {
					return left.line - right.line;
				}
				return left.file.localeCompare(right.file);
			}),
		}))
		.sort((left, right) => left.source.localeCompare(right.source));
}
