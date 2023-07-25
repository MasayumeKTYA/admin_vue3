export interface typeAdminPower {
  key: string;
  username: string;
  name: string;
  email: string;
  account: string;
  status: number
  lastLogin: string
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