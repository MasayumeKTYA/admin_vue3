<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined } from '@ant-design/icons-vue';
import { Ref, ref } from 'vue'
type Key = string | number
interface DataType {
  id: number;
  title: string;
  shopClassify: string;
  price: string
  operation: string
}
const columns: TableColumnType<DataType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center",
    sorter: true,

  }, {
    title: '标题',
    dataIndex: 'title',
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
const data: Ref<DataType[]> = ref([{
  id: 1,
  title: '红米k40',
  shopClassify: '电子数码类',
  price: '30.00',
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
  <div>
    <a-button type="primary">
      <template #icon>
        <RetweetOutlined />
      </template>
    </a-button>
    <a-button type="primary" style="margin-left: 10px;">添加</a-button>
    <a-button type="primary" danger style="margin-left: 10px;">删除</a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;">
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
<style scoped></style>