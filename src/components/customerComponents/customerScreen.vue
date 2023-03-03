<template>
	<div class="nav_tab">
		<div @click="attributionTimeStatus = !attributionTimeStatus" class="nav_tab_item" style="color: #399cff">
			<svg class="icon" aria-hidden="true" style="margin-right: 0.1rem; font-size: 0.2rem">
				<use xlink:href="#icon-shunxu"></use>
			</svg>
			<span>{{ timeType }}</span>
		</div>
		<div @click="onNavClick('筛选')" class="nav_tab_item">
			<svg class="icon" aria-hidden="true" style="margin-right: 0.1rem; font-size: 0.2rem">
				<use xlink:href="#icon-shaixuan"></use>
			</svg>
			<span>筛选</span>
		</div>
		<div @click="onNavClick('多选')" class="nav_tab_item">
			<svg class="icon" aria-hidden="true" style="margin-right: 0.1rem; font-size: 0.2rem">
				<use xlink:href="#icon-duoxuan1"></use>
			</svg>
			<span>多选</span>
		</div>
	</div>
	<div @click="attributionTimeStatus = false" v-show="attributionTimeStatus" class="attribution_time">
		<div class="attributiontime_status_content" :class="{ active_time_sort: activeTime === 1 }" @click="setActiveTimeSort(1)">
			归属时间(从近到远)
		</div>
		<div class="attributiontime_status_content" :class="{ active_time_sort: activeTime === 2 }" @click="setActiveTimeSort(2)">
			通话时间(从近到远)
		</div>
		<div class="attributiontime_status_content" :class="{ active_time_sort: activeTime === 3 }" @click="setActiveTimeSort(3)">
			通话时间(从远到近)
		</div>
	</div>
	<!-- 筛选条件弹出层  -->
	<van-popup v-model:show="popupShow" :round="true" position="right" :style="{ height: '100%', width: '70%' }">
		<div class="popup_box">
			<div v-if="[0, 123].includes(dropDownValue)" style="margin-bottom: 0.2rem">
				<div style="padding-bottom: 0.1rem" class="border_bottom">库类型</div>
				<div class="library_type">
					<div
						v-for="item in libraryTypeData.filter(res => res.show.includes(dropDownValue) && res.pattern.includes(user.pattern))"
						:key="item.value"
						@click="libraryTypeIndex = item.value"
						class="library_type_item"
						:class="{ library_type_active: libraryTypeIndex === item.value }"
					>
						{{ item.text }}
					</div>
				</div>
			</div>
			<div style="margin-bottom: 0.2rem">
				<div style="padding-bottom: 0.1rem" class="border_bottom">企微绑定状态</div>
				<div class="library_type">
					<div
						v-for="item in weChatBinding"
						@click="weChatBindingStatus = item.value"
						:key="item.value"
						class="library_type_item"
						:class="{ library_type_active: weChatBindingStatus === item.value }"
					>
						{{ item.text }}
					</div>
				</div>
			</div>
			<div style="margin-bottom: 0.2rem">
				<div style="padding-bottom: 0.1rem" class="border_bottom">工商关联状态</div>
				<div class="library_type">
					<div
						v-for="item in relation"
						@click="relationStatus = item.value"
						:key="item.value"
						class="library_type_item"
						:class="{ library_type_active: relationStatus === item.value }"
					>
						{{ item.text }}
					</div>
				</div>
			</div>
			<div class="footer" style="display: flex; justify-content: center">
				<div @click="resetScreen" class="footer_button footer_button_one">重置</div>
				<div @click="popupConfirm" class="footer_button footer_button_two">确认</div>
			</div>
		</div>
	</van-popup>
	<van-popup v-model:show="multipleCustomersShow" position="right" :style="{ width: '100%', height: '100%' }">
		<multiple-customers
			ref="multipleCustomers"
			@onClose="multipleCustomersShow = false"
			:customersList="customersList"
			v-if="multipleCustomersShow"
		/>
	</van-popup>
</template>

<script>
import { computed, onMounted, reactive, toRefs, ref, nextTick } from "vue";
import { useUserStore } from "@/store/modules/user";
import multipleCustomers from "@/components/customerComponents/customerDetails/multipleCustomers.vue";

