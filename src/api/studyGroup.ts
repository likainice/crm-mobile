/* Created by guan on 2021/7/5 */
// 金财学社
import request from '@/utils/request'

// 工作简报分公司下拉
export function apiGetDepts(form) {
  let url = '/api/v1/dept/self?'
  if (form.manageDeptId) {
    url += `manageDeptId=${form.manageDeptId}`
  }
  return request.get(url)
}

// 工作简报员工下拉
export function getEmployees(form) {
  let url = '/api/v1/accounts/employee?'
  if (form.deptId) {
    url += `deptId=${form.deptId}`
  }
  return request.get(url)
}

/* 今日统计 */
export function apiCollectBulletin(form) {
  return request.get('/api/v1/collect/bulletin/level', { params: form })
}

/* 过期客户提醒 */
export function apiCollectRemind() {
  return request.get('/api/v1/collect/messageRemindNumber')
}

/* 重要公告 */
export function apiSystemNotice() {
  return request.get('/api/v1/collect/system/notice?noticeType=1&size=50')
}

/* 排课查询 */
export function apiFindCourse(form) {
  let url = '/api/v1/collect/course/search?q='
  if (form.type) {
    url += `type:${form.type};`
  }
  if (form.date) {
    url += `date:${form.date};`
  }
  return request.get(url)
}

/* 交流消息 */
export function apiCommunicationMessage(form: any = {}) {
  const url = '/api/v1/members/infoshare/reminder'
  return request({
    url: url,
    method: 'get',
    params: {
      size: form.size
    }
  })
}

/* 首页开课提醒 */
export function apiJoinCourse(form: any = {}) {
  const url = '/api/v1/members/home/joinCourse'
  return request({
    url: url,
    method: 'get'
  })
}
/* 首页金财值 */
export function apiGetJincaiScore(form: any = {}) {
  const url = 'system/api/v1/client/account/find/score'
  return request({
    url: url,
    method: 'get'
  })
}
