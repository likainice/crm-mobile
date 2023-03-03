<template>
	<van-nav-bar title="订单记录">
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
		>
			{{ item.name }}
		</span>
	</div>
	<!-- 订单记录 -->
	<order-record ref="orderRecord" v-if="activeTab === 'orderRecord'" />
</template>

<script>
import { computed, reactive, toRefs, ref, nextTick } from "vue";
import { useUserStore } from "@/store/modules/user";
import orderRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabOrderRecord/orderRecord.vue";
export default {
	name: "tabOrderRecord",
	components: { orderRecord },
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
		const orderRecord = ref(null);
		const permissions = computed(() => {
			return useUserStore().userInfo?.permissions;
		});
		// 初始化状态
		const initComponents = (params = {}) => {
			dataMap.params = { ...params };
			customerTabsItemInit(props.tabsList[0]);
		};
		const customerTabsItemInit = item => {
			dataMap.activeTab = item.key;
			switch (dataMap.activeTab) {
				case "orderRecord":
					nextTick(() => {
						orderRecord.value.initComponents(dataMap.params);
					});
					break;
			}
		};
		const onClose = () => {
			emit("setIsMainStatus", "主页");
		};
		return {
			...toRefs(dataMap),
			orderRecord,
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
