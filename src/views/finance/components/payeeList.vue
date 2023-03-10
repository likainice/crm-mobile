<template>
	<div class="payee-list clearfix">
		<div class="payee-list-item" v-for="(item, index) in 10" :key="index">
			<div class="date">10月21日 10:10</div>
			<div class="content">
				<div class="content-top">
					<div>已收款至企业账户</div>
					<div class="content-top-money">￥0.01</div>
				</div>
				<div class="content-desc">
					付款账户：<span>{{ "aa" }}</span>
				</div>
				<div class="content-desc">
					收款方式：<span>{{ "收款码" }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
	name: "payeeList",
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup(props) {
		const dataMap = reactive({
			list: props.dataSource || []
		});

		return {
			...toRefs(dataMap)
		};
	}
};
</script>
<style lang="scss" scoped>
.payee-list {
	padding: 20px 30px 0;
	&-item {
		margin-bottom: 60px;
		.date {
			margin-bottom: 20px;
			font-size: 30px;
			color: #a5a5a5;
			text-align: center;
		}

		.content {
			padding: 50px 70px 20px;
			border: 4px solid $border-color;
			border-radius: 10px;

			&-top {
				margin-bottom: 40px;
				color: #a5a5a5;
				text-align: center;

				&-money {
					margin-top: 20px;
					font-size: 40px;
					font-weight: bold;
					color: #333;
				}
			}

			&-desc {
				margin-bottom: 15px;
				color: #a5a5a5;

				span {
					color: #333;
				}
			}
		}
	}
}
</style>
