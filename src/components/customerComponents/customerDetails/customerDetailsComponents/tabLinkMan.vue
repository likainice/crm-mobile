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
		<!--  联系人  -->
		<link-man ref="linkMan" v-if="activeTab === 'linkMan'" />
	</div>
</template>
<script>
import { computed, reactive, toRefs, ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import linkMan from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabLinkMan/linkMan.vue";

export default {
	name: "tabLinkMan",
	components: { linkMan },
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
		const linkMan = ref(null);
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
			linkMan,
			permissions,
			customerTabsItemInit,
			initComponents
		};
	}
};
</script>
<style lang="scss" scoped>
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
