import { createRouter, createWebHistory } from "vue-router";
import Index from "@/view/index/index.vue";
// 定义路由规则
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  // 添加其他路由规则
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
