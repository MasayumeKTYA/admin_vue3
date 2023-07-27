<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { Ref, ref, onMounted, onUnmounted, toRaw } from 'vue'
import { typeShopList } from '@/type/admin'
import { shopListHttp } from '@/api/http'
import { shhopStore } from '@/state/index'
const store = shhopStore()
console.log(store);

type Key = string | number

const columns: TableColumnType<typeShopList>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center",
    sorter: true,
  }, {
    title: '标题',
    dataIndex: 'shopTitle',
    align: "center"
  }, {
    title: '商品品类',
    dataIndex: 'shopClassify',
    align: "center"
  }, {
    title: '价格',
    dataIndex: 'price',
    align: "center"
  }, {
    title: '操作',
    dataIndex: 'operation',
    align: "center"
  }
]
const data: Ref<typeShopList[]> = ref([])

//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeShopList[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.account === '管理员', // Column configuration not to be checked
  //   name: record.name,
  // }),
};
async function postShopList(postData: any) {
  const res = await shopListHttp(postData)
  console.log(res);
  data.value = res.data.data
  console.log(res.data.data);

}
postShopList({ page: 1 })



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
    <a-button type="text" style="margin-left: 10px;" @click="store.exportExcel(toRaw(data), columns)">
      <template #icon>
        <DownloadOutlined />
      </template>
      导出excle{{ store.val }}
    </a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
    :scroll="{ x: 1000, y: tableHeight }">
    <template #bodyCell="{ column }">
      <template v-if="column.dataIndex === 'operation'">
        <a-button type="primary" style="margin-left: 20px;">
          <template #icon>
            <EditOutlined />
          </template>
        </a-button>
        <a-button type="primary" danger style="margin-left: 20px;">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </template>
    </template>
  </a-table>
</template>
<style scoped></style>@/type