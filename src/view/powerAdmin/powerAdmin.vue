<script setup lang="ts">
import { RetweetOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons-vue"
import { reactive, ref, Ref, onMounted, onUnmounted } from 'vue'
import type { TableProps, TableColumnType, } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import {
  AdminListHttp,
  addAdminrHttp,
  delAdminHttp,
  updataAdminHttp
} from '@/api/http'
import { typeAdminPower } from '@/type/index'
type Key = string | number

const columns: TableColumnType<typeAdminPower>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '昵称',
    dataIndex: 'name',
  }, {
    title: '账号性质',
    dataIndex: 'account',

  }, {
    title: '电子邮箱',
    dataIndex: 'email',
  }, {
    title: '状态',
    dataIndex: 'status',
  }, {
    title: '最后登录',
    dataIndex: 'updataTime',
  }, {
    title: '操作',
    dataIndex: 'operation',
    align: "center"
  },
];
const data: Ref<typeAdminPower[]> = ref([]);
//多列选项
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[], selectedRows: typeAdminPower[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: typeAdminPower) => ({
    disabled: record.account === '管理员',
    name: record.name,
  }),
};
//删除单列
let isShowDel: Ref<boolean> = ref(false)
let currentIndex: number = 0
const DeleteColumn = (index: number) => {
  // data.value.splice(index, 1)
  isShowDel.value = true
  currentIndex = index
}
const confirmDel = async () => {
  const params = { id: data.value[currentIndex].id }
  const res = await delAdminHttp(params)
  console.log(res);
  if (res.status == 201) {
    data.value.splice(currentIndex, 1)
    isShowDel.value = false
    notification.success({ message: '删除成功', duration: 2 })
  }
}
//添加用户
let addUser: Ref<boolean> = ref(false)
const add = () => {
  addUser.value = true
}
//添加用户弹出表单
interface FormState {
  username: string;
  name: string;
  account: any;
  password: string
  email: string
  id?: number
}
let formState = reactive({
  username: '',
  name: '',
  account: '',
  password: '',
  email: '',
})


const onFinishFailed = (errorInfo: any) => {
  console.log(errorInfo);
}
//确定添加
const confirmaddUesr = async (values: FormState) => {
  values.account = values.account == '管理员' ? 1 : 2
  console.log(values);
  const res = await addAdminrHttp(values)
  console.log(res);
  if (res.status == 201) {
    postList({ page: 1 })
    cancleForm()
    notification.success({ message: '添加成功', duration: 2 })
  }
}
//取消添加
const cancleForm = () => {
  addUser.value = false
}

//修改
//修改弹窗的是否显示
let updataUser = ref(false)
let updataState = reactive({
  id: 0,
  username: '',
  name: '',
  account: '',
  password: '',
  email: '',
})
function updataColumn(index: number) {
  updataState.id = data.value[index].id
  updataState.username = data.value[index].username
  updataState.name = data.value[index].name
  updataState.account = data.value[index].account
  updataState.password = data.value[index].password
  updataState.email = data.value[index].email

  updataUser.value = true
}
//取消修改
function updataHide() {
  updataUser.value = false
}
async function confirmUpdataUesr(values: FormState) {
  values.account = values.account == '管理员' ? 1 : 2
  console.log(values);
  values.id = updataState.id
  const res = await updataAdminHttp(values)
  console.log(res);
  if (res.status == 201) {
    //关闭弹出框
    updataHide()
    postList({ page: 1 })
    cancleForm()
    notification.success({ message: '修改成功', duration: 2 })
  }
}

//请求列表
async function postList(params: any) {
  const res = await AdminListHttp(params)
  console.log(res);
  data.value = res.data.data
}
postList({ page: 1 })

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
  <div class="page">
    <div>
      <a-button type="primary">
        <template #icon>
          <RetweetOutlined />
        </template>
      </a-button>
      <a-button type="primary" class="btnRight" @click="add">添加</a-button>
      <a-button type="primary" class="btnRight" danger>删除</a-button>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" :scroll="{ x: 1500, y: tableHeight }">
      <template #bodyCell="{ record, column, index }">
        <template v-if="column.dataIndex === 'status'">
          <div class="admin_status" v-if="record.status == 1">
            <div class="status_cirlce"></div>
            <div class="status_font">在线</div>
          </div>
          <div class="admin_status" v-else>
            <div class="status_cirlce_none"></div>
            <div class="status_font_none">离线</div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="primary" @click="updataColumn(index)">
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
          <a-button type="primary" danger style="margin-left: 20px;" @click="DeleteColumn(index)">
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </template>
        <template v-if="column.dataIndex === 'account'">
          <div class="admin_status" v-if="record.account == 1">

            <div class="status_font">管理员</div>
          </div>
          <div class="admin_status" v-else>

            <div class="status_font_none">普通用户</div>
          </div>
        </template>
      </template>
    </a-table>
    <!-- <a-pagination v-model:current="current" :total="data.length" style="margin-top: 20px;" /> -->
    <!--提示框-->
    <a-modal v-model:open="isShowDel" title="提醒" cancelText="取消" okText="确定" @ok="confirmDel">
      您确定要删除吗
    </a-modal>
    <!--添加-->
    <a-modal v-model:open="addUser" :footer="null">
      <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="confirmaddUesr" @finishFailed="onFinishFailed">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱!' }]">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="账号性质" name="account" :rules="[{ required: true, message: '请选择账号性质!' }]">
          <a-select v-model:value="formState.account" placeholder="请选择...">
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="测试账号">测试账号</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 13, span: 12 }">
          <div style="display: flex;">
            <a-button @click="cancleForm">取消</a-button>
            <a-button type="primary" html-type="submit" style="margin-left: 20px;">添加</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--修改-->
    <a-modal v-model:open="updataUser" :footer="null">
      <a-form :model="updataState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="confirmUpdataUesr" @finishFailed="onFinishFailed">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="updataState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input v-model:value="updataState.password" />
        </a-form-item>

        <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱!' }]">
          <a-input v-model:value="updataState.email" />
        </a-form-item>

        <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
          <a-input v-model:value="updataState.name" />
        </a-form-item>

        <a-form-item label="账号性质" name="account" :rules="[{ required: true, message: '请选择账号性质!' }]">
          <a-select v-model:value="updataState.account" placeholder="请选择...">
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="测试账号">测试账号</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 13, span: 12 }">
          <div style="display: flex;">
            <a-button @click="updataHide">取消</a-button>
            <a-button type="primary" html-type="submit" style="margin-left: 20px;">添加</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style scoped>
@import '../../style/powerAdmin/powerAdmin.css';
</style>@/type