import { definePlugin } from "emdash";

export function createPlugin() {
	return definePlugin({
		id: "japanese",
		name: "EmDash 日本語化",
		version: "0.1.0",
		description:
			"EmDash の管理画面を日本語化するプラグインです。メニュー、ラベル、ボタン、プレースホルダー、各種案内文を日本語で表示します。",
		repositoryUrl: "https://github.com/Azunyan1111/emdash-japanese-plugin",
		admin: {
			entry: "emdash-japanese-plugin/admin",
		},
	});
}

export default createPlugin;
