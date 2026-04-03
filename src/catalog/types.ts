export interface CatalogOccurrence {
	file: string;
	line: number;
	kind: "jsx-text" | "attribute" | "literal";
}

export interface CatalogEntry {
	source: string;
	target: string;
	occurrences: CatalogOccurrence[];
}
