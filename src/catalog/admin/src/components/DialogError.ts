import type { CatalogEntry } from "../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "An error occurred",
		"target": "エラーが発生しました",
		"occurrences": [
			{
				"file": "admin/src/components/DialogError.tsx",
				"line": 11,
				"kind": "literal"
			}
		]
	},
	{
		"source": "rounded-md bg-kumo-danger/10 p-3 text-sm text-kumo-danger",
		"target": "Rounded-md bg-kumo-danger/10 p-3 text-sm text-kumo-danger",
		"occurrences": [
			{
				"file": "admin/src/components/DialogError.tsx",
				"line": 24,
				"kind": "literal"
			}
		]
	}
] as CatalogEntry[];

export default entries;
