<template>
	<div>
		<div class="popUp-title">
			<div @click="onGoBack" class="onBack">
				<svg class="icon" aria-hidden="true" style="font-size: 0.3rem; color: #000">
					<use xlink:href="#icon-fanhui1"></use>
				</svg>
			</div>
			<div>企业微信登录</div>
		</div>
		<div class="qr_login">
			<div id="qr_login"></div>
		</div>

		<p class="message">请长按识别图中二维码</p>
		<p class="message" style="margin-top: 0.25rem">【苹果设备请截屏或长按保存二维码，打开企业微信扫码登录】</p>
	</div>
</template>
<script>
import WwLogin from "WwLogin";
import { Base64 } from "js-base64";
import { getWwCodeConfig } from "@/utils/wwconfig";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
	name: "wwCodeLogin",
	emits: ["onCloseWwCode"],
	setup(_, { emit }) {
		onMounted(() => {
			getWwQrcode();
		});

		function onGoBack() {
			emit("onCloseWwCode");
		}

		async function getWwQrcode() {
			const { appid, agentid, redirectUri } = getWwCodeConfig();
			await new WwLogin({
				self_redirect: false,
				id: "qr_login",
				appid: appid,
				agentid: agentid,
				scope: "snsapi_login",
				redirect_uri: encodeURIComponent(redirectUri),
				state: Math.random(),
				style: "white",
				href: getHrefBase64()
			});
		}

		function getHrefBase64() {
			const hrefCss = `.impowerBox .qrcode {width: 12rem;}
                       .impowerBox .title {display: none;}
                       .impowerBox .info {display: none;}
                       .wrp_code_iframe {margin-top: 0}`;
			return "data:text/css;base64," + Base64.encode(hrefCss);
		}

		return { onGoBack };
	}
});
</script>
<style lang="scss" scoped>
.popUp-title {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 80px;
	padding: 20px;
	font-size: 30px;
	text-align: center;

	.onBack {
		position: absolute;
		top: 26px;
		left: 20px;
		width: 30px;
		height: 30px;

		svg {
			width: 100%;
			height: 100%;
		}
	}
}

.qr_login {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin-top: 35%;
}

.message {
	position: relative;
	bottom: 300px;
	width: 62%;
	margin: 0 auto 20px;
	font-size: 28px;
	line-height: 40px;
	color: darkgrey;
	text-align: center;
}
</style>
