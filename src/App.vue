<template>
	<van-config-provider :size="assemblySize">
		<router-view></router-view>
	</van-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();

// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed((): string => globalStore.assemblySize);
</script>

<style scoped lang="scss"></style>
