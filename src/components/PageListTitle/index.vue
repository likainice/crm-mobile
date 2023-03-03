<template>
	<div class="listTitle flx-justify-between">
		<div class="left">{{ title }}</div>
		<router-link :to="url">{{ linkText }}></router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
	name: "page-list-title",
	props: {
		title: {
			type: String,
			default: ""
		},
		url: {
			type: String,
			default: ""
		},
		linkText: {
			type: String,
			default: "查看全部"
		}
	},
	setup(props) {
		const p = reactive(props);
		return {
			...toRefs(p)
		};
	}
});
</script>
<style lang="scss" scoped>
.listTitle {
	padding: 26px 30px;
	font-size: 28px;

	a {
		font-size: 24px;
		color: #999;
	}
}
</style>
