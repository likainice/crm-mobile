import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// CSS index
import "@/styles/index.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";

// pinia store
import pinia from "@/store/index";
// * vant
import { vantPlugins } from "@/plugins/vant";
// * vant样式
import "vant/lib/index.css";

const app = createApp(App);

app.use(router).use(pinia).use(directives).use(ElementPlus).use(vantPlugins).mount("#app");
