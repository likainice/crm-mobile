<template>
	<HeaderBack />
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="formData.client"
				required
				name="client"
				label="客户"
				placeholder="客户"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>

			<van-field
				v-model="formData.paymentTerm"
				required
				is-link
				readonly
				name="paymentTerm"
				label="收款方式"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>
			<!--收款方式弹窗-->
			<van-popup v-model:show="showPaymentTerm" position="bottom">
				<van-picker :columns="columnsPaymentTerm" @confirm="onConfirm" @cancel="showPaymentTerm = false" />
			</van-popup>

			<van-field
				v-model="formData.amount"
				required
				name="amount"
				type="number"
				label="收款金额"
				:rules="[{ required: true, message: '请填写' }]"
			/>

			<van-field v-model="formData.payee" required name="payee" label="收款方" :rules="[{ required: true, message: '请填写' }]" />

			<van-field
				v-model="formData.main"
				required
				is-link
				readonly
				name="main"
				label="工商主体"
				@click="showMain = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>
			<!--主体弹窗-->
			<van-popup v-model:show="showMain" position="bottom">
				<van-picker :columns="columnsPaymentTerm" @confirm="onConfirmMain" @cancel="showMain = false" />
			</van-popup>

			<van-field v-model="formData.paymentName" name="paymentName" label="付款方名称" />

			<van-field v-model="formData.bankAccount" name="bankAccount" label="银行账号" />

			<van-field
				v-model="formData.paymentMethod"
				required
				is-link
				readonly
				name="paymentMethod"
				label="付款方式"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>

			<van-field
				v-model="formData.wayTerm"
				required
				is-link
				readonly
				name="wayTerm"
				label="成交方式"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>

			<van-field
				v-model="formData.teacher"
				required
				is-link
				readonly
				name="teacher"
				label="技术老师"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>

			<van-field
				v-model="formData.payTime"
				is-link
				readonly
				name="datePicker"
				label="收款时间"
				placeholder="点击选择时间"
				@click="showPickerPayTime = true"
			/>
			<!--收款时间弹窗-->
			<van-popup v-model:show="showPickerPayTime" position="bottom">
				<van-date-picker @confirm="onConfirmPayTime" @cancel="showPickerPayTime = false" />
			</van-popup>

			<van-field name="buyName" label="购买名额" required>
				<template #input>
					<van-stepper v-model="formData.buyName" />
				</template>
			</van-field>

			<van-field
				v-model="formData.product"
				required
				is-link
				readonly
				name="product"
				label="产品"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>

			<van-field
				v-model="formData.oppTerm"
				required
				is-link
				readonly
				name="oppTerm"
				label="OPP成交方式"
				@click="showPaymentTerm = true"
				:rules="[{ required: true, message: '请选择' }]"
			/>

			<van-field name="paymentProve" label="付款证明" required>
				<template #input>
					<van-uploader v-model="formData.paymentProve" />
				</template>
			</van-field>

			<van-field
				v-model="formData.remark"
				rows="2"
				autosize
				label="备注"
				type="textarea"
				maxlength="50"
				placeholder="请输入备注"
				show-word-limit
			/>
		</van-cell-group>

		<div style="margin: 16px">
			<van-button size="small" round block type="primary" native-type="submit"> 提交</van-button>
		</div>
	</van-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const filterOptions = ref([
	{
		value: 1,
		text: "审核状态",
		children: [
			{ value: 11, text: "待审批" },
			{ value: 12, text: "审批通过（总部）" },
			{ value: 13, text: "审批通过（分公司）" },
			{ value: 14, text: "审批驳回（总部）" },
			{ value: 15, text: "审批驳回（分公司）" }
		]
	},
	{ value: 2, text: "服务开通状态" },
	{ value: 3, text: "订单创建时间" }
]);
const formData = reactive({
	client: "",
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

const showPaymentTerm = ref(false);
const columnsPaymentTerm = [
	{ text: "杭州", value: "Hangzhou" },
	{ text: "宁波", value: "Ningbo" },
	{ text: "温州", value: "Wenzhou" },
	{ text: "绍兴", value: "Shaoxing" },
	{ text: "湖州", value: "Huzhou" }
];

const showMain = ref(false);
const onConfirm = ({ selectedOptions }) => {
	formData.paymentTerm = selectedOptions[0]?.text;
	showPaymentTerm.value = false;
};
const onConfirmMain = ({ selectedOptions }) => {
	formData.main = selectedOptions[0]?.text;
	showMain.value = false;
};
const onSubmit = value => {
	console.log(value);
};
const showPickerPayTime = ref(false);
const onConfirmPayTime = ({ selectedValues }) => {
	formData.payTime = selectedValues.join("/");
	showPickerPayTime.value = false;
};
</script>
<style scoped lang="scss">
.order-add-icon {
	font-size: 36px;
	color: #666;
}
</style>
