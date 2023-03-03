import { RouteRecordRaw } from "vue-router";
// 客户服务模块
const serviceRouter: Array<RouteRecordRaw> = [
	{
		path: "/service",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "/service",
				component: () => import("@/views/service/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "客户服务",
					key: "service11",
					navFooter: true
				}
			},
			{
				path: "visit",
				component: () => import("@/views/service/visit.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "上门服务",
					key: "serviceVisit"
				}
			},
			{
				path: "join",
				component: () => import("@/views/service/join.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "参课客户",
					key: "serviceJoin"
				}
			},
			{
				path: "queue",
				component: () => import("@/views/service/queue.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "排课&约课",
					key: "service"
				}
			}
		]
	}
];

export default serviceRouter;
