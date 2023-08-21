<script setup lang="ts">
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined } from '@ant-design/icons-vue';
import { Ref, ref } from 'vue'
import { classifyHttp, addClassifyHttp } from '@/api/http'
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
const data: Ref<DataType[]> = ref([])
//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

};

//http请求
async function classify(params: any) {
  const res = await classifyHttp(params)
  console.log(res);
  data.value = res.data.data
}
classify({ page: 1 })

async function addClassify(params: any) {
  const res = await addClassifyHttp(params)
  console.log(res);

}

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
const isDel = ref(false)
//删除
const confirmDel = async () => {

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
  addClassify({ title: value.title })
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
  <!--tale表格-->
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
  <!--是否删除-->
  <a-modal v-model:open="isDel" title="提醒" cancelText="取消" okText="确定" @ok="confirmDel">
    您确定要删除吗
  </a-modal>
</template>


<style scoped></style>