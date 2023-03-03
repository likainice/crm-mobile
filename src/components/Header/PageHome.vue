<!--首页header-->
<template>
	<Header>
		<template #right>
			<Notify />
		</template>
	</Header>
</template>
<script lang="ts" setup name="HeaderPageHome">
import Header from "@/components/Header/index.vue";
import Notify from "@/components/Header/Notify.vue";
</script>
