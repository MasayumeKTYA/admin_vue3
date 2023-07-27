import Mock from "mockjs";
import { typeAdminLog, typeAdminPower } from '@/type'
let adminPowderData: typeAdminPower[] = []
let adminLogData: typeAdminLog[] = []

// 定义浏览器类型数据
const browserTypes = [
  'Chrome',
  'Firefox',
  'Safari',
  'IE',
  'Edge',
];
//随机生成数据
for (let i = 0; i < 50; i++) {
  let data = Mock.mock({
    'list1|7': {
      'id|+1': 1,
      "account|1-2": 1,
      "name": "@cname",
      'username': /^1(5|3|7|8)[0-9]{9}$/,
      "email": "@EMAIL",
      'status|1-2': 1,
      "lastLogin": Mock.Random.date("yyyy-MM-dd"),
    },
    "list2|6": {
      'id|+1': 1,
      "username": "@cname",
      "title": Mock.mock('@csentence(5, 10)').slice(0, 10),
      "ip": Mock.mock('@ip'),
      "browser": Mock.Random.pick(browserTypes),
      "createTime": Mock.Random.date("yyyy-MM-dd")
    }
  });
  data.list1.id = i + 1
  data.list2.id = i + 1
  adminPowderData.push(data.list1)
  adminLogData.push(data.list2)
}
export const mockServiceAdminPower = () => {
  return {
    code: 200,
    message: "请求成功",
    data: adminPowderData
  };
}
export const mockServiceAdminLog = () => {
  return {
    code: 200,
    message: "请求成功",
    data: adminLogData
  }
}



