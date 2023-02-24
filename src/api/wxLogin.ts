/* Created by guan on 2022/5/17 */
/* 登录 */
import request from '@/utils/request'

/* 获取JS-SDK的页面必须先注入配置信息 */
// export function apiWxConfig(form) {
//   return request.post('/api/v1/enterprise/wechat/customer/config', form)
// }

export function apiWxAgentConfig(form) {
  return request.post('/api/v1/enterprise/wechat/customer/agentConfig', form)
}

/* 企业微信登录测试 */
export function apiUserData(code) {
  return request.get(`/api/v1/enterprise/wechat/userid?code=${code}`)
}
