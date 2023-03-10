<template>
	<HeaderBack>
		<template #title>
			<van-dropdown-menu>
				<van-dropdown-item @change="onChangeCustomer" v-model="customerValue" :options="customerList" />
			</van-dropdown-menu>
		</template>
		<template #right>
			<van-space size="1.3em">
				<van-badge :content="expiredNum" max="99" color="orange">
					<router-link to="/customer/past" style="color: #333">过期</router-link>
				</van-badge>
				<van-icon name="plus" size="1.6em" style="color: #666" @click="onAdd" />
			</van-space>
		</template>
	</HeaderBack>
	<!-- 条件筛选-搜索框 -->
	<SearchFilter placeholder="请输入客户公司名称" />
	<!-- 条件筛选-多选 -->
	<SearchSelect
		v-model:sort="sortValue"
		v-model:filter="filterValue"
		v-model:showCheck="showCheck"
		:filterOptions="filterOptions"
	/>
	<!--多选列表-->
	<PageList :loading="loading" :finished="finished" @load="onLoad" :disabled="showCheck">
		<CheckList v-model:showCheck="showCheck" :data-source="list" />
	</PageList>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CheckList from "./components/checkList.vue";
import SearchSelect from "@/components/SearchFilter/SearchSelect.vue";
import { apiMyCustomer } from "@/api/customer/index";
import routers from "@/routers";

const customerList = ref([
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
]);
const customerValue = ref(0);
const expiredNum = ref(11);

const filterOptions = ref([
	{
		type: 1,
		text: "库类型",
		value: 11,
		children: [
			{ value: 1, text: "  A类" },
			{ value: 2, text: "  B类" },
			{ value: 3, text: "  C类" }
		]
	},
	{
		type: 2,
		text: "客户标签",
		value: 12,
		children: [
			{ value: 1, text: "  A类" },
			{ value: 2, text: "  B类" },
			{ value: 3, text: "  C类" }
		]
	},
	{
		type: 3,
		text: "审核状态",
		value: 33,
		children: [
			{ value: 1, text: "待审批" },
			{ value: 2, text: "审批通过（总部）" },
			{ value: 3, text: "审批通过（分公司）" },
			{ value: 4, text: "审批通过" },
			{ value: 5, text: "审批驳回（总部）" },
			{ value: 6, text: "审批驳回（分公司）" }
		]
	}
]);

const sortValue = ref();
const filterValue = ref(null);
const showCheck = ref(false);
const list = ref([]);
const loading = ref(true);
const finished = ref(false);
const page = ref(1);
onMounted(() => {
	getList();
});
const onAdd = () => {
	routers.push("/customer/add");
};
const onChangeCustomer = val => {
	console.log(val);
};
const getList = async () => {
	loading.value = true;
	const _form = {
		lib: 0,
		page: page.value,
		size: 10
	};
	const { data } = await apiMyCustomer(_form);
	const { content } = data;
	// if (page.value == 3) content.content = [];
	list.value = [...list.value, ...content.content];
	finished.value = content.content?.length === 0;
	page.value++;
	loading.value = false;
};
const onLoad = ({ refresh }) => {
	if (refresh) {
		page.value = 1;
		list.value = [];
		finished.value = false;
	}
	getList();
};
</script>

<style scoped lang="scss">
:deep(.van-dropdown-menu) {
	padding: 0 30px;
	.van-dropdown-menu__title {
		.van-ellipsis {
			font-size: var(--van-nav-bar-title-font-size);
		}
	}
}
</style>
