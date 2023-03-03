<template>
  <div id="filedDate">
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
      <van-datetime-picker v-model="time" :type="type" :title="label" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs, watch } from 'vue'

export default {
  name: 'filedDate',
  props: {
    name: String,
    label: String,
    type: {
      type: String,
      default: 'datetime'
    },
    dateType: {
      type: String,
      default: 'YYYY-MM-DD HH:mm'
    },
    modelValue: [String, Number],
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
    required: {
      type: Boolean,
      default() {
        return false
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
      time: null
    })
    watch(
      props,
      (newProps) => {
        data.fieldid = newProps.modelValue
        data.time = new Date(newProps.modelValue)
      },
      { immediate: true, deep: true }
    )
    const fieldValue = computed(() => {
      return global.$filters.dateString(data.fieldid, props.dateType)
    })
    const onConfirm = (item) => {
      emit('update:modelValue', item.getTime())
      data.picker = false
    }
    return { ...toRefs(data), fieldValue, onConfirm }
  }
}
</script>
