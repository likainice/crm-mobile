<template>
	<div class="content-divider" :style="{ height: props.size }" />
</template>

<script setup lang="ts" name="PageDivider">
const props = withDefaults(defineProps<{ size?: string }>(), {
	size: "0.2rem"
});
</script>
<style lang="scss" scoped>
/* 内容分割 */
.content-divider {
	width: 100%;
	//height: 10px;
	background-color: #f7f7f7;
}
</style>
