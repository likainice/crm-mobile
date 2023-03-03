<template>
  <van-nav-bar>
    <template #left>
      <van-icon name="arrow-left" size="18" style="color: #000" @click="onClose" />
    </template>
    <template #title> 所有客户 </template>
  </van-nav-bar>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'subordinateCustomer',
  setup() {
    const dataMap = reactive({
      callBackRouter: ''
    })
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      dataMap.callBackRouter = route.query.callback
    })
    // 返回上级路由
    const onClose = () => {
      router.push(dataMap.callBackRouter)
    }
    return {
      ...toRefs(dataMap),
      onClose
    }
  }
}
</script>
