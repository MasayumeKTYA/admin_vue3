/**
 * adminn
 */
export interface typeAdminPower {
  id: number,
  key: string;
  username: string;
  name: string;
  email: string;
  account: string;
  status: number
  updataTime: string
  password: string
}

export interface typeAdminLog {
  id: number;
  username: string;
  title: string;
  ip: string;
  browser: string;
  createTime: string
  operation: string
}
/**
 * shop
 */
export interface typeShopList {
  id: number;
  shopTitle: string;
  shopClassify: string;
  price: string
  operation: string
}


/**
 * 用户管理
 */
//用户订单
export interface typeUserOrderColumn {
  id: number,
  shopId: number,
  shopClassify: string,
  shopTitle: string,
  customer_name: string,
  customer_id: number,
  price: string,
  address: string,
  orderNumber: string,
}
//用户信息
export interface typeUserData {
  id: number;
  avatar: string,
  username: string,
  address: string,
  createDate: string,
  sex: string
}
//物流信息
export interface typeLogistics {
  key: number
  customer_name: string,
  customer_id: number,
  startAddress: string,
  endAddress: string,
  orderNumber: string,
  shopTitle: string,
}