import routes from "@/routers/router";
import NProgress from "@/utils/nprogress";
import { HOME_URL } from "@/config/config";
import { AuthStore } from "@/store/modules/auth";
import { AxiosCanceler } from "@/utils/request/axiosCancel";
import { useUserStore } from "@/store/modules/user";
import setPageTitle from "@/utils/util";
import { createRouter, createWebHistory } from "vue-router";

const axiosCanceler = new AxiosCanceler();
/**
 * @description 路由创建
 * */
const router = createRouter({
	history: createWebHistory(),
	routes,
	strict: false
});
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	NProgress.start();
	// * 页面 title
	setPageTitle(to.meta.title);

	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断是否有Token
	const { token, doLogout } = useUserStore();
	if (!token && to.path !== "/login") {
		doLogout();
		next({
			path: "/login"
		});
		NProgress.done();
		return;
	}

	// * 判断当前路由是否需要访问权限
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();

	const authStore = AuthStore();
	// * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	const dynamicRouter = authStore.dynamicRouter;
	// * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	const staticRouter = [HOME_URL, "/403"];
	const routerList = dynamicRouter.concat(staticRouter);

	// * 如果访问的地址没有在路由表中重定向到403页面
	if (routerList.indexOf(to.path) !== -1) return next();
	next({
		path: "/403"
	});
});

router.afterEach(() => {
	NProgress.done();
	// * 返回顶部
	window.scrollTo(0, 0);
});

export default router;
