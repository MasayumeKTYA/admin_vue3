<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { Ref, ref } from 'vue'
type Key = string | number
interface DataType {
  id: number;
  username: string;
  title: string;
  ip: string;
  browser: string;
  createTime: string
  operation: string
}
const columns: TableColumnType<DataType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: 'IP',
    dataIndex: 'ip',
  }, {
    title: 'Browser',
    dataIndex: 'browser',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
  }, {
    title: '操作',
    dataIndex: 'operation',
  },

]
const data: Ref<DataType[]> = ref([{
  id: 1,
  username: 'admin',
  title: '登录',
  ip: '127.0.0.1',
  browser: 'sdasds',
  createTime: '2023-07-21',
  operation: '',
}])
//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.account === '管理员', // Column configuration not to be checked
  //   name: record.name,
  // }),
};
</script>
<template>
  <div class="page">
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data"></a-table>
  </div>
</template>
<style scoped>
@import '../../style/powerLog/powerLog.css';
</style>