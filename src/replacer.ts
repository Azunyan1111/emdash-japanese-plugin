export interface TranslationRule {
	source: string | RegExp;
	target: string;
}

function normalizeWhitespace(value: string): string {
	return value.replace(/\s+/g, " ").trim();
}

export function translateValue(
	value: string,
	rules: TranslationRule[],
	options: { normalize?: boolean } = {},
): string {
	if (!value) {
		return value;
	}

	const normalize = options.normalize ?? true;
	const candidate = normalize ? normalizeWhitespace(value) : value;

	for (const rule of rules) {
		if (typeof rule.source === "string") {
			const source = normalize ? normalizeWhitespace(rule.source) : rule.source;
			if (candidate === source) {
				return rule.target;
			}
			continue;
		}

		if (rule.source.test(value)) {
			return value.replace(rule.source, rule.target);
		}
	}

	return value;
}

export function collectAttributeTargets(root: ParentNode): HTMLElement[] {
	if (typeof root.querySelectorAll !== "function") {
		return [];
	}

	return Array.from(
		root.querySelectorAll<HTMLElement>("[placeholder], [title], [aria-label], input[type='button'], input[type='submit']"),
	);
}

export function shouldSkipTextNode(parent: Node | null): boolean {
	if (!(parent instanceof Element)) {
		return false;
	}

	return ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName);
}
