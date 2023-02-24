import request from '@/utils/request'

/* 获取预约学员列表 */
export function apiGetStudentList(form) {
  return request.get(`/api/v1/learning/record/call/back/${form.scheduleId}/qr/${form.cId}/code`)
}
// 提交预约信息
export function apiConfirmStudentList(form) {
  return request.post('/api/v1/learning/record/confirm', form)
}
// 发送验证码
export function apiGetCode(form) {
  return request.get(`/api/v1/learning/record/confirm/sendcode/${form.mobile}`)
}
