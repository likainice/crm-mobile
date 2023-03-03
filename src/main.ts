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
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";

// pinia store
import pinia from "@/store/index";
// * vant 注册app.use(vantPlugins)
//import { vantPlugins } from "@/plugins/vant";
// * vant样式
import "vant/lib/index.css";
// * vant样式单位转换，配合postcss-pxtorem
import "amfe-flexible";
//所有组件
import { loadAllPlugins } from "@/plugins";

const app = createApp(App);
loadAllPlugins(app);
app.use(router).use(pinia).use(directives).mount("#app");
