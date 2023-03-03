<template>
	<div class="pageModuleList">
		<van-grid :border="false" :column-num="props.columnNum">
			<van-grid-item
				v-for="(item, index) in props.dataSource"
				:key="index"
				:text="item.navText"
				:to="{
					path: item.router,
					query: {
						callback: '/customer'
					}
				}"
			>
				<template #icon>
					<div class="menu_icon_box flx-center" :style="{ background: item.background }">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="item.iconClass" style="color: #fff" />
						</svg>
					</div>
				</template>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script lang="ts" setup name="PageModuleList">
import { PageModuleListItemType } from "@/components/PageModuleList/data";

const props = withDefaults(
	defineProps<{
		columnNum?: number | string;
		dataSource?: Partial<PageModuleListItemType>[];
	}>(),
	{
		columnNum: 4,
		dataSource: () => []
	}
);
</script>
<style lang="scss" scoped>
.pageModuleList {
	padding: 20px 0;
	:deep(.van-grid-item__content) {
		padding: 20px;
	}
	.menu_icon_box {
		width: 100px;
		height: 100px;
		background-color: #cccccc69;
		border-radius: 8px;
		svg {
			fill: #fff;
		}
	}
}
</style>
