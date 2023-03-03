<template>
	<div class="customer_tabs_content">
		<van-nav-bar title="参课记录">
			<template #left>
				<van-icon name="arrow-left" size="18" style="color: #000" @click="onClose" />
			</template>
		</van-nav-bar>
		<van-tabs v-model:active="activeTab" @click-tab="customerTabsItemInit">
			<van-tab v-for="item in tabsList" :key="item.key" :name="item.key" :title="item.name" />
		</van-tabs>
		<!--  opp  -->
		<opp-record ref="oppRecord" v-if="activeTab === 'oppRecord'" />
		<!--  大课  -->
		<lesson-record ref="lessonRecord" v-if="activeTab === 'lessonRecord'" />
		<!--  一推  -->
		<push-record ref="pushRecord" v-if="activeTab === 'pushRecord'" />
		<!--  大课（会员）  -->
		<lesson-member-record ref="lessonMemberRecord" v-if="activeTab === 'lessonMemberRecord'" />
		<!--  公开课（会员）  -->
		<open-member-record ref="openMemberRecord" v-if="activeTab === 'openMemberRecord'" />
		<!--  工具课  -->
		<tool-record ref="toolRecord" v-if="activeTab === 'toolRecord'" />
	</div>
</template>

<script>
import { computed, reactive, toRefs, ref, nextTick } from "vue";
import oppRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/oppRecord.vue";
import lessonRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/lessonRecord.vue";
import pushRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/pushRecord.vue";
import lessonMemberRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/lessonMemberRecord.vue";
import openMemberRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/openMemberRecord.vue";
import toolRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord/toolRecord.vue";
import { useUserStore } from "../../../../store/modules/user";
export default {
	name: "tabCourseRecord",
	components: { oppRecord, lessonRecord, pushRecord, lessonMemberRecord, openMemberRecord, toolRecord },
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
		const oppRecord = ref(null);
		const lessonRecord = ref(null);
		const pushRecord = ref(null);
		const lessonMemberRecord = ref(null);
		const openMemberRecord = ref(null);
		const toolRecord = ref(null);
		const permissions = computed(() => {
			return useUserStore().userInfo?.permissions;
		});
		// 初始化状态
		const initComponents = (params = {}) => {
			dataMap.params = { ...params };
			customerTabsItemInit({ ...props.tabsList[0], name: props.tabsList[0].key });
		};
		const customerTabsItemInit = event => {
			console.log(event);
			console.log(event.name);
			dataMap.activeTab = event.name;
			switch (dataMap.activeTab) {
				case "oppRecord": // opp
					nextTick(() => {
						oppRecord.value.initComponents(dataMap.params);
					});
					break;
				case "lessonRecord": // 大课
					nextTick(() => {
						lessonRecord.value.initComponents(dataMap.params);
					});
					break;
				case "pushRecord": // 一推
					nextTick(() => {
						pushRecord.value.initComponents(dataMap.params);
					});
					break;
				case "lessonMemberRecord": // 大课（会员）
					nextTick(() => {
						lessonMemberRecord.value.initComponents(dataMap.params);
					});
					break;
				case "openMemberRecord": // 公开课（会员）
					nextTick(() => {
						openMemberRecord.value.initComponents(dataMap.params);
					});
					break;
				case "toolRecord": // 工具课
					nextTick(() => {
						toolRecord.value.initComponents(dataMap.params);
					});
					break;
			}
		};
		const onClose = () => {
			emit("setIsMainStatus", "主页");
		};
		return {
			...toRefs(dataMap),
			oppRecord,
			lessonRecord,
			pushRecord,
			lessonMemberRecord,
			openMemberRecord,
			toolRecord,
			permissions,
			customerTabsItemInit,
			initComponents,
			onClose
		};
	}
};
</script>
