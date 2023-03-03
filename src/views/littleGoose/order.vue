<template>
	<HeaderBack />
	<SearchFilter
		show-filter
		placeholder="请搜索客户名称"
		:filter-options="filterOptions"
		@changeSearch="onSearch"
		@changeDropdown="onDropdown"
		@changeFilter="onFilter"
	/>
	<OrderList :data-source="[]" />
</template>
<script setup lang="ts">
import HeaderBack from "@/components/Header/Back.vue";
import SearchFilter from "@/components/SearchFilter/index.vue";
import { ref } from "vue";
import OrderList from "@/views/littleGoose/components/orderList.vue";
const filterOptions = ref([
	{
		type: 1,
		text: "库类型",
		value: 11,
		children: [
			{ value: 1, text: "  A类" },
			{ value: 2, text: "  B类" },
			{ value: 3, text: "  C类" }
		]
	},
	{
		type: 2,
		text: "客户标签",
		value: 12,
		children: [
			{ value: 1, text: "  A类" },
			{ value: 2, text: "  B类" },
			{ value: 3, text: "  C类" }
		]
	},
	{
		type: 3,
		text: "审核状态",
		value: 33,
		children: [
			{ value: 1, text: "待审批" },
			{ value: 2, text: "审批通过（总部）" },
			{ value: 3, text: "审批通过（分公司）" },
			{ value: 4, text: "审批通过" },
			{ value: 5, text: "审批驳回（总部）" },
			{ value: 6, text: "审批驳回（分公司）" }
		]
	}
]);
const onSearch = val => {
	console.log("搜索：", val);
};
const onDropdown = val => {
	console.log("下拉：", val);
};
const onFilter = val => {
	console.log("筛选：", val);
};
</script>
