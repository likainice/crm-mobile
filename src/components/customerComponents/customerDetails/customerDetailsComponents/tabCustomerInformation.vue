<template>
	<div class="customer_tabs_content">
		<van-swipe :loop="false" :width="100">
			<van-swipe-item v-for="item in tabsList" :key="item.key">
				<span
					class="customer-tabs"
					@click="customerTabsItemInit(item)"
					:class="{ 'active-customer-tab': activeTab === item.key }"
					>{{ item.name }}</span
				>
			</van-swipe-item>
		</van-swipe>
		<!--  基本信息  -->
		<basic-information ref="basicInformation" v-if="activeTab === 'basicInformation'" />
		<!--  工商信息  -->
		<business-information ref="businessInformation" v-if="activeTab === 'businessInformation'" />
		<!--  发票信息  -->
		<invoice-information ref="invoiceInformation" v-if="activeTab === 'invoiceInformation'" />
		<!--  银行账号  -->
		<bank-account ref="bankAccount" v-if="activeTab === 'bankAccount'" />
		<!--  隐私信息  -->
		<privacy-information ref="privacyInformation" v-if="activeTab === 'privacyInformation'" />
		<!--  归属信息  -->
		<ascription-information ref="ascriptionInformation" v-if="activeTab === 'ascriptionInformation'" />
	</div>
</template>

<script>
import { reactive, toRefs, ref, computed } from "vue";
import basicInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/basicInformation.vue";
import businessInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/businessInformation.vue";
import invoiceInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/invoiceInformation.vue";
import bankAccount from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/bankAccount.vue";
import ascriptionInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/ascriptionInformation.vue";
import privacyInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation/privacyInformation.vue";
import { useUserStore } from "@/store/modules/user";

export default {
	name: "tabCustomerInformation",
	components: {
		basicInformation,
		businessInformation,
		invoiceInformation,
		bankAccount,
		privacyInformation,
		ascriptionInformation
	},
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
		const basicInformation = ref(null);
		const businessInformation = ref(null);
		const invoiceInformation = ref(null);
		const bankAccount = ref(null);
		const privacyInformation = ref(null);
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
		};
		return {
			...toRefs(dataMap),
			basicInformation,
			businessInformation,
			invoiceInformation,
			bankAccount,
			privacyInformation,
			ascriptionInformation,
			permissions,
			initComponents,
			customerTabsItemInit
		};
	}
};
</script>

<style scoped lang="scss">
.customer_tabs_content {
	.customer-tabs {
		display: inline-block;
		margin: 0.2rem;
		padding: 0.15rem 0.25rem;
		font-size: 0.2rem;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		text-align: center;
		cursor: pointer;
	}

	.active-customer-tab {
		border-color: #b3d8ff;
		color: #409eff;
		background-color: #ecf5ff;
	}

	:deep(.van-swipe__indicators) {
		display: none;
	}
}
</style>
