/* Created by guan on 2021/7/5 */
// 通讯录

import request from '@/utils/request'

/* 过期提醒 */
export function apiExpirationReminder(form) {
  return request.get(`/api/v1/customers/willexpir?page=${form.page || 0}&size=${form.size || 10}`)
}

/* 转公共库 */
export function apiTransferPublicLibrary(form) {
  return request({
    url: '/api/v1/customers/co',
    method: 'delete',
    params: form
  })
}
/* 公共库领用 */
export function apiCustomerRecive(form) {
  // 公共库领用
  return request.patch(
    `/api/v1/customers/co/recive?coids=${form.ids}&region=${form.region}&moduleType=${form.moduleType}`
  )
}

/* 查询单个客户 */
export function apiFindCustomersOne(form) {
  const url = `/api/v1/customers/co/${form.id}?region=${form.region}&remark=1`
  return request.get(url)
}
// 获取客户详情New
export function apiCustomersInfo(form) {
  return request.get(`/api/v1/customers/co/select/base/info/${form.id}`)
}
export function apiFindCustomersAllOne(form) {
  let url = `/api/v1/customers/resource/${form.id}?region=${form.region}`
  if (form.remark) {
    url += `&remark=${form.remark}`
  }
  // 是否是财富传承接口
  if (form.isweal) {
    url += `&isweal=${form.isweal}`
  }
  return request.get(url)
}
/* 添加客户  */
export function apiCreateMyCustomerNew(form) {
  return request.post('/api/v1/customers/co/add/base/info', form)
}
/* 修改客户 */
export function apiUpdateMyCustomer(form) {
  return request.put(`/api/v1/customers/co/${form.id}`, form)
}
// 客户基本资料修改保存 new
export function apiCustomersUpdate(form) {
  return request.put(`/api/v1/customers/co/update/base/info/${form.id}`, form)
}
/* 联系人列表 */
export function apiFindStudents(form) {
  let url = `/api/v1/customers/${form.coid}/students?`
  if (form.view) {
    url += 'view=1'
  }
  if (form.region) {
    url += `&region=${form.region}`
  }
  return request.get(url)
}
/* 联系人列表 */
export function apiFindStudentsListTwo(form) {
  let url = `/api/v1/customers/${form.coid}/${form.courseScheduleId}/basics/students`
  if (form.view) {
    url += 'view=1'
  }
  if (form.region) {
    url += `&region=${form.region}`
  }
  return request.get(url)
}
// 资源库（全国）查询学员信息
export function apiFindCustomerAllLinkMan(form) {
  const url = `/api/v1/customers/resouce/${form.coid}/students`
  return request.get(url)
}
export function apiFindStudentsOne(id, view) {
  let url = `/api/v1/customers/students/${id}`
  if (view) {
    url += '?view=1'
  }
  // 查询单个学员信息
  return request.get(url)
}
export function apiFindStudentsTwo(id, view) {
  let url = `api/v1/customers/students/${id}/info`
  if (view) {
    url += '?view=1'
  }
  // 查询单个学员信息
  return request.get(url)
}
export function apiCustomerReciveSave(form) {
  return request({
    url: `/api/v1/customers/co/resource/recive?coids=${form.coids}`,
    method: 'post',
    data: form
  })
}
export function apiCreateStudents(form) {
  // 创建学员
  return request.post('/api/v1/customers/students', form)
}

export function apiUpdateStudents(form) {
  // 修改学员
  return request.put(`/api/v1/customers/students/${form.id}`, form)
}
export function apiUpdateStudentsTwo(form) {
  // 修改学员
  return request.put(`api/v1/customers/students/${form.id}/info`, form)
}

/* 跟踪信息 */
export function apiFindTrack({ coid, module }) {
  let api = `/api/v1/customers/${coid}/tracks?`
  if (module) {
    api += `module=${module}`
  }
  // 查询跟踪
  return request.get(api)
}

export function apiCreateTrack(form) {
  // 创建跟踪
  return request.post('/api/v1/customers/tracks', form)
}

export function apiUpdateTrack(form) {
  // 修改跟踪
  return request.put(`/api/v1/customers/tracks/${form.id}`, form)
}

