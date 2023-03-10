<template>
	<div class="check-list clearfix" :class="show && 'customer-list-check'">
		<Header v-if="show">
			<template #left>
				<div @click="onCancel">取消</div>
			</template>
			<template #title> {{ null }}</template>
			<template #right>
				<div>
					已选<span>{{ selects?.length }}</span
					>家
				</div>
			</template>
		</Header>
		<van-checkbox-group v-model="selects" ref="checkboxGroup">
			<CustomerList :data-source="list">
				<template #left="props" v-if="show">
					<van-checkbox :name="props.item.id" />
				</template>
			</CustomerList>
		</van-checkbox-group>
		<!--底部操作项目-->
		<van-popup v-model:show="show" :overlay="false" safe-area-inset-bottom round position="bottom">
			<div class="check-options">
				<van-checkbox v-model="all" @change="onALLChange">全选</van-checkbox>
				<div class="check-options-item" v-for="item in optionsList" :key="item.value" @click="onOptions(item.value)">
					<SvgIcon :name="item.icon" />
					<span>{{ item.text }}</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script lang="ts" setup name="check-list">
import { ref, toRef, watch } from "vue";
import Header from "@/components/Header/index.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import CustomerList from "./customerList.vue";
import { showConfirmDialog, showNotify } from "vant";

const emit = defineEmits(["update:showCheck"]);
const props = withDefaults(
	defineProps<{
		showCheck: boolean;
		dataSource: any[];
	}>(),
	{
		showCheck: false,
		dataSource: () => []
	}
);
const optionsList = [
	{
		value: 1,
		text: "移动",
		icon: "icon-icon_device_zhuanyidao"
	},
	{
		value: 2,
		text: "归属",
		icon: "icon-zhuanyi"
	},
	{
		value: 3,
		text: "转公共库",
		icon: "icon-songgongkaiku"
	}
];

const show = toRef(props, "showCheck");
const list = toRef(props, "dataSource");

const checkboxGroup = ref(null);
const selects = ref([]);
const all = ref();

//取消
const onCancel = () => {
	selects.value = [];
	all.value = false;
	emit("update:showCheck", false);
};
//操作项
const onOptions = (type: any) => {
	console.log("已选", selects.value);
	if (selects.value.length === 0) {
		showNotify({ type: "danger", message: "请选择" });
		return;
	}
	if (type === 3) {
		showConfirmDialog({
			title: "转公共库",
			message: "确定将客户转移到公共库？"
		})
			.then(() => {
				// on confirm
			})
			.catch(() => {
				// on cancel
			});
	}
};
//全选切换
const onALLChange = val => {
	if (val) {
		checkboxGroup?.value?.toggleAll(true);
	} else {
		if (selects.value.length === list.value.length) {
			checkboxGroup?.value?.toggleAll();
		}
	}
};
//监听单选
watch(
	[() => selects.value, () => props],
	val => {
		if (val[0]?.length === list.value.length) {
			all.value = true;
		} else {
			all.value = false;
		}
	},
	{
		deep: true,
		immediate: true
	}
);
</script>
<style lang="scss" scoped>
.check-list {
	:deep(.van-popup) {
		box-shadow: 1px 1px 5px 1px #aeaeae;
	}

	.check-options {
		display: flex;
		padding: 36px 50px;

		&-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 30px;
		}
	}

	&.customer-list-check {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 100vh;
		padding: 0;
		overflow-y: auto;
		background: #fff;

		:deep(.van-checkbox-group) {
			padding-bottom: 180px;

			.van-checkbox {
				margin-right: 26px;
			}
		}
	}
}
</style>
