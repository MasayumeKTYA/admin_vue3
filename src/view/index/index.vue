<script setup lang="ts">
import { reactive, watch, h, ref } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  AppstoreOutlined,
  UserOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue';
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
        key: '5',
        icon: () => h(UserOutlined),
        label: '管理员管理',
        title: '管理员管理',
      },
      {
        key: '6',
        icon: () => h(ProfileOutlined),
        label: '管理员日志',
        title: '管理员日志',
      }
    ],
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        title: 'Submenu',

      },
    ],
  },
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);

const collapsed = ref<boolean>(false);
</script>
<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="admin_box">
        <a-avatar src="https://wechat800.oss-cn-shanghai.aliyuncs.com/yume/3cb805be_E886042_a75650be.png" :size="44" />
        <div class="adminx"></div>
      </div>
      <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="state.collapsed" :items="items"></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template> 

<style scoped>
@import '../../style/index/index.css'
</style>
