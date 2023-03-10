<template>
	<HeaderPageHome />
	<PageModuleList column-num="3" :data-source="data" />
	<PageDivider />
	<PageListTitle title="微课学习记录" url="/littleGoose/tiny" />
	<LittleGooseList />
</template>
<script lang="ts" setup>
import HeaderPageHome from "@/components/Header/PageHome.vue";
import PageListTitle from "@/components/PageListTitle/index.vue";
import PageModuleList from "@/components/PageModuleList/index.vue";
import LittleGooseList from "./components/list.vue";
import { ref } from "vue";
const data = ref([
	{
		iconClass: "icon-paixu",
		navText: "工具课记录",
		router: "/littleGoose/tool",
		permissions: ["AUTH2_UI_CUSTOMER_MY"]
	},
	{
		iconClass: "icon-shouji",
		navText: "客户",
		router: "/littleGoose/client",
		permissions: ["AUTH2_UI_CUSTOMER_ALL"]
	},
	{
		iconClass: "icon-dingdan",
		navText: "订单",
		router: "/littleGoose/order",
		permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"]
	}
]);
</script>
