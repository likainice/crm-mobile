<template>
	<div class="main-box">
		<!-- 开启顶部安全区适配 -->
		<!--		<van-nav-bar safe-area-inset-top />-->
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="cacheRouter">
					<component :is="Component" :key="route.path"></component>
				</keep-alive>
			</transition>
		</router-view>
		<Footer></Footer>
		<!-- 开启底部安全区适配 -->
		<van-number-keyboard safe-area-inset-bottom />
	</div>
</template>

<script setup lang="ts">
import cacheRouter from "@/routers/cacheRouter";
import { onMounted } from "vue";
import Footer from "./Footer/index.vue";
onMounted(async () => {});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
