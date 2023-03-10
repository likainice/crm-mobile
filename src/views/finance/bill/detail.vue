<template>
	<HeaderBack />
	<div class="bill-detail clearfix">
		<van-steps :active="active">
			<van-step>申请提交</van-step>
			<van-step>财务审核</van-step>
			<van-step>开票完成</van-step>
		</van-steps>

		<van-cell-group :border="false">
			<van-cell title="订单ID" :value="formData.client" :border="false" />
			<van-cell title="结算包ID" :value="formData.client" :border="false" />
			<van-cell title="申请时间" :value="formData.client" :border="false" />
			<van-cell title="申请人" :value="formData.client" :border="false" />
			<van-cell title="发票类型" :value="formData.client" :border="false" />
			<van-cell title="抬头" :value="formData.client" :border="false" />
			<van-cell title="开户行" :value="formData.client" :border="false" />
			<van-cell title="税号" :value="formData.client" :border="false" />
			<van-cell title="银行账号" :value="formData.client" :border="false" />
			<van-cell title="单位地址" :value="formData.client" :border="false" />
			<van-cell title="开票内容" :value="formData.client" :border="false" />
			<van-cell title="开票电话" :value="formData.client" :border="false" />
			<van-cell title="开票人" :value="formData.client" :border="false" />
			<van-cell title="复核人" :value="formData.client" :border="false" />
			<van-cell title="收款人" :value="formData.client" :border="false" />
			<van-cell title="发票单位" :value="formData.client" :border="false" />
			<van-cell title="发票号码" :value="formData.client" :border="false" />
			<van-cell title="代付款协议" :value="formData.client" :border="false" />
			<van-cell title="备注" :value="formData.client" :border="false" />
			<PageDivider />
			<van-cell title="邮寄地址" :value="formData.client" :border="false" />
			<van-cell title="联系电话" :value="formData.client" :border="false" />
			<van-cell title="联系人" :value="formData.client" :border="false" />
			<van-cell title="邮箱" :value="formData.client" :border="false" />
			<van-cell title="快递" :value="formData.client" :border="false" />
			<van-cell title="运单号" :value="formData.client" :border="false">
				<template #value
					>201254522444
					<van-icon class="bill-detail-copy-icon" name="description" v-copy="201254522444" />
				</template>
			</van-cell>
			<van-cell title="邮寄时间" :value="formData.client" :border="false" />
		</van-cell-group>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const formData = reactive({
	client: "test",
	paymentTerm: "",
	amount: "",
	payee: "",
	main: "",
	paymentName: "",
	bankAccount: "",
	paymentMethod: "",
	wayTerm: "",
	teacher: "",
	payTime: "",
	buyName: "",
	product: "",
	oppTerm: "",
	paymentProve: [],
	remark: ""
});

const active = ref(0);
</script>
<style scoped lang="scss">
.bill-detail {
	padding: 0 30px;

	:deep(.van-steps) {
		padding: 50px 60px;
	}

	:deep(.van-cell-group) {
		padding-bottom: 70px;

		.van-cell {
			padding: 20px 30px;
		}
	}

	.bill-detail-copy-icon {
		margin-left: 10px;
		font-size: 30px;
		color: $primary-color;
	}
}
</style>