/* 发票信息 */
export function apiFindInvoice(coid) {
  return request.get(`/api/v1/customers/${coid}/invoices`)
}

export function apiCreateInvoice(form) {
  // 创建发票
  return request.post('/api/v1/customers/invoices', form)
}

/* 修改发票 */
export function apiUpdateInvoice(form) {
  return request.put(`/api/v1/customers/invoices/${form.id}`, form)
}

/* 预约记录 */
export function apiFindCourseBooking(form) {
  let url = '/api/v1/spotcheckins/search?q='
  if (form.coid) {
    url += `coid:${form.coid};`
  }
  if (form.page) {
    url += `&page=${form.page}`
  }
  if (form.size) {
    url += `&size=${form.size}`
  }
  // console.log(url,'0001')
  return request.get(url)
}

/* 银行账号开通 */
export function apiBankAccountOpen(id) {
  const url = `/api/v1/unionpay/bank/account?companyId=${id}`
  return request({
    url: url,
    method: 'post'
  })
}

/* 获取银行账号信息 */
export function apiBankAccountOne(coid) {
  const url = `/api/v1/unionpay/bank/account/${coid}`
  return request({
    url: url,
    method: 'get'
  })
}

/* 开通二维码 */
export function apiQrCodeCreate(form) {
  const url = `/api/v1/qrcode?companyId=${form.coid}&period=${form.period}`
  return request({
    url: url,
    method: 'post'
  })
}

/* 刷新二维码 */
export function apiQrCodeUpdate(form) {
  const url = `/api/v1/qrcode?qrcodeId=${form.qrcodeId}`
  return request({
    url: url,
    method: 'put'
  })
}

/* 二维码查看 */
export function apiQrCodeLook(form) {
  const url = `/api/v1/qrcode/companyid?companyId=${form.coid}`
  return request({
    url: url,
    method: 'get'
  })
}
// 获取工商信息详情
export function apiGetCusBaseinfo(companyId) {
  return request({
    url: `/api/v1/customers/baseinfo/${companyId}`,
    method: 'get'
  })
}
export function apiCustomerReciveAll(form) {
  let url = '/api/v1/customers/co/search/resource?q='
  if (form.companyId) {
    url += `companyId:${form.companyId};`
  }
  // if (form.region) {
  //   url += `region:${form.region};`
  // }
  if (form.tianyanflag === 0 || form.tianyanflag) {
    url += `tianyanflag:${form.tianyanflag};`
  }
  // if (form.pubLibraryType) {
  //   url += `pubLibraryType:${form.pubLibraryType};`
  // }
  if (form.tianyanstatus || form.tianyanstatus === 0) {
    url += `tianyanstatus:${form.tianyanstatus};`
  }
  if (form.institutionId) {
    url += `institutionId:${form.institutionId};`
  }
  if (form.isMember || form.isMember === 0) {
    url += `isMember:${form.isMember};`
  }
  // if (form.isOverrun) {
  //   url += `isOverrun:${form.isOverrun};`
  // }
  if (form.subid) {
    url += `subid:${form.subid};`
  }
  if (form.name) {
    form.name = encodeURIComponent(form.name)
    console.log(form.name, 'abc123')
    url += `name:${form.name};`
  }
  if (form.extendName) {
    url += `extendName:${form.extendName};`
  }
  // if (form.lmname) {
  //   url += `lmname:${form.lmname};`
  // }
  // if (form.lmphone) {
  //   url += `lmphone:${form.lmphone};`
  // }
  // if (form.tagIds && form.tagIds.length > 0) {
  //   url += `tagids:${form.tagIds};`
  // }
  // if (form.sortType) {
  //   url += `sortType:${form.sortType};`
  // }
  // if (form.prodid) {
  //   url += `prodid:${form.prodid};`
  // }
  if (form.stime) {
    url += `stime:${form.stime};`
  }
  if (form.etime) {
    url += `etime:${form.etime};`
  }
  // if (form.garbage || form.garbage === 0) {
  //   url += `garbage:${form.garbage};`
  // }
  if (form.isBingDingEntWeChatStatus || form.isBingDingEntWeChatStatus === 0) {
    url += `isBingDingEntWeChatStatus:${form.isBingDingEntWeChatStatus};`
  }
  if (form.labellingType) {
    url += `labellingType:${form.labellingType};`
  }
  if (form.page) {
    url += `&page=${form.page}`
  }
  if (form.size) {
    url += `&size=${form.size}`
  }
  return request({
    url,
    method: 'get'
  })
}
// 确认公司名称信息
export function apiTianyanAssociationFlag(form) {
  const url = `/api/v1/customers/co/tianyanassociationflag?coid=${form.coid}&flag=${form.flag}`
  return request({
    url: url,
    method: 'put'
  })
}
// 查询分公司是否必须关联工商信息
export function apiTianYanMandatory(subid) {
  return request({
    url: `/api/v1/subsidiaries/tianYanMandatory?subid=${subid}`,
    method: 'get'
  })
}
// 天眼查关联查重
export function apiTianyanduplicate(form) {
  return request({
    url: `/api/v1/customers/co/tianyan/duplicate?name=${form.name}&id=${form.id}`,
    method: 'get'
  })
}
/* 获取市、区数据 */
export function apiProvinceChildren(parentId) {
  return request({
    url: `/api/v1/customer/area/children/${parentId}`,
    method: 'get'
  })
}
// 天眼查限额查询
export function apiTianyanNum(form) {
  return request({
    url: `/api/v1/customers/co/tianyan/num?coId=${form.coId}&subId=${form.subId}`,
    method: 'get'
  })
}
// 取消关联
export function apiCancelBaseinfo(form) {
  return request({
    url: `/api/v1/customers/co/cancel/baseinfo?companyId=${form.companyId}&associationId=${form.id}`,
    method: 'delete'
  })
}
// 查询发票填写码
export function apiSearchQrcode(comId) {
  return request.patch(`/api/v1/customers/invoices/generate/searchQrcode/${comId}`)
}
// 生成发票填写码
export function apiInvoiceQrcode(form) {
  return request({
    url: `/api/v1/customers/invoices/generate/qrcode?comId=${form.comId}&accId=${form.accId}&uuid=${form.uuid}`,
    method: 'get'
  })
}

