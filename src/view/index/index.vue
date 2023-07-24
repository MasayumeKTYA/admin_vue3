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
import { useRoute, } from 'vue-router';
const route = useRoute()

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
        route: 'saleData',
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
  // icon: VNode
  isExit: boolean
}
//面包屑
const routes = ref<Route[]>([
  {
    path: 'powerAdmin',
    breadcrumbName: '管理员管理',
    isExit: false
  }
]);
//前往各自的路由
const toRouter = (e: any) => {
  console.log(e);
  const route: string = e.item.route
  const breadObject: Route = {
    path: e.item.route,
    breadcrumbName: e.item.title,
    //icon: e.item.icon
    isExit: true
  }
  let flag: boolean = !routes.value.some(item => item.path == e.item.route)
  console.log(flag);
  if (flag) {
    routes.value.push(breadObject)
  }

  //路由切换
  router.push({ name: route })
}
//头部路由删除
function close(index: number) {
  //获取删除的路由页面值
  let routeName: string = routes.value[index].path
  //删除
  routes.value.splice(index, 1)
  //判断当前页面路由
  if (route.name == routeName) {
    //切换
    router.push({ name: routes.value[routes.value.length - 1].path })
  }

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
        <HeaderRouyer :routes="routes" @close="close" />
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
