<script setup lang="ts">
import { reactive, watch, h, ref } from 'vue';
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
  AlignCenterOutlined
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
    icon: () => h(SolutionOutlined),
    label: '权限管理',
    title: '权限管理',
    children: [
      {
        key: '1',
        icon: () => h(UserOutlined),
        label: '管理员管理',
        title: '管理员管理',
        route: 'powerAdmin',
      },
      {
        key: '2',
        icon: () => h(ProfileOutlined),
        label: '管理员日志',
        title: '管理员日志',
        route: 'powerLog',
      }
    ],
  },
  {
    key: 'sub2',
    icon: () => h(AreaChartOutlined),
    label: '数据分析',
    title: '数据分析',
    children: [
      {
        key: '3',
        icon: () => h(LineChartOutlined),
        label: '销售数据',
        title: '销售数据',
      },
    ],
  },
  {
    key: 'sub3',
    icon: () => h(ShoppingOutlined),
    label: '商品管理',
    title: '商品管理',
    children: [
      {
        key: '4',
        icon: () => h(AlignLeftOutlined),
        label: '商品分类',
        title: '商品分类',
      }, {
        key: '5',
        icon: () => h(AlignCenterOutlined),
        label: '商品列表',
        title: '商品列表',
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

const collapsed = ref<boolean>(false);
const menuShow = () => {
  collapsed.value = true
}
const menuHiden = () => {
  collapsed.value = false
}
const toRouter = (e: any) => {
  console.log(e);
  const route: string = e.item.route
  router.push({ name: route })

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
            <div class="cirlce"></div>
            <div>在线</div>
          </div>
        </div>
      </div>
      <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="state.collapsed" :items="items" @click="toRouter"></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;display: flex;align-items: center;">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="menuHiden" />
        <menu-fold-outlined v-else class="trigger" @click="menuShow" />
        <a-breadcrumb class="breadcrumb_box">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
        </a-breadcrumb>
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
