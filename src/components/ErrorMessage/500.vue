<template>
	<div class="not-container">
		<img src="@/assets/images/500.png" class="not-img" alt="500" />
		<div class="not-detail">
			<h2>500</h2>
			<h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
			<van-button type="primary" @click="goHome">返回首页</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
const router = useRouter();
const goHome = () => {
	router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
