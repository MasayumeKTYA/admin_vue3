import axios, { AxiosResponse } from "axios";
const url = 'http://localhost'

export async function adminPowerHttp(data: any | null) {
  const res: AxiosResponse<string, string> = await axios({
    method: 'post',
    url: `${url}/api/admin/power`,
    data,
  })
  return res
}
