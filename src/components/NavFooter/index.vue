<template>
	<div class="navFooter flx-center">
		<van-popup v-model:show="showMore" position="bottom" :style="{ height: '40%' }" closeable>
			<PageModuleList :data-source="menuList" />
		</van-popup>

		<van-tabbar
			safe-area-inset-bottom
			route
			placeholder
			z-index="10"
			v-model="active"
			@change="selectNav"
			:before-change="selectNavBefore"
		>
			<div class="nav_more" @click="showMore = !showMore">
				<van-icon name="plus" />
			</div>
			<van-tabbar-item v-for="(item, index) in navData" :key="index" replace :to="item.router">
				<template #icon>
					<svg class="icon" :class="{ active: active === index }" aria-hidden="true">
						<use :xlink:href="item.iconClass"></use>
					</svg>
				</template>

				<p>{{ item.navText }}</p>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
import { getCurrentInstance, reactive, ref, toRefs } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useMenuStore } from "@/store/modules/menu";
import PageModuleList from "@/components/PageModuleList/index.vue";
export default {
	name: "NavFooter",
	components: { PageModuleList },
	setup() {
		const route = useRouter();
		const { proxy } = getCurrentInstance();
		const { menuList: navData, setCurrentMenu } = useMenuStore();
		const dataMap = reactive({
			showMore: false,
			menuList: [
				{
					iconClass: "#icon-collision",
					navText: "常见问题",
					router: "/helpMain/commonProblem",
					permissions: [],
					background: "#77a1f8"
				},
				{
					iconClass: "#icon-tubiaozhizuomoban",
					navText: "意见反馈",
					router: "/helpMain/feedBack",
					permissions: [],
					background: "#6dd6ad"
				},
				{
					iconClass: "#icon-tongzhi1",
					navText: "消息通知",
					router: "/notify",
					permissions: [],
					background: "#eb6f76"
				}
			]
		});

		const { userInfo } = useUserStore();
		const active = ref(0);
		/* 底部导航切换 */
		const selectNav = index => {
			active.value = index;
			setCurrentMenu(navData[index]);
		};
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
		// 子级菜单跳转处理
		const toDirectory = item => {
			route.push({
				path: item.router,
				query: {
					callback: proxy.$route.path // 当前路由
				}
			});
		};
		return {
			...toRefs(dataMap),
			...toRefs(userInfo),
			selectNav,
			toDirectory,
			navData,
			active,
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
				width: 50px;
				height: 50px;
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
		background-color: #409eff;
		border-radius: 50%;
		transform: translateX(-50%);
		.van-icon {
			font-size: 32px;
			color: #fff;
			vertical-align: -2px;
		}
	}
	.menu_box {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: 80px auto 0;

		.menu_item {
			margin: 10px 40px;
			text-align: center;

			.menu_icon_box {
				box-sizing: border-box;
				width: 100px;
				height: 100px;
				padding-top: 20px;
				border-radius: 10px;

				svg {
					width: 50px;
					height: 50px;
					fill: #fff;
				}
			}

			.menu_title {
				font-size: 24px;
			}
		}
	}
}
</style>
