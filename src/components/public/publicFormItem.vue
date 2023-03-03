<template>
	<!--  下拉单选  -->
	<field-popup
		v-if="item.componentType === 'select' && item.multiple === 0"
		v-model="form[item.tableName + '-' + item.columnName]"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:rules="rulesInit(item)"
		:required="item.isRequired === 1"
		:disabled="item.disabled === 1"
		:columns="columnsOne"
	/>
	<!-- 下拉多选 -->
	<field-popup-multiple
		v-if="item.componentType === 'select' && item.multiple === 1"
		v-model="form[item.tableName + '-' + item.columnName]"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
		:placeholder="item.placeholder"
		:columns="columns"
		:option="{ text: 'optionName', value: 'optionValue', checked: 'checked' }"
		@recoveryBefore="recoveryBefore"
	/>
	<!-- 单选 -->
	<van-field
		v-if="item.componentType === 'radio'"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
	>
		<template #input>
			<van-radio-group v-model="form[item.tableName + '-' + item.columnName]" direction="horizontal">
				<van-radio v-for="(it, index) in columnsOne" :name="it.value" :key="index">{{ it.text }}</van-radio>
			</van-radio-group>
		</template>
	</van-field>
	<!-- 多选 -->
	<filed-dialog
		v-if="item.componentType === 'checkBox'"
		v-model="form[item.tableName + '-' + item.columnName]"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
		apiName="apiDictionaries"
		:checkParams="checkParams"
	/>
	<!-- 时间 -->
	<filed-date
		v-if="item.componentType === 'dateTime'"
		v-model="form[item.tableName + '-' + item.columnName]"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
	/>
	<!-- 上传 -->
	<van-field
		v-if="item.componentType === 'upload'"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
	>
		<!--    <template #input>
      <form
        id="file_upload_form1"
        class="popUp-one"
        method="post"
        enctype="multipart/form-data"
        :key="item.tableName + '-' + item.columnName + '1'"
        :name="item.fieldName"
      >
        <label for="inputFile">
          <input
            style="display: none"
            type="file"
            :accept="acceptFormat(item.accept)"
            id="inputFile"
            name="file"
            multiple
            @change="onWechatPicturesUpload"
          />
          <span class="upload"> 上传 </span>
          <span style="margin-left: 0.2rem; font-size: 0.1rem; color: #f8a22b"
            >限制格式：{{ item.accept.toUpperCase().split(',').join('、') }}</span
          >
        </label>
        <div style="display: flex; flex-wrap: wrap; overflow: hidden; padding-left: 0">
          <div
            v-for="(it, index) in form[item.tableName + '-' + item.columnName]"
            :key="index"
            style="margin: 0.2rem 0.2rem 0 0; text-align: center"
          >
            <div style="width: 2rem; height: 2rem; border: 1px solid #ccc">
              <img style="width: 100%; max-height: 2rem" :src="it" alt="" />
            </div>
            <span style="color: #409eff" @click="remove(it)">删除</span>
          </div>
        </div>
      </form>
    </template>-->

		<template #input>
			<van-uploader
				v-model="form[item.tableName + '-' + item.columnName]"
				multiple
				:after-read="afterRead"
				:before-read="beforeRead"
				:max-count="3"
				accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,multipart/form-data,image/jpeg,text/html"
			>
				<span class="upload"> 上传 </span>
				<span style="margin-left: 0.2rem; font-size: 0.1rem; color: #f8a22b"
					>限制格式：{{ item.accept.toUpperCase().split(",").join("、") }}</span
				>
			</van-uploader>
		</template>
	</van-field>
	<!--输入框-->
	<van-field
		v-if="item.componentType === 'input'"
		v-model="form[item.tableName + '-' + item.columnName]"
		:name="item.fieldName"
		:label="item.fieldDescription"
		:required="item.isRequired === 1"
		:rules="rulesInit(item)"
		:rows="item.rows"
		:placeholder="item.placeholder || '请输入'"
		:type="item.specificType"
	/>
</template>

