import Mock from 'mockjs'
import { mockServiceAdminPower, mockServiceAdminLog } from './admin'
import { mockServiceShopList } from './shop'

Mock.mock(/api\/admin\/power/, 'post', mockServiceAdminPower)
Mock.mock(/api\/admin\/log/, 'post', mockServiceAdminLog)
Mock.mock(/api\/shop\/list/, 'post', mockServiceShopList)
Mock.setup({
  timeout: 200  // 响应延迟 500ms
});