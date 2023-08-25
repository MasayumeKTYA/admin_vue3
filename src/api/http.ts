import axios, { AxiosResponse } from "axios";
axios.defaults.headers.common['token'] = localStorage.getItem('token')
import router from '@/router';
axios.defaults.baseURL = 'http://192.168.3.117:8080'
// const url = 'http://localhost:8080'

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做些什么
    return response;
  },
  function (error) {
    // 处理响应错误
    if (error.response.status == 401) {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }
    console.log(error);

    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.token = localStorage.getItem('token'); // 添加身份验证头部
    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  }
);
async function request(param: any): Promise<AxiosResponse<any, any>> {
  const res: AxiosResponse = await axios(param)
  return res
}


/**
 *  添加管理员
 * @param data 
 * @returns 
 */
export async function addAdminrHttp(data: any | null) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/addAdmin`,
    url: `/api/admin/addAdmin`,
    data,
  })
  return res
}
/**
 *  管理员列表
 * @param data 
 * @returns 
 */
export async function AdminListHttp(data: any | null) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/addAdmin`,
    url: `/api/admin/adminList`,
    data,
  })
  return res
}
/**
 *  管理日志
 * @param data 
 * @returns 
 */
export async function adminLogHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/log`,
    url: `/api/admin/log`,
    data,
  })
  return res
}
/**
 *  登录
 * @param data 
 * @returns 
 */
export async function loginHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/login`,
    url: `/api/admin/login`,
    data,
  })
  return res
}
/**
 *  删除用户
 * @param data 
 * @returns 
 */
export async function delAdminHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/delAdmin`,
    url: `/api/admin/delAdmin`,
    data,
  })
  return res
}
/**
 *  修改 管理
 * @param data 
 * @returns 
 */
export async function updataAdminHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/updataAdmin`,
    url: `/api/admin/updataAdmin`,
    data,
  })
  return res
}
/**
 *  个人修改 
 * @param data 
 * @returns 
 */
export async function modifyPersonHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/admin/modifyPerson`,
    data,
  })
  return res
}

//商品添加
/**
 *  商品分类列表报
 * @param data 
 * @returns 
 */
export async function classifyHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/findClassify`,
    data,
  })
  return res
}

/**
 * 添加商品分类列
 * @param data 
 * @returns 
 */
export async function addClassifyHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/addClassify`,
    data,
  })
  return res
}
/**
 * 删除商品分类列
 * @param data 
 * @returns 
 */
export async function delClassifyHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/delClassify`,
    data,
  })
  return res
}
/**
 * 修改商品分类列
 * @param data 
 * @returns 
 */
export async function modifyClassifyHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/updataClassify`,
    data,
  })
  return res
}
/**
 *  商品列表
 * @param data 
 * @returns 
 */
export async function shopListHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/findShop`,
    data,
  })
  return res
}
/**
 *  修改商品列表
 * @param data 
 * @returns 
 */
export async function updataShopList(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/updataShop`,
    data,
  })
  return res
}
/**
 *  添加商品列表
 * @param data 
 * @returns 
 */
export async function addShopList(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/addShop`,
    data,
  })
  return res
}
/**
 *  删除商品列表
 * @param data 
 * @returns 
 */
export async function delShopList(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/shop/delShop`,
    data,
  })
  return res
}
/**
 *  用户性别人数
 * @param data 
 * @returns 
 */
export async function userSexHttp() {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/user/getSex`,

  })
  return res
}
/**
 *  用户购买商品类型
 * @param data 
 * @returns 
 */
export async function userBuyTypeHttp() {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/user/findUserAndClass`,

  })
  return res
}


/**
 *  获取用户信息
 * @param data 
 * @returns 
 */
export async function getUserDataHttp(data: any) {
  const res: AxiosResponse = await request({
    method: 'post',
    // url: `${url}/api/admin/modifyPerson`,
    url: `/api/user/findUser`,
    data,
  })
  return res
}