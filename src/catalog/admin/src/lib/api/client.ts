import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "error",
		"target": "エラー",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 27,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch manifest",
		"target": "マニフェストの取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 159,
				"kind": "literal"
			}
		]
	},
	{
		"source": "message",
		"target": "メッセージ",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 29,
				"kind": "literal"
			}
		]
	},
	{
		"source": "object",
		"target": "物体",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 27,
				"kind": "literal"
			},
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 29,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Request failed",
		"target": "リクエストが失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 147,
				"kind": "literal"
			}
		]
	},
	{
		"source": "string",
		"target": "弦",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 31,
				"kind": "literal"
			}
		]
	},
	{
		"source": "X-EmDash-Request",
		"target": "X-EmDash-Request",
		"occurrences": [
			{
				"file": "admin/src/lib/api/client.ts",
				"line": 15,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
