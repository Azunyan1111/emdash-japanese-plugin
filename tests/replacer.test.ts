import { translateValue } from "../src/replacer.js";
import type { TranslationRule } from "../src/replacer.js";

const rules: TranslationRule[] = [
	{ source: "Dashboard", target: "ダッシュボード" },
	{ source: "Loading EmDash...", target: "EmDash を読み込み中..." },
	{ source: /^(\d+)\s+items?$/i, target: "$1 件" },
];

describe("translateValue", () => {
	it("完全一致の文字列を翻訳します", () => {
		expect(translateValue("Dashboard", rules)).toBe("ダッシュボード");
	});

	it("余分な空白を正規化して翻訳します", () => {
		expect(translateValue("  Loading   EmDash...  ", rules)).toBe("EmDash を読み込み中...");
	});

	it("正規表現ルールを適用します", () => {
		expect(translateValue("12 items", rules)).toBe("12 件");
	});

	it("未定義の文字列はそのまま返します", () => {
		expect(translateValue("Unknown", rules)).toBe("Unknown");
	});
});