<script>
import { apiDictionaries } from "@/api/publicCustomer";
import { rules } from "@/utils/rules";
import fieldPopup from "@/components/public/fieldPopup";
import fieldPopupMultiple from "@/components/public/fieldPopupMultiple";
import filedDate from "@/components/public/filedDate";
import { Toast } from "vant";
import android from "@/android";
import { closeLoading, startLoading } from "@/utils/loading";
import axios from "@/utils/request";
import moment from "moment";
import filedDialog from "@/components/public/filedDialog";
import { useUserStore } from "@/store/modules/user";
export default {
	name: "publicFormItem",
	components: { filedDialog, filedDate, fieldPopupMultiple, fieldPopup },
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			form: {}, // 表单数据
			columns: [], // select多选选项
			columnsOne: [], // select单选（radio）选项
			checkParams: {}, // 获取check选项数据所需参数
			rules,
			problemShow: false, // 提示展示
			fileList: []
		};
	},
	computed: {
		rulesInit() {
			return function (itemVal) {
				const val = itemVal.tableName + "-" + itemVal.columnName;
				const _objRule = {};
				const _name = this.item.tableName + "-" + this.item.columnName;
				_objRule[_name] = [...this.rules[this.item.verificationRules]];
				if (this.item.verificationMessage) {
					_objRule[_name][0].requiredMsg = this.item.verificationMessage;
				}
				const ruleList = _objRule[val]?.map(item => {
					let required = false;
					let message = "";
					let pattern = "";
					if (itemVal.isRequired === 1) {
						if (item.patternText) {
							required = true;
							message = item.patternMsg;
							pattern = item.patternText;
						} else {
							required = true;
							message = item.requiredMsg || "请填写";
						}
					}
					return {
						required,
						message,
						pattern
					};
				});
				// console.log(_objRule[val], ruleList)
				return ruleList;
			};
		}
	},
	mounted() {
		this.getOptionList();
	},
	methods: {
		// 获取选项数据
		async getOptionList() {
			if (this.item.dictionaryType !== null) {
				const _form = {
					dictionaryType: this.item.dictionaryType,
					selectType: this.item.selectType,
					isDiffPattern: this.item.isDiffPattern
				};
				this.checkParams = { ..._form };
				if (["select", "radio"].includes(this.item.componentType)) {
					// select、radio选项数据
					const { data } = await apiDictionaries(_form);
					if (data.code === 1020000) {
						// this.columns = data.content
						this.columns = [];
						this.columnsOne = [];
						if (data.content) {
							data.content.map(res => {
								if (this.item.multiple === 1) {
									this.columns.push({ optionName: res.optionName, optionValue: res.optionValue, checked: false });
								} else {
									this.columnsOne.push({ text: res.optionName, value: res.optionValue });
								}
							});
						}
					}
				}
			}
		},
		// 限制所选文件的格式
		acceptFormat(accept) {
			const arr = [];
			if (accept) {
				accept.split(",").map(res => {
					arr.push(res.toUpperCase());
					arr.push(res.toLowerCase());
				});
			}
			return arr.join(",");
		},
		// 上传
		onWechatPicturesUpload(e) {
			Toast.allowMultiple();
			if (!android) {
				// 批量上传多次请求--非安卓
				const files = e.target.files;
				for (let i = 0; i < files?.length; i++) {
					if (files[i].size / 1024 / 1024 > this.item.maxSize) {
						Toast({ message: `图片不可超过${this.item.maxSize}M，请压缩后重新上传`, position: "top", duration: 2000 });
					} else {
						const loading = startLoading(); // loading
						const formData = new FormData();
						formData.append("file", files[i]);
						formData.append("filesPath", this.item.filesPath); // 文件储存地址
						axios({
							method: "post",
							url: "api/v1/common/uploadfiles",
							headers: {
								Authorization: useUserStore().token
							},
							dataType: "json",
							data: formData
						})
							.then(res => {
								if (res.data.result === "yes") {
									this.form[this.item.tableName + "-" + this.item.columnName].push(res.data.url);
									closeLoading(loading);
								} else {
									closeLoading(loading);
									Toast({ message: "上传失败", position: "top", duration: 2000 });
								}
							})
							.catch(() => {
								closeLoading(loading);
							});
					}
				}
			} else {
				try {
					console.log("开始调用");
					const url = "uploadfiles/images/phoneBook/" + moment(new Date()).format("YYYYMMDD");
					console.log(url);
					android.uploadPic(url);
				} catch (e) {
					console.log("失败");
					console.log("出现错误, 如果在非android环境下访问, 出现该警告是正常的.");
				}
			}
		},
		remove(url) {
			// 删除上传的文件
			this.form[this.item.tableName + "-" + this.item.columnName] = this.form[
				this.item.tableName + "-" + this.item.columnName
			].filter(res => res !== url);
		},
		initReturnUpload() {
			window.onReturnUpload = this.onReturnUpload();
		},
		onReturnUpload(result, imgUrl) {
			if (result === "yes") {
				this.form[this.item.tableName + "-" + this.item.columnName] = this.replaceImgUrl(imgUrl);
			}
		},
		// 恢复之前的选择
		recoveryBefore(columsInit) {
			this.form[this.item.tableName + "-" + this.item.columnName] = [...columsInit];
		},
		// 初始化，数据回显专用
		initModel(val) {
			// console.log(val)
			this.form = { ...val };
			this.initReturnUpload();
			// this.getOptionList()
		},

		// vant上传
		beforeRead(file) {
			const files = Array.isArray(file) ? file : [file];
			const types = this.item.accept.split(",");
			const isSize = files.every(i => i.size / 1024 / 1024 < this.item.maxSize);
			const isFormat = files.every(i => types.some(ti => i.type.indexOf(ti) !== -1));
			if (!isFormat) {
				Toast({ message: "文件格式错误", position: "top", duration: 2000 });
			}
			if (!isSize) {
				Toast({ message: `图片不可超过${this.item.maxSize}M，请压缩后重新上传`, position: "top", duration: 2000 });
			}
			return isFormat && isSize;
		},
		afterRead(file) {
			const files = Array.isArray(file) ? file : [file];
			files.map(i => {
				i.status = "uploading";
				i.message = "上传中...";
				const formData = new FormData();
				formData.append("file", i.file);
				formData.append("filesPath", this.item.filesPath); // 文件储存地址
				axios({
					method: "post",
					url: "api/v1/common/uploadfiles",
					headers: {
						Authorization: this.token.authorization
					},
					dataType: "json",
					data: formData
				})
					.then(res => {
						if (res.data.result === "yes") {
							// this.form[this.item.tableName + '-' + this.item.columnName].push(res.data.url)
							i.status = "done";
							i.message = "上传成功";
						} else {
							i.status = "failed";
							i.message = "上传失败";
						}
					})
					.catch(() => {
						i.status = "failed";
					});
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.problem_tips {
	margin: 0.1rem 0;
	font-size: 0.1rem;
	text-indent: 20em;
	color: red;
}

.upload {
	padding: 0.1rem;
	border: 1px solid #ccc;
	border-radius: 0.1rem;
}
</style>
