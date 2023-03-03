<template>
	<HeaderPageHome />
	<PageModuleList :data-source="menuList" />
	<PageDivider />
	<div class="column2">
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
	<div class="content-divider" />
	<div class="column3">
		<div class="header flx-justify-between">
			<div class="left">过期客户</div>
			<router-link to="/customerClassification/expiredCustomers">查看全部></router-link>
		</div>
		<div class="list">
			<div class="list-item" v-for="(item, index) in 10" :key="index">
				<div class="item-top">
					<div>北京金财教育公司</div>
					<div class="item-top-right">
						距过期：<span>{{ 1 }}天</span>
					</div>
				</div>
				<div class="item-bot">
					<div>联系人：{{ "张悦" }}</div>
					<div>上次联系时间：{{ "06-09 12:30" }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import HeaderPageHome from "@/components/Header/PageHome.vue";
import PageModuleList from "@/components/PageModuleList/index.vue";

export default {
	name: "customer",
	components: { HeaderPageHome, PageModuleList },
	setup() {
		const dataMap = reactive({
			noticeNum: "",
			menuList: [
				{
					iconClass: "#icon-customer",
					navText: "我的客户",
					router: "/customer/my",
					permissions: ["AUTH2_UI_CUSTOMER_MY"],
					background: "#61ccf0"
				},
				{
					iconClass: "#icon-kehu",
					navText: "所有客户",
					router: "/customerClassification/subordinateCustomer",
					permissions: ["AUTH2_UI_CUSTOMER_ALL"],
					background: "#77a1f8"
				},
				{
					iconClass: "#icon-caidankehu1",
					navText: "公共库",
					router: "/customerClassification/publicLibrary",
					permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
					background: "#f8ce66"
				},
				{
					iconClass: "#icon-caidankehu1",
					navText: "资源库",
					router: "/customerClassification/resourcePool",
					permissions: ["AUTH2_UI_CUSTOMER_PUBLIC"],
					background: "#77a1f8"
				},
				{
					iconClass: "#icon-collision",
					navText: "客户查重",
					router: "/customerClassification/duplicateCustomer",
					permissions: ["AUTH2_CUSTOMER_MY_CURD", "AUTH2_UI_CUSTOMER_ALL", "AUTH2_CUSTOMER_SHAREHOLDER"],
					background: "#77a1f8"
				},
				{
					iconClass: "#icon-tubiaozhizuomoban",
					navText: "授权客户",
					router: "/customerClassification/authorizedCustomer",
					permissions: ["AUTH2_UI_CUSTOMER_ALL_FANS"],
					background: "#6dd6ad"
				},
				{
					iconClass: "#icon-shalou",
					navText: "过期客户",
					router: "/customerClassification/expiredCustomers",
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
		const route = useRouter();
		const { userInfo } = useUserStore();
		const permissions = computed(() => {
			return userInfo.permissions;
		});
		onMounted(() => {
			getNotice();
		});
		// 获取通知数量
		const getNotice = () => {
			const num = 100;
			if (num > 99) {
				dataMap.noticeNum = "99+";
			} else {
				dataMap.noticeNum = num;
			}
		};
		// 子级菜单跳转处理
		const toDirectory = item => {
			route.push({
				path: item.router,
				query: {
					callback: "/customer"
				}
			});
		};
		// * 日期改变事件
		const dateChange = value => {
			console.log(value, 11);
		};
		return {
			...toRefs(dataMap),
			permissions,
			toDirectory,
			dateChange
		};
	}
};
</script>
<style lang="scss" scoped>
.column2 {
	padding: 0 30px;
	:deep(.van-grid-item__text) {
		margin-top: 18px;
		color: #aeaeae;
	}
	:deep(.van-dropdown-menu__item) {
		flex: inherit;
		margin-bottom: -30px;
	}
}
.column3 {
	padding: 0 30px;
	.header {
		padding: 20px 0;
		font-size: 28px;
		a {
			font-size: 24px;
			color: #999;
		}
	}
	.list {
		padding: 0 20px;
		.list-item {
			padding: 30px 20px;
			border-bottom: 1px solid #f2f2f2;
			.item-top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
				font-size: 30px;
				.item-top-right {
					font-size: 20px;
					span {
						display: inline-block;
						padding: 2px 15px;
						color: #fff;
						text-align: center;
						background: orange;
					}
				}
			}
			.item-bot {
				display: flex;
				justify-content: space-between;
				& > div {
					font-size: 20px;
					color: #999;
				}
			}
		}
	}
}
</style>
