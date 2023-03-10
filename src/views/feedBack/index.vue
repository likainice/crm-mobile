<template>
	<HeaderBack />
	<div class="feedBack">
		<div>请选要反馈的问题类型：</div>
		<van-form @submit="onSubmit">
			<van-field name="type" :rules="[{ required: true, message: '请选择' }]">
				<template #input>
					<van-radio-group v-model="formData.type" direction="horizontal">
						<van-radio name="1">使用建议</van-radio>
						<van-radio name="2">功能异常</van-radio>
						<van-radio name="3">其他问题</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field
				v-model="formData.desc"
				name="desc"
				rows="3"
				autosize
				type="textarea"
				maxlength="50"
				placeholder="请尽量详细的描述你的问题并上传对应界面截图"
				show-word-limit
				:rules="[{ required: true, message: '请填写' }]"
			/>
			<van-field name="url" required>
				<template #input>
					<van-uploader v-model="formData.url" />
				</template>
			</van-field>
			<div class="submit-btn">
				<van-button size="small" round block type="primary" native-type="submit"> 提交</van-button>
			</div>
		</van-form>
	</div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const formData = reactive({
	type: "",
	desc: "",
	url: []
});

const onSubmit = value => {
	console.log(value);
};
</script>
<style scoped lang="scss">
.feedBack {
	padding: 50px;
	.submit-btn {
		margin: 150px 0 0;
	}
	:deep(.van-form) {
		.van-cell {
			padding: 30px 0;
			&::after {
				right: 0;
				left: 0;
			}
		}
	}
}
</style>
