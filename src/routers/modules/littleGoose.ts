import { RouteRecordRaw } from "vue-router";

// 小鹅通模块
const littleGooseRouter: Array<RouteRecordRaw> = [
	{
		path: "/littleGoose",
		component: () => import("@/layout/index.vue"),
		redirect: "/littleGoose/index",
		children: [
			{
				path: "index",
				component: () => import("@/views/littleGoose/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "小鹅通",
					key: "littleGoose",
					navFooter: true,
					scrollTop: true
				}
			},
			{
				path: "tool",
				component: () => import("@/views/littleGoose/tool.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "工具课记录",
					key: "littleGooseTool"
				}
			},
			{
				path: "tiny",
				component: () => import("@/views/littleGoose/tiny.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "微课学习记录",
					key: "littleGooseTiny"
				}
			},
			{
				path: "client",
				component: () => import("@/views/littleGoose/client.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "客户",
					key: "littleGooseClient"
				}
			},
			{
				path: "order",
				component: () => import("@/views/littleGoose/order.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "订单",
					key: "littleGoose0rder"
				}
			}
		]
	}
];

export default littleGooseRouter;
