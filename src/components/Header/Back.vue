<!--返回header-->
<template>
	<Header>
		<template #left>
			<van-icon name="arrow-left" color="#686868" @click="onBack" size="1.4em" />
		</template>
	</Header>
</template>
<script lang="ts" setup name="HeaderBack">
import Header from "@/components/Header/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const onBack = () => {
	router.back();
};
</script>
