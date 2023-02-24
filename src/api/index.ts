import http from "@/utils/request";

/* 登录接口 */
export function apiLogin(form: any): Promise<any> {
	const api = form.type ? "/wxchat/login" : "/login";
	return http({
		url: api,
		method: "post",
		headers: {
			Client: "app"
		},
		params: form
	});
}

// 企业微信扫码登录
export function apiWwCodeLogin(form) {
	return http({
		url: "/wechat_enterprise/login",
		method: "post",
		headers: {
			Client: "app"
		},
		params: form
	});
}
// 获取token
export function apiRefreshToken(form) {
	return http.post("/refresh_token", form);
}

export function apiForgetPassword(mobile) {
	// 忘记密码
	return http.patch(`/api/v1/apps/account/${mobile}/resetpwd`);
}
