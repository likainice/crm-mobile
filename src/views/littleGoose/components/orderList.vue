<template>
	<div class="littleGoose-list">
		<div class="littleGoose-list-item" v-for="(item, index) in 10" :key="index">
			<div class="card-header">
				<div class="card-header-date">下单时间:2022-12-13 14:42:47</div>
				<div class="card-header-tag"><van-tag round type="primary">已录入</van-tag></div>
				<div class="card-header-status">支付成功</div>
			</div>

			<van-card>
				<template #thumb>
					<img src="https://img1.baidu.com/it/u=240112704,220484386&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
				</template>
				<template #title>
					<div class="card-title">《老板财务管控》一张门票</div>
				</template>
				<template #desc>
					<div class="card-desc">用户昵称：长腿叔叔</div>
					<div class="card-desc">公司名称：北京小六科技有限公司</div>
				</template>
				<template #num>
					<div class="card-num">￥18.00</div>
				</template>
				<template #footer>
					<PageDivider size="0.05rem" />
				</template>
			</van-card>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ dataSource: any[] }>(), {
	dataSource: () => []
});
const list = computed(() => {
	return props.dataSource;
});
console.log(list);
</script>
<style scoped lang="scss">
@import "index.scss";
.card-header {
	display: flex;
	justify-content: space-between;
	padding: 20px 30px 0;
	font-size: 28px;
	.card-header-date {
		//flex: 1;
	}
	.card-header-tag {
		flex: 1;
		margin-left: 16px;
		font-size: 20px;
	}
	.card-header-status {
		color: orange;
	}
}
.card-num {
	font-size: 28px;
	color: orange;
}
</style>
