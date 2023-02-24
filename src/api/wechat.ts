import request from '@/utils/request'

// 获取头像  本地调试
/* export function apiFindavatar(externalUserid) {
  return request.get('/api/v1/EntWxCustomer/avatar/wo9EvgMAAAH-xxfTSYYwCPyYlBYor59Q')
}
// 侧边栏展示 本地调试
export function apiFindwechat(externalUserid) {
  return request.get('/api/v1/enterprise/wechat/customer/contacts/wo9EvgMAAAH-xxfTSYYwCPyYlBYor59Q')
} */
// 获取头像
export function apiFindavatar(externalUserid) {
  return request.get(`/api/v1/EntWxCustomer/avatar/${externalUserid}`)
}
// 侧边栏展示
export function apiFindwechat(externalUserid) {
  return request.get(`/api/v1/enterprise/wechat/customer/contacts/${externalUserid}`)
}
// 修改企业/联系人
export function apiUpdatecustomers(form) {
  return request.put('/api/v1/enterprise/wechat/customers/student', form)
}
// 搜索公司/联系人
export function apiFindcustomers(form) {
  let url = '/api/v1/enterprise/wechat/my/customers/student?q='
  if (form.customerName) {
    form.customerName = encodeURIComponent(form.customerName)
    url += `name:${form.customerName};`
  }
  return request.get(url)
}
// 添加公司
export function apiAddcustomers(form) {
  // return request.post('/api/v1/enterprise/wechat/customers', form)
  return request.post('/api/v1/enterprise/add/wechat/customers', form)
}

// 上传图片
export function apiUploadfiles(formData) {
  return request.post('/api/v1/common/uploadfiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// /*查询客服经理*/
export function apiFindEmployees(form) {
  let url = '/system/api/v1/employees/search?q='
  if (form.name) {
    url += `name:${form.name};`
  }
  if (form.bindingStatus === 0 || form.bindingStatus) {
    url += `bound:${form.bindingStatus};`
  }
  if (form.range) {
    url += `range:${form.range};`
  }
  if (form.size) {
    url += `&size=${form.size}`
  }
  return request.get(`${url}&sort=id,desc`)
}

/* 查询分公司下所有标签 */
export function apiFindCustomLabelAll(form) {
  let url = 'api/v1/customers/select/tag?q='
  if (form.clientCompanyId) {
    url += `cId:${form.clientCompanyId};`
  }
  return request.get(url)
}

// 企查查查询
export function apiEnterpriseCheckCompany(form) {
  return request.post('/api/v1/customers/baseinfo/tianyan', form)
}
