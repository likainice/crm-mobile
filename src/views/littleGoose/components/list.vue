<template>
	<div class="littleGoose-list">
		<div class="littleGoose-list-item" v-for="(item, index) in 10" :key="index">
			<van-card>
				<template #thumb>
					<img src="https://img1.baidu.com/it/u=240112704,220484386&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
				</template>
				<template #title>
					<div class="card-title">长腿叔叔</div>
					<div class="card-status">直播</div>
				</template>
				<template #desc>
					<div class="card-desc">学习时间:2020-10-10 12:00:00</div>
					<div class="card-desc">学习时间:2020-10-10 12:00:00</div>
					<div class="card-desc">公司:北京小小科技</div>
					<div class="card-desc">学员:张三<span>学习时长：19s</span></div>
				</template>
				<template #footer>
					<div class="card-footer" v-if="footer">
						<van-tag color="orange">直播中</van-tag>
						2010年10月1日 19分 渠道中心
					</div>
					<PageDivider size="0.05rem" />
				</template>
			</van-card>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
	name: "littleGoose-list",
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		},
		footer: {
			type: Boolean,
			default: true
		} //是否展示底部
	},
	setup(props) {
		const dataMap = reactive({
			list: props.dataSource || [],
			footer: props.footer
		});

		return {
			...toRefs(dataMap)
		};
	}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
