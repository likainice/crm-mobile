<template>
	<div class="per-list clearfix">
		<div v-for="(item, index) in 6" :key="index">
			<van-cell-group>
				<template #title>
					<div class="flx-justify-between">
						<div class="title-left">深圳科技</div>
						<div class="title-right">￥123.56元</div>
					</div>
				</template>
				<van-cell title="流水ID" value="20282" :border="false" />
				<van-cell title="购买产品" value="老板财务管控" :border="false" />
				<van-cell title="合同状态" value="已收到" :border="false" />
				<van-cell title="收款总金额" value="1808.00元" :border="false" />
				<van-cell title="劳务费状态" value="未申领" :border="false" />
				<van-cell title="收款时间" value="2022-10-29 09:20" :border="false" />
			</van-cell-group>
			<PageDivider />
		</div>
	</div>
</template>

<script lang="ts" setup name="perList"></script>
<style lang="scss" scoped>
.per-list {
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
		color: orange;
	}
}
</style>
