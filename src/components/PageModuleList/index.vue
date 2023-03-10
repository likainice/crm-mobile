<template>
	<div class="pageModuleList">
		<van-grid :border="false" :column-num="props.columnNum">
			<van-grid-item v-for="(item, index) in list" :key="index" :to="item.router">
				<template #icon>
					<div class="menu_icon_box flx-center" :style="{ background: item.background, borderRadius: backgroundRound && '50%' }">
						<SvgIcon :name="item.iconClass" color="#fff" />
					</div>
				</template>
				<template #text> {{ item.navText }} </template>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script lang="ts" setup name="PageModuleList">
import { PageModuleListItemType } from "@/components/PageModuleList/data";
import { toRef } from "vue";

const props = withDefaults(
	defineProps<{
		columnNum?: number | string;
		dataSource?: Partial<PageModuleListItemType>[];
		backgroundRound?: boolean;
	}>(),
	{
		columnNum: 4,
		dataSource: () => [],
		backgroundRound: false
	}
);
const list = toRef(props, "dataSource");
</script>
<style lang="scss" scoped>
.pageModuleList {
	padding: 20px 0;
	:deep(.van-grid-item__content) {
		padding: 20px;
		font-size: 24px;
	}
	.menu_icon_box {
		width: 100px;
		height: 100px;
		margin-bottom: 12px;
		background-color: #f2f2f2;
		border-radius: 8px;
	}
}
</style>
