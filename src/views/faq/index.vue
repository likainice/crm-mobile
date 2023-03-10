<template>
	<HeaderBack />
	<SearchFilter />
	<div class="notify-card">
		<van-card v-for="(item, index) in 10" :key="index" @click="onNotify(item)">
			<template #thumb>
				<img src="https://img1.baidu.com/it/u=240112704,220484386&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
			</template>
			<template #tag>
				<van-badge :content="5" max="99">
					<div class="child" />
				</van-badge>
			</template>
			<template #title>
				<div class="card-title">
					上门
					<span class="card-date">9:20</span>
				</div>
			</template>
			<template #desc>
				<div class="card-desc sle">
					吴奈奈向您发起了9月5日上门拜访客户CRM奈奈向您发起了9月5日上门拜访客户CRM奈奈向您发起了9月5日上门拜访客户CRM
				</div>
			</template>
			<template #footer>
				<PageDivider size="0.05rem" />
			</template>
		</van-card>
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const onNotify = item => {
	console.log(item);
	router.push({
		path: "/faq/detail",
		query: {
			id: 1
		},
		state: {
			info: item
		}
	});
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
