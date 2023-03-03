<template>
	<div class="list_main" v-show="customerStatus === '主页'">
		<van-nav-bar>
			<template #left>
				<van-icon name="arrow-left" size="18" style="color: #000" @click="onClose" />
			</template>
			<template #title>
				<van-dropdown-menu :overlay="false" active-color="#09f" style="width: 100%">
					<van-dropdown-item
						@change="setCustomerScreen"
						style="font-size: 0.16rem"
						v-model="customerLibrary"
						:options="customerTypeList"
					/>
				</van-dropdown-menu>
			</template>
			<template #right>
				<div class="nav_tab_title">
					<span @click="toExpired">过期</span>
					<span class="notice_num">{{ expiredNum }}</span>
				</div>
				<van-icon @click="createCustomer" name="plus" size="18" style="color: #000" />
			</template>
		</van-nav-bar>
		<!-- 关键字搜索 -->
		<condition-search ref="conditionSearch" @getSearchValue="getSearchValue" :filterData="filterData" />
		<!-- 条件筛选 -->
		<customer-screen ref="customerScreen" @onSearchCustomer="onSearchCustomer" :customersList="customerDataList" />
		<div class="customer_data_list">
			<div v-for="item in customerDataList" :key="item.id" @click="intoCustomerDetails(item)">
				{{ item.id }}
			</div>
		</div>
	</div>
	<!-- 客户创建 -->
	<customer-create ref="customerCreate" v-if="customerStatus === '创建客户'" @onClose="customerStatus = '主页'" />
	<!-- 客户详情 -->
	<customer-details-main ref="customerDetailsMain" v-if="customerStatus === '客户详情'" @onClose="customerStatus = '主页'" />
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import conditionSearch from "@/components/public/conditionSearch";
import customerScreen from "@/components/customerComponents/customerScreen";
import { useUserStore } from "@/store/modules/user";
import customerCreate from "@/components/customerComponents/customerDetails/customerCreate";
import customerDetailsMain from "@/components/customerComponents/customerDetails/customerDetailsMain";
import { apiMyCustomer } from "@/api/restructureApi/customer";

export default {
	name: "myCustomer",
	components: { conditionSearch, customerScreen, customerCreate, customerDetailsMain },
	props: {},
	setup(props, { emit }) {
		const dataMap = reactive({
			callBackRouter: "",
			customerLibrary: "",
			customerTypeList: [],
			expiredNum: 99, // 过期客户数量
			filterData: [
				{ text: "时间", placeholder: "请输入时间", key: "" },
				{ text: "a", placeholder: "请输入a", key: "" },
				{ text: "b", placeholder: "请输入b", key: "" }
			],
			customerStatus: "主页", // 客户展示状态
			customerDataList: []
		});
		const router = useRouter();
		const route = useRoute();
		const conditionSearch = ref(null);
		const customerScreen = ref(null);
		const customerCreate = ref(null);
		const customerDetailsMain = ref(null);
		const user = computed(() => {
			return useUserStore().userInfo;
		});
		onMounted(() => {
			customerLibraryInit();
			dataMap.callBackRouter = route.query.callback;
			nextTick(() => {
				console.log(customerScreen);
				conditionSearch.value.setCondition(dataMap.filterData[0]);
				setCustomerScreen();
			});
			onSearchCustomer();
		});
		const customerLibraryInit = () => {
			if (user.value.pattern === 1) {
				dataMap.customerTypeList = [
					{
						text: "所有客户",
						value: 0
					},
					{
						text: "A/B/C类客户",
						value: 123
					},
					{
						text: "F类客户",
						value: 10
					},
					{
						text: "S类客户",
						value: 6
					},
					{
						text: "OPP会员",
						value: 5
					},
					{
						text: "会员客户",
						value: 4
					},
					{
						text: "公共库",
						value: 7
					},
					{
						text: "资源库",
						value: 8
					},
					{
						text: "临时库",
						value: 9
					}
				];
			} else {
				dataMap.customerTypeList = [
					{
						text: "所有客户",
						value: 0
					},
					{
						text: "公共库",
						value: 7
					},
					{
						text: "临时库",
						value: 9
					}
				];
			}
			dataMap.customerLibrary = dataMap.customerTypeList[0].value;
		};
		const setCustomerScreen = () => {
			customerScreen.value.dropDownValue = dataMap.customerLibrary;
			customerScreen.value.resetScreen();
		};
		const onSearchCustomer = async (form = {}) => {
			console.log(form);
			const _form = {
				lib: 0,
				page: 1,
				size: 10
			};
			const { data } = await apiMyCustomer(_form);
			if ([1020000, 1040400].includes(data.code)) {
				dataMap.customerDataList = data.content.content;
			}
		};
		// 返回上级路由
		const onClose = () => {
			router.push(dataMap.callBackRouter);
		};
		// 切换至过期客户
		const toExpired = () => {};
		const getSearchValue = data => {
			console.log(data);
		};
		// 创建客户
		const createCustomer = () => {
			console.log("创建");
			dataMap.customerStatus = "创建客户";
		};
		// 进入客户详情
		const intoCustomerDetails = item => {
			dataMap.customerStatus = "客户详情";
			nextTick(async () => {
				await customerDetailsMain.value.filterTabsData();
				customerDetailsMain.value.initComponents();
			});
		};
		return {
			...toRefs(dataMap),
			conditionSearch,
			customerScreen,
			customerCreate,
			customerDetailsMain,
			setCustomerScreen,
			onSearchCustomer,
			onClose,
			getSearchValue,
			toExpired,
			createCustomer,
			intoCustomerDetails
		};
	}
};
</script>

<style scoped lang="scss">
:deep(.van-dropdown-menu__title::after) {
	right: 0;
}

.nav_tab_title {
	position: relative;
	margin-right: 0.2rem;

	.notice_num {
		position: absolute;
		top: -0.1rem;
		right: -0.15rem;
		width: 0.3rem;
		height: 0.3rem;
		font-size: 0.1rem;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		background-color: #f90;
		line-height: 0.3rem;
	}
}
</style>
