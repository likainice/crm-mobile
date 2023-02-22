<template>
	<!-- <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->

	<van-notice-bar left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />

	<!-- <van-tabbar v-model="active">
		<van-tabbar-item icon="home-o">标签</van-tabbar-item>
		<van-tabbar-item icon="search" dot>标签</van-tabbar-item>
		<van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
		<van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
	</van-tabbar> -->

	<van-swipe :autoplay="3000" lazy-render :height="300">
		<van-swipe-item v-for="image in images" :key="image">
			<img :src="image" />
		</van-swipe-item>
	</van-swipe>

	<van-grid :column-num="3" style="margin: 40px 0">
		<van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
	</van-grid>

	<van-cell is-link title="选择" @click="show = true" />

	<van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action />
</template>

<script lang="ts" name="home">
import { defineComponent, ref } from "vue";
import { NoticeBar, Grid, GridItem, Toast } from "vant";

export default defineComponent({
	components: { [NoticeBar.name]: NoticeBar, [Grid.name]: Grid, [GridItem.name]: GridItem },
	setup() {
		const images = [
			"https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
			"https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
		];
		const show = ref(false);
		const actions = [
			{ name: "着色选项", color: "#ee0a24" },
			{ name: "禁用选项", disabled: true },
			{ name: "加载选项", loading: true }
		];
		function onClickRight() {
			Toast("你已经被监控！");
		}
		return { images, onClickRight, show, actions };
	}
});
</script>

<style scoped lang="scss">
@import "./index.scss";
.van-swipe {
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
