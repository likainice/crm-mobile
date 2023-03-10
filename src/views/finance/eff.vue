<template>
	<HeaderBack />
	<van-tabs v-model:active="active" sticky>
		<van-tab v-for="item in options" :key="item.value" :title="item.text" />
	</van-tabs>
	<DateSelect v-model="selectValue" :show-confirm="false" />
	<div class="per-grant" v-if="active !== 0">
		<van-space :size="50">
			<div>可发放:111元</div>
			<div>不可发放:111元</div>
		</van-space>
	</div>
	<div v-if="active === 0" class="per-total">
		<van-row>
			<van-col span="24">
				<div class="total-cell1">总绩效</div>
				<div class="total-cell2">￥2000.23</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col span="12">
				<div class="total-cell1-fs">当月业绩提成</div>
				<div class="total-cell2-fs">￥2000.23</div>
			</van-col>
			<van-col span="12">
				<div class="total-cell1-fs">往月补发提成</div>
				<div class="total-cell2-fs">￥2000.23</div>
			</van-col>
			<van-col span="12">
				<div class="total-cell1-fs">奖励绩效</div>
				<div class="total-cell2-fs">￥2000.23</div>
			</van-col>
		</van-row>
	</div>
	<PerList v-if="active !== 0" />
</template>

<script lang="ts" setup>
import DateSelect from "@/components/DateSelect/index.vue";
import PerList from "./components/perList.vue";
import { ref, watch } from "vue";

const selectValue = ref("2023-02-01");
const active = ref(0);
const options = ref([
	{ value: 1, text: "业绩总览" },
	{ value: 2, text: "技术业绩" },
	{ value: 3, text: "OPP业绩" },
	{ value: 4, text: "微课业绩" }
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
<style scoped lang="scss">
@import "./index.scss";
</style>
