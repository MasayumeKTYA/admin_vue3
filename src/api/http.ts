import axios, { AxiosResponse } from "axios";
axios.defaults.headers.common['token'] = localStorage.getItem('token')
import router from '@/router';
axios.defaults.baseURL = 'http://localhost:8080'
// const url = 'http://localhost:8080'

async function request(param: any): Promise<AxiosResponse<any, any>> {
  const res: AxiosResponse = await axios(param)
  if (res.status == 401) {
    router.push({ name: "index" })
  }
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