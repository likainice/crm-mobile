<template>
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
	</van-nav-bar>
	<!-- 关键字搜索 -->
	<condition-search ref="conditionSearch" @getSearchValue="getSearchValue" />
</template>
<script>
import { computed, nextTick, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import conditionSearch from "@/components/public/conditionSearch";
import { useUserStore } from "@/store/modules/user";

export default {
	name: "publicLibrary",
	components: { conditionSearch },
	setup() {
		const dataMap = reactive({
			callBackRouter: "",
			customerLibrary: "",
			customerTypeList: [{ text: "分公司(公共库)", value: 1 }]
		});
		const router = useRouter();
		const route = useRoute();
		const conditionSearch = ref(null);
		const user = computed(() => {
			return useUserStore().userInfo;
		});
		const permissions = computed(() => {
			return _usePhoneBookStore.permissions;
		});
		onMounted(() => {
			dataMap.callBackRouter = route.query.callback;
			dataMap.customerLibrary = dataMap.customerTypeList[0].value;
			customerTypeListInit();
			nextTick(() => {
				setCustomerScreen();
			});
		});
		const customerTypeListInit = () => {
			if (user.value.pattern === 1) {
				if ([12, 16].includes(user.value.ingroupid) || permissions.value.includes("AUTH2_COURSE_ALL_SCOPE")) {
					dataMap.customerTypeList.push({ text: "事业部(公共库)", value: 2 });
				}
				if ([12].includes(user.value.ingroupid) || permissions.value.includes("AUTH2_COURSE_ALL_SCOPE")) {
					dataMap.customerTypeList.push({ text: "全国(公共库)", value: 3 });
				}
			}
		};
		const setCustomerScreen = () => {
			conditionSearch.value.initSearchInput("请输入客户公司名称");
		};
		// 返回上级路由
		const onClose = () => {
			router.push(dataMap.callBackRouter);
		};
		const getSearchValue = data => {
			console.log(data);
		};
		return {
			...toRefs(dataMap),
			conditionSearch,
			setCustomerScreen,
			onClose,
			getSearchValue
		};
	}
};
</script>
<style lang="scss" scoped>
:deep(.van-dropdown-menu__title::after) {
	right: 0;
}
</style>
