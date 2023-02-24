import { showToast } from "vant";

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			showToast({ message: "请求失败！请您稍后重试" });
			break;
		case 401:
			showToast({ message: "登录失效！请您重新登录" });
			break;
		case 403:
			showToast({ message: "当前账号无权限访问！" });
			break;
		case 404:
			showToast({ message: "你所访问的资源不存在！" });
			break;
		case 405:
			showToast({ message: "请求方式错误！请您稍后重试" });
			break;
		case 408:
			showToast({ message: "请求超时！请您稍后重试" });
			break;
		case 500:
			showToast({ message: "服务异常！" });
			break;
		case 502:
			showToast({ message: "网关错误！" });
			break;
		case 503:
			showToast({ message: "服务不可用！" });
			break;
		case 504:
			showToast({ message: "网关超时！" });
			break;
		default:
			showToast({ message: "请求失败！" });
	}
};
