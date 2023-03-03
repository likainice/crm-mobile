<template>
  <div id="publicForm">
    <button @click="getStructure(3)">获取表单数据</button>

    <van-form ref="formRef" @submit="onSubmit" scroll-to-error>
      <public-form-item
        v-for="item in formatList"
        :item="item"
        :key="item.tableName + item.columnName + item.id"
        :ref="item.tableName + item.columnName + item.id"
      />

      <div v-if="formatList?.length > 0" style="margin: 14px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { apiClassStructure } from '@/api/publicCustomer'
import publicFormItem from './publicFormItem'
import { cloneDeep } from 'lodash'
export default {
  name: 'publicForm',
  components: {
    publicFormItem
  },
  data() {
    return {
      formatList: [],
      oldVal: {}, // 存储旧数据
      newVal: {} // 生成的新数据
    }
  },
  methods: {
    async getStructure(type) {
      this.formatList = []
      const { data } = await apiClassStructure({ type, tempVersion: 1 })
      if (data.code === 1020000) {
        this.formatList = data.content
      }
      // this.rulesInit()
      this.initFormValue()
    },
    initFormValue(data = { value: {}, acqId: {} }) {
      // 初始化数据对象
      this.oldVal = cloneDeep(data)
      this.newVal = {}
      this.formatList.map((res) => {
        // console.log(res)
        // 添加初始化格式处理
        if (['checkBox', 'upload'].includes(res.componentType) || res.multiple) {
          this.newVal[res.tableName + '-' + res.columnName] = []
        } else {
          this.newVal[res.tableName + '-' + res.columnName] = ''
        }
      })
      this.$forceUpdate()
      this.newVal = cloneDeep(Object.assign(this.newVal, data.value))
      this.initSetModel()
    },
    // 初始化回显数据
    initSetModel() {
      this.$nextTick(() => {
        this.formatList.map((res) => {
          this.$refs[res.tableName + res.columnName + res.id][0].initModel(this.newVal)
        })
      })
    },
    // 解析表单数据
    analysisForm(data) {
      const formatList = [...this.formatList]
      for (const key in data) {
        formatList.forEach((res) => {
          if (res.tableName === key.split('-')[0] && res.columnName === key.split('-')[1]) {
            // array转string
            if (Array.isArray(data[key])) {
              res.fieldValue = data[key].join(',')
            } else {
              res.fieldValue = data[key]
            }
            res.acqId = this.oldVal.acqId[key] || ''
          }
        })
      }
      return formatList
    },

    onSubmit(val) {
      console.log('提交数据：', val)
    }
  }
}
</script>