export default {
	name: "customerScreen",
	components: { multipleCustomers },
	emits: ["onSearchCustomer"],
	props: {
		// 客户列表数据
		customersList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	setup(props, { emit }) {
		const dataMap = reactive({
			attributionTimeStatus: false,
			timeType: "归属时间",
			popupShow: false,
			multipleCustomersShow: false,
			activeTime: 1,
			libraryTypeIndex: "",
			weChatBindingStatus: "",
			relationStatus: "",
			dropDownValue: "",
			libraryTypeData: [
				{ text: "A类", value: 3, show: [0, 123], pattern: [1, 2] },
				{ text: "B类", value: 2, show: [0, 123], pattern: [1, 2] },
				{ text: "C类", value: 1, show: [0, 123], pattern: [1, 2] },
				{ text: "F类", value: 10, show: [0], pattern: [1] },
				{ text: "S类", value: 6, show: [0], pattern: [1] },
				{ text: "OPP会员", value: 5, show: [0], pattern: [1] },
				{ text: "会员客户", value: 4, show: [0], pattern: [1] }
			],
			weChatBinding: [
				{ text: "已绑定", value: 1 },
				{ text: "未绑定", value: 0 }
			],
			relation: [
				{ text: "未关联", value: 0 },
				{ text: "关联成功", value: 1 },
				{ text: "部分关联成功", value: 2 },
				{ text: "关联失败", value: 3 }
			]
		});
		const multipleCustomers = ref(null);
		const user = computed(() => {
			return useUserStore().userInfo;
		});
		const permissions = computed(() => {
			return _usePhoneBookStore.permissions;
		});
		onMounted(() => {});
		const onNavClick = value => {
			dataMap.attributionTimeStatus = false; // 归属弹出层
			if (value === "筛选") {
				dataMap.popupShow = true; // 筛选弹出层
			} else {
				dataMap.multipleCustomersShow = true; // 多选弹出层
				nextTick(() => {
					multipleCustomers.value.initCustomers();
				});
			}
		};
		const setActiveTimeSort = item => {
			dataMap.activeTime = item;
			if (item === 1) {
				dataMap.timeType = "归属时间";
			} else {
				dataMap.timeType = "通话时间";
			}
		};
		/* 重置筛选条件 */
		const resetScreen = () => {
			dataMap.libraryTypeIndex = "";
		};
		/* 调用搜索列表 */
		const popupConfirm = () => {
			dataMap.popupShow = false;
			const _form = {
				libraryTypeIndex: dataMap.libraryTypeIndex
			};
			emit("onSearchCustomer", _form);
		};
		return {
			...toRefs(dataMap),
			multipleCustomers,
			user,
			permissions,
			resetScreen,
			popupConfirm,
			onNavClick,
			setActiveTimeSort
		};
	}
};
</script>

<style scoped lang="scss">
$color: #1c6fff;

.nav_tab {
	position: relative;
	display: flex;
	margin: auto;
	width: 90%;
	height: 0.7rem;
	font-size: 0.28rem;
	border-radius: 0.1rem;
	text-align: center;
	color: #232323;
	background: #f5f5f7;
	line-height: 0.7rem;

	.nav_tab_item {
		width: 33.3%;
		svg {
			width: 50px;
			height: 50px;
		}
	}
}

.attribution_time {
	position: absolute;
	top: 2.6rem;
	z-index: 1;
	width: 7.5rem;
	height: 80%;
	text-align: left;
	background: rgb(0 0 0 / 5%);

	.attributiontime_status_content {
		padding: 0.4rem;
		height: 1rem;
		background: #fff;
		box-sizing: border-box;
	}

	.attributiontime_status_content:last-of-type {
		border-radius: 0 0 0.3rem 0.3rem;
	}

	.active_time_sort {
		color: #399cff;
	}
}

.popup_box {
	padding: 0.5rem 0.3rem;
	height: 100%;
	box-sizing: border-box;

	.library_type {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		text-align: center;

		.library_type_item {
			margin: 0.3rem 0.2rem 0 0;
			padding: 0.1rem 0.2rem;
			border: 1px solid #f4f5f7;
			border-radius: 0.1rem;
			background: #f4f5f7;
		}

		.library_type_active {
			position: relative;
			border: 1px solid $color;
			color: $color;
		}
	}

	.footer {
		margin-top: 0.3rem;

		.footer_button {
			padding: 0.15rem 0.2rem;
			width: 1.3rem;
			border: 1px solid #e4e4e4;
			border-radius: 0.1rem;
			text-align: center;
		}

		.footer_button_one {
			border: 1px solid #e4e4e4;
		}

		.footer_button_two {
			margin-left: 0.2rem;
			border: 1px solid $color;
			color: #fff;
			background: $color;
		}
	}
}
</style>
