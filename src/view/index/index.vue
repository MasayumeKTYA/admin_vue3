<script setup lang="ts">
import { reactive, watch, h, ref, VNode } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  UserOutlined,
  ProfileOutlined,
  AreaChartOutlined,
  LineChartOutlined,
  ShoppingOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';
import router from '@/router';
console.log(router.options.routes);
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
const items = reactive([
  {
    key: 'sub1',
    icon: (): VNode => h(SolutionOutlined),
    label: '权限管理',
    title: '权限管理',
    children: [
      {
        key: '1',
        icon: (): VNode => h(UserOutlined),
        label: '管理员管理',
        title: '管理员管理',
        route: 'powerAdmin',
      },
      {
        key: '2',
        icon: (): VNode => h(ProfileOutlined),
        label: '管理员日志',
        title: '管理员日志',
        route: 'powerLog',
      }
    ],
  },
  {
    key: 'sub2',
    icon: (): VNode => h(AreaChartOutlined),
    label: '数据分析',
    title: '数据分析',
    children: [
      {
        key: '3',
        icon: (): VNode => h(LineChartOutlined),
        label: '销售数据',
        title: '销售数据',
      },
    ],
  },
  {
    key: 'sub3',
    icon: (): VNode => h(ShoppingOutlined),
    label: '商品管理',
    title: '商品管理',
    children: [
      {
        key: '4',
        icon: (): VNode => h(AlignLeftOutlined),
        label: '商品分类',
        title: '商品分类',
        route: 'shopClassify',
      }, {
        key: '5',
        icon: (): VNode => h(AlignCenterOutlined),
        label: '商品列表',
        title: '商品列表',
        route: 'shopList',
      }
    ]
  }
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
//菜单放缩
const collapsed = ref<boolean>(false);
const menuShow = () => {
  collapsed.value = true
}
const menuHiden = () => {
  collapsed.value = false
}
//面包屑
interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
//面包屑
const routes = ref<Route[]>([]);
//前往各自的路由
const toRouter = (e: any) => {
  console.log(e);
  const route: string = e.item.route
  const breadObject: Route = {
    path: e.item.route,
    breadcrumbName: e.item.title
  }
  routes.value.push(breadObject)
  router.push({ name: route })
  console.log(routes);

}
//登出
function logout() {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}


</script>
<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="admin_box" v-show="!collapsed">
        <a-avatar src="https://wechat800.oss-cn-shanghai.aliyuncs.com/yume/3cb805be_E886042_a75650be.png" :size="44" />
        <div class="admin">
          <div class="admin_name">admin</div>
          <div class="admin_status">
            <div class="status_cirlce"></div>
            <div class="status_font">在线</div>
          </div>
        </div>
      </div>
      <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="state.collapsed" :items="items" @click="toRouter"></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout_header">
        <menu-unfold-outlined v-if="collapsed" @click="menuHiden" />
        <menu-fold-outlined v-else @click="menuShow" />
        <a-breadcrumb class="breadcrumb_box" :routes="routes">
          <template #itemRender="{ route, routes }">
            <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
            <router-link v-else :to="{ name: route.path }">{{ route.breadcrumbName }}</router-link>
          </template>

        </a-breadcrumb>
        <div class="logout" @click="logout">
          <LogoutOutlined class="logout_icon" />
          <div class="logout_font">登出</div>
        </div>

      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template> 

<style scoped>
@import '../../style/index/index.css'
</style>
