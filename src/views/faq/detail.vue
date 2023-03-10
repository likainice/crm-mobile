<template>
	<HeaderBack />
	<div class="notify-card">
		<van-card v-for="(item, index) in 2" :key="index">
			<template #thumb>
				<img src="https://img1.baidu.com/it/u=240112704,220484386&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
			</template>
			<template #title>
				<div class="card-title">
					吴奈奈向您发起了9月5日上门拜访客户CRM奈奈向您发起了9月5日上门拜访客户CRM奈奈向您发起了9月5日上门拜访客户CRM
				</div>
			</template>
			<template #desc>
				<div class="card-desc">
					<img src="https://img1.baidu.com/it/u=240112704,220484386&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
				</div>
			</template>
			<template #footer>
				<span class="card-date">9:20</span>
				<PageDivider size="0.05rem" />
			</template>
		</van-card>
	</div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
@import "./index.scss";
</style>
