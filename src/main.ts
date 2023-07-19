import { createApp } from "vue";
import "./style/style.css";
import {
  Form, Layout, Avatar, Breadcrumb,
  Menu, Checkbox, Button, Input
} from "ant-design-vue";
import App from "./App.vue";
//路由
import router from "./router";
//状态管理
import { createPinia } from "pinia";
const app = createApp(App);

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const requiresAuth = to.meta.requiresAuth; // 获取路由元字段

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // 路由需要身份验证但用户未经过身份验证，重定向到登录页
  } else {
    next(); // 其他情况允许导航
  }
});

app.use(Form)
  .use(Layout)
  .use(Avatar)
  .use(Breadcrumb)
  .use(Menu)
  .use(Checkbox)
  .use(Button)
  .use(Input)
  .use(router)
  .use(createPinia())
  .mount("#app");
