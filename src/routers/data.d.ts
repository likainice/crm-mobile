export interface RouteMetaType {
	keepAlive?: boolean; //缓存 默认关闭
	requiresAuth?: false; //权限 默认开启
	title?: string; //title
	key?: string; //key
	navFooter?: true; //底部导航 默认关闭
}
