import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export interface RouteMetaType {
	keepAlive?: boolean; //缓存 默认关闭
	requiresAuth?: boolean; //权限 默认开启
	title?: string; //title
	key?: string; //key
	navFooter?: boolean; //底部导航 默认关闭
	backTopHidden?: boolean; //隐藏返回顶部 默认开启
}
/**
 * Route Record defining one single component with the `component` option.
 */
interface RouteTypeInit extends RouteLocationNormalized {
	meta: RouteMetaType;
}

export type RouteType = RouteTypeInit;
