<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined } from "@ant-design/icons-vue"
import { Ref, ref, onMounted, onUnmounted } from 'vue'
import { notification } from 'ant-design-vue';
import { adminLogHttp } from '@/api/http'
import { typeAdminLog } from '@/type/admin'

type Key = string | number

const columns: TableColumnType<typeAdminLog>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
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
    align: "center"
  },

]
const data: Ref<typeAdminLog[]> = ref([{
  id: 1,
  username: 'admin',
  title: '登录',
  ip: '127.0.0.1',
  browser: 'sdasds',
  createTime: '2023-07-21',
  operation: '',
}])

//删除当列
let isShowDel: Ref<boolean> = ref(false)
let currentIndex: number = 0
function DeleteColumn(index: number) {
  isShowDel.value = true
  currentIndex = index
}
function confirmDel() {
  data.value.splice(currentIndex, 1)
  isShowDel.value = false
  notification.success({ message: '删除成功', duration: 2 })
}
//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeAdminLog[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: typeAdminLog) => ({
  //   disabled: record.account === '管理员', // Column configuration not to be checked
  //   name: record.name,
  // }),
};


/**
 * 请求
 */
async function postAdminLog(page: any) {
  const res = await adminLogHttp(page)
  console.log(res);
  data.value = res.data.data
}
postAdminLog({ page: 1 })
// 定义响应式的高度
const tableHeight = ref(0);
// 监听窗口大小变化
onMounted(() => {
  const handleResize = () => {
    const windowHeight = window.innerHeight;
    const otherElementsHeight = 100; // 假设其他元素的高度为100px
    tableHeight.value = windowHeight - otherElementsHeight - 200;
    console.log(tableHeight.value);

  };

  handleResize();
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>
<template>
  <div class="page">
    <div>
      <a-button type="primary" danger>删除</a-button>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
      :scroll="{ x: 1500, y: tableHeight }">
      <template #bodyCell="{ column, index }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="primary" danger style="margin-left: 20px;" @click="DeleteColumn(index)">
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </template>
      </template>
    </a-table>
    <!--弹出-->
    <a-modal v-model:open="isShowDel" title="提醒" cancelText="取消" okText="确定" @ok="confirmDel">
      您确定要删除吗
    </a-modal>
  </div>
</template>
<style scoped>
@import '../../style/powerLog/powerLog.css';
</style>@/type