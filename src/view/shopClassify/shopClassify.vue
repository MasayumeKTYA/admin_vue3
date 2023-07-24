<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined } from '@ant-design/icons-vue';
import { Ref, ref } from 'vue'
/**
 * 表格
 */
type Key = string | number
interface DataType {
  id: number;
  title: string;
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
    title: '操作',
    dataIndex: 'operation',
    align: "center"
  },

]
const data: Ref<DataType[]> = ref([{
  id: 1,
  title: '电子数码类',
  operation: '',
},
{
  id: 2,
  title: '床上用品类',
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
/**
 * 提示
 */
interface formStateTyoe {
  title: string
}
const formState: Ref<formStateTyoe> = ref({
  title: ''
})
let isShowDel: Ref<boolean> = ref(false)
//添加
function isShow() {
  isShowDel.value = true
}
//确认添加
function isHidden() {
  isShowDel.value = false
}
//获取数据
function onFinish(value: formStateTyoe) {
  console.log(formState);
  const obj: DataType = {
    id: data.value.length + 1,
    title: value.title,
    operation: ''
  }
  data.value.push(obj)
  //数据清空
  formState.value.title = ''
  isHidden()
  console.log(data.value);

}
</script>
<template>
  <div>
    <a-button type="primary">
      <template #icon>
        <RetweetOutlined />
      </template>
    </a-button>
    <a-button type="primary" style="margin-left: 10px;" @click="isShow">添加</a-button>
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
  <!--提示框---->
  <a-modal v-model:open="isShowDel" title="添加标题" :footer="null">
    <a-form :model="formState" autocomplete="off" :label-col="{ span: 4 }" style="margin-top: 50px;" @finish="onFinish">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入内容!' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 13, span: 12 }" style="margin-top: 120px;">
        <div style="display: flex;">
          <a-button @click="isHidden">取消</a-button>
          <a-button type="primary" html-type="submit" style="margin-left: 20px;">添加</a-button>
        </div>
      </a-form-item>
    </a-form>

  </a-modal>
</template>


<style scoped></style>