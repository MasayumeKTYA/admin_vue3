<script setup lang="ts">
import { type TableProps, type TableColumnType, notification, } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, RetweetOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { Ref, ref, onMounted, onUnmounted, toRaw, reactive } from 'vue'
import { typeShopList } from '@/type/index'
import {
  shopListHttp,//列表
  delShopList,//删除
  addShopList,//添加
  updataShopList,//修改
} from '@/api/http'
import { shopStore } from '@/state/index'
const store = shopStore()
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
//请求
async function postShopList(postData: any) {
  const res = await shopListHttp(postData)
  console.log(res);
  data.value = res.data.data
  console.log(res.data.data);

}
postShopList({ page: 1 })

const isDel = ref(false)
let delIndex = ref(0)
let clickId = ref(0)
//删除
function getCurrentIndex(index: number) {
  console.log(data.value[index].id);
  clickId.value = data.value[index].id
  delIndex.value = index
  isDel.value = true
}
//确定删除
async function confirmDel() {
  const res = await delShopList({ id: clickId.value })
  if (res.status == 201) {
    isDel.value = false
    data.value.splice(delIndex.value, 1)
    notification.success({ message: '删除成功', duration: 2 })
  }
  isDel.value = false
}
//添加
const isAddShopList = ref(false)
const addState = reactive({
  shopTitle: '',
  shopClassify: '',
  price: 0
})
function addHide() {
  isAddShopList.value = false
}
function addShow() {
  isAddShopList.value = true
}
async function confirmAdd() {
  addState.price = Number(addState.price)

  const res = await addShopList(addState)
  console.log(res);
  if (res.status == 201) {
    addHide()
    notification.success({ message: '添加成功', duration: 2 })
    postShopList({ page: 1 })
  }
}


//修改
const isModify = ref(false)
const updataState = reactive({
  shopTitle: '',
  shopClassify: '',
  price: 0
})
const updataID = ref(0)
function modifyHide() {
  isModify.value = false
}
function modifyShow(index: number) {
  isModify.value = true

  //赋值过程
  updataState.shopClassify = data.value[index].shopClassify
  updataState.shopTitle = data.value[index].shopTitle
  updataState.price = Number(data.value[index].price)
  updataID.value = data.value[index].id
}
//确定修改
async function confirmUpdata() {

  const params = { ...updataState, id: updataID.value }
  const res = await updataShopList(params)
  if (res.status == 201) {
    notification.success({ message: '修改成功', duration: 2 })
    modifyHide()
    postShopList({ page: 1 })
  }

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
    <a-button type="primary" style="margin-left: 10px;" @click="addShow">添加</a-button>
    <a-button type="primary" danger style="margin-left: 10px;">删除</a-button>
    <a-button type="text" style="margin-left: 10px;" @click="store.exportExcel(toRaw(data), columns)">
      <template #icon>
        <DownloadOutlined />
      </template>
      导出excle
    </a-button>
  </div>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" style="margin-top: 10px;"
    :scroll="{ x: 1000, y: tableHeight }">
    <template #bodyCell="{ column, index }">
      <template v-if="column.dataIndex === 'operation'">
        <a-button type="primary" style="margin-left: 20px;" @click="modifyShow(index)">
          <template #icon>
            <EditOutlined />
          </template>
        </a-button>
        <a-button type="primary" danger style="margin-left: 20px;" @click="getCurrentIndex(index)">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </template>
    </template>
  </a-table>
  <!--是否删除-->
  <a-modal v-model:open="isDel" title="提醒" cancelText="取消" okText="确定" @ok="confirmDel">
    您确定要删除吗
  </a-modal>
  <!--添加-->
  <a-modal v-model:open="isAddShopList" :footer="null">
    <a-form :model="addState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="confirmAdd">
      <a-form-item label="标题" name="shopTitle" :rules="[{ required: true, message: '请输入标题!' }]">
        <a-input v-model:value="addState.shopTitle" />
      </a-form-item>

      <a-form-item label="商品品类" name="shopClassify" :rules="[{ required: true, message: '请输入商品品类!' }]">
        <a-input v-model:value="addState.shopClassify" />
      </a-form-item>

      <a-form-item label="价格" name="price" :rules="[{ required: true, message: '请输入价格!' }]">
        <a-input v-model:value="addState.price" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 13, span: 12 }">
        <div style="display: flex;">
          <a-button @click="addHide">取消</a-button>
          <a-button type="primary" html-type="submit" style="margin-left: 20px;">添加</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
  <!--修改-->
  <a-modal v-model:open="isModify" :footer="null">
    <a-form :model="updataState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="confirmUpdata">
      <a-form-item label="标题" name="shopTitle" :rules="[{ required: true, message: '请输入标题!' }]">
        <a-input v-model:value="updataState.shopTitle" />
      </a-form-item>

      <a-form-item label="商品品类" name="shopClassify" :rules="[{ required: true, message: '请输入商品品类!' }]">
        <a-input v-model:value="updataState.shopClassify" />
      </a-form-item>

      <a-form-item label="价格" name="price" :rules="[{ required: true, message: '请输入价格!' }]">
        <a-input v-model:value="updataState.price" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 13, span: 12 }">
        <div style="display: flex;">
          <a-button @click="modifyHide">取消</a-button>
          <a-button type="primary" html-type="submit" style="margin-left: 20px;">修改</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style scoped></style>@/type