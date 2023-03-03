<template>
	<van-nav-bar title="新建客户">
		<template #left>
			<span @click="onCancel">取消</span>
		</template>
		<template #right>
			<span style="color: #409eff" @click="onSaveCustomer">保存</span>
		</template>
	</van-nav-bar>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
	name: "customerCreate",
	emits: ["onClose"],
	props: {},
	setup(props, { emit }) {
		const dataMap = reactive({});
		// 取消
		const onCancel = () => {
			emit("onClose");
		};
		// 创建客户
		const onSaveCustomer = () => {};
		return {
			...toRefs(dataMap),
			onCancel,
			onSaveCustomer
		};
	}
};
</script>
