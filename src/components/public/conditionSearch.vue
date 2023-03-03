<template>
	<div id="search-box">
		<div style="width: 0.6rem; text-align: center" v-if="filterData.length > 0">
			<van-icon name="filter-o" @click="showLeft = !showLeft" />
		</div>
		<van-search v-model="searchValue" show-action class="search_content" :placeholder="placeholder">
			<template #action>
				<div style="width: 0.6rem; padding-left: 0; font-size: 0.3rem; text-align: center; border-radius: 2px" @click="onSearch">
					搜索
				</div>
			</template>
		</van-search>
	</div>
	<van-popup v-model:show="showLeft" :position="direction" :style="{ width: width, height: height }">
		<ul class="filter_list">
			<li
				:class="item.text === conditionName ? 'active_filter' : ''"
				v-for="(item, index) in filterData"
				:key="index"
				@click="setCondition(item)"
			>
				{{ item.text }}
			</li>
		</ul>
	</van-popup>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
	name: "conditionSearch",
	emits: ["getSearchValue"],
	props: {
		direction: {
			type: String,
			default: "left"
		},
		width: {
			type: String,
			default: "50%"
		},
		height: {
			type: String,
			default: "100%"
		},
		filterData: {
			type: Array,
			default() {
				//  { text: 条件名称, placeholder: 提示语内容, key: 条件对应字段 } 若无数据则默认不使用筛选条件
				return [];
			}
		}
	},
	setup(props, { emit }) {
		const dataMap = reactive({
			searchValue: "",
			showLeft: false,
			conditionName: "",
			placeholder: ""
		});
		const setCondition = item => {
			// 设置搜索条件
			if (item) {
				dataMap.conditionName = item.text;
				dataMap.placeholder = item.placeholder;
				dataMap.key = item.key;
			}
			dataMap.searchValue = "";
			dataMap.showLeft = false;
		};
		const initSearchInput = placeholder => {
			// 无筛选条件时提示语
			dataMap.conditionName = "";
			dataMap.key = "";
			dataMap.placeholder = placeholder;
			dataMap.searchValue = "";
		};
		const onSearch = () => {
			// 搜索条件、数据传递向父组件
			emit("getSearchValue", {
				searchValue: dataMap.searchValue,
				conditionName: dataMap.conditionName,
				key: dataMap.key
			});
		};
		return {
			...toRefs(dataMap),
			setCondition,
			initSearchInput,
			onSearch
		};
	}
};
</script>
<style lang="scss" scoped>
#search-box {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;

	.search_content {
		flex: 1;
	}
}

.filter_list {
	margin-top: 0.2rem;

	li {
		height: 0.6rem;
		margin: 0.2rem 0.15rem;
		border-radius: 0.1rem;
		text-align: center;
		color: #2f2c2c;
		background-color: #fff;
		line-height: 0.6rem;
	}

	.active_filter {
		color: #fff;
		background-color: #409eff;
	}
}
</style>
