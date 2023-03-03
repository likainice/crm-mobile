import { RouteRecordRaw } from "vue-router";

// 客户模块
const customerRouter: Array<RouteRecordRaw> = [
	{
		path: "/customer",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "/customer",
				component: () => import("@/views/customer/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "客户管理",
					key: "customer",
					navFooter: true
				}
			},
			{
				path: "my",
				component: () => import("@/views/customer/my.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "我的客户",
					key: "customerMy"
				}
			}
		]
	}
];

export default customerRouter;
