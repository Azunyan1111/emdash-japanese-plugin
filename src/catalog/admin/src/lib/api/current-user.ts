import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "currentUser",
		"target": "現在のユーザー",
		"occurrences": [
			{
				"file": "admin/src/lib/api/current-user.ts",
				"line": 25,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch user",
		"target": "ユーザーの取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/current-user.ts",
				"line": 20,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
