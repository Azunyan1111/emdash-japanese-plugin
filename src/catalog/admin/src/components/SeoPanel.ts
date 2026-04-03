import type { CatalogEntry } from "../../../types.js";

const entries: CatalogEntry[] = [
	{
		"source": "Add noindex meta tag",
		"target": "noindexメタタグを追加する",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 88,
				"kind": "jsx-text"
			}
		]
	},
	{
		"source": "Brief summary shown below the title in search results",
		"target": "検索結果のタイトルの下に簡単な概要が表示されます",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 64,
				"kind": "literal"
			}
		]
	},
	{
		"source": "Canonical URL",
		"target": "正規の URL",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 76,
				"kind": "attribute"
			}
		]
	},
	{
		"source": "Hide from search engines",
		"target": "検索エンジンから隠す",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 87,
				"kind": "jsx-text"
			}
		]
	},
	{
		"source": "Meta Description",
		"target": "メタディスクリプション",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 60,
				"kind": "attribute"
			}
		]
	},
	{
		"source": "SEO Title",
		"target": "SEOタイトル",
		"occurrences": [
			{
				"file": "admin/src/components/SeoPanel.tsx",
				"line": 49,
				"kind": "attribute"
			}
		]
	}
] as CatalogEntry[];

export default entries;
