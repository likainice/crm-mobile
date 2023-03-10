<!--消息-->
<template>
	<div class="notice_box" @click.stop="onNotice">
		<SvgIcon name="icon-tongzhi1" />
		<span class="notice_remake" v-if="noticeNum">{{ noticeNum }}</span>
	</div>
</template>
<script lang="ts" setup name="Notify">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const noticeNum = ref<number | string>("0");
const onNotice = () => {
	router.push("/notify");
};
onMounted(() => {
	getNotice();
});
// 获取通知数量
const getNotice = () => {
	const num = 100;
	if (num > 99) {
		noticeNum.value = "99+";
	} else {
		noticeNum.value = num;
	}
};
// 暴露给父组件绑定ref的参数和方法
// defineExpose({ searchParam, refresh: getTableList });
</script>
<style scoped lang="scss">
.notice_box {
	position: relative;

	.notice_remake {
		position: absolute;
		top: -6px;
		right: -8px;
		width: 40px;
		height: 40px;
		font-size: 18px;
		line-height: 40px;
		color: #fff;
		background-color: red;
		border-radius: 50%;
	}
}
</style>
