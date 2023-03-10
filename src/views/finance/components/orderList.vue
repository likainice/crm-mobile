<template>
	<div class="order-list clearfix">
		<div v-for="(item, index) in 6" :key="index">
			<van-cell-group>
				<template #title>
					<div class="flx-justify-between">
						<div class="title-left">深圳科技</div>
						<div class="title-right">审核通过<van-icon class="edit-icon" name="edit" @click="onEdit(item)" /></div>
					</div>
				</template>
				<van-cell title="订单ID" value="20282" :border="false" />
				<van-cell title="购买产品" value="老板财务管控" :border="false" />
				<van-cell title="赠送产品" value="已收到" :border="false" />
				<van-cell title="订单创建时间" value="1808.00元" :border="false" />
				<van-cell title="支付总金额" value="未申领" :border="false" />
				<van-cell title="最后收款时间" value="2022-10-29 09:20" :border="false" />
				<van-cell title="服务开通状态" value="2022-10-29 09:20" :border="false">
					<template #value><van-tag type="warning">预约服务</van-tag></template>
				</van-cell>
			</van-cell-group>
			<PageDivider />
		</div>
	</div>
</template>

<script lang="ts" setup name="OrderList">
const emit = defineEmits(["change"]);
const onEdit = item => {
	emit("change", item);
};
</script>
<style lang="scss" scoped>
.order-list {
	padding: 0 30px;
	:deep(.van-cell-group) {
		padding: 20px 0;
		.van-cell {
			padding: 8px 36px;
		}
	}
	.title-left {
		font-size: 28px;
		font-weight: bold;
		color: #333;
	}
	.title-right {
		font-size: 28px;
		color: initial;
	}
	.edit-icon {
		margin-left: 15px;
		font-size: 30px;
	}
}
</style>
