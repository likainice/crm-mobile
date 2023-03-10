<template>
	<HeaderPageHome />
	<PageModuleList :data-source="menuList" />
	<PageDivider />
	<PageListTitle title="企业收款" url="/finance/payee" />
	<PayeeList :data-source="[]" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HeaderPageHome from "@/components/Header/PageHome.vue";
import PageModuleList from "@/components/PageModuleList/index.vue";
import PageListTitle from "@/components/PageListTitle/index.vue";
import PayeeList from "@/views/finance/components/payeeList.vue";

const menuList = ref([
	{
		iconClass: "icon-customer",
		navText: "订单",
		router: "/finance/order",
		permissions: ["AUTH2_UI_CUSTOMER_MY"],
		background: "#6DD6AD"
	},
	{
		iconClass: "icon-kehu",
		navText: "开票",
		router: "/finance/bill",
		permissions: ["AUTH2_UI_CUSTOMER_ALL"],
		background: "#F8CE66"
	},
	{
		iconClass: "icon-caidankehu1",
		navText: "业绩",
		router: "/finance/per",
		permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
		background: "#77A1F8"
	},
	{
		iconClass: "icon-caidankehu1",
		navText: "绩效",
		router: "/finance/eff",
		permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
		background: "#EB6F76"
	}
]);
</script>
