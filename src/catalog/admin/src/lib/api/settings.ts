import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "Content-Type",
		"target": "コンテンツタイプ",
		"occurrences": [
			{
				"file": "admin/src/lib/api/settings.ts",
				"line": 58,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch settings",
		"target": "設定の取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/settings.ts",
				"line": 47,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to update settings",
		"target": "設定の更新に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/settings.ts",
				"line": 61,
				"kind": "literal"
			}
		]
	},
	{
		"source": "POST",
		"target": "POST",
		"occurrences": [
			{
				"file": "admin/src/lib/api/settings.ts",
				"line": 57,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
