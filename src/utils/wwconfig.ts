/* 微信配置文件 */
interface IWxConfig {
	appid: string;
	redirectUri: string;
}

interface IWwCodeConfig {
	appid: string;
	agentid: string;
	redirectUri: string;
}

/* 企业微信登录配置 */
export function getWwConfig(): IWxConfig {
	if (window.location.hostname === "app.icfo.cn") {
		return {
			// 线上配置
			appid: "wwc1ff63c5a2c077cd", // 企业ID
			redirectUri: "http://app.icfo.cn/#/wxLogin"
		};
	} else {
		// 测试配置
		return {
			appid: "ww50ba640ec841cd96",
			redirectUri: "http://apptest.icfo.cn/#/wxLogin"
		};
	}
}

/* 企业微信扫码登录配置 */
export function getWwCodeConfig(): IWwCodeConfig {
	if (window.location.hostname === "app.icfo.cn") {
		return {
			// 线上配置
			appid: "wwc1ff63c5a2c077cd", // 企业ID
			agentid: "1000037",
			redirectUri: "http://app.icfo.cn/#/login"
		};
	} else {
		// 测试配置
		return {
			appid: "ww50ba640ec841cd96",
			agentid: "1000002",
			redirectUri: "http://apptest.icfo.cn/#/login"
		};
	}
}

/* 判断是否企业微信环境 */
export function getIsWxWork() {
	console.log("企业微信工作台123456789");
	console.log(/wxwork/i.test(navigator.userAgent));
	return /wxwork/i.test(navigator.userAgent);
}
