<template>
  <div>
    <van-field
      v-model="fieldValue"
      is-link
      :disabled="disabled"
      readonly
      :name="name"
      :label="label"
      placeholder="未选择"
      @click="!disabled ? (picker = true) : ''"
      :rules="rules"
      :required="required"
    />
    <van-popup v-model:show="picker" position="bottom">
      <van-picker
        :default-index="defaultIndex"
        :columns="columns"
        @cancel="picker = false"
        @confirm="onSelect($event)"
      />
    </van-popup>
  </div>
</template>
<script>
import { getCurrentInstance, defineComponent, reactive, toRefs, watch, computed } from 'vue'

export default defineComponent({
  props: {
    columns: Array,
    name: String,
    label: String,
    fn: String,
    required: {
      type: Boolean,
      default: false
    },
    modelValue: [String, Number, Array],
    rules: {
      type: Array,
      default() {
        return [
          {
            requireType: false
          }
        ]
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
    const {
      appContext: {
        config: { globalProperties: global }
      }
    } = getCurrentInstance()
    const data = reactive({
      picker: false,
      fieldid: null,
      defaultIndex: 0
    })
    watch(
      props,
      (newProps) => {
        data.fieldid = newProps.modelValue
        const index = newProps.columns.findIndex((i) => i.value === newProps.modelValue)
        data.defaultIndex = index
      },
      { immediate: true, deep: true }
    )
    const fieldValue = computed(() => {
      if (props.fn) {
        return global.$filters[props.fn](data.fieldid)
      } else {
        // 兼容动态表单处理
        if (props.columns.filter((res) => res.value === data.fieldid)[0]) {
          return props.columns.filter((res) => res.value === data.fieldid)[0].text
        } else {
          return ''
        }
      }
    })
    const onSelect = (item) => {
      emit('update:modelValue', item.value)
      data.picker = false
    }
    return { ...toRefs(data), fieldValue, onSelect }
  }
})
</script>
