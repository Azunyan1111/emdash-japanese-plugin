import { describe, expect, it } from "vitest";

import { collectTranslatableEntries, mergeExtractedEntries } from "../src/extractor.js";

describe("collectTranslatableEntries", () => {
	it("collects visible JSX text and translatable attributes", () => {
		const source = `
			export function Sample() {
				return (
					<div>
						<button title="Open settings">Settings</button>
						<input placeholder="Search content..." />
					</div>
				);
			}
		`;

		const entries = collectTranslatableEntries(source, "packages/admin/src/components/Sample.tsx");

		expect(entries.map((entry) => entry.source)).toContain("Settings");
		expect(entries.map((entry) => entry.source)).toContain("Open settings");
		expect(entries.map((entry) => entry.source)).toContain("Search content...");
	});

	it("ignores import specifiers and obvious non-UI values", () => {
		const source = `
			import { Button } from "@cloudflare/kumo";
			const apiPath = "/_emdash/api/content";
			const token = "content:read";
			const media = "(prefers-color-scheme: dark)";
			const selector = "[data-block-handle]";
			const slug = "{slug}";
			const entity = "&amp;";
			export function Sample() {
				return <div>Dashboard</div>;
			}
		`;

		const entries = collectTranslatableEntries(source, "packages/admin/src/components/Sample.tsx");

		expect(entries.map((entry) => entry.source)).toEqual(["Dashboard"]);
	});
});

describe("mergeExtractedEntries", () => {
	it("merges duplicate sources and preserves all occurrences", () => {
		const merged = mergeExtractedEntries([
			{
				source: "Dashboard",
				occurrences: [{ file: "a.tsx", line: 1, kind: "jsx-text" }],
			},
			{
				source: "Dashboard",
				occurrences: [{ file: "b.tsx", line: 2, kind: "literal" }],
			},
		]);

		expect(merged).toHaveLength(1);
		expect(merged[0]?.occurrences).toHaveLength(2);
	});
});
