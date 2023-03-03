import { App as VM } from "vue";
import PageDivider from "@/components/PageDivider/index.vue";
const plugins = [PageDivider];
const useComponents = [];
export default function (vm: VM) {
	plugins.forEach(item => {
		vm.component(item.name, item);
	});
	useComponents.forEach(item => {
		vm.use(item);
	});
}
