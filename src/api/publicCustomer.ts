import request from '@/utils/request'

// 获取表单配置项数据
export function apiClassStructure(form) {
  return request.post('/api/v1/collect/info/class/structure', form)
}
// 获取选项数据（字典表）
export function apiDictionaries(_form) {
  return request.get(
    `/api/v1/collect/info/class/dictionaries/${_form.dictionaryType}/${_form.selectType}/${_form.isDiffPattern}`
  )
}
