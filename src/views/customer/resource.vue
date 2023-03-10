<template>
	<HeaderBack />
	<SearchFilter
		placeholder="请输入客户公司名称"
		show-dropdown
		:dropdownOptions="dropdownOptions"
		:initDropdownValue="dropdownValue"
	/>
	<PastList />
</template>

<script lang="ts" setup>
import PastList from "./components/pastList.vue";
import { ref, watch } from "vue";

const selectValue = ref(["2023-02-01", "2023-02-06"]);
const dropdownValue = ref(1);

const dropdownOptions = ref([
	{ value: 1, text: "新媒体" },
	{ value: 2, text: "分公司" }
]);

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
