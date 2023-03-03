<template>
	<div class="customer_details_main" v-show="isMainStatus === '主页'">
		<van-nav-bar title="客户详情">
			<template #left>
				<van-icon name="arrow-left" size="18" style="color: #000" @click="onClose" />
			</template>
			<template #right>
				<van-icon style="color: #000" name="ellipsis" @click="operationShow = true" />
			</template>
		</van-nav-bar>
		<van-popup v-model:show="operationShow" position="right" :style="{ height: '100%', width: '50%' }">
			<ul class="filter_list">
				<li v-for="(item, index) in operationData" :key="index" @click="operationProcess(item)">{{ item.text }}</li>
			</ul>
		</van-popup>
		<div class="customer_header">客户详情头部数据展示</div>
		<div class="customer_options_hide">
			<van-collapse v-model="hideTabs">
				<van-collapse-item name="tabsHide">
					<div class="customer_remake">
						<div class="customer_remake_item">
							<span>{{ 1 }}</span>
							<span>终极产品</span>
						</div>
						<div class="customer_remake_item">
							<span>{{ 1 }}</span>
							<span>总消费额</span>
						</div>
						<div class="customer_remake_item">
							<span>{{ 1 }}次</span>
							<span>参课次数</span>
						</div>
						<div class="customer_remake_item">
							<span>{{ 1 }}次</span>
							<span>上门次数</span>
						</div>
					</div>
					<div
						class="customer_options_other"
						v-if="
							[
								'AUTH2_UI_CUSTOMER_LEARNING_INFORMATION',
								'AUTH2_UI_CUSTOMER_ORDER_INFORMATION',
								'AUTH2_UI_CUSTOMER_SERVICE_INFORMATION',
								'AUTH2_UI_CUSTOMER_HISTORY_INFORMATION'
							].some(it => permissions.includes(it))
						"
					>
						<div
							class="customer_options_other_item"
							v-if="permissions.includes('AUTH2_UI_CUSTOMER_LEARNING_INFORMATION')"
							@click="tabOtherDetails('courseRecord')"
						>
							<svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
								<use xlink:href="#icon-renzheng"></use>
							</svg>
							<span>参课记录</span>
						</div>
						<div
							class="customer_options_other_item"
							v-if="permissions.includes('AUTH2_UI_CUSTOMER_ORDER_INFORMATION')"
							@click="tabOtherDetails('orderRecord')"
						>
							<svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
								<use xlink:href="#icon-dingdan"></use>
							</svg>
							<span>订单记录</span>
						</div>
						<div
							class="customer_options_other_item"
							v-if="permissions.includes('AUTH2_UI_CUSTOMER_SERVICE_INFORMATION')"
							@click="tabOtherDetails('serviceQuota')"
						>
							<svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
								<use xlink:href="#icon-quanxian"></use>
							</svg>
							<span>服务名额</span>
						</div>
						<div
							class="customer_options_other_item"
							v-if="permissions.includes('AUTH2_UI_CUSTOMER_HISTORY_INFORMATION')"
							@click="tabOtherDetails('customerHistory')"
						>
							<svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
								<use xlink:href="#icon-lishijilu"></use>
							</svg>
							<span>客户历史</span>
						</div>
					</div>
				</van-collapse-item>
			</van-collapse>
			<svg
				class="icon show_hide_toggle"
				aria-hidden="true"
				style="font-size: 0.6rem"
				@click="hideTabs[0] === 'tabsHide' ? (hideTabs = []) : (hideTabs = ['tabsHide'])"
			>
				<use :xlink:href="hideTabs[0] === 'tabsHide' ? '#icon-shouqi-copy ' : '#icon-zhankai'"></use>
			</svg>
		</div>
		<div class="customer_options_show">
			<van-tabs v-model:active="activeTabs" @click-tab="onClickTab">
				<van-tab title="客户资料" name="customerInformation">
					<tab-customer-information ref="tabCustomerInformation" :tabsList="initTabsData.customerInformation" />
				</van-tab>
				<van-tab title="联系人" name="linkMan">
					<tab-link-man ref="tabLinkMan" :tabsList="initTabsData.linkMan" />
				</van-tab>
				<van-tab title="跟踪记录" name="trackingRecord">
					<tab-tracking-record ref="tabTrackingRecord" :tabsList="initTabsData.trackingRecord" />
				</van-tab>
				<van-tab title="课上资料" name="classroomMaterials">
					<tab-classroom-materials ref="tabClassroomMaterials" :tabsList="initTabsData.classroomMaterials" />
				</van-tab>
				<van-tab title="交流讨论" name="communicateDiscuss">
					<tab-communicate-discuss ref="tabCommunicateDiscuss" :tabsList="initTabsData.communicateDiscuss" />
				</van-tab>
			</van-tabs>
		</div>
	</div>
	<!-- 参课记录 -->
	<tab-course-record
		ref="tabCourseRecord"
		:tabsList="initTabsData.courseRecord"
		v-if="isMainStatus === 'courseRecord'"
		@setIsMainStatus="tabOtherDetails"
	/>
	<!-- 订单记录 -->
	<tab-order-record
		ref="tabOrderRecord"
		:tabsList="initTabsData.orderRecord"
		v-if="isMainStatus === 'orderRecord'"
		@setIsMainStatus="tabOtherDetails"
	/>
	<!-- 服务名额 -->
	<tab-service-quota
		ref="tabServiceQuota"
		:tabsList="initTabsData.serviceQuota"
		v-if="isMainStatus === 'serviceQuota'"
		@setIsMainStatus="tabOtherDetails"
	/>
	<!-- 客户历史 -->
	<tab-customer-history
		ref="tabCustomerHistory"
		:tabsList="initTabsData.customerHistory"
		v-if="isMainStatus === 'customerHistory'"
		@setIsMainStatus="tabOtherDetails"
	/>
