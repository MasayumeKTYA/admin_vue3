import { createRouter, createWebHistory } from "vue-router";
import Index from "@/view/index/index.vue";
import Login from '@/view/login/login.vue'
// 定义路由规则
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: { requiresAuth: true } // 添加 requiresAuth 元字段表示该路由需要进行身份验证
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // 添加其他路由规则
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
