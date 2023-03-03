import { defineStore } from "pinia";
import { UserState } from "../types";
import piniaPersistConfig from "../piniaPersist";
import { apiLogin, apiRefreshToken, apiWwCodeLogin } from "@/api";
import { Base64 } from "js-base64";

// UserStore
export const useUserStore = defineStore({
	id: "UserStore",
	state: (): UserState => ({
		// token
		token: "",
		// userInfo
		userInfo: ""
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},

		/* 登录 */
		doLogin(form): Promise<any> {
			return new Promise((resolve, reject) => {
				apiLogin(form)
					.then(({ data, headers }) => {
						this.doTokenDeal(data, headers);
						resolve(data);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
			});
		},
		/* 企业微信扫码登录 */
		doWwCodeLogin(form) {
			return new Promise((resolve, reject) => {
				apiWwCodeLogin(form)
					.then(({ data, headers }) => {
						this.doTokenDeal(data, headers);
						resolve(data);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
			});
		},
		/* 刷新token */
		async doRefreshToken(form) {
			return new Promise((resolve, reject) => {
				apiRefreshToken(form)
					.then(({ data, headers }) => {
						this.doTokenDeal(data, headers);
						resolve(data);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
			});
		},
		/* 处理token */
		doTokenDeal(data, headers) {
			// console.log(data, headers, '000000000')
			if (data.code === 1020000) {
				const { authorization } = headers;
				const result = authorization.slice(7).split(".");
				const base1 = Base64.decode(result[0]);
				const base2 = Base64.decode(result[1]);
				const token = {
					authorization: authorization,
					base1: base1,
					base2: base2
				};

				this.setToken(token);
				if (data.content) {
					this.setUserInfo({
						...data.content,
						...data.content.properties
					});
				}
			}
		},
		/* 退出登录 */
		doLogout() {
			this.token = "";
			this.userInfo = "";
			localStorage.clear();
			sessionStorage.clear();
		}
	},
	persist: piniaPersistConfig("UserStore")
});
