<script lang="ts" setup>
import { loginHttp } from '@/api/http'
import { reactive } from 'vue';
import { Router, useRouter } from 'vue-router';
interface FormState {
  username: string;
  password: string;
  remember?: boolean;
}
const router: Router = useRouter()
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = async (values: FormState) => {
  console.log('Success:', values);
  console.log(router);
  const res = await loginHttp(formState)
  if (res.status == 201)
    localStorage.setItem('token', res.data.data)
  router.push({ path: '/' })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


</script>
<template>
  <div class="page">
    <a-form :model="formState" name="basic" :label-col="{ span: 7 }" :wrapper-col="{ span: 10 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed" class="form">
      <div class="header">admin管理系统</div>
      <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请填写账号!' }]">
        <a-input v-model:value="formState.username" class="input" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请填写用密码!' }]">
        <a-input-password v-model:value="formState.password" class="input" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 11, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">保持会话</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 5, span: 12 }">
        <a-button type="primary" html-type="submit" style="width: 360px;" danger>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('../../assets/loginBG.jpg') no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.header {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin: 20px 0 60px 0;
}

.form {
  width: 600px;
  height: 400px;
  background: rgba(255, 255, 255, .5);
  border-radius: 50px;
}

.input {
  width: 300px;
}
</style>

