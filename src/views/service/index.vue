<template>
	<HeaderPageHome />
	<PageModuleList :data-source="menuList" />
	<PageDivider />
	<PageListTitle title="企业收款" url="/finance/payee" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HeaderPageHome from "@/components/Header/PageHome.vue";
import PageModuleList from "@/components/PageModuleList/index.vue";
import PageListTitle from "@/components/PageListTitle/index.vue";

const menuList = ref([
	{
		iconClass: "#icon-customer",
		navText: "上门服务",
		router: "/service/visit",
		permissions: ["AUTH2_UI_CUSTOMER_MY"],
		background: "#6DD6AD"
	},
	{
		iconClass: "#icon-kehu",
		navText: "参课客户",
		router: "/service/join",
		permissions: ["AUTH2_UI_CUSTOMER_ALL"],
		background: "#F8CE66"
	},
	{
		iconClass: "#icon-caidankehu1",
		navText: "排课&预约",
		router: "/service/queue",
		permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
		background: "#77A1F8"
	}
]);
</script>
