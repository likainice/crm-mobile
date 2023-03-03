<template> examinationHistory </template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'examinationHistory',
  setup() {
    const dataMap = reactive({
      params: {} // 父组件传递的参数
    })
    // 初始化状态
    const initComponents = (params = {}) => {
      dataMap.params = { ...params }
    }
    return {
      ...toRefs(dataMap),
      initComponents
    }
  }
}
</script>
