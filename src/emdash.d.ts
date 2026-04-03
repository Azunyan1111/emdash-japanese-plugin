declare module "emdash" {
	export interface PluginDescriptor<TOptions = Record<string, unknown>> {
		id: string;
		version: string;
		entrypoint: string;
		options?: TOptions;
		adminEntry?: string;
	}

	export interface PluginDefinition {
		id: string;
		version: string;
		admin?: {
			entry?: string;
		};
	}

	export function definePlugin<TPlugin extends PluginDefinition>(definition: TPlugin): TPlugin;
}
