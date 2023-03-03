<template>
  <div id="tag_selection">
    <van-field label="标签" @click="!isLook ? (dialog = true) : ''" placeholder="请选择标签">
      <template #input>
        <div style="display: flex; flex-wrap: wrap">
          <van-tag
            v-for="(item, index) in selectNameList"
            style="margin: 0 0.1rem 0.1rem 0"
            type="primary"
            :key="index"
          >
            {{ item }}
          </van-tag>
        </div>
      </template>
    </van-field>
    <div class="van-hairline--bottom"></div>

    <van-popup v-model:show="dialog" closeable position="bottom" :style="{ height: '100%', overflow: 'hidden' }">
      <div class="tab_box" style="overflow-y: scroll; padding: 0.5rem 0; max-height: 100%; box-sizing: border-box">
        <div class="tab_title">企业标签</div>
        <div
          v-for="(item, index) in customLabelAll.enterpriseTagList"
          :key="index + '企业'"
          style="margin: 0.1rem 0 0 0.5rem"
        >
          <div class="tab_line"></div>
          <div v-if="item.isStart"> {{ item.groupName }}（{{ item.isSingle ? '单选' : '多选' }}） </div>
          <div v-else>
            {{ item.groupName }}（禁用）
            <span style="color: red">取消标签后无法再次选中</span>
          </div>
          <van-checkbox-group direction="horizontal" v-model="tagsWeb" ref="checkboxGroup">
            <van-checkbox
              v-for="(it, itIndex) in item.tagList"
              @click="onCheckbox(item, it)"
              :disabled="disabled && !item.isStart && !tagsWeb.includes(it.id)"
              :name="it.id"
              :key="itIndex"
            >
              {{ it.tagName }}
            </van-checkbox>
          </van-checkbox-group>
        </div>

        <div class="tab_title">分公司标签</div>
        <div
          v-for="(item, index) in customLabelAll.customTagList"
          :key="index + '客户'"
          style="margin: 0.1rem 0 0 0.5rem"
        >
          <div class="tab_line"></div>
          <div v-if="item.isStart"> {{ item.groupName }}（{{ item.isSingle ? '单选' : '多选' }}） </div>
          <div v-else>
            {{ item.groupName }}（禁用）
            <span style="color: red">取消标签后无法再次选中</span>
          </div>
          <van-checkbox-group direction="horizontal" v-model="tagsWeb" ref="checkboxGroup">
            <van-checkbox
              v-for="(it, itIndex) in item.tagList"
              @click="onCheckbox(item, it)"
              :disabled="disabled && !item.isStart && !tagsWeb.includes(it.id)"
              :name="it.id"
              :key="itIndex"
            >
              {{ it.tagName }}
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch, computed, PropType } from 'vue'
import { apiFindCustomLabelAll } from '@/api/wechat'
// import tagsData from './tagSelectionData'
interface IProps {
  modelValue: number[]
  clientCompanyId: number
}

interface ITagsDataItem {
  id: number
  tagName: string
}

export default defineComponent({
  name: 'tagSelection',
  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      default() {
        return []
      }
    },
    isLook: {
      // 是否查看
      type: Boolean,
      default() {
        return false
      }
    },
    disabled: {
      // 是否禁用下架标签
      type: Boolean,
      default() {
        return false
      }
    },
    placeholder: {
      // 提示语
      type: String,
      default() {
        return '标签'
      }
    },
    width: {
      // 宽度
      type: Number,
      default() {
        return 300
      }
    },
    // 联系人客户id
    clientCompanyId: Number
  },
  setup(props: IProps, { emit }) {
    const { modelValue } = toRefs(props)

    const dataMap = reactive({
      customLabelAll: {
        enterpriseTagList: [],
        customTagList: []
      },
      // inputHeight: 32, // 默认高度
      selectNameList: [] as string[], // input展示数据
      tagsWeb: props.modelValue,
      dialog: false // 弹层状态
    })

    /* 标签数据 */
    const tagsData = computed(() => {
      if (dataMap.customLabelAll.enterpriseTagList) {
        return dataMap.customLabelAll.enterpriseTagList.concat(dataMap.customLabelAll.customTagList)
      }
      return []
    })
    /* 标签扁平化item数据 */
    const tagsDataItem = computed((): ITagsDataItem[] => {
      const arr = []
      tagsData.value.forEach((item) => {
        arr.push(...item.tagList)
      })
      return arr
    })

    onMounted(async () => {
      await onFindCustomLabelAll({ clientCompanyId: props.clientCompanyId })
      setCurrentValue()
    })

    watch(modelValue, (value) => {
      dataMap.tagsWeb = value
      // console.log(dataMap.tagsWeb, '000000000')
      setCurrentValue()
    })

    /* 查询标签数据 */
    const onFindCustomLabelAll = async (form): Promise<void> => {
      const { data } = await apiFindCustomLabelAll(form)
      if (data.code === 1020000 || data.code === 1040400) {
        dataMap.customLabelAll = data.content
        console.log(dataMap.customLabelAll, 'dataMap.customLabelAll')
      }
    }
    /* 复选框点击 */
    const onCheckbox = (item, it) => {
      /* 处理单选问题 */
      if (item.isSingle) {
        item.tagList.forEach((mapItem) => {
          const tagsWebIndexOf = dataMap.tagsWeb.indexOf(mapItem.id)
          console.log(tagsWebIndexOf, mapItem.id)
          if (tagsWebIndexOf !== -1 && mapItem.id !== it.id) {
            // 存在且不是当前
            dataMap.tagsWeb.splice(tagsWebIndexOf, 1)
          }
        })
      }

      setSelectNameList() // 处理input展示数据
      emit('update:modelValue', dataMap.tagsWeb)
    }
    /* 处理input展示数据 */
    const setSelectNameList = () => {
      console.log(props.modelValue)
      dataMap.selectNameList = []
      tagsDataItem.value.forEach((item) => {
        if (dataMap.tagsWeb.includes(item.id)) {
          dataMap.selectNameList.push(item.tagName)
        }
      })
      console.log(dataMap.selectNameList, 'this.selectNameList')
    }
    const setCurrentValue = () => {
      setSelectNameList() // 处理input展示数据
    }
    return {
      ...toRefs(dataMap),
      onCheckbox
    }
  }
})
</script>

<style lang="scss" scoped>
#tag_selection {
  width: 100%;
  height: 100%;

  .tab_box {
    font-size: 0.28rem;

    .tab_title {
      margin: 0.1rem;
      padding-left: 0.2rem;
      font-size: 0.25rem;
      border-left: 2px solid #1989fa;
    }

    .tab_line {
      margin: 0.1rem 0;
      border-bottom: 1px solid #f6f2f2;
    }
  }

  :deep(.van-checkbox) {
    .van-checkbox__icon {
      display: none;
    }

    .van-checkbox__label {
      margin: 0.08rem;
      padding: 0 0.08rem;
      font-size: 0.25rem;
      border: 1px solid #ccc;
    }

    .van-checkbox__icon--checked + .van-checkbox__label {
      border: 1px solid #1989fa;
      color: #fff;
      background: #1989fa;
    }
  }

  :deep(.van-checkbox--horizontal) {
    margin-right: 0;
  }
}
</style>
