import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import Index from "@/view/index/index.vue";
import Login from '@/view/login/login.vue'

// 定义路由规则
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: { requiresAuth: true },// 添加 requiresAuth 元字段表示该路由需要进行身份验证
    redirect: { name: 'powerAdmin' },
    children: [
      {
        path: "powerAdmin",
        name: "powerAdmin",
        component: () => import('../view/powerAdmin/powerAdmin.vue'),
      }, {
        path: "powerLog",
        name: "powerLog",
        component: () => import('../view/powerLog/powerLog.vue'),
      }, {
        path: "shopClassify",
        name: "shopClassify",
        component: () => import('../view/shopClassify/shopClassify.vue'),
      },
      {
        path: "shopList",
        name: "shopList",
        component: () => import('../view/shopList/shopList.vue'),
      },
      {
        path: "saleData",
        name: "saleData",
        component: () => import('../view/saleData/saleData.vue'),
      }, {
        path: "userData",
        name: "userData",
        component: () => import('../view/userData/userData.vue'),
      },
      {
        path: "userOrder",
        name: "userOrder",
        component: () => import('../view/userOrder/userOrder.vue'),
      }, {
        path: "logistics",
        name: "logistics",
        component: () => import('../view/logistics/logistics.vue'),
      },
      {
        path: "userInformation",
        name: "userInformation",
        component: () => import('../view/userInformation/userInformation.vue'),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // 添加其他路由规则
];

// 创建 router 实例
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
