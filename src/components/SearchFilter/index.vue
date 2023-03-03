<!--筛选弹框-->
<template>
	<div class="pageSearch flx-justify-between">
		<div class="pageSearch-dropdown" v-if="props.showDropdown">
			<van-dropdown-menu>
				<van-dropdown-item v-model="dropdownValue" :options="props.dropdownOptions" @change="onDropdown" />
			</van-dropdown-menu>
		</div>
		<div class="pageSearch-search">
			<van-search
				v-model="searchValue"
				show-action
				left-icon="none"
				:placeholder="props.placeholder"
				@search="onSearch"
				@clear="clear"
			>
				<template #action>
					<van-icon name="search" @click="onSearch" />
				</template>
			</van-search>
		</div>
		<div class="pageSearch-filter" v-if="props.showFilter" @click="showFilterPopup = !showFilterPopup">
			<van-icon name="filter-o" />
			筛选
		</div>
	</div>
	<FilterPopup
		v-model:show="showFilterPopup"
		v-model:check="filterValue"
		:position="props.filterPosition"
		:style="props.filterStyle"
		:options="props.filterOptions"
		@onOk="onFilter"
	/>
</template>

<script lang="ts" setup name="SearchFilter">
import { ref } from "vue";
import FilterPopup from "./FilterPopup.vue";
import { DropdownOptionType, FilterOptionType } from "@/components/SearchFilter/data";

const props = withDefaults(
	defineProps<{
		initSearchValue?: string | number; //搜索框默认值
		placeholder?: string; //搜索框默认
		initFilterValue?: any[]; //筛选默认值
		showFilter?: boolean; //是否显示筛选
		filterPosition?: "top" | "right" | "bottom" | "left"; //筛选弹出位置
		filterStyle?: any; //筛选样式
		filterOptions?: FilterOptionType[]; //筛选选项数据
		initDropdownValue?: string | number; //下拉默认值
		showDropdown?: boolean; //是否显示下拉菜单
		dropdownOptions?: DropdownOptionType[]; //下拉菜单选项数据
	}>(),
	{
		placeholder: "请输入查询",
		showFilter: false,
		filterPosition: "right",
		filterStyle: { width: "70%", height: "100%" },
		showDropdown: false,
		dropdownOptions: () => [
			{ text: "终身客户", value: 1 },
			{ text: "大客户经理", value: 2 },
			{ text: "大课服务", value: 3 },
			{ text: "OPP服务", value: 4 }
		],
		filterOptions: () => []
	}
);
const emit = defineEmits(["changeSearch", "changeDropdown", "changeFilter"]);
const searchValue = ref(props.initSearchValue);
const dropdownValue = ref(props.initDropdownValue);
const filterValue = ref(props.initFilterValue);
const showFilterPopup = ref(false);
const clear = () => {
	alert();
};
//查询
const onSearch = () => {
	searchValue.value && emit("changeSearch", searchValue.value);
};
//下拉选择
const onDropdown = () => {
	dropdownValue.value && emit("changeDropdown", dropdownValue.value);
};
//筛选
const onFilter = () => {
	filterValue.value && emit("changeFilter", filterValue.value);
};

//双向数据
/*const active = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit("update:value", val);
  }
});*/
</script>
<style lang="scss" scoped>
.pageSearch {
	padding: 0 30px;
	&-dropdown {
		width: 160px;
		margin: 0 20px 0 -20px;
		:deep(.van-dropdown-menu) {
			.van-dropdown-menu__title {
				font-style: oblique;
				font-weight: bold;
			}
			.van-dropdown-menu__bar {
				height: 100px;
			}
		}
	}
	&-search {
		flex: 1;
		:deep(.van-search) {
			padding: 30px 0;
			.van-search__content {
				padding-right: 10px;
				background: transparent;
				border: 1px solid $primary-color;
				border-right: 0;
				border-radius: 10px 0 0 10px;
				.van-field {
					height: auto;
					padding: 6px 0;
					input::placeholder {
						font-size: 20px;
					}
				}
			}

			.van-search__action {
				padding: 12px;
				line-height: inherit;
				color: #fff;
				background: $primary-color;
				border: 1px solid $primary-color;
				border-radius: 0 10px 10px 0;

				.van-icon {
					font-size: 36px;
					vertical-align: middle;
				}
			}
		}
	}

	&-filter {
		width: 100px;
		margin-left: 20px;
		.van-icon {
			font-size: 30px;
		}
	}
}
</style>
