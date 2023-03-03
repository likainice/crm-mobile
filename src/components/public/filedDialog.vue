<template>
  <div id="filedDialog">
    <van-field
      class="filed_border"
      v-model="fieldValue"
      :name="name"
      :label="label"
      :required="required"
      :rules="rules"
    >
      <template #input>
        <div style="overflow-y: scroll; width: 100%; height: 2rem">
          <van-tag
            :show="true"
            closeable
            size="medium"
            type="primary"
            v-for="(item, i) in tagList"
            :key="i"
            @close="onTagClose(item)"
            style="margin-right: 0.2rem"
            color="#c8c9cc"
          >
            {{ item.name }}
          </van-tag>
          <van-button icon="plus" type="primary" size="mini" style="display: block; float: right" @click="open" />
        </div>
      </template>
    </van-field>
    <van-dialog v-model:show="dialogFlag" :title="label" :showCancelButton="true" :before-close="onClose">
      <div style="margin: 0.2rem 0 0"></div>
      <van-search
        :show-action="!checkedAll"
        v-model="form.angelName"
        :placeholder="`请输入${label}`"
        @search="onSearch"
        style="width: 96%"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
          <!--            <div @click="checkAll" v-if="managesList.length > 0">-->
          <!--              {{ isFlag ? '全选' : '取消' }}-->
          <!--            </div>-->
        </template>
      </van-search>
      <div style="overflow-y: scroll; height: 5rem">
        <van-list>
          <van-checkbox-group v-model="checked" ref="checkboxGroup">
            <van-cell-group inset>
              <van-cell
                v-for="(item, index) in managesList"
                clickable
                :key="item"
                :title="titleString(item)"
                @click="onToggle(index)"
              >
                <template #right-icon>
                  <van-checkbox
                    :name="item.optionValue"
                    :disabled="item.disabled"
                    :ref="(el) => (checkboxRefs[index] = el)"
                    @click.stop
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
        <van-empty
          :description="description + label"
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          v-if="managesList.length === 0"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, onBeforeUpdate, computed, onMounted, watch } from 'vue'
import { apiFindEmployees } from '@/api/wechat'
import { apiEmployeeFindName, apiSearchTeachers } from '@/api/sceneService'
import { apiDictionaries } from '@/api/publicCustomer'
import { Toast } from 'vant'
export default defineComponent({
  name: 'filedDialog',
  props: {
    name: String,
    label: String,
    modelValue: Array,
    apiName: String,
    checkedAll: {
      type: Boolean,
      default: false
    },
    checkParams: {
      // 获取表单多选数据所需参数
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Array,
      default() {
        return [{ requireType: false }]
      }
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dataMap = reactive({
      dialogFlag: false,
      form: {
        angelName: ''
      },
      isFlag: true,
      checked: [],
      tagList: [],
      checkboxRefs: ref([]),
      managesList: [],
      checkboxGroup: [],
      description: '请搜索后选择'
    })
    onBeforeUpdate((e) => {
      dataMap.checkboxRefs = []
    })

    watch(
      props,
      (newProps) => {
        dataMap.tagList = newProps.modelValue ? newProps.modelValue.map((i) => ({ name: i, id: i })) : []
        dataMap.checked = newProps.modelValue
      },
      { immediate: true, deep: true }
    )

    const onToggle = (index) => {
      dataMap.checkboxRefs[index].toggle()
    }
    const checkAll = () => {
      dataMap.isFlag = !dataMap.isFlag
      dataMap.isFlag ? dataMap.checkboxGroup.toggleAll() : dataMap.checkboxGroup.toggleAll(true)
    }
    const onClose = (el) => {
      if (el === 'confirm') {
        if (dataMap.checked.length < 1) {
          Toast({ message: `请选择${props.label}`, position: 'top', duration: 2000 })
          return false
        }
        // dataMap.tagList = duplicationDelete(dataMap.checked)
        dataMap.description = `请选择${props.label}`
        emit('update:modelValue', dataMap.checked)
        dataMap.form.angelName = ''
        dataMap.managesList = []
      }
      dataMap.dialogFlag = false
    }
    // 去重
    const duplicationDelete = (sourceData) => {
      const _arr = []
      const _newSet = []
      const _formatData = []
      sourceData.map((res) => _arr.push(res.id))
      _arr.map((res) => {
        if (!_newSet.includes(res)) {
          _newSet.push(res)
        }
      })
      _newSet.map((res) => {
        _formatData.push(sourceData.filter((it) => it.id === res)[0])
      })
      dataMap.checked = [..._formatData]
      return _formatData
    }
    const onTagClose = (item) => {
      dataMap.checked = dataMap.checked.filter((i) => i !== item.id)
      dataMap.tagList = dataMap.checked
      // dataMap.tagList = duplicationDelete(dataMap.checked)
      emit('update:modelValue', dataMap.checked)
    }
    const onSearch = () => {
      if (!dataMap.form.angelName) {
        return false
      }
      fetchList()
    }
    const fetchList = async () => {
      const _form = {
        name: dataMap.form.angelName,
        bindingStatus: 1,
        range: 'all',
        size: 1000
      }
      if (props.apiName === 'apiEmployeeFindName') {
        // 人员（小天使）
        const { data } = await apiEmployeeFindName(dataMap.form.angelName)
        if (data.code === 1020000) {
          dataMap.managesList = data.content
          dataMap.description = '暂无数据'
        }
      } else if (props.apiName === 'apiSearchTeachers') {
        // 老师
        const { data } = await apiSearchTeachers(dataMap.form.angelName)
        if (data.code === 1020000) {
          dataMap.managesList = data.content
          dataMap.description = '暂无数据'
          dataMap.managesList.map((res) => {
            res.id = res.accountId
            res.disabled = res.status === 3
          })
        }
      } else if (props.apiName === 'apiDictionaries') {
        // 动态表单多选
        const { data } = await apiDictionaries({ ...props.checkParams, name: dataMap.form.angelName })
        if (data.code === 1020000) {
          dataMap.managesList = data.content
          dataMap.description = '暂无数据'
          dataMap.managesList.map((res) => {
            res.id = res.optionValue
            res.name = res.optionName
          })
        }
      } else {
        const { data } = await apiFindEmployees(_form)
        if (data.code === 1020000) {
          dataMap.managesList = data.content.content
          dataMap.description = '暂无数据'
        }
      }
    }
    const titleString = (item) => {
      if (props.apiName) {
        if (props.apiName === 'apiDictionaries') {
          return item.optionName
        } else {
          return `${item.name}(${item.loginName})`
        }
      } else {
        return item.subsidiaryName ? item.name + '-' + item.subsidiaryName : item.name
      }
    }
    // 回显设置
    const echoInit = (data) => {
      dataMap.tagList = [...data]
      dataMap.checked = [...data]
    }
    // 选中项名称拼接string
    const fieldValue = computed(() => {
      const ids = dataMap.tagList.map((res) => res.id)
      return ids.join(',')
    })
    const open = () => {
      dataMap.dialogFlag = true
      // dataMap.form.angelName = ''
    }
    return {
      ...toRefs(dataMap),
      onSearch,
      onToggle,
      onClose,
      onTagClose,
      checkAll,
      fetchList,
      echoInit,
      titleString,
      fieldValue,
      open
    }
  }
})
</script>
<style lang="scss" scoped>
#filedDialog {
  :deep(.van-cell__title > span) {
    font-size: 0.23rem !important;
  }
}
</style>
