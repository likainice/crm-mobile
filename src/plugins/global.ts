import { App as VM } from "vue";
import PageDivider from "@/components/PageDivider/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import SearchFilter from "@/components/SearchFilter/index.vue";
import HeaderBack from "@/components/Header/Back.vue";
import PageList from "@/components/PageList/index.vue";

const plugins = [PageDivider, SvgIcon, SearchFilter, HeaderBack, PageList];

//默认导出组件
export default function (vm: VM) {
	plugins.forEach(item => {
		vm.component(item.name, item);
	});
}