</template>

<script>
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from "vue";
import tabCustomerInformation from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerInformation.vue";
import tabLinkMan from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabLinkMan.vue";
import tabTrackingRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabTrackingRecord.vue";
import tabClassroomMaterials from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabClassroomMaterials.vue";
import tabCommunicateDiscuss from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCommunicateDiscuss.vue";
import tabCourseRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCourseRecord.vue";
import tabOrderRecord from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabOrderRecord.vue";
import tabServiceQuota from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabServiceQuota.vue";
import tabCustomerHistory from "@/components/customerComponents/customerDetails/customerDetailsComponents/tabCustomerHistory.vue";
import { useUserStore } from "../../../store/modules/user";

export default {
	name: "customerDetailsMain",
	components: {
		tabCustomerInformation,
		tabLinkMan,
		tabTrackingRecord,
		tabClassroomMaterials,
		tabCommunicateDiscuss,
		tabCourseRecord,
		tabOrderRecord,
		tabServiceQuota,
		tabCustomerHistory
	},
	emits: ["onClose"],
	props: {},
	setup(props, { emit }) {
		const {
			appContext: {
				config: { globalProperties: global }
			}
		} = getCurrentInstance(); // 全局函数引入 getCurrentInstance
		const dataMap = reactive({
			params: {},
			isMainStatus: "主页", // 主页，编辑客户详情，其他模块
			operationShow: false,
			hideTabs: ["tabsHide"],
			activeTabs: "",
			operationData: [
				{ text: "编辑客户", value: "update_customer", permissions: "" },
				{ text: "移动", value: "move", permissions: "" },
				{ text: "归属", value: "ascription", permissions: "" },
				{ text: "转公共库", value: "publicLibrary", permissions: "" },
				{ text: "授权终身老师", value: "lifelongTeacher", permissions: "" },
				{ text: "授权客户经理", value: "accountManager", permissions: "" }
			],
			tabsData: {
				// 客户资料
				customerInformation: [
					{ key: "basicInformation", name: "基本信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_BASICS" },
					{ key: "businessInformation", name: "工商信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_TIANYAN" },
					{ key: "invoiceInformation", name: "发票信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_INVOICE" },
					{ key: "bankAccount", name: "银行账号", code: "AUTH2_UI_CUSTOMER_INFORMATION_BANK" },
					{ key: "privacyInformation", name: "隐私信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_PRIVACY" },
					{ key: "ascriptionInformation", name: "归属信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_BELONGTO" }
				],
				// 联系人
				linkMan: [{ key: "linkMan", name: "联系人", code: "AUTH2_UI_CUSTOMER_STUDENT_INFORMATION_BASICS" }],
				// 跟踪记录
				trackingRecord: [
					{ key: "visitsRecord", name: "上门记录", code: "AUTH2_UI_CUSTOMER_TRACK_INFORMATION_VISIT" },
					{ key: "followRecord", name: "跟进记录", code: "AUTH2_UI_CUSTOMER_TRACK_INFORMATION_FOLLOW-UP" },
					{ key: "microRecord", name: "微课记录", code: "AUTH2_UI_CUSTOMER_TRACK_INFORMATION_WK" },
					{ key: "phoneRecord", name: "通话记录", code: "AUTH2_UI_CUSTOMER_TRACK_INFORMATION_CALL" }
				],
				// 参课记录
				courseRecord: [
					{ key: "oppRecord", name: "OPP", code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_OPP" },
					{ key: "lessonRecord", name: "大课", code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_REAR-END" },
					{ key: "pushRecord", name: "一推", code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_YITUI" },
					{
						key: "lessonMemberRecord",
						name: "大课（会员）",
						code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_MEMBER_REAR-END"
					},
					{
						key: "openMemberRecord",
						name: "公开课（会员）",
						code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_MEMBER_PUBLIC"
					},
					{ key: "toolRecord", name: "工具课", code: "AUTH2_UI_CUSTOMER_LEARNING_INFORMATION_MEMBER_OPP" }
				],
				// 订单记录
				orderRecord: [{ key: "orderRecord", name: "订单记录", code: "AUTH2_UI_CUSTOMER_ORDER_INFORMATION_BASICS" }],
				// 课上资料
				classroomMaterials: [
					{
						key: "teacherAnalysis",
						name: "老师分析单",
						type: 1,
						sourceType: 1,
						code: "AUTH2_UI_CUSTOMER_COURSE_INFORMATION_TEACHER"
					},
					{
						key: "taxConsulting",
						name: "财税咨询表",
						type: 2,
						sourceType: 1,
						code: "AUTH2_UI_CUSTOMER_COURSE_INFORMATION_FINANCE"
					},
					{
						key: "channelAnalysis",
						name: "渠道分析单",
						type: 3,
						sourceType: 1,
						code: "AUTH2_UI_CUSTOMER_COURSE_INFORMATION_CHANNEL"
					}
				],
				// 交流讨论
				communicateDiscuss: [
					{ key: "communicateDiscuss", name: "交流讨论", code: "AUTH2_UI_CUSTOMER_COMMUNICATE_INFORMATION_BASICS" }
				],
				// 服务名额
				serviceQuota: [{ key: "serviceQuota", name: "服务名额", code: "AUTH2_UI_CUSTOMER_SERVICE_INFORMATION_BASICS" }],
				// 客户历史
				customerHistory: [
					{ key: "customerHistory", name: "客户历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_COMPANY_CHANGE" },
					{ key: "orderHistory", name: "订单历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_ORDER_CHANGE" },
					{ key: "weChatHistory", name: "微信历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_WECHAT_CHANGE" },
					{
						key: "studentReplacementHistory",
						name: "学员替换历史",
						code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_STUBENT_REPLACE"
					},
					{
						key: "weComHistory",
						name: "企业微信历史",
						code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_ENTERPRISE_WECHAT_BINDING"
					},
					{ key: "examinationHistory", name: "天眼查历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_TIANYAN" },
					{ key: "powerHistory", name: "授权历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_AUTHORIZE" },
					{ key: "verifyTruthHistory", name: "验真历史", code: "AUTH2_UI_CUSTOMER_HISTORY_INFORMATION_VERIFY_TRUTH" }
				]
			}, // tabs标签
			initTabsData: {} // 过滤后的tabs标签数据
		});
		const tabCustomerInformation = ref(null);
		const tabLinkMan = ref(null);
		const tabTrackingRecord = ref(null);
		const tabClassroomMaterials = ref(null);
		const tabCommunicateDiscuss = ref(null);
		const tabCourseRecord = ref(null);
		const tabOrderRecord = ref(null);
		const tabServiceQuota = ref(null);
		const tabCustomerHistory = ref(null);
		const permissions = computed(() => {
			return useUserStore().userInfo?.permissions;
		});
		onMounted(() => {
			global.permissionCode();
		});
		// 初始化tabs数据
		const filterTabsData = () => {
			dataMap.initTabsData = { ...dataMap.tabsData };
		};
		// 过滤对客户的操作权限
		const operationDataInit = computed(() => {
			return dataMap.operationData.filter(res => {
				res.permissions.some(it => permissions.value.includes(it));
				// return permissions.value.includes(res.value)
			});
		});
		// 操作选项执行
		const operationProcess = item => {
			console.log(item);
			dataMap.operationShow = false;
		};
		const onClickTab = item => {
			console.log(item);
			dataMap.activeTabs = item.name;
			switch (dataMap.activeTabs) {
				case "customerInformation": // 客户资料
					nextTick(() => {
						tabCustomerInformation.value.initComponents(dataMap.params);
					});
					break;
				case "linkMan": // 联系人
					nextTick(() => {
						tabLinkMan.value.initComponents(dataMap.params);
					});
					break;
				case "trackingRecord": // 跟踪记录
					nextTick(() => {
						tabTrackingRecord.value.initComponents(dataMap.params);
					});
					break;
				case "classroomMaterials": // 课上资料
					nextTick(() => {
						tabClassroomMaterials.value.initComponents(dataMap.params);
					});
					break;
				case "communicateDiscuss": // 交流讨论
					nextTick(() => {
						tabCommunicateDiscuss.value.initComponents(dataMap.params);
					});
					break;
			}
		};
		const initComponents = (params = {}) => {
			dataMap.params = params;
			let name = "";
			if (permissions.value.includes("AUTH2_UI_CUSTOMER_INFORMATION") && dataMap.initTabsData.customerInformation) {
				// 客户资料
				name = "customerInformation";
			} else if (permissions.value.includes("AUTH2_UI_CUSTOMER_STUDENT_INFORMATION") && dataMap.initTabsData.linkMan) {
				// 联系人
				name = "linkMan";
			} else if (permissions.value.includes("AUTH2_UI_CUSTOMER_TRACK_INFORMATION") && dataMap.initTabsData.trackingRecord) {
				// 跟踪记录
				name = "trackingRecord";
			} else if (permissions.value.includes("AUTH2_UI_CUSTOMER_COURSE_INFORMATION") && dataMap.initTabsData.classroomMaterials) {
				// 课上资料
				name = "classroomMaterials";
			} else if (
				permissions.value.includes("AUTH2_UI_CUSTOMER_COMMUNICATE_INFORMATION") &&
				dataMap.initTabsData.communicateDiscuss
			) {
				// 交流讨论
				name = "communicateDiscuss";
			}
			onClickTab({ name });
		};
		// 查看其他模块
		const tabOtherDetails = tabOtherKey => {
			dataMap.isMainStatus = tabOtherKey;
			switch (tabOtherKey) {
				case "courseRecord":
					nextTick(() => {
						tabCourseRecord.value.initComponents(dataMap.params);
					});
					break;
				case "orderRecord":
					nextTick(() => {
						tabOrderRecord.value.initComponents(dataMap.params);
					});
					break;
				case "serviceQuota":
					nextTick(() => {
						tabServiceQuota.value.initComponents(dataMap.params);
					});
					break;
				case "customerHistory":
					nextTick(() => {
						tabCustomerHistory.value.initComponents(dataMap.params);
					});
					break;
			}
		};
		// 关闭详情
		const onClose = () => {
			emit("onClose");
		};
		return {
			...toRefs(dataMap),
			permissions,
			operationDataInit,
			tabCustomerInformation,
			tabLinkMan,
			tabTrackingRecord,
			tabClassroomMaterials,
			tabCommunicateDiscuss,
			tabCourseRecord,
			tabOrderRecord,
			tabServiceQuota,
			tabCustomerHistory,
			initComponents,
			onClickTab,
			tabOtherDetails,
			filterTabsData,
			operationProcess,
			onClose
		};
	}
};
</script>
<style lang="scss" scoped>
.filter_list {
	margin-top: 0.2rem;

	li {
		margin: 0.2rem 0.15rem;
		height: 0.6rem;
		border-radius: 0.1rem;
		color: #2f2c2c;
		background-color: #fff;
		line-height: 0.6rem;
	}
}

.customer_header {
	margin: 0.2rem auto;
}

.customer_options_hide {
	margin: 0.2rem auto;

	:deep(.van-collapse-item__title) {
		display: none;
	}

	.van-hairline--top-bottom {
		position: static;
	}

	.customer_remake {
		display: flex;
		text-align: center;
		flex-wrap: nowrap;

		.customer_remake_item {
			width: 25%;

			span {
				display: block;
			}

			span:first-of-type {
				font-weight: 600;
				color: #000;
			}
		}
	}

	.customer_options_other {
		display: flex;
		margin: 0.2rem auto 0;
		padding: 0.2rem 0;
		border-radius: 0.1rem;
		text-align: center;
		box-shadow: 0 0 4px 2px #ccc;
		flex-wrap: wrap;

		.customer_options_other_item {
			display: flex;
			justify-content: center;
			width: 25%;
			flex-wrap: wrap;

			span {
				display: block;
				width: 100%;
			}
		}
	}

	.show_hide_toggle {
		margin-left: 50%;
		transform: translateX(-50%);
	}
}
</style>
<style lang="scss">
.van-tabs__line {
	background-color: #09f;
}
</style>
