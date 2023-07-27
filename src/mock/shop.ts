import Mock from "mockjs";
import { typeShopList, } from '@/type/admin'


// 定义浏览器类型数据
const shopListTypes = [
  '红米k40',
  '红米k50',
  '红米k60 pro',
  'iphonne 13',
  'iphonne 14',
  "iphonne 13 pro",
  "iphonne 13 pro max",
  "iphonne 14 pro",
  "iphonne 14 pro max",
  "iphonne 14 plus",
  "小米13",
];
let shopListData: typeShopList[] = Mock.mock({
  "list2|10": [{
    'id|+1': 1,
    "price": Math.floor(Math.random() * 1000),
    "shopClassify": '电子数码类',
    "title": Mock.Random.pick(shopListTypes),
    "operation": '',
  }]
}).list2
//随机生成数据
// for (let i = 0; i < 10; i++) {
//   let data = Mock.mock({
//     "list2|6": {
//       'id|': 1,
//       "price": Math.floor(Math.random() * 1000),
//       "shopClassify": '电子数码类',
//       "title": Mock.Random.pick(shopListTypes),
//       "operation": '',
//     }
//   });
//   data.list2.id = i + 1
//   shopListData.push(data.list2)
// }
export const mockServiceShopList = () => {
  return {
    code: 200,
    message: "请求成功",
    data: shopListData
  };
}




