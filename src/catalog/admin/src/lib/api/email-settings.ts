import type { CatalogEntry } from "../../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "Content-Type",
		"target": "コンテンツタイプ",
		"occurrences": [
			{
				"file": "admin/src/lib/api/email-settings.ts",
				"line": 37,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to fetch email settings",
		"target": "電子メール設定の取得に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/email-settings.ts",
				"line": 31,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Failed to send test email",
		"target": "テストメールの送信に失敗しました",
		"occurrences": [
			{
				"file": "admin/src/lib/api/email-settings.ts",
				"line": 40,
				"kind": "literal"
			}
		]
	},
	{
		"source": "POST",
		"target": "POST",
		"occurrences": [
			{
				"file": "admin/src/lib/api/email-settings.ts",
				"line": 36,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
