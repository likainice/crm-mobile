// * Menu
declare namespace Menu {
	interface MenuOptions {
		path?: string;
		title?: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
		iconClass?: string;
		navText?: string;
		router?: string;
		key?: string;
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_ROOT: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
	VITE_API_BASEURL: string;
	VITE_CONSOLE: string;
}

interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

declare module "*.scss" {
	const scss: Record<string, string>;
	export default scss;
}

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
