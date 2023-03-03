<template>
	<div class="not-container">
		<img src="@/assets/images/403.png" class="not-img" alt="403" />
		<div class="not-detail">
			<h2>403</h2>
			<h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
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
