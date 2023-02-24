import request from '@/utils/request'
/* 获取上门服务列表 */
export function apiVisitSearch(visitStatus) {
  return request.post('/api/v1/visit/search', { visitStatus, size: 100 })
}
/* 查询客户 */
export function apiSearchServiceCustomers(name) {
  return request.get(`/api/v1/customers/co/region/1/name/${name}`)
}
/* 获取学员 */
export function apiSearchStudent(companyId) {
  return request.get(`/api/v1/customers/students/findbycoid/${companyId}`)
}
/* 获取老师数据 */
export function apiSearchTeachers(name) {
  return request.get(`/system/api/v1/teacher/visit?name=${name}`)
}
/* 发起上门 */
export function apiCreatVisit(form) {
  return request.post('/api/v1/visit', form)
}
/* 修改上门信息 */
export function apiUpdateVisit(form) {
  return request.put('/api/v1/visit', form)
}
/* 取消上门 */
export function apiCancelVisit(form) {
  return request.put('/api/v1/visit/cancel', form)
}
/* 获取上门详情数据 */
export function apiLookVisitDetails(applyId) {
  return request.get(`/api/v1/visit/findrecord/${applyId}`)
}
/* 获取上门小天使、其他人员数据 */
export function apiEmployeeFindName(name) {
  return request.get(`/system/api/v1/employee/visit/find/name?name=${name}`)
}
/* 获取上门资料详情 */
export function apiVisitDetail(visitId) {
  return request.get(`/api/v1/find/visit/detail/${visitId}`)
}
/* 创建上门资料 */
export function apiVisitDetailCreat(form) {
  return request.post('/api/v1/visit/detail', form)
}
/* 创建上门资料 */
export function apiVisitDetailUpdate(form) {
  return request.put('/api/v1/visit/detail', form)
}
/* 上门资料详情查看授权 */
export function apiShowAuth(companyId) {
  return request.get(`/api/v1/find/all/oauth/showAuth?companyId=${companyId}&authType=1`)
}
