import type { CatalogEntry } from "../../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "EmDash Admin",
		"target": "EmDash 管理画面",
		"occurrences": [
			{
				"file": "packages/core/src/astro/routes/admin.astro",
				"line": 25,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Loading EmDash...",
		"target": "EmDash を読み込み中...",
		"occurrences": [
			{
				"file": "packages/core/src/astro/routes/admin.astro",
				"line": 75,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
