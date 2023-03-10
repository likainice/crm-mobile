<template>
	<HeaderPageHome />
	<PageModuleList :data-source="menuList" />
	<PageDivider />
	<div class="statistics">
		<van-dropdown-menu :overlay="false">
			<van-dropdown-item v-model="date" :options="dateOption" @change="dateChange" />
		</van-dropdown-menu>
		<van-grid :border="false">
			<van-grid-item text="新增用户">
				<template #icon>0家</template>
			</van-grid-item>
			<van-grid-item icon="photo-o" text="邀约客户">
				<template #icon>0家</template>
			</van-grid-item>
			<van-grid-item icon="photo-o" text="OPP门票">
				<template #icon>0家</template>
			</van-grid-item>
			<van-grid-item icon="photo-o" text="收款（总）">
				<template #icon>0家</template>
			</van-grid-item>
		</van-grid>
	</div>
	<PageListTitle title="过期客户" url="/customer/past" />
	<PastList />
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useUserStore } from "@/store/modules/user";
import HeaderPageHome from "@/components/Header/PageHome.vue";
import PageModuleList from "@/components/PageModuleList/index.vue";
import PageListTitle from "@/components/PageListTitle/index.vue";
import PastList from "./components/pastList.vue";

export default {
	name: "customer",
	components: { PageListTitle, HeaderPageHome, PageModuleList, PastList },
	setup() {
		const dataMap = reactive({
			noticeNum: "",
			menuList: [
				{
					iconClass: "icon-customer",
					navText: "我的客户",
					router: "/customer/my",
					permissions: ["AUTH2_UI_CUSTOMER_MY"],
					background: "#61ccf0"
				},
				{
					iconClass: "icon-kehu",
					navText: "所有客户",
					router: "/customer/all",
					permissions: ["AUTH2_UI_CUSTOMER_ALL"],
					background: "#77a1f8"
				},
				{
					iconClass: "icon-caidankehu1",
					navText: "公共库",
					router: "/customer/public",
					permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
					background: "#f8ce66"
				},
				{
					iconClass: "icon-caidankehu1",
					navText: "资源库",
					router: "/customer/resource",
					permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
					background: "#77a1f8"
				},
				{
					iconClass: "icon-collision",
					navText: "客户查重",
					router: "/customer/check",
					permissions: ["AUTH2_CUSTOMER_MY_CURD", "AUTH2_UI_CUSTOMER_ALL", "AUTH2_CUSTOMER_SHAREHOLDER"],
					background: "#77a1f8"
				},
				{
					iconClass: "icon-tubiaozhizuomoban",
					navText: "授权客户",
					router: "/customer/authorize",
					permissions: ["AUTH2_UI_CUSTOMER_ALL_FANS"],
					background: "#6dd6ad"
				},
				{
					iconClass: "icon-shalou",
					navText: "过期客户",
					router: "/customer/past",
					permissions: [""], // 待定
					background: "#eb6f76"
				}
			],
			date: 1,
			dateOption: [
				{ text: "今日", value: 1 },
				{ text: "昨天", value: 2 },
				{ text: "本周", value: 3 },
				{ text: "上周", value: 4 },
				{ text: "本月", value: 5 },
				{ text: "上月", value: 6 },
				{ text: "全年", value: 7 }
			]
		});
		const { userInfo } = useUserStore();
		const permissions = computed(() => {
			return userInfo.permissions;
		});
		// * 日期改变事件
		const dateChange = value => {
			console.log(value);
		};
		return {
			...toRefs(dataMap),
			permissions,
			dateChange
		};
	}
};
</script>
<style lang="scss" scoped>
.statistics {
	padding: 0 16px;
	border-bottom: 1px solid $border-color;
	:deep(.van-grid-item__text) {
		margin-top: 18px;
		color: #aeaeae;
	}

	:deep(.van-dropdown-menu__item) {
		flex: inherit;
		margin-bottom: -30px;
	}
}
</style>
