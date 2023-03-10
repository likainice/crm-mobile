import { RouteRecordRaw } from "vue-router";
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

// * 路由表
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: HOME_URL
	},
	// * 登录
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
	// * 消息
	{
		path: "/notify",
		name: "notify",
		children: [
			{
				path: "/notify",
				name: "notify",
				component: () => import("@/views/notify/index.vue"),
				meta: {
					requiresAuth: false,
					keepAlive: true,
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
					title: "消息通知详情",
					key: "notifyDetail"
				}
			}
		]
	},
	// * 常见问题
	{
		path: "/faq",
		name: "faq",
		children: [
			{
				path: "/faq",
				name: "faq",
				component: () => import("@/views/faq/index.vue"),
				meta: {
					keepAlive: true,
					title: "常见问题",
					key: "faq"
				}
			},
			{
				path: "detail",
				name: "faqDetail",
				component: () => import("@/views/faq/detail.vue"),
				meta: {
					keepAlive: true,
					title: "常见问题详情",
					key: "faqDetail"
				}
			}
		]
	},
	// * 意见反馈
	{
		path: "/feedBack",
		name: "feedBack",
		component: () => import("@/views/feedBack/index.vue"),
		meta: {
			title: "意见反馈",
			key: "feedBack"
		}
	},
	...routerArray,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

export default routes;
