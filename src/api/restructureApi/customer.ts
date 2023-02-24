import request from '@/utils/request'
export function apiMyCustomer(form) {
  // 我的客户列表数据
  console.log(form, '00000000')
  let url = '/api/v1/customers/co/search/my/app?q=region:1;'
  // let url = `/api/v1/apps/${form.accid}/my/co?q=`
  if (form.condition) {
    url += `name:${form.condition};`
  }
  if (form.lib) {
    url += `lib:${form.lib === 10 ? 9 : form.lib};`
  }
  if (form.labellingType) {
    url += `labellingType:${form.labellingType};`
  }
  if (form.sortType) {
    url += `sorttype:${form.sortType};`
  }
  if (form.page) {
    url += `&page=${form.page}`
  }
  if (form.size) {
    url += `&size=${form.size || 10}`
  }
  return request.get(url)
}
