import type { PluginDescriptor } from "emdash";

export function japanesePlugin(): PluginDescriptor {
	return {
		id: "japanese",
		version: "0.1.0",
		entrypoint: "emdash-japanese-plugin/plugin",
		options: {},
		adminEntry: "emdash-japanese-plugin/admin",
	};
}

export default japanesePlugin;
