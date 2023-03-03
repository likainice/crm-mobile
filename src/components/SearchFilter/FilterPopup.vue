<!--筛选弹窗-->
<template>
	<van-popup v-bind="attrs" @click-overlay="onOverlay">
		<van-loading class="flx-align-center" size="24px" vertical v-if="list.length === 0">加载中...</van-loading>
		<div v-else class="filter-content">
			<div class="filter-content-item" v-for="(item, index) in list" :key="index">
				<div class="filter-content-item-title">{{ item.text }}</div>
				<van-checkbox-group ref="checkboxGroup" v-model="selectValue['value-' + item.value]">
					<van-checkbox v-for="itemC in item?.children" :key="itemC.value" :name="itemC.value"> {{ itemC.text }}</van-checkbox>
				</van-checkbox-group>
			</div>

			<div class="filter-content-footer">
				<van-space>
					<van-button type="default" size="small" @click="onRest">重置</van-button>
					<van-button type="primary" size="small" @click="onOk">确定</van-button>
				</van-space>
			</div>
		</div>
	</van-popup>
</template>

<script lang="ts" setup name="FilterPopup">
import { ref, useAttrs, watch } from "vue";
import { FilterOptionType } from "@/components/SearchFilter/data";

const props = withDefaults(
	defineProps<{
		options: FilterOptionType[];
	}>(),
	{
		options: () => []
	}
);
const attrs = useAttrs();

const emit = defineEmits<{
	(e: "update:show", v: boolean);
	(e: "update:check", v: any);
	(e: "onOk", v: any): void;
}>();
//关闭弹窗
const onOverlay = () => {
	emit("update:show", false);
};
//筛选数据
const list = ref(props.options);
watch(
	() => {
		return props.options;
	},
	() => {
		list.value = props.options;
	}
);
const selectValue = ref({});
const onRest = () => {
	selectValue.value = {};
};

const onOk = () => {
	emit("update:check", selectValue.value); //v-model绑定
	emit("onOk", selectValue.value); //通信
	emit("update:show", false);
};
</script>
<style lang="scss" scoped>
.filter-content {
	padding: 20px 30px;

	&-item {
		padding-bottom: 30px;

		&-title {
			padding: 24px 0;
			font-size: 30px;
			border-bottom: 4px solid $border-color;
		}

		:deep(.van-checkbox-group) {
			padding: 20px 0;
			.van-checkbox {
				margin-bottom: 10px;
			}
			//.van-checkbox {
			//	position: relative;
			//	.van-checkbox__icon {
			//		height: inherit;
			//		line-height: inherit;
			//		.van-icon {
			//			width: inherit;
			//			height: inherit;
			//			padding: 30px 60px;
			//			line-height: inherit;
			//			background-color: #f4f5f7;
			//			border-color: transparent;
			//			border-radius: inherit;
			//			&::before {
			//				position: absolute;
			//				right: 0;
			//				bottom: 0;
			//			}
			//		}
			//	}
			//	.van-checkbox__label {
			//		position: absolute;
			//		width: 100%;
			//		margin-left: inherit;
			//		line-height: inherit;
			//		text-align: center;
			//	}
			//}
		}
	}
	//content: "\e728";
	&-footer {
		position: sticky;
		right: 0;
		bottom: 50px;
		display: inline-block;
		text-align: right;
	}
}
</style>
