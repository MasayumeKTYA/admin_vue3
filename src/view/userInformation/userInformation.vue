<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { RetweetOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { Ref, ref, onMounted, onUnmounted, toRaw } from 'vue'
import { typeUserData } from '@/type/index'
import { getUserDataHttp } from '@/api/http'
import { shopStore } from '@/state/index'
const store = shopStore()
type Key = string | number
const columns: TableColumnType<typeUserData>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center",
    sorter: true,
  }, {
    title: '头像',
    dataIndex: 'avatar',
    align: "center"
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: "center"
  }, {
    title: '顾客昵称',
    dataIndex: 'username',
    align: "center"
  }, {
    title: '地址',
    dataIndex: 'address',
    align: "center"
  }, {
    title: '账号创建时间',
    dataIndex: 'createDate',
    align: "center"
  }
]
const data: Ref<typeUserData[]> = ref([
  {
    id: 1,
    avatar: 'https://wechat800.oss-cn-shanghai.aliyuncs.com/yume/3cb805be_E886042_a75650be.png',
    sex: '男',
    username: '祝涛',
    address: '上海市康城区',
    createDate: '2023-07-25'
  }
])

//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeUserData[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.account === '管理员', // Column configuration not to be checked
  //   name: record.name,
  // }),
};
async function postgetUserData(page: number) {
  const res = await getUserDataHttp({ page })
  if (res.status == 201) {
    data.value = res.data.data
  }
}
postgetUserData(1)

// 定义响应式的高度
const tableHeight = ref(0);
// 监听窗口大小变化
onMounted(() => {
  const handleResize = () => {
    const windowHeight = window.innerHeight;
    const otherElementsHeight = 100; // 假设其他元素的高度为100px
    tableHeight.value = windowHeight - otherElementsHeight - 200;
    console.log(tableHeight.value, window.innerWidth);

  };

  handleResize();
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });



});



</script>
<template>
  <div>
    <a-button type="primary">
      <template #icon>
        <RetweetOutlined />
      </template>
    </a-button>
    <a-button type="primary" style="margin-left: 10px;">添加</a-button>
    <a-button type="primary" danger style="margin-left: 10px;">删除</a-button>
    <a-button type="primary" style="margin-left: 10px;" @click="store.exportExcel(toRaw(data), columns)">
      <template #icon>
        <DownloadOutlined />
      </template>
      导出
    </a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
    :scroll="{ x: 1000, y: tableHeight }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'avatar'">
        <img :src="record.avatar" style="height: 40px;width: 40px;" />
      </template>
      <template v-if="column.dataIndex === 'sex'">
        <div v-if="record.sex == 1">男</div>
        <div v-else>女</div>
      </template>
    </template>

  </a-table>
</template>
<style></style>@/type