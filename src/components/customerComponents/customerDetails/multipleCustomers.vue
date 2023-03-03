<template>
  <div class="customer_multiple_body">
    <van-nav-bar title="新建客户">
      <template #left>
        <span @click="onCancel">取消</span>
      </template>
      <template #right>
        已选择<span style="color: #409eff">{{ customerIds.length }}</span
        >家
      </template>
    </van-nav-bar>
    <div class="customer_multiple_content">
      <div style="height: 1rem" v-for="item in initCustomersList" :key="item.id">
        <van-checkbox @change="checkedItem(item)" v-model="item.checked" /> {{ item.name }}
      </div>
    </div>
    <div class="customer_multiple_footer">
      <div class="option_item">
        <van-checkbox v-model="checkedAllCustomer" @click="checkedAll">全选</van-checkbox>
      </div>
      <div class="option_item option_icon" @click="onOptionType('moveCustomer')">
        <svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
          <use xlink:href="#icon-icon_device_zhuanyidao"></use>
        </svg>
        <span>移动</span>
      </div>
      <div class="option_item option_icon" @click="onOptionType('ascriptionCustomer')">
        <svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
          <use xlink:href="#icon-zhuanyi"></use>
        </svg>
        <span>归属</span>
      </div>
      <div class="option_item option_icon" @click="onOptionType('transferPublic')">
        <svg class="icon" aria-hidden="true" style="font-size: 0.6rem">
          <use xlink:href="#icon-songgongkaiku"></use>
        </svg>
        <span>转公共库</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { Toast } from 'vant'

export default {
  name: 'multipleCustomers',
  emits: ['onClose'],
  props: {
    // 客户列表数据
    customersList: {
      type: Array,
      default() {
        return []
      }
    },
    // 转移库列表数据
    moveCustomerList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const dataMap = reactive({
      initCustomersList: [],
      checkedAllCustomer: false
    })
    const customerIds = computed(() => {
      const ids = []
      dataMap.initCustomersList.map((res) => {
        if (res.checked) {
          ids.push(res.id)
        }
      })
      return ids
    })
    const initCustomers = () => {
      dataMap.initCustomersList = []
      props.customersList.map((res) => {
        dataMap.initCustomersList.push({ ...res, checked: false })
      })
    }
    // 全选状态改变
    const checkedAll = () => {
      if (dataMap.checkedAllCustomer) {
        dataMap.initCustomersList.map((res) => (res.checked = true))
      } else {
        dataMap.initCustomersList.map((res) => (res.checked = false))
      }
    }
    // 单个选择状态改变
    const checkedItem = (item) => {
      if (item.checked) {
        dataMap.checkedAllCustomer = dataMap.initCustomersList.every((res) => res.checked)
      } else {
        dataMap.checkedAllCustomer = false
      }
    }
    // 执行不同操作的流程区分
    const onOptionType = (type) => {
      if (!customerIds.value.length) {
        Toast({ message: '请至少选择一位客户', position: 'top', duration: 2000 })
      } else {
        console.log(type)
      }
    }
    const onCancel = () => {
      emit('onClose')
    }
    return {
      ...toRefs(dataMap),
      customerIds,
      initCustomers,
      checkedAll,
      checkedItem,
      onOptionType,
      onCancel
    }
  }
}
</script>
<style lang="scss" scoped>
.customer_multiple_body {
  position: relative;
  width: 100%;
  height: 100vh;

  .customer_multiple_content {
    position: absolute;
    top: 1rem;
    right: 0;
    bottom: 2.2rem;
    left: 0;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
  }

  .customer_multiple_footer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 0.2rem 0.6rem;
    width: 100%;
    height: 2rem;
    box-shadow: 0 0 4px 2px #ccc;
    box-sizing: border-box;
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    flex-wrap: nowrap;

    .option_item {
      display: flex;
      justify-content: center;
      margin-right: 0.2rem;
      text-align: center;
      flex-wrap: wrap;

      span {
        display: block;
        margin-top: 0.1rem;
        width: 100%;
      }
    }

    .option_icon {
      width: 5em;
      font-size: 0.2rem;
    }
  }
}
</style>
