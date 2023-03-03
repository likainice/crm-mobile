<template>
	<van-config-provider theme="light" style="height: 100%" :theme-vars="themeVars">
		<router-view></router-view>
	</van-config-provider>
</template>

<script setup lang="ts">
import { ConfigProviderThemeVars } from "vant";
const themeVars: ConfigProviderThemeVars = {
	dividerBorderColor: "#f7f7f7",
	dividerMargin: "0px",
	dropdownMenuShadow: "none",
	dropdownMenuHeight: "30px"
};
</script>

<style scoped lang="scss"></style>
