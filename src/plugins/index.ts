import { createApp } from "vue";

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
	// * webpack 获取文件夹方式
	/*const files = require["context"](".", true, /\.ts$/);
	files.keys().forEach(key => {
		if (typeof files(key).default === "function") {
			if (key !== "./index.ts") files(key).default(app);
		}
	});*/

	// * vite 获取文件夹方式
	const files: any = import.meta.globEager("./*.ts");
	Object.keys(files).forEach(key => {
		if (typeof files[key].default === "function") {
			if (key !== "./index.ts") files[key].default(app); //执行文件内默认注册方法
		}
	});
}
