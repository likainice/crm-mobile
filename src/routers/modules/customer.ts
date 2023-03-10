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
				path: "detail",
				component: () => import("@/views/customer/detail/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "客户详情",
					key: "customerDetail"
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
			},
			{
				path: "add",
				component: () => import("@/views/customer/add.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "新建客户",
					key: "customerAdd"
				}
			},
			{
				path: "all",
				component: () => import("@/views/customer/my.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "所有客户",
					key: "customerAll"
				}
			},
			{
				path: "public",
				component: () => import("@/views/customer/public.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "公共库",
					key: "customerPublic"
				}
			},
			{
				path: "resource",
				component: () => import("@/views/customer/resource.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "资源库",
					key: "customerResource"
				}
			},
			{
				path: "check",
				component: () => import("@/views/customer/my.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "客户查重",
					key: "customerCheck"
				}
			},
			{
				path: "authorize",
				component: () => import("@/views/customer/authorize.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "授权客户",
					key: "customerAuthorize"
				}
			},
			{
				path: "past",
				component: () => import("@/views/customer/past.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "过期客户",
					key: "customerPast"
				}
			}
		]
	}
];

export default customerRouter;
