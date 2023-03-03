<template>bankAccount</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'bankAccount',
  props: {},
  setup(props, { emit }) {
    const dataMap = reactive({
      params: {}
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
