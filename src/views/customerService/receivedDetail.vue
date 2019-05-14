<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
	<section style="padding:10px 20px">
		<el-form class="form-item-block" :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref="DIALOG_FORM"
		 :rules="editForm">
			<el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
				<el-col :span="16" class="titleText">
					<Breadcrumb></Breadcrumb>
				</el-col>
				<el-col :span="8" align="right" class="titleText">
					<el-button @click="goBack()" style="margin-top:-50px">返回</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-steps :active="3" align-left>
					<el-step title="买家下单" :description="stepList.one"></el-step>
					<el-step title="买家付款" :description="stepList.two"></el-step>
					<el-step title="商家发货" :description="stepList.three"></el-step>
					<el-step title="订单完成" description></el-step>
				</el-steps>
			</el-row>
			<div class="line"></div>
			<el-row :gutter="10" class="middle_main">
				<el-col :span="12">
					<el-row :gutter="4">
						<el-col :span="5" class="title_info" style="padding-left:10px;font-weight:normal">支付时间</el-col>
						<el-col :span="18" style="float:right;line-height:30px">
							<div>{{data.subOrder.payTime | formatDate}}</div>
						</el-col>
					</el-row>
					<el-row :gutter="4">
						<el-col :span="5" class="title_info" style="padding-left:10px;font-weight:normal">
							<div>支付方式</div>
						</el-col>
						<el-col :span="18" style="float:right;line-height:30px">
							<div>{{data.subOrder.payPlatformDesc}}</div>
						</el-col>
					</el-row>
					<el-row :gutter="4">
						<el-col :span="5" class="title_info" style="padding-left:10px;font-weight:normal">
							<div>买家</div>
						</el-col>
						<el-col :span="18" style="float:right;position:relative;">
							<el-col :span="24">
								<img @mouseout="hideUserInfo()" :src="getHeaderUrl()" class="maijiaimg" style="max-width: 50px;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;cursor: pointer"
								 @mouseover="showUserInfo()">
								<span class="maijiaspan" @click="showUserInfo()" @mouseover="showUserInfo()" @mouseout="hideUserInfo()" style="cursor: pointer">
									{{data.subOrder.userName}}
									<i class="el-icon-question" style="color: #E6A23C;"></i>
								</span>
							</el-col>
							<el-card class="box-card" :body-style="{ padding: '0px' }" v-show="userShow" shadow="always" style="position:absolute">
								<img :src="getHeaderUrl()" class="image">
								<div style="padding: 14px;">
									<div class="bottom clearfix">
										<div>ID:&nbsp;{{data.user.id}}</div>
										<div>昵称:&nbsp;{{data.user.nickName}}</div>
										<div>姓名:&nbsp;{{data.user.userName}}</div>
										<div>手机号:&nbsp;{{data.user.mobile}}</div>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<el-row>
						<el-col :span="5" class="title_info" style="padding-left:10px;font-weight:normal">
							<div>收货信息</div>
						</el-col>
						<el-col :span="18" style="float:right;line-height:30px;margin-top:-5px">
							<div style="min-width:450px; ">
								{{data.address.receiveAddress}},{{data.address.receiver}},{{data.address.receivePhone}}
								<el-button type="text" v-clipboard:copy="copyContent()" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
							</div>
							<el-row v-if="data.address.identity" style="line-height:20px;margin-top:0px;">身份证号：&nbsp;{{data.address.identity}}</el-row>
							<el-row v-if="data.address.iscardSm">
								<img :src="data.address.iscardSm" style="max-width: 150px;max-height: 150px;">
								<img :src="data.address.iscardFm" style="max-width: 150px;max-height: 150px;">
							</el-row>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
      <el-row>
        <el-col :span="12" class="sect" style="maring-top:-40px">
          <el-col class="sect-left" :span="5">是否发票</el-col>
          <el-col class="sect-right" :span="19">
            <div v-if="data.mainOrder.isInvoice==2">是</div>
            <div v-if="data.mainOrder.isInvoice!=2">否</div>
          </el-col>
        </el-col>
        <el-col :span="12" class="sect" style="maring-top:-40px" v-if="data.mainOrder.isInvoice==2 && data.mainOrder.invoiceTitleType==1">
          <el-col class="sect-left" :span="5">姓名</el-col>
          <el-col class="sect-right" :span="19">{{data.mainOrder.invoiceTitle}}</el-col>
        </el-col>
        <el-col :span="12" class="sect" v-if="data.mainOrder.isInvoice==2 && data.mainOrder.invoiceTitleType==2">
          <el-col class="sect-left" :span="5">企业全名</el-col>
          <el-col class="sect-right" :span="19">{{data.mainOrder.invoiceTitle}}</el-col>
        </el-col>
        <el-col :span="12" class="sect" v-if="data.mainOrder.isInvoice==2 && data.mainOrder.invoiceTitleType==2">
          <el-col class="sect-left" :span="5">纳税人识别号</el-col>
          <el-col class="sect-right" :span="19">{{data.mainOrder.taxNum}}</el-col>
        </el-col>
        <el-col :span="12" class="sect">
          <el-col class="sect-left" :span="5" v-if="data.mainOrder.identity">邮箱</el-col>
          <el-col class="sect-right" :span="19">{{data.mainOrder.identity}}</el-col>
        </el-col>
      </el-row>

			<!--显示备注-->
			<el-dialog :title="'编辑收货信息'" :visible.sync="dialogShowAddress" :close-on-click-modal="false">
				<el-row justify="center">
					<el-col :span="24" style="text-align:center">
						<!--<div>{{DIALOG_FORM.remark}}</div>-->
						<el-form-item label="收件人" size="medium">
							<el-input v-model="DIALOG_FORM.receiver"></el-input>
						</el-form-item>
						<el-form-item label="手机" size="medium">
							<el-input v-model="DIALOG_FORM.receivePhone"></el-input>
						</el-form-item>
						<el-form-item label="地址" size="medium">
							<el-input v-model="DIALOG_FORM.receiveAddress"></el-input>
						</el-form-item>
						<el-row justify="center">
							<el-col :span="24" style="text-align:center">
								<el-button @click="canelAddress">取消</el-button>
								<el-button type="primary" @click="saveAddress">保存</el-button>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-dialog>

			<el-row class="table_top">
				<span class="bigShow_title" style="color:#409eff">商品详情</span>
			</el-row>
			<el-row style="margin-top:15px;margin-bottom:10px;">
				<el-col :span="16">
					订单编号: &nbsp;&nbsp;{{data.subOrder.orderNo}} &nbsp;&nbsp;{{data.subOrder.warehouseName}} &nbsp;&nbsp;

					<el-button type="primary" @click="orderComp()"  size="mini">订单详情</el-button>
				</el-col>
				<el-col :span="8" style="text-align:right">下单时间：{{stepList.one}}</el-col>
			</el-row>
			<el-table class="table-table" :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList" v-loading="LOADING"
			 :element-loading-text="$t('lang.common.loading')">
				<el-table-column prop="goodName" label="商品标题" min-width="120">
					 <template slot-scope="props">
            <img :src="props.row.goodImg" style="max-height: 50px;"/>
            <div>{{props.row.goodName}}</div>
          </template>
				</el-table-column>
				<el-table-column prop="goodCode" label="规格/编号/供应商名" min-width="180">
					<template slot-scope="props">
						<div class="el-table-2" style="display:table;">
							<span style='display:table-cell;width:33px'>规格</span>
							<span style="display:table-cell">{{ props.row.goodAttrDesc }}</span>
						</div>
						<div class="el-table-2">
							<span>编码</span>
							<span>{{ props.row.goodCode }}</span>
						</div>
						<div class="el-table-2">
							<span :span="8">品牌</span>
							<span :span="16">{{ props.row.brandName }}</span>
						</div>
						<div class="el-table-2">
							<span>供应商</span>
							<span>{{ props.row.storeName }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="actGoodPrice" label="单价" min-width="120">
					<template slot-scope="props">￥{{ props.row.actGoodPrice | currency}}</template>
				</el-table-column>
				<el-table-column prop="goodQuantity" label="数量" min-width="100"></el-table-column>
				<el-table-column prop="totalDisAmt" label="总优惠" min-width="100">
					<template slot-scope="props">-￥{{ props.row.totalDisAmt | currency}}</template>
				</el-table-column>
				<el-table-column prop="realPayAmout" label="实付" min-width="100">
					<template slot-scope="props">￥{{ props.row.actPayAmt | currency}}</template>
				</el-table-column>
				<el-table-column label="订单状态" min-width="120">
					<template slot-scope="props">{{ data.subOrder.orderStatusDesc}}</template>
				</el-table-column>
				<el-table-column label="操作" width="130">
					<template slot-scope="scope">
						<el-button v-permissions="'DD020102'" @click="showRemark(scope.row)" type="text" size="small">
							<span>添加备注</span>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog :title="'订单详情'" :visible.sync="dialogOrderComp">
				<el-row style="width:100%">
					<el-col :span="3">&nbsp;</el-col>
					<el-col :span="18">
						<el-row>
							<el-col :span="9">
								<el-row style="text-align:right">订单小计</el-row>
								<el-row style="margin-top:-10px;text-align:right">运费</el-row>
								<el-row v-if="data.subOrder.crossBorder==1" style="margin-top:-10px;text-align:right">税费</el-row>
								<el-row class="detail-margin" style="margin-top:-10px;text-align:right">优惠券</el-row>
								<el-row style="margin-top:-10px;text-align:right">下单立减</el-row>
								<el-row style="margin-top:-10px;text-align:right">分享立减</el-row>
								<el-row style="margin-top:-10px;text-align:right">余额抵扣</el-row>
							</el-col>
							<el-col :span="9">
								<el-row style="text-align:right">￥{{data.subOrder.totalAmout | currency}}</el-row>
								<el-row style="margin-top:-10px;text-align:right">￥{{data.subOrder.orderFreight | currency}}</el-row>
								<el-row style="margin-top:-10px;text-align:right" v-if="data.subOrder.crossBorder==1">￥{{data.subOrder.totalTax | currency}}</el-row>
								<el-row style="margin-top:-10px;text-align:right" class="detail-margin">
									<div v-if="data.subOrder.crossBorder!=1" style="color: darkorange;">-￥{{data.subOrder.disAmt | currency}}</div>
									<div v-if="data.subOrder.crossBorder==1">--</div>
								</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.subOrder.rebateAmt | currency}}</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.subOrder.shareDis | currency}}</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.subOrder.cash | currency}}</el-row>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
						<el-row style="border-top:1px dashed #ccc;text-align:right;margin-top:-20px">
							<el-col :span="9" class="bigShow_title detail-margin" style="text-align:right">实付款</el-col>
							<el-col :span="9" class="bigShow_content detail-margin">￥{{data.subOrder.realPayAmout| currency}}</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
					</el-col>
					<el-col :span="3">&nbsp;</el-col>
				</el-row>
				<el-row justify="center" style="margin-top:30px">
					<el-col :span="24" style="text-align:center">
						<el-button type="primary" @click="closeOrderComp">关闭</el-button>
					</el-col>
				</el-row>
			</el-dialog>

			<!--显示备注-->
			<el-form :model="StoreRemarkForm" :label-width="FORM_LABEL_WIDTH" :inline="true" ref="StoreRemarkForm">
				<el-dialog :title="'备注'" :visible.sync="dialogShowRemark" :close-on-click-modal="false">
					<!--<el-form-item label="" size="medium">-->
					<div style="margin-bottom: 20px;">
						<el-input type="textarea" v-model="StoreRemarkForm.remark" :maxlength="100" placeholder="最多不超过100个字符"></el-input>
					</div>
					<!--</el-form-item>-->
					<el-row justify="center">
						<el-col :span="24" style="text-align:center">
							<el-button @click="canelRemark">取消</el-button>
							<el-button type="primary" @click="saveRemark">保存</el-button>
						</el-col>
					</el-row>
				</el-dialog>
			</el-form>

			<!--显示物流-->
			<el-dialog :title="'物流详情'" :visible.sync="dialogShowLogistics" :close-on-click-modal="false">
				<el-alert v-if="logisticsList &&logisticsList.length>1" type="warning" :closable="false">{{logisticsList.length+'个包裹已发出'}}</el-alert>
				<div v-if="logisticsList &&logisticsList.length>1">
					<template v-for="item in logisticsList">
						<div class="wuliu_box">
							<div class="wuliu_number">
								<span>
									<i class="el-icon-tickets"></i>
									{{item.expressStatus}}
								</span>
								<span>{{item.expressName}}&nbsp;{{item.courierNum}}</span>
							</div>
							<div class="wuliu_image">
								<div v-for="(good,index) in item.goodsList" :key="index">
									<img :src="good.goodImg">
									<div>{{good.goodQuantity}}件</div>
								</div>
							</div>
							<div class="wuliu_number">
								<span>共 {{item.goodsList.length}} 件商品</span>
								<el-button @click="showLogisticsDetail(item)" type="primary" size="small">
									<span>查看物流信息</span>
								</el-button>
							</div>
						</div>
					</template>
				</div>
			</el-dialog>
			<el-dialog :title="'查看物流'" :visible.sync="dialogLogisticsDetail" :close-on-click-modal="false">
				<div style="margin-bottom: 10px;">【{{LogisticsDetail.expressName}}】{{LogisticsDetail.courierNum}}</div>
				<div style="min-height: 200px;" v-if="!LogisticsDetail.expressList || LogisticsDetail.expressList.length==0">暂无</div>
				<div style="min-height: 200px;" v-if="LogisticsDetail.expressList && LogisticsDetail.expressList.length>0">
					<el-steps direction="vertical" :active="LogisticsDetail.expressList.length">
						<template v-for="item in LogisticsDetail.expressList">
							<el-step :title="item.context" :description="item.time" icon="el-icon-info"></el-step>
						</template>
					</el-steps>
				</div>
			</el-dialog>

			<!--修改物流-->
			<el-dialog :title="'物流详情'" :visible.sync="dialogEditLogistics" :close-on-click-modal="false">
				<el-container>
					<el-header v-if="logisticsList &&logisticsList.length>1" :closable="false">{{logisticsList.length}}个包裹已发出</el-header>
					<el-main>
						<div v-if="logisticsList &&logisticsList.length>1">
							<template v-for="item in logisticsList">
								<el-row>
									<el-row>
										{{item.expressStatus}}
										<span style="float: right">{{item.expressName}}&nbsp;{{item.courierNum}}</span>
									</el-row>
									<el-row>
										<div v-for="good in item.goodsList">
											<img :src="good.goodImg" style="max-width: 50px;">
											<span>{{good.goodQuantity}}件</span>
										</div>
									</el-row>
									<el-row>共 {{item.goodNums}} 件商品</el-row>
									<el-row>
										<el-button @click="editLogisticsDetail(item)" type="primary" size="small">
											<span>修改物流信息</span>
										</el-button>
									</el-row>
								</el-row>
							</template>
						</div>
					</el-main>
				</el-container>
			</el-dialog>
			<el-form :model="SendGoodsForm" :label-width="FORM_LABEL_WIDTH" :inline="true" ref="SendGoodsForm" :rules="editForm2">
				<el-dialog :title="'修改物流信息'" :visible.sync="dialogSendGoods" :close-on-click-modal="false">
					<el-form-item label="收货人">
						<div>{{data.address.receiver}}/{{data.address.receivePhone}}</div>
						<div>{{data.address.receiveAddress}}</div>
					</el-form-item>
					<el-form-item label="快递公司">
						<el-select v-model="SendGoodsForm.expressCode" placeholder="请选择" @change="changeExpress">
							<el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="快递单号">
						<el-input v-model="SendGoodsForm.courierNum" :maxlength="30"></el-input>
					</el-form-item>
					<el-row justify="center">
						<el-col :span="24" style="text-align:center">
							<el-button @click="canelSendGoods">取消</el-button>
							<el-button type="primary" @click="saveSendGood">保存</el-button>
						</el-col>
					</el-row>
				</el-dialog>
			</el-form>
		</el-form>
	</section>
