<!--返回header-->
<template>
	<Header>
		<template #left>
			<van-icon name="arrow-left" color="#686868" @click="onBack" size="1.4em" />
		</template>
		<template #title>
			<slot name="title"></slot>
		</template>
		<template #right>
			<slot name="right"></slot>
		</template>
	</Header>
</template>
<script lang="ts" setup name="HeaderBack">
import Header from "@/components/Header/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const onBack = () => {
	console.log(router, 111);
	router.back();
};
</script>
