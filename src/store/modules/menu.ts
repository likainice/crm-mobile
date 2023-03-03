import { defineStore } from "pinia";
import { MenuState } from "../types";
import piniaPersistConfig from "../piniaPersist";

// MenuStore
export const useMenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		currentMenu: "",
		// menu List
		menuList: [
			{
				iconClass: "#icon-kefuyouxian",
				navText: "客户",
				router: "/customer",
				key: "customer"
			},
			{
				iconClass: "#icon-huodongyouxian",
				navText: "小鹅通",
				router: "/littleGoose",
				key: "littleGoose"
			},
			{
				iconClass: "#icon-shangmenfuwu",
				navText: "客户服务",
				router: "/service",
				key: "service"
			},
			{
				iconClass: "#icon-wodezichan",
				navText: "财务",
				router: "/finance",
				key: "finance"
			}
		]
	}),
	getters: {},
	actions: {
		async setCurrentMenu(current) {
			this.currentMenu = current;
		},
		async setMenuList(menuList: Menu.MenuOptions[]) {
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
});
