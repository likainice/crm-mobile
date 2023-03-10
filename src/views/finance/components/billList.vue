<template>
	<div class="bill-list clearfix">
		<div class="bill-list-item" v-for="(item, index) in 6" :key="index" @click="onClick(item)">
			<div class="bill-list-item-top">
				<div class="bill-list-item-top-title">
					<span>北京科技公司</span>
					<van-tag type="warning">普票</van-tag>
					<van-icon name="arrow" />
				</div>
				<div class="bill-list-item-top-money">12365.00<span>元</span></div>
			</div>
			<div class="bill-list-item-bottom">
				<span class="bill-list-item-bottom-status">申请中</span>
				<span class="bill-list-item-bottom-time">2022-01-20 09:20</span>
				<van-button class="bill-list-item-bottom-btn" type="default" size="mini">撤销</van-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="BillList">
import { useRouter } from "vue-router";

const router = useRouter();
const onClick = item => {
	router.push({
		path: "/finance/bill/detail"
	});
};
</script>
<style lang="scss" scoped>
.bill-list {
	padding: 0 30px;

	&-item {
		margin: 24px 0;
		border: 1px solid $border-color;
		&-top {
			padding: 15px 20px;
			background: #eef4ff;
			border-bottom: 1px solid $border-color;
			&-title {
				& > span {
					margin-right: 30px;
				}
				.van-icon {
					float: right;
				}
			}
			&-money {
				padding: 20px 0;
				font-size: 36px;
				text-align: right;
				span {
					font-size: 28px;
					color: #999;
				}
			}
		}
		&-bottom {
			padding: 24px 20px;
			&-status {
				margin-right: 30px;
				color: #666;
			}
			&-time {
				font-size: 20px;
				color: #999;
			}
			&-btn {
				float: right;
				padding: 0 20px;
				margin-top: -8px;
			}
		}
	}
}
</style>