// 客户通过发票填写码添加发票,不用登陆
export function apiCreateQrcodeInvoice(form) {
  return request.post('/api/v1/customers/invoices/qrcode', form)
}
//
export function apiqRCodeGetJsonData(url) {
  return request({
    url: `/api/v1/customers/invoices/qRCodeGetJsonData?url=${url}`,
    method: 'get'
  })
}
// 获取参课客户详情
export function apiCustomerDetail(customerId) {
  return request({
    url: `/api/v1/customers/co/sale?id=${customerId}`,
    method: 'get'
  })
}
// 产品信息
export function apiFindProducts(form) {
  // 获取全部产品
  let url = '/product/api/v1/products?'
  if (form.state) {
    url += `state=${form.state}&`
  }
  if (form.type) {
    url += `type=${form.type}&`
  }
  if (form.subtype) {
    url += `subtype=${form.subtype}`
  }
  if (form.page) {
    url += `&page=${form.page}`
  }
  return request({
    url: `${url}&size=500`,
    method: 'get',
    params: { name: form.name }
  })
}
// 创建课上分析单
export function apiCreateCourseAnalysis(form) {
  return request({
    url: '/api/v1/courseanalysis/create',
    method: 'post',
    data: form
  })
}
// 选择ip老师 出现对应视频号
export function apiVideoTeacherSearchList(form) {
  const url = `/system/api/v1/Video/list/teacher/${form.tid}`
  return request({
    url: url,
    method: 'get'
  })
}
// 订单管理
export function apiFindOrdersByMyCustomer(form) {
  let url = '/api/v1/orders/find/orderByComId?q='
  if (form.coid) {
    url += `coid:${form.coid};`
  }
  if (form.page) {
    url += `&page=${form.page}`
  }
  if (form.size) {
    url += `&size=${form.size}`
  }
  console.log(url, 'url')
  return request({
    url: url,
    method: 'get'
  })
}
