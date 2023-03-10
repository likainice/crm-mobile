<template>
	<div class="navHeader flx-center">
		<van-nav-bar safe-area-inset-top fixed clickable placeholder>
			<template #left>
				<slot name="left"></slot>
			</template>
			<template #title>
				<slot name="title">{{ titleC }}</slot>
			</template>
			<template #right>
				<slot name="right"></slot>
			</template>
		</van-nav-bar>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<{ title?: string }>(), {
	title: ""
});

/*const emits = defineEmits(["update:ontitle"]);
const toggle = () => {
	emits("update:ontitle", !props.title);
};*/
const titleC = computed(() => {
	return props.title || useRoute().meta?.title;
});
</script>
<style scoped lang="scss">
.navHeader {
	:deep(.van-nav-bar) {
		z-index: 100;
		line-height: initial;
		.van-nav-bar__content {
			height: 100px;
		}
	}
}
</style>
