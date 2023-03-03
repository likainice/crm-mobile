import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosCanceler } from "./axiosCancel";
import router from "@/routers";
import { checkStatus } from "./checkStatus";
import { useUserStore } from "@/store/modules/user";
import { showToast } from "vant";
const axiosCanceler = new AxiosCanceler();

const defaultConfig: AxiosRequestConfig = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_BASEURL,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
	// 跨域时候允许携带凭证
	withCredentials: true
};

// 实例化axios
const service: AxiosInstance = Axios.create(defaultConfig);

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
 */
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// * 将当前请求添加到 pending 中
		axiosCanceler.addPending(config);
		// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
		//config.headers!.noLoading || showFullScreenLoading();

		const userStore = useUserStore();
		const token: string = userStore.token;
		if (token) {
			// 判断是否存在token，如果存在的话，则每个http header都加上token
			return { ...config, headers: { ...config.headers, Authorization: token } } as any;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data, config } = response;
		// * 在请求结束后，移除本次请求
		axiosCanceler.removePending(config);
		const globalStore = useUserStore();
		const codeList = [1040400, 1040400, 1000001, 1040000];
		if (codeList.includes(data.code) || !data.code) {
			showToast(data.message || "失败");
			globalStore.doLogout(); // 退出登录
			router.replace({
				path: "/login"
			});
			return Promise.reject(data);
		} else if (data.code === 1000409) {
			// 企业微信处理未绑定
			globalStore.doLogout(); // 退出登录
			router.replace({
				path: "/wxLogin"
			});
		} else {
			// * 成功请求
			return response;
		}
	},
	async (error: AxiosError) => {
		const { response } = error;
		// 根据响应的错误状态码，做不同的处理
		if (response) return checkStatus(response.status);
		// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
		if (!window.navigator.onLine) return router.replace({ path: "/500" });
		return Promise.reject(error);
	}
);

export default service;
