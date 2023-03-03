<!--消息-->
<template>
	<div class="notice_box" @click.stop="onNotice">
		<svg class="icon" aria-hidden="true">
			<use xlink:href="#icon-tongzhi1" />
		</svg>
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
		font-size: 10px;
		line-height: 40px;
		color: #fff;
		background-color: red;
		border-radius: 50%;
	}
}
</style>
