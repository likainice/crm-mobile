<!--筛选弹框-->
<template>
	<div class="searchSelect side-padding">
		<div class="searchSelect-content flx-justify-between">
			<div
				class="searchSelect-item"
				v-for="(item, index) in props.listOptions"
				:key="item.value"
				:class="selectIndexs.includes(index) && 'active'"
				@click="onclick(item)"
			>
				<SvgIcon :name="item.icon" size="1em" />
				<span class="check-text">{{ item.text }}</span>
			</div>
		</div>
	</div>
	<!--排序下拉弹窗-->
	<van-popup v-model:show="showDropdownPopup" round position="top">
		<van-radio-group v-model="dropdownValue">
			<van-cell-group inset>
				<van-cell v-for="item in dropdownOptions" :key="item.value" :title="item.text" clickable @click="onDropdown(item.value)">
					<template #right-icon>
						<van-radio :name="item.value" />
					</template>
				</van-cell>
			</van-cell-group>
		</van-radio-group>
	</van-popup>
	<!--筛选弹窗-->
	<FilterPopup
		v-model:show="showFilterPopup"
		v-model:check="filterValue"
		:position="props.filterPosition"
		:style="props.filterStyle"
		:options="props.filterOptions"
		@onOk="onFilter"
	/>
</template>

<script lang="ts" setup name="SearchSelect">
import { ref, watch } from "vue";
import FilterPopup from "./FilterPopup.vue";
import { isEmptyObj } from "@/utils/is";
import { DropdownOptionType, FilterOptionType, OptionType } from "@/components/SearchFilter/data";

const props = withDefaults(
	defineProps<{
		sort: any; //排序值
		filter: any; //筛选值
		showCheck: any; //是否多选
		listOptions?: OptionType[]; //列表项
		dropdownOptions?: DropdownOptionType[]; //下拉菜单选项数据
		filterPosition?: "top" | "right" | "bottom" | "left"; //筛选弹出位置
		filterStyle?: any; //筛选样式
		filterOptions?: FilterOptionType[]; //筛选选项数据
	}>(),
	{
		listOptions: () => [
			{ text: "归属时间", value: 1, icon: "icon-shunxu" },
			{ text: "筛选", value: 2, icon: "icon-shaixuan" },
			{ text: "多选", value: 3, icon: "icon-duoxuan1" }
		],
		dropdownOptions: () => [
			{
				text: "默认",
				value: undefined
			},
			{
				text: "归属时间（从近到远）",
				value: 1
			},
			{
				text: "通话时间（从近到远）",
				value: 2
			},
			{
				text: "通话时间（从远到近）",
				value: 10
			}
		],
		filterOptions: () => [],
		showFilter: false,
		filterPosition: "right",
		filterStyle: { width: "70%", height: "100%" }
	}
);
const emit = defineEmits(["update:sort", "update:showCheck", "update:filter"]);
const dropdownValue = ref();
const filterValue = ref();
//当前有值的筛选项索引
const selectIndexs = ref([]);
const showDropdownPopup = ref(false);
const showFilterPopup = ref(false);

const onclick = item => {
	if (item.value === 1) {
		showDropdownPopup.value = true;
	}
	if (item.value === 2) {
		showFilterPopup.value = true;
	}
	if (item.value === 3) {
		emit("update:showCheck", true);
	}
};
//排序下拉
const onDropdown = (val: any) => {
	if (val) {
		selectIndexs.value.push(0);
	} else {
		selectIndexs.value = selectIndexs.value.filter(i => i !== 0);
	}
	dropdownValue.value = val;
	dropdownValue.value && emit("update:sort", val);
};
//筛选
const onFilter = val => {
	if (!isEmptyObj(val)) {
		selectIndexs.value.push(1);
	} else {
		selectIndexs.value = selectIndexs.value.filter(i => i !== 1);
	}
	filterValue.value && emit("update:filter", filterValue.value);
};
//多选
watch(
	() => props.showCheck,
	val => {
		if (val) {
			selectIndexs.value.push(2);
		} else {
			selectIndexs.value = selectIndexs.value.filter(i => i !== 2);
		}
	}
);
</script>
<style lang="scss" scoped>
.searchSelect {
	&-content {
		padding: 20px 40px;
		margin: 10px 0 20px;
		background: #f5f5f7;
		border-radius: 10px;
	}

	&-item {
		.check-text {
			margin-left: 10px;
			vertical-align: 3px;
		}

		&.active {
			svg {
				fill: $primary-color;
			}

			.check-text {
				color: $primary-color;
			}
		}
	}
}
</style>
