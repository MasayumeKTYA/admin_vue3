import Mock from 'mockjs'
import { mockServiceAdminPower, mockServiceAdminLog } from './admin'


Mock.mock(/api\/admin\/power/, 'post', mockServiceAdminPower)
Mock.mock(/api\/admin\/log/, 'post', mockServiceAdminLog)
Mock.setup({
  timeout: 200  // 响应延迟 500ms
});