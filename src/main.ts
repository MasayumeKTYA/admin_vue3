import { createApp } from "vue";
import "./style/style.css";
import Antd from "ant-design-vue";
import App from "./App.vue";
//路由
import router from "./router";
//状态管理
import { createPinia } from "pinia";
const app = createApp(App);

app.use(Antd)
.use(router).use(createPinia()).mount("#app");
