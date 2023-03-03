<template>
	<div class="main-box">
		<!-- 顶部安全区 -->
		<div class="van-safe-area-top"></div>
		<!--内容-缓存-->
		<router-view v-slot="{ Component, route }">
			<keep-alive :include="cacheRouter">
				<component :is="Component" :key="route.path"></component>
			</keep-alive>
		</router-view>
		<!--底部-->
		<Component :is="footerNavC"></Component>
		<!--返回顶部-->
		<BackTop bottom="100"></BackTop>
		<!-- 底部安全区 -->
		<div class="van-safe-area-bottom"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NavFooter from "@/components/NavFooter/index.vue";
import { BackTop } from "vant";
import { useRoute } from "vue-router";
import cacheRouter from "@/routers/cacheRouter";

const footerNavC = computed(() => {
	return useRoute()?.meta?.navFooter ? NavFooter : false;
});
</script>

<style scoped lang="scss">
.main-box {
	min-height: 100vh;
}
</style>
