import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "Failed to disable plugin",
		"target": "プラグインを無効にできませんでした",
		"occurrences": [
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 76,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to enable plugin",
		"target": "プラグインを有効にできませんでした",
		"occurrences": [
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 65,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch plugin",
		"target": "プラグインの取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 52,
				"kind": "literal"
			},
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 54,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch plugins",
		"target": "プラグインの取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 38,
				"kind": "literal"
			}
		]
	},
	{
		"source": "POST",
		"target": "POST",
		"occurrences": [
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 63,
				"kind": "literal"
			},
			{
				"file": "admin/src/lib/api/plugins.ts",
				"line": 74,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
