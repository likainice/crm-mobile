<template>
	<HeaderBack />
	<div>选择</div>
	<search-filter placeholder="请输入客户公司名称、学员姓名、手机号" />
	<PastList />
</template>

<script lang="ts" setup>
import PastList from "./components/pastList.vue";
import { ref, watch } from "vue";

const selectValue = ref(["2023-02-01", "2023-02-06"]);
const active = ref(0);
const options = ref([
	{ value: 1, text: "业绩总览" },
	{ value: 2, text: "技术业绩" },
	{ value: 3, text: "OPP业绩" },
	{ value: 4, text: "微课业绩" }
]);
const dropdownOptions = ref([
	{ value: 1, text: "当月" },
	{ value: 2, text: "补录" }
]);
const onTabs = value => {
	console.log(value);
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
