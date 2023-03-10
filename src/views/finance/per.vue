<template>
	<HeaderBack />
	<van-tabs v-model:active="active" @change="onTabs">
		<van-tab v-for="item in options" :key="item.value" :title="item.text" />
	</van-tabs>
	<SearchFilter v-if="active !== 0" show-dropdown :dropdown-options="dropdownOptions" :init-dropdown-value="1" />
	<DateSelect v-model="selectValue" :show-confirm="false" type="range" />
	<div v-if="active === 0" class="per-total">
		<van-row>
			<van-col span="24">
				<div class="total-cell1">总业绩</div>
				<div class="total-cell2">￥2000.23</div>
				<div class="total-cell3">74单</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col span="12">
				<div class="total-cell1-fs">课程业绩</div>
				<div class="total-cell2">￥2000.23</div>
				<div class="total-cell3">74单</div>
			</van-col>
			<van-col span="12">
				<div class="total-cell1-fs">咨询业绩</div>
				<div class="total-cell2">￥2000.23</div>
				<div class="total-cell3">74单</div>
			</van-col>
		</van-row>
	</div>
	<PerList v-if="active !== 0" />
</template>

<script lang="ts" setup>
import DateSelect from "@/components/DateSelect/index.vue";
import PerList from "./components/perList.vue";
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
<style scoped lang="scss">
@import "./index.scss";
</style>
