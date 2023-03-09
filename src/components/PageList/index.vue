<!--列表页（下拉、滚动加载）-->
<template>
	<div class="page-list">
		<van-pull-refresh v-model="refreshing" :disabled="disabled" @refresh="onRefresh">
			<van-list v-model:loading="loadings" :finished="finished" finished-text="没有更多了~" @load="onLoad">
				<slot></slot>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
	name: "PageList",
	props: {
		//是否处于加载状态，加载过程中不触发 load 事件
		loading: {
			type: Boolean,
			default: false
		},
		//是否已加载完成，加载完成后不再触发 load 事件
		finished: {
			type: Boolean,
			default: false
		},
		//是否下拉刷新
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		const list = ref([]);
		const refreshing = ref(false);
		const loadings = computed(() => {
			return props.loading;
		});
		const onLoad = () => {
			// console.log("load", 111, refreshing.value);
			// setTimeout(() => {
			// 	if (refreshing.value) {
			// 		list.value = [];
			// 		refreshing.value = false;
			// 	}
			//
			// 	for (let i = 0; i < 10; i++) {
			// 		list.value.push(list.value.length + 1);
			// 	}
			// 	emit("update:loading", false);
			// }, 1000);
			emit("load", {});
		};

		const onRefresh = () => {
			emit("load", { refresh: true });
		};
		watch(
			() => props.loading,
			val => {
				if (!val) refreshing.value = false;
			}
		);

		return {
			...toRefs(props),
			list,
			onLoad,
			onRefresh,
			refreshing,
			loadings
		};
	}
});
</script>
<style lang="scss" scoped></style>
