<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { RetweetOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Ref, ref, onMounted, onUnmounted, toRaw, reactive, } from 'vue'
import { typeLogistics } from '@/type/index'
import { } from '@/api/http'
import { shopStore } from '@/state/index'


const store = shopStore()

type Key = string | number

const columns: TableColumnType<typeLogistics>[] = [{
  title: '商品编号',
  dataIndex: 'orderNumber',
  align: "center",
  filterSearch: true,
  filters: [
    {
      text: '202306070001',
      value: '202306070001',
    },
    {
      text: '202306070002',
      value: '202306070002',
    },
  ],
  onFilter: (value, record) => record.orderNumber.startsWith(String(value)),
  customFilterDropdown: true,
}, {
  title: '祝涛',
  dataIndex: 'customer_name',
  align: "center",
}, {
  title: '用户id',
  dataIndex: 'customer_id',
  align: "center"
}, {
  title: '发货地',
  dataIndex: 'startAddress',
  align: "center"
}, {
  title: '收货地',
  dataIndex: 'endAddress',
  align: "center"
}, {
  title: '商品名称',
  dataIndex: 'shopTitle',
  align: "center"
},
]
const data: Ref<typeLogistics[]> = ref([{
  key: 1,
  orderNumber: '202306070001',
  customer_name: '祝涛',
  customer_id: 1,
  startAddress: '上海市闵行区吴泾',
  endAddress: '上海市闵行区莘庄',
  shopTitle: '红米k40',
}, {
  key: 2,
  orderNumber: '202306070002',
  customer_name: '测试',
  customer_id: 1,
  startAddress: '上海市闵行区吴泾',
  endAddress: '上海市闵行区莘庄',
  shopTitle: '红米k40',

}])


//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeLogistics[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

};
const search = reactive({
  searchText: '',
  searchedColumn: '',
})
//重置
function handleReset(clearFilters: (arg0: { confirm: boolean; }) => void) {
  clearFilters({ confirm: true });
  search.searchText = ''
}
//搜索
function handleSearch(selectedKeys: string[], confirm: () => void, dataIndex: string) {
  confirm();
  search.searchText = selectedKeys[0];
  search.searchedColumn = dataIndex;
}
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
    <a-button type="primary" style="margin-left: 10px;" @click="store.exportExcel(toRaw(data), columns)">
      <template #icon>
        <DownloadOutlined />
      </template>
      导出
    </a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
    :scroll="{ x: 2000, y: tableHeight }">
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input placeholder="请输入搜索" :value="selectedKeys[0]"
          @change="(e: any) => { setSelectedKeys(e.target.value ? [e.target.value] : []) }"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          style="width: 188px; margin-bottom: 8px; display: block" />
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          重置
        </a-button>
      </div>
    </template>
  </a-table>
</template>
<style></style>@/type