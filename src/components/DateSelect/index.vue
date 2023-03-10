<!--日期选择-->
<template>
	<div class="dateSelect flx-justify-between">
		<div class="dateSelect-box" @click="show = !show">
			<van-icon name="notes-o" class="dateSelect-box-icon" />
			<div class="dateSelect-box-text">
				{{ startText }}
				<div v-if="endText"><span>至</span>{{ endText }}</div>
			</div>
			<van-icon name="arrow-down" class="dateSelect-box-icon2" />
		</div>
		<van-calendar
			v-model:show="show"
			:default-date="defaultValue"
			:min-date="minDate"
			:max-date="maxDate"
			@confirm="onOk"
			@closed="onCancel"
			v-bind="attrs"
		/>
	</div>
</template>

<script lang="ts" setup name="DateSelect">
import { computed, ref, useAttrs } from "vue";
import moment from "moment";

const props = withDefaults(
	defineProps<{
		modelValue: string[] | string;
		formatValue?: string;
	}>(),
	{
		formatValue: "YYYY-MM-DD"
	}
);
const emit = defineEmits(["update:modelValue", "confirm"]);
const attrs = useAttrs();

const show = ref(false);
const minDate = ref(moment().subtract(6, "month").toDate());
const maxDate = ref(moment().add(6, "month").toDate());
const isArr = attrs?.type === "multiple" || attrs.type === "range";
/**
 * 数据格式化
 * @param value 数据
 * @param type date:返回对象格式 string：返回字符串格式
 */
const getValueFormat = (value: any, type: "date" | "string") => {
	const modelValueArr = isArr ? value : [value];
	const stringValue = modelValueArr.map(item => moment(item).format(props.formatValue));
	const dateValue = modelValueArr.map(item => moment(item).toDate());
	if (isArr) {
		return type === "date" ? dateValue : stringValue;
	} else {
		return type === "date" ? dateValue[0] : stringValue[0];
	}
};

const startText = computed(() => {
	const currentValue = getValueFormat(props.modelValue, "string");
	return isArr ? currentValue[0] : currentValue;
});

const endText = computed(() => {
	return isArr ? getValueFormat(props.modelValue, "string")[1] : false;
});

const defaultValue = ref(getValueFormat(props.modelValue, "date"));

const onOk = value => {
	show.value = false;
	const newValue = getValueFormat(value, "string");
	emit("update:modelValue", newValue);
	emit("confirm", newValue);
};
const onCancel = () => {
	show.value = false;
	defaultValue.value = getValueFormat(props.modelValue, "date");
};
</script>
<style lang="scss" scoped>
.dateSelect {
	padding: 30px;

	&-box {
		&-text {
			display: inline-block;
			font-weight: bold;
			color: #5a5a5a;
			& > div {
				display: inline-block;
				span {
					margin: 0 10px 0 0;
					font-size: 24px;
					color: #b0afb0;
				}
			}
		}

		&-icon {
			margin-right: 10px;
			font-size: 34px;
			color: $primary-color;
			vertical-align: -3px;
		}

		&-icon2 {
			margin-left: 10px;
			color: #b0afb0;
		}
	}

	.endTitle {
		padding: 30px 0;
		font-size: var(--van-picker-title-font-size);
		font-weight: var(--van-font-bold);
		color: var(--van-text-color);
		text-align: center;
		//border-top: 4px solid $border-color;
	}
}
</style>
