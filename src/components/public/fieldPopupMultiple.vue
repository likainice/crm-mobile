<template>
  <div id="fieldPopupMultiple">
    <van-field
      v-model="fieldid"
      is-link
      :disabled="disabled"
      readonly
      :name="name"
      :label="label"
      :placeholder="placeholder"
      @click="checkedPopup"
      :rules="rules"
      :required="required"
    />
    <van-popup v-model:show="picker" position="bottom" round>
      <div class="content" style="padding-bottom: 0.3rem">
        <div style="display: flex; justify-content: space-between; margin-top: 0.3rem">
          <span style="margin-left: 0.3rem" @click="onCancel">取消</span>
          <span style="margin-right: 0.3rem" @click="onConfirm">确认</span>
        </div>
        <div style="overflow-y: auto; margin-top: 0.5rem; padding: 0.1rem 0; max-height: 50vh">
          <van-checkbox-group v-model="checked"
            ><!--
            <div v-for="item in columns" :key="item[option.value]" style="margin: 0.1rem 0.2rem; padding: 0.1rem 0">
              <van-checkbox v-model="item[option.checked]" @click="checkedToggle(item)" :disabled="item.disabled">{{
                item[option.text]
              }}</van-checkbox>
            </div>-->
            <van-checkbox
              style="margin: 0.1rem 0.2rem; padding: 0.1rem 0"
              v-for="item in columns"
              :key="item[option.value]"
              :disabled="item.disabled"
              :name="item[option.value]"
              >{{ item[option.text] }}</van-checkbox
            >
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
export default {
  name: 'fieldPopupMultiple',
  props: {
    columns: Array,
    name: String,
    label: String,
    modelValue: Array,
    // 转换配置
    option: {
      type: Object,
      default() {
        return {
          text: {
            type: String,
            default: 'name'
          },
          value: {
            type: String,
            default: 'id'
          },
          checked: {
            type: String,
            default: 'checked'
          }
        }
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default() {
        return [{ requireType: false }]
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  setup(props, { emit }) {
    const dataMap = reactive({
      picker: false, // 弹窗展示
      fieldid: null, // id集合
      columnsInit: [], // 当前正在处理的选项数据
      columnsInitOld: [], // 留存的旧数据，用以处理取消的状态
      checked: []
    })
    watch(
      props,
      (newProps) => {
        // dataMap.fieldid = []
        // newProps.columns
        //   .filter((res) => res.checked === true)
        //   .map((res) => {
        //     return dataMap.fieldid.push(res[newProps.option.value])
        //   })
        dataMap.fieldid = newProps?.modelValue?.join(',')
        dataMap.checked = newProps.modelValue
      },
      { immediate: true, deep: true }
    )
    // 选中项名称拼接string
    const fieldValue = computed(() => {
      console.log(props, 111)
      const _arr = []
      props.columns
        .filter((res) => res.checked === true)
        .map((res) => {
          return _arr.push(res[props.option.text])
        })

      return _arr.join(',') || ''
    })
    // 打开选择弹窗
    const checkedPopup = () => {
      if (!props.disabled) {
        dataMap.picker = true
        dataMap.columnsInit = []
        props.columns.map((res) => {
          dataMap.columnsInit.push({
            text: res[props.option.text],
            value: res[props.option.value],
            checked: res[props.option.checked],
            disabled: res.disabled || false
          })
        })
      }
      // 为取消做准备
      dataMap.columnsInitOld = JSON.parse(JSON.stringify(props.modelValue))
    }
    // 切换选中状态
    const checkedToggle = (row) => {
      dataMap.columnsInit.forEach((res) => {
        if (res.value === row[props.option.value]) {
          res.checked = !res.checked
        }
      })
    }
    // 取消
    const onCancel = () => {
      emit('recoveryBefore', dataMap.columnsInitOld)
      dataMap.picker = false
    }
    // 确认
    const onConfirm = () => {
      dataMap.picker = false
      dataMap.fieldid = dataMap.checked.join(',')
      emit('update:modelValue', dataMap.checked)
    }

    return {
      ...toRefs(dataMap),
      fieldValue,
      checkedPopup,
      checkedToggle,
      onCancel,
      onConfirm
    }
  }
}
</script>
