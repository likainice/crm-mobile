import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { HOME_URL } from "@/config/config";
// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.ts");

// * 处理路由表
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: HOME_URL
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	{
		path: "/notify",
		name: "notify",
		children: [
			{
				path: "/notify",
				name: "notify",
				component: () => import("@/views/notify/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "消息通知",
					key: "notify"
				}
			},
			{
				path: "detail",
				name: "notifyDetail",
				component: () => import("@/views/notify/detail.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "消息通知详情",
					key: "notifyDetail"
				}
			}
		]
	},
	...routerArray,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior(to, from, savedPosition) {
		return new Promise(resolve => {
			if (savedPosition) {
				return savedPosition;
			} else {
				if (from.meta.scrollTop) {
					const top: number = document.documentElement.scrollTop || document.body.scrollTop;
					resolve({ left: 0, top });
				}
			}
		});
	}
});

export default router;
