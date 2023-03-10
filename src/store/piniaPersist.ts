import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
const piniaPersistConfig = (key: string, storage?: "local" | "session") => {
	const persist: PersistedStateOptions = {
		key,
		storage: storage === "session" ? window.sessionStorage : window.localStorage
		// storage: window.sessionStorage,
	};
	return persist;
};

export default piniaPersistConfig;