</template>
<style>
	.sec {
		padding: 20px;
	}

	.sect {
		line-height: 30px;
		margin-bottom: 20px;
	}

	.line {
		display: inline-block;
		width: 100%;
		border-top: 1px solid #ccc;
	}

	.clearfix div {
		margin-bottom: 5px;
	}

	.title_info {
		background: #f0f0f0;
		height: 30px;
		width: 100%;
		line-height: 30px;
	}

	.maijiaspan {
		margin-top: 17px;
		margin-left: 10px;
		float: left;
	}

	.maijiaimg {
		float: left;
	}

	.sect-left {
		height: 30px;
		line-height: 30px;
		background: #f0f0f0;
		padding-left: 10px;
	}

	.sect-right {
		float: right;
		padding-left: 4%;
		line-height: 30px;
	}

	.image {
		width: 100%;
		display: block;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
		font-size: 13px;
		color: #999;
	}

	.box-card {
		width: 200px;
		position: absolute;
	}

	.detail-margin {
		margin-top: 10px;
	}

	.bigShow_title {
		font-weight: bold;
		font-size: 16px;
	}

	.bigShow_content {
		font-weight: bold;
		font-size: 16px;
		color: red;
	}

	.table_top {
		margin-top: 10px;
		margin-bottom: 10px;
		padding-top: 30px;
		border-top: solid 1px #ccc;
	}

	.wuliu_box {
		padding: 0 24px;
	}

	.wuliu_box .wuliu_number {
		padding: 5px 0 10px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.wuliu_box .wuliu_image {
		display: flex;
		align-items: center;
	}

	.wuliu_box .wuliu_image>div {
		position: relative;
		margin-right: 2%;
		width: 23%;
		text-align: center;
	}

	.wuliu_box .wuliu_image>div>img {
		width: 100%;
		height: 120px;
		vertical-align: top;
	}

	.el-table-2 {
		float: left;
		width: 100%;
		margin-top: 0px;
	}

	.wuliu_box .wuliu_image>div>div {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #000000;
		opacity: 0.4;
		color: #ffffff;
	}

	.bottom-price {
		margin-top: -20px;
		width: 100%;
		float: left;
		text-align: right;
	}
</style>
<script>
	import {
		LIST_LOAD_TIME
	} from "../../config/config";
	import {
		DIALOG_FORM,
		DIALOG_TITLE,
		OPEN_DIALOG_FLAG,
		QUERY_FORM,
		EMPTY_FORM,
		LOADING,
		URL_PARAM,
		RESULT_DATA,
		CALLBACKTAG,
		CALLBACK
	} from "../../store/constant";
	import {
		SUCCESS_CODE
	} from "../../config/config";
	import axios from "axios";
	import baseMethod from "../../common/baseMethods";
	import baseData from "../../common/baseData";
	import common from "../common";
	import util from "../../common/util";
	import validator from "../../common/validator";

	// 函数集合
	class method extends baseMethod {}

	export default {
		data() {
			return {
				...baseData,
				[URL_PARAM]: {
					goodsList: "controller/order/goodsList/",
					editRemark: "controller/order/editStoreRemark",
					getLogisticsUrl: "controller/order/logisticsList",
					editLogisticsUrl: "controller/order/editLogistics"
				},
				[QUERY_FORM]: {},
				[DIALOG_FORM]: {},
				editForm: {
					//表单验证规则
					// bannerDesc: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
					// positionId: [{required: true, message: '请选择广告位', trigger: 'blur'},
					// {validator: this.checkSort2, message: '', trigger: 'change'}
					// ],
				},
				editForm2: {
					express: [{
						required: true,
						message: "请选择快递公司",
						trigger: "blur"
					}],
					courierNum: [{
						required: true,
						message: "请输入快递单号",
						trigger: "blur"
					}]
				},
				stepList: {
					one: "",
					two: "",
					three: ""
				},
				data: {
					mainOrder: {},
					subOrder: {},
					address: {},
					user: {}
				},
				dataList: {},
				userShow: false,
				dialogShowAddress: false, //修改地址
				SendGoodsForm: {},
				expressOptions: {}, //快递公司
				dialogSendGoods: false, //手动发货
				dialogOrderComp: false, //订单小计
				StoreRemarkForm: {},
				dialogShowRemark: false, //客服备注
				subId: "",
				dialogShowLogistics: false, //物流列表
				logisticsList: {
					goodsList: []
				},
				dialogLogisticsDetail: false, //物流详情
				LogisticsDetail: {
					expressList: []
				},
        dialogEditLogistics: false, //修改物流
          refundId:0
			};
		},
		filters: {
			formatDate(time) {
				return util.dateTimeFormat(time, "yyyy-MM-dd hh:mm:ss");
			},
			currency(val) {
				return util.currency(val, 2);
			}
		},
		created() {},
		mounted() {
      this.refundId=this.$route.query.refundId
			let subId = this.$route.query.subId;
			this.subId = subId;
			this.getList({
				customUrl: this.URL_PARAM.goodsList + subId
			});
			this.getDataModel(subId);

			// console.log("----------------",this.URL_PARAM.goodsList+subId)
		},
		methods: {
			...new method(),
			// getRowClass({ row, column, rowIndex, columnIndex }) {
			// 	if (rowIndex == 0) {
			// 		return 'background:#F0f0f0;'
			// 	}
			// 	return ''
			// },
			callBackFun() {
				switch (this.CALLBACK.callback) {
					case "getDataList":
						console.info("==================:", this.CALLBACK.data);
						break;
				}
			},
			orderComp() {
				this.dialogOrderComp = true;
			},
			closeOrderComp() {
				this.dialogOrderComp = false;
			},
			getDataModel(subId) {
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				this.$http.get(`controller/order/detail/` + subId, {}).then(result => {
					let _result = result.data;
					if (_result.resCode === SUCCESS_CODE) {
						let data = _result.model;
						// console.info("_result",main)
						this.$set(
							this.stepList,
							"one",
							util.formatDate(data.subOrder.orderTime, "yyyy-MM-dd HH:mm:ss")
						);
						this.$set(
							this.stepList,
							"two",
							util.formatDate(data.subOrder.payTime, "yyyy-MM-dd HH:mm:ss")
						);
						this.$set(
							this.stepList,
							"three",
							util.formatDate(data.subOrder.deliveryTime, "yyyy-MM-dd HH:mm:ss")
						);
						this.data = data;
					} else {
						this.$message({
							message: "查询失败",
							type: "error"
						});
					}
				});
			},
			getHeaderUrl() {
				//用户头像
				return this.data.user.headImageUrl;
			},
			showUserInfo() {
				//显示用户信息
				this.userShow = true;
			},
			hideUserInfo() {
				//隐藏用户信息
				this.userShow = false;
			},
			copyContent() {
				//复制地址信息
				let arry = [
					this.data.address.receiveAddress,
					this.data.address.receiver,
					this.data.address.receivePhone
				];
				return arry.join(",");
				// this.copyContent=data.address.receiveAddress+","+data.address.receiver+","+data.address.receivePhone
			},
			goBack() {
				//上一步
		 this.$router.push({path: '/customerService/detail', query: {id: this.refundId}})
			},
			editLogisticsDetail(data) {
				//修改快递
				this.SendGoodsForm.id = data.id;
				this.SendGoodsForm.expressCode = data.expressCode;
				this.SendGoodsForm.expressName = data.expressName;
				this.SendGoodsForm.courierNum = data.courierNum;
				this.expressList();
				this.dialogSendGoods = true;
			},
			canelSendGoods: function() {
				this.SendGoodsForm = {};
				this.dialogSendGoods = false;
			},
			saveSendGood: function() {
				// console.log("=======this.SendGoodsForm=====",this.SendGoodsForm)
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				this.$http
					.post(this[URL_PARAM].editLogisticsUrl, this.SendGoodsForm)
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							this.dialogSendGoods = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							// this.$router.push({path: '/order/tobeshipped'})
						} else {
							this.$message({
								message: "操作失败",
								type: "error"
							});
						}
					});
			},
			expressList() {
				//快递公司
				let json = {
					page: 1,
					pageSize: 100,
					search: {}
				};
				this.expressOptions = [];
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				this.$http
					.get("controller/order/expresslist", {
						params: json
					})
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							for (let i in _result.resultList) {
								let json = {
									value: _result.resultList[i].expressCode,
									label: _result.resultList[i].expressName
								};
								this.expressOptions.push(json);
							}
						} else {
							this.$message({
								message: _result.resDesc,
								type: "error"
							});
						}
					});
			},
			changeExpress: function(val) {
				this.expressOptions.find(item => {
					if (item.value === val) {
						this.SendGoodsForm.expressName = item.label;
						return item.label;
					} //比如：选项2
				});
			},
			onCopy: function(e) {
				// console.log('复制成功！')
			},
			onError: function(e) {
				// console.log('复制失败！')
			},
			showAddress(data) {
				// console.log("data:",data)
				this.DIALOG_FORM = util.simpleClone(data);
				// console.log("DIALOG_FORM:",this.DIALOG_FORM)
				this.dialogShowAddress = true;
			},
			saveAddress() {
				//保存地址

				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				this.$http
					.post(`controller/order/editAddress`, this[DIALOG_FORM])
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							// console.log("==================121221========",this[DIALOG_FORM])
							this.dialogShowAddress = false;
							this.data.address = this[DIALOG_FORM];
							this.$message({
								message: "操作成功",
								type: "success"
							});
						} else {
							this.$message({
								message: "操作失败",
								type: "error"
							});
						}
					});
			},
			canelAddress() {
				this.DIALOG_FORM = {};
				this.dialogShowAddress = false;
			},
			// 查看备注
			showRemark(data) {
				this.StoreRemarkForm = {};
				this.StoreRemarkForm.id = data.id;
				this.StoreRemarkForm.remark = data.storeRemark;
				this.dialogShowRemark = true;
			},
			canelRemark() {
				this.StoreRemarkForm = {};
				this.dialogShowRemark = false;
			},
			saveRemark() {
				//保存备注
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				this.$http
					.post(this.URL_PARAM.editRemark, this.StoreRemarkForm)
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							this.dialogShowRemark = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getList({
								customUrl: this.URL_PARAM.goodsList + this.subId
							});
						} else {
							this.$message({
								message: "操作失败",
								type: "error"
							});
						}
					});
			},
			showLogistics: function(data) {
				//查看物流
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				let json = {
					orderNo: data.orderNo
				};
				this.$http
					.get(this[URL_PARAM].getLogisticsUrl, {
						params: json
					})
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							this.logisticsList = _result.resultList;
							if (this.logisticsList && this.logisticsList.length > 1) {
								this.dialogShowLogistics = true;
							} else if (this.logisticsList && this.logisticsList.length > 0) {
								this.LogisticsDetail = this.logisticsList[0];
								this.dialogLogisticsDetail = true;
							} else {
								this.$message({
									message: "无物流信息",
									type: "error"
								});
							}
						} else {
							this.$message({
								message: "查询失败",
								type: "error"
							});
						}
					});
			},
			editLogistics: function(data) {
				axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API;
				let json = {
					orderNo: data.orderNo,
					isEdit: true
				};
				this.$http
					.get(this[URL_PARAM].getLogisticsUrl, {
						params: json
					})
					.then(result => {
						let _result = result.data;
						if (_result.resCode === SUCCESS_CODE) {
							this.logisticsList = _result.resultList;
							if (this.logisticsList && this.logisticsList.length > 1) {
								this.dialogEditLogistics = true;
							} else if (this.logisticsList && this.logisticsList.length > 0) {
								this.LogisticsDetail = this.logisticsList[0];
								this.editLogisticsDetail(this.LogisticsDetail);
							} else {
								this.$message({
									message: "无物流信息",
									type: "error"
								});
							}
						} else {
							this.$message({
								message: "查询失败",
								type: "error"
							});
						}
					});
			},
			showLogisticsDetail(data) {
				this.LogisticsDetail = data;
				this.dialogLogisticsDetail = true;
			}
		}
	};
</script>
