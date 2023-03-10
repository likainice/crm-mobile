<template>
	<div class="customer-list side-padding clearfix">
		<div class="list-item flx-justify-between" v-for="item in list" :key="item.id">
			<slot name="left" :item="item"></slot>
			<div class="list-item-war" @click="onClick(item)">
				<div class="item-top flx-justify-between">
					<div class="item-top-name sle">{{ item.name }}</div>
					<div class="item-top-qy">
						<van-tag>企业</van-tag>
					</div>
					<div class="item-top-right">
						距过期：<span>{{ 1 }}天</span>
					</div>
				</div>
				<div class="item-center flx-justify-between">
					<div class="item-desc">
						<van-icon name="label-o" />
						标签：
					</div>
					<div class="item-center-tag">
						<van-space size="1em">
							<van-tag round type="primary">建筑业</van-tag>
							<van-tag round type="success">北京</van-tag>
							<van-tag round type="danger">参保人</van-tag>
							<van-tag round type="warning">财务</van-tag>
						</van-space>
					</div>
					<van-icon name="arrow" class="item-desc" />
				</div>
				<div class="item-bot flx-justify-between">
					<div class="item-desc">联系人：{{ item.linkmanName }}</div>
					<div class="item-desc">上次联系时间：{{ "06-09 12:30" }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="CustomerList">
import { useRouter } from "vue-router";
import { toRef } from "vue";

const router = useRouter();
const props = withDefaults(
	defineProps<{
		checked?: boolean;
		dataSource: any[];
	}>(),
	{
		checked: false,
		dataSource: () => []
	}
);
const list = toRef(props, "dataSource");

const onClick = item => {
	router.push("/customer/detail");
};
</script>
<style lang="scss" scoped>
.customer-list {
	.list-item {
		padding: 36px 20px;
		border-bottom: 1px solid #f2f2f2;

		.van-checkbox {
			padding-right: 30px;
		}

		&-war {
			flex: 1;
			//margin-left: 30px;
			//padding-left: 40px;
		}

		.item-top {
			font-size: 30px;

			&-name {
				max-width: 320px;
			}

			&-qy {
				flex: 1;
				margin-left: 20px;
			}

			.item-top-right {
				font-size: 20px;

				span {
					display: inline-block;
					padding: 2px 15px;
					color: #fff;
					text-align: center;
					background: orange;
				}
			}
		}

		.item-center {
			margin: 30px 0;

			.item-center-tag {
				flex: 1;
				text-align: left;
			}
		}

		.item-desc {
			font-size: 22px;
			color: #999;
		}
	}
}
</style>
