import { createApp } from "vue";
import "./style/style.css";
//antd 组件
import {
  Form, Layout, Avatar,
  Menu, Checkbox, Button, Pagination,
  Input, PageHeader,
  Table, Modal, Select,
  Popconfirm, Typography
} from "ant-design-vue";
//自定义组件
import HeaderRouyer from '@/components/HeaderRouyer.vue'
import App from "./App.vue";
//路由
import router from "./router";
//状态管理
import { createPinia } from "pinia";
import '@/mock/mock'
const app = createApp(App);

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated: boolean = !!token;
  const requiresAuth = to.meta.requiresAuth; // 获取路由元字段

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // 路由需要身份验证但用户未经过身份验证，重定向到登录页
  } else {
    next(); // 其他情况允许导航
  }
});
app.component('HeaderRouyer', HeaderRouyer)
app.use(Form)
  .use(Layout)
  .use(Avatar)
  .use(Menu)
  .use(Checkbox)
  .use(Button)
  .use(Input)
  .use(router)
  .use(Pagination)
  .use(PageHeader)
  .use(Table)
  .use(Modal)
  .use(Select)
  .use(Popconfirm)
  .use(Typography)
  .use(createPinia())
  .mount("#app");
