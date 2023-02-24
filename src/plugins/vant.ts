import { App as VM } from "vue";
import {
	ActionSheet,
	Button,
	Calendar,
	Cell,
	CellGroup,
	Checkbox,
	CheckboxGroup,
	Col,
	ContactCard,
	ContactList,
	TimePicker,
	Dialog,
	Divider,
	DropdownItem,
	DropdownMenu,
	Empty,
	Field,
	Form,
	Icon,
	ImagePreview,
	List,
	NavBar,
	Overlay,
	Picker,
	Popup,
	PullRefresh,
	Radio,
	RadioGroup,
	Row,
	Search,
	Switch,
	Tag,
	Tab,
	Tabs,
	Toast,
	Uploader,
	Swipe,
	SwipeItem,
	Collapse,
	CollapseItem,
	Tabbar,
	TabbarItem,
	SwipeCell,
	Popover,
	Loading
} from "vant";

const plugins = [
	Button,
	List,
	Cell,
	Tabbar,
	TabbarItem,
	Icon,
	NavBar,
	Field,
	ActionSheet,
	Uploader,
	Popover,
	Tab,
	Tabs,
	Calendar,
	CellGroup,
	Checkbox,
	CheckboxGroup,
	Col,
	ContactCard,
	ContactList,
	TimePicker,
	Dialog,
	Divider,
	DropdownItem,
	DropdownMenu,
	Overlay,
	Picker,
	Popup,
	PullRefresh,
	Radio,
	RadioGroup,
	Row,
	Search,
	Switch,
	Tag,
	ImagePreview,
	Form,
	Collapse,
	CollapseItem,
	Toast,
	Loading
];

const useComponents = [Swipe, SwipeItem, SwipeCell, Empty];
export const vantPlugins = {
	install: function (vm: VM) {
		plugins.forEach(item => {
			vm.component(item.name, item);
		});
		useComponents.forEach(item => {
			vm.use(item);
		});
	}
};
