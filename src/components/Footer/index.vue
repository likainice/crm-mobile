<template>
	<div class="navFooter flx-center">
		<van-popup v-model:show="showMore" position="bottom" :style="{ height: '40%' }" closeable>
			<PageModuleList :data-source="moreMenuList" />
		</van-popup>

		<van-tabbar safe-area-inset-bottom route placeholder z-index="10" :before-change="selectNavBefore">
			<div class="nav_more" @click="showMore = !showMore">
				<van-icon name="plus" />
			</div>
			<van-tabbar-item v-for="(item, index) in menuList" :key="index" replace :to="item.router">
				<template #icon>
					<SvgIcon :name="item.iconClass" size="1.2em" />
				</template>

				<p>{{ item.navText }}</p>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { showToast } from "vant";
import { useUserStore } from "@/store/modules/user";
import PageModuleList from "@/components/PageModuleList/index.vue";

export default {
	name: "FooterNav",
	components: { PageModuleList },
	setup() {
		const dataMap = reactive({
			showMore: false,
			moreMenuList: [
				{
					iconClass: "icon-collision",
					navText: "常见问题",
					router: "/faq",
					permissions: [],
					background: "#77a1f8"
				},
				{
					iconClass: "icon-tubiaozhizuomoban",
					navText: "意见反馈",
					router: "/feedback",
					permissions: [],
					background: "#6dd6ad"
				},
				{
					iconClass: "icon-tongzhi1",
					navText: "消息通知",
					router: "/notify",
					permissions: [],
					background: "#eb6f76"
				}
			],
			menuList: [
				{
					iconClass: "icon-kefuyouxian",
					navText: "客户",
					router: "/customer",
					key: "customer"
				},
				{
					iconClass: "icon-huodongyouxian",
					navText: "小鹅通",
					router: "/littleGoose",
					key: "littleGoose"
				},
				{
					iconClass: "icon-shangmenfuwu",
					navText: "客户服务",
					router: "/service",
					key: "service"
				},
				{
					iconClass: "icon-wodezichan",
					navText: "财务",
					router: "/finance",
					key: "finance"
				}
			]
		});

		const { userInfo } = useUserStore();

		const selectNavBefore = index => {
			if (userInfo.suid === 0 && index === 0) {
				showToast({
					message: "您没有绑定金财学社！",
					position: "top",
					duration: 2000
				});
				return false;
			}

			return true;
		};

		return {
			...toRefs(dataMap),
			...toRefs(userInfo),
			selectNavBefore
		};
	}
};
</script>
<style scoped lang="scss">
.navFooter {
	:deep(.van-tabbar) {
		height: 130px;

		.van-tabbar-item {
			svg {
				fill: #666;
			}

			&.van-tabbar-item--active {
				svg {
					fill: var(--van-primary-color);
				}
			}
		}
	}

	.nav_more {
		position: absolute;
		top: -40px;
		left: 50%;
		z-index: 11;
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		background-color: $primary-color;
		border-radius: 50%;
		transform: translateX(-50%);

		.van-icon {
			font-size: 32px;
			color: #fff;
			vertical-align: -2px;
		}
	}
}
</style>
