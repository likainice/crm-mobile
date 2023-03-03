<template>
	<div class="navHeader flx-center">
		<van-nav-bar :title="titleC" safe-area-inset-top fixed clickable placeholder>
			<template #left>
				<slot name="left"></slot>
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
	:deep(.van-tabbar) {
		height: 130px;

		.van-tabbar-item {
			svg {
				width: 50px;
				height: 50px;
				fill: #666;
			}

			&.van-tabbar-item--active {
				svg {
					fill: var(--van-primary-color);
				}
			}
		}
	}

	.nav_more {
		position: absolute;
		top: -40px;
		left: 50%;
		z-index: 11;
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		background-color: #409eff;
		border-radius: 50%;
		transform: translateX(-50%);
	}

	.menu_box {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: 80px auto 0;

		.menu_item {
			margin: 10px 40px;
			text-align: center;

			.menu_icon_box {
				box-sizing: border-box;
				width: 100px;
				height: 100px;
				padding-top: 20px;
				border-radius: 10px;

				svg {
					width: 50px;
					height: 50px;
					fill: #fff;
				}
			}

			.menu_title {
				font-size: 24px;
			}
		}
	}
}
</style>
