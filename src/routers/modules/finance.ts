import { RouteRecordRaw } from "vue-router";

// 财务模块
const financeRouter: Array<RouteRecordRaw> = [
	{
		path: "/finance",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "/finance",
				component: () => import("@/views/finance/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "财务",
					key: "finance",
					navFooter: true
				}
			},
			{
				path: "order",
				component: () => import("@/views/finance/order.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "订单",
					key: "financeOrder"
				}
			},
			{
				path: "bill",
				component: () => import("@/views/finance/bill.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "开票",
					key: "financeBill"
				}
			},
			{
				path: "per",
				component: () => import("@/views/finance/per.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "业绩",
					key: "financePer"
				}
			},
			{
				path: "eff",
				component: () => import("@/views/finance/eff.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "绩效",
					key: "financeEff"
				}
			},
			{
				path: "payee",
				component: () => import("@/views/finance/payee.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "企微收款",
					key: "financePayee"
				}
			}
		]
	}
];

export default financeRouter;
