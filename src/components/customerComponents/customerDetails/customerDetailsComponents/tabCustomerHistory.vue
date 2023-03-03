<template>
	<van-nav-bar title="客户历史">
		<template #left>
			<van-icon name="arrow-left" size="18" style="color: #000" @click="onClose" />
		</template>
	</van-nav-bar>
	<div class="customer_tabs_content">
		<span
			v-for="item in tabsList"
			:key="item.key"
			class="customer-tabs"
			@click="customerTabsItemInit(item)"
			:class="{ 'active-customer-tab': activeTab === item.key }"
			>{{ item.name }}</span
		>
	</div>
	<!-- 客户历史 -->
	<customer-history ref="customerHistory" v-if="activeTab === 'customerHistory'" />
	<!-- 订单历史 -->
	<order-history ref="orderHistory" v-if="activeTab === 'orderHistory'" />
	<!-- 微信历史 -->
	<we-chat-history ref="weChatHistory" v-if="activeTab === 'weChatHistory'" />
	<!-- 学员替换历史 -->
	<student-replacement-history ref="studentReplacementHistory" v-if="activeTab === 'studentReplacementHistory'" />
	<!-- 企业微信历史 -->
	<we-com-history ref="weComHistory" v-if="activeTab === 'weComHistory'" />
	<!-- 天眼查历史 -->
	<examination-history ref="examinationHistory" v-if="activeTab === 'examinationHistory'" />
	<!-- 授权历史 -->
	<power-history ref="powerHistory" v-if="activeTab === 'powerHistory'" />
	<!-- 验真历史 -->
	<verify-truth-history ref="verifyTruthHistory" v-if="activeTab === 'verifyTruthHistory'" />
</template>
<script>
import { computed, reactive, toRefs, ref, nextTick } from "vue";
import { useUserStore } from "@/store/modules/user";
import customerHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/customerHistory.vue";
import orderHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/orderHistory.vue";
import weChatHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/weChatHistory.vue";
import studentReplacementHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/studentReplacementHistory.vue";
import weComHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/weComHistory.vue";
import examinationHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/examinationHistory.vue";
import powerHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/powerHistory.vue";
import verifyTruthHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory/verifyTruthHistory.vue";

export default {
	name: "tabCustomerHistory",
	components: {
		customerHistory,
		orderHistory,
		weChatHistory,
		studentReplacementHistory,
		weComHistory,
		examinationHistory,
		powerHistory,
		verifyTruthHistory
	},
	emits: ["setIsMainStatus"],
	props: {
		// tabs列表
		tabsList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup(props, { emit }) {
		const dataMap = reactive({
			params: {}, // 父组件传递的参数
			activeTab: "" // 当前选中的tab
		});
		const customerHistory = ref(null);
		const orderHistory = ref(null);
		const weChatHistory = ref(null);
		const studentReplacementHistory = ref(null);
		const weComHistory = ref(null);
		const examinationHistory = ref(null);
		const powerHistory = ref(null);
		const verifyTruthHistory = ref(null);
		const permissions = computed(() => {
			return useUserStore().userInfo?.permissions;
		});
		// 初始化状态
		const initComponents = (params = {}) => {
			dataMap.params = { ...params };
			customerTabsItemInit(props.tabsList[0]);
		};
		const customerTabsItemInit = item => {
			console.log(item);
			dataMap.activeTab = item.key;
			switch (dataMap.activeTab) {
				case "customerHistory": // 客户历史
					nextTick(() => {
						customerHistory.value.initComponents(dataMap.params);
					});
					break;
				case "orderHistory": // 订单历史
					nextTick(() => {
						orderHistory.value.initComponents(dataMap.params);
					});
					break;
				case "weChatHistory": // 微信历史
					nextTick(() => {
						weChatHistory.value.initComponents(dataMap.params);
					});
					break;
				case "studentReplacementHistory": // 学员替换历史
					nextTick(() => {
						studentReplacementHistory.value.initComponents(dataMap.params);
					});
					break;
				case "weComHistory": // 企业微信历史
					nextTick(() => {
						weComHistory.value.initComponents(dataMap.params);
					});
					break;
				case "examinationHistory": // 天眼查历史
					nextTick(() => {
						examinationHistory.value.initComponents(dataMap.params);
					});
					break;
				case "powerHistory": // 授权历史
					nextTick(() => {
						powerHistory.value.initComponents(dataMap.params);
					});
					break;
				case "verifyTruthHistory": // 验真历史
					nextTick(() => {
						verifyTruthHistory.value.initComponents(dataMap.params);
					});
					break;
			}
		};
		const onClose = () => {
			emit("setIsMainStatus", "主页");
		};
		return {
			...toRefs(dataMap),
			customerHistory,
			orderHistory,
			weChatHistory,
			studentReplacementHistory,
			weComHistory,
			examinationHistory,
			powerHistory,
			verifyTruthHistory,
			permissions,
			customerTabsItemInit,
			initComponents,
			onClose
		};
	}
};
</script>
<style lang="scss" scoped>
.customer_tabs_content {
	display: flex;
	margin: 0 auto;
	flex-wrap: wrap;

	.customer-tabs {
		display: inline-block;
		margin: 0.05rem;
		padding: 0.16rem;
		width: 19%;
		font-size: 0.2rem;
		border-radius: 0.1rem;
		text-align: center;
		background-color: #e4e0e091;
		cursor: pointer;
	}

	.active-customer-tab {
		border-color: #b3d8ff;
		color: #409eff;
		background-color: #ecf5ff;
	}
}
</style>
