<template>
	<HeaderBack>
		<template #right>
			<van-icon name="plus" size="1.4em" style="color: #666" @click="onAdd" />
		</template>
	</HeaderBack>
	<SearchFilter show-filter :filter-options="filterOptions" />
	<OrderList @change="onChange" />
</template>

<script lang="ts" setup>
import OrderList from "../components/orderList.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const selectValue = ref(["2023-02-01", "2023-02-06"]);
const filterOptions = ref([
	{
		value: 1,
		text: "审核状态",
		children: [
			{ value: 11, text: "待审批" },
			{ value: 12, text: "审批通过（总部）" },
			{ value: 13, text: "审批通过（分公司）" },
			{ value: 14, text: "审批驳回（总部）" },
			{ value: 15, text: "审批驳回（分公司）" }
		]
	},
	{ value: 2, text: "服务开通状态" },
	{ value: 3, text: "订单创建时间" }
]);
const router = useRouter();
const onAdd = () => {
	router.push("/finance/order/add");
};

const onChange = val => {
	console.log(val);
};

watch(
	() => selectValue.value,
	(v, n) => {
		console.log("当前选择:", v, n);
	},
	{
		deep: true,
		immediate: true
	}
);
</script>
<style scoped lang="scss"></style>
