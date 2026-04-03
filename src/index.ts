import { definePlugin } from "emdash";

export function createPlugin() {
	return definePlugin({
		id: "japanese",
		version: "0.1.0",
		admin: {
			entry: "emdash-japanese-plugin/admin",
		},
	});
}

export default createPlugin;
