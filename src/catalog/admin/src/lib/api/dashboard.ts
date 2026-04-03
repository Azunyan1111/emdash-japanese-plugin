import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "Failed to fetch dashboard stats",
		"target": "ダッシュボード統計の取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/dashboard.ts",
				"line": 38,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
