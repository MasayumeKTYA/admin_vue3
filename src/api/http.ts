import axios, { AxiosResponse } from "axios";
const url = 'http://localhost'

export async function adminPowerHttp(data: any | null) {
  const res: AxiosResponse<any> = await axios({
    method: 'post',
    url: `${url}/api/admin/power`,
    data,
  })
  return res
}
export async function adminLogHttp(data: any) {
  const res: AxiosResponse<any> = await axios({
    method: 'post',
    url: `${url}/api/admin/log`,
    data,
  })
  return res
}
