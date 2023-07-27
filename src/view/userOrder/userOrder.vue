<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { Ref, ref, onMounted, onUnmounted, toRaw, reactive, UnwrapRef } from 'vue'
import { typeUserOrderColumn } from '@/type/admin'
import { } from '@/api/http'
import { shhopStore } from '@/state/index'
import { deepClone } from '@/tool/tool'
const store = shhopStore()

type Key = string | number

const columns: TableColumnType<typeUserOrderColumn>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center",
    sorter: true,
  }, {
    title: '用户id',
    dataIndex: 'customer_id',
    align: "center"
  }, {
    title: '购买用户',
    dataIndex: 'customer_name',
    align: "center"
  }, {
    title: '商品id',
    dataIndex: 'customer_id',
    align: "center"
  }, {
    title: '商品名称',
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
    title: '地址',
    dataIndex: 'address',
    align: "center"
  }, {
    title: '操作',
    dataIndex: 'operation',
    align: "center",
    fixed: 'right',
  }
]
const data: Ref<typeUserOrderColumn[]> = ref([{
  id: 1,
  shopId: 1,
  shopClassify: '电子数码类',
  shopTitle: '红米k40',
  customer_name: '祝涛',
  customer_id: 1,
  price: '3000',
  address: '上海市闵行区上海康城'
}])
const editableData: UnwrapRef<Record<string, typeUserOrderColumn>> = reactive({});

const edit = (key: number) => {
  editableData[key] = deepClone(data.value.filter(item => key === item.id)[0]);
};
const save = (key: number) => {
  Object.assign(data.value.filter(item => key === item.id)[0], editableData[key]);
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};
//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeUserOrderColumn[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.account === '管理员', // Column configuration not to be checked
  //   name: record.name,
  // }),
};



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
      导出excle{{ store.val }}
    </a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
    :scroll="{ x: 2000, y: tableHeight }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['address'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
            style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">Save</a-typography-link>
            <a-popconfirm title="确定取消?" @confirm="cancel(record.id)" style="margin-left: 20px;">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.id)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<style></style>