import * as React from "react";

import { translationRules } from "./dictionary.js";
import { collectAttributeTargets, shouldSkipTextNode, translateValue } from "./replacer.js";

function translateNodeTree(root: ParentNode) {
	const doc = root.ownerDocument ?? document;
	const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);

	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		if (!(node instanceof Text)) {
			continue;
		}
		if (shouldSkipTextNode(node.parentNode)) {
			continue;
		}

		const original = node.textContent ?? "";
		const translated = translateValue(original, translationRules);
		if (translated !== original) {
			node.textContent = translated;
		}
	}

	for (const element of collectAttributeTargets(root)) {
		for (const name of ["placeholder", "title", "aria-label", "value"] as const) {
			const current = element.getAttribute(name);
			if (!current) {
				continue;
			}

			const translated = translateValue(current, translationRules);
			if (translated !== current) {
				element.setAttribute(name, translated);
			}
		}
	}
}

function installJapaneseAdminTranslations() {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return;
	}

	if (window.__EMDASH_JAPANESE_PLUGIN_ACTIVE__) {
		return;
	}

	window.__EMDASH_JAPANESE_PLUGIN_ACTIVE__ = true;
	document.documentElement.lang = "ja";
	document.documentElement.dataset.emdashJapanesePlugin = "active";

	const translateDocument = () => {
		translateNodeTree(document.body);
		document.title = translateValue(document.title, translationRules, { normalize: false });
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", translateDocument, { once: true });
	} else {
		translateDocument();
	}

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "characterData" && mutation.target.parentNode) {
				translateNodeTree(mutation.target.parentNode);
				continue;
			}

			for (const node of mutation.addedNodes) {
				if (node instanceof HTMLElement || node instanceof DocumentFragment) {
					translateNodeTree(node);
				}
			}
		}
	});

	const start = () => {
		if (!document.body) {
			return;
		}
		translateDocument();
		observer.observe(document.body, {
			childList: true,
			characterData: true,
			subtree: true,
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start, { once: true });
	} else {
		start();
	}
}

declare global {
	interface Window {
		__EMDASH_JAPANESE_PLUGIN_ACTIVE__?: boolean;
	}
}

installJapaneseAdminTranslations();

export const pages: Record<string, React.ComponentType> = {};
export const widgets: Record<string, React.ComponentType> = {};
export const fields: Record<string, React.ComponentType> = {};
