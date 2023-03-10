<!--svg、icon-->
<template>
	<svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size" :fill="props.color">
		<use :xlink:href="symbolId" rel="external nofollow" />
	</svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";
const props = defineProps({
	name: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: "#333"
	},
	size: {
		type: String,
		default: "2em"
	}
});
const symbolId = computed(() => `#${props.name}`);
</script>
