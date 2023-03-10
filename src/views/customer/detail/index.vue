<template>
	<HeaderBack>
		<template #right>
			<van-popover
				v-model:show="showPopover"
				placement="bottom-end"
				:offset="[12, 8]"
				:actions="actions"
				:show-arrow="false"
				@select="onSelect"
			>
				<template #reference>
					<van-icon name="more-o" size="1.3em" color="#333" />
				</template>
			</van-popover>
		</template>
	</HeaderBack>
	<van-card thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
		<template #title>
			<div>北京金财时代教育有限公司</div>
		</template>
		<template #tags>
			<van-tag plain type="primary">标签</van-tag>
			<van-tag plain type="primary">标签</van-tag>
		</template>
	</van-card>

	<van-collapse v-model="activeName" accordion :border="false">
		<van-collapse-item :name="1">
			<van-grid :border="false">
				<van-grid-item>
					<template #icon>1</template>
					<template #text>终极产品</template>
				</van-grid-item>
				<van-grid-item>
					<template #icon>2</template>
					<template #text>总消费额</template>
				</van-grid-item>
				<van-grid-item>
					<template #icon>3次</template>
					<template #text>参课次数</template>
				</van-grid-item>
				<van-grid-item>
					<template #icon>4次</template>
					<template #text>上门次数</template>
				</van-grid-item>
			</van-grid>

			<div class="module">
				<PageModuleList :data-source="menuList" background-round />
			</div>
		</van-collapse-item>
	</van-collapse>
	<SvgIcon
		size="2.5em"
		:name="activeName === 1 ? 'icon-zhankai' : 'icon-shouqi-copy'"
		@click="activeName === 1 ? (activeName = 2) : (activeName = 1)"
		style="display: block; margin: 0 auto"
	/>

	<div>
		<van-tabs v-model:active="activeTabs" @click-tab="onClickTab">
			<van-tab title="客户资料" name="customerInformation"></van-tab>
			<van-tab title="联系人" name="linkMan"></van-tab>
			<van-tab title="跟踪记录" name="trackingRecord"></van-tab>
			<van-tab title="课上资料" name="classroomMaterials"></van-tab>
			<van-tab title="交流讨论" name="communicateDiscuss"></van-tab>
		</van-tabs>
	</div>
	<!--	<van-swipe :loop="false" :width="100">-->
	<!--		<van-swipe-item v-for="item in tabsList" :key="item.key">-->
	<!--			<span class="customer-tabs">{{ item.name }}</span>-->
	<!--		</van-swipe-item>-->
	<!--	</van-swipe>-->
	<van-swipe class="my-swipe" :loop="false" :show-indicators="false" :width="50">
		<van-swipe-item v-for="item in 20" :key="item">
			<van-button>{{ item }}</van-button>
		</van-swipe-item>
	</van-swipe>
</template>

<script lang="ts" setup>
import PageModuleList from "@/components/PageModuleList/index.vue";
import { ref } from "vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

const menuList = [
	{
		iconClass: "icon-renzheng",
		navText: "参课记录",
		router: "/",
		permissions: []
	},
	{
		iconClass: "icon-dingdan",
		navText: "订单记录",
		router: "/feedback",
		permissions: []
	},
	{
		iconClass: "icon-quanxian",
		navText: "服务名额",
		router: "/notify",
		permissions: []
	},
	{
		iconClass: "icon-lishijilu",
		navText: "客户历史",
		router: "/notify",
		permissions: []
	}
];
const activeName = ref(1);
const activeTabs = ref("");
const tabsList = [
	{ key: "basicInformation", name: "基本信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_BASICS" },
	{ key: "businessInformation", name: "工商信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_TIANYAN" },
	{ key: "invoiceInformation", name: "发票信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_INVOICE" },
	{ key: "bankAccount", name: "银行账号", code: "AUTH2_UI_CUSTOMER_INFORMATION_BANK" },
	{ key: "privacyInformation", name: "隐私信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_PRIVACY" },
	{ key: "ascriptionInformation", name: "归属信息", code: "AUTH2_UI_CUSTOMER_INFORMATION_BELONGTO" }
];
const onClickTab = () => {};

const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const actions = [
	{ text: "编辑客户", value: 1 },
	{ text: "移动", value: 2 },
	{ text: "归属", value: 3 },
	{ text: "转公共库", value: 4 },
	{ text: "授权终身老师", value: 5 },
	{ text: "授权客户经理", value: 6 }
];
const onSelect = action => {
	console.log(action);
};
</script>
<style scoped lang="scss">
.module {
	padding: 0 36px;
	margin: 20px 0 0;
	border-radius: 16px;
	box-shadow: 1px 1px 20px 1px #ccc;

	.pageModuleList {
		padding: 0;
	}
}

.my-swipe {
	padding: 100px 0;

	:deep(.van-swipe-item) {
		//width: 100px !important;
	}
}

.van-card {
	background: transparent;
}

:deep(.van-collapse-item) {
	.van-collapse-item__title {
		display: none;
	}
}
</style>
