<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">

            <el-col :span="16" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col >
            <el-col :span="8" align="right" class="titleText">
              <el-button @click="goBack()" style="margin-top:-50px">返回</el-button>
            </el-col>
          </el-row>
      <el-row>
        <el-steps :active="4" align-left>
          <el-step title="买家下单" :description="stepList.one"></el-step>
          <el-step title="买家付款" :description="stepList.two"></el-step>
          <el-step title="商家发货" :description="stepList.three"></el-step>
          <el-step title="订单完成" :description="stepList.four"></el-step>
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
							<el-card class="box-card" :body-style="{ padding: '0px' }" v-show="userShow" shadow="always" style="position:absolute;z-index:199;pointer-events:none;">
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

      <el-row class="table_top">
				<span class="bigShow_title" style="color:#409eff">商品详情</span>
			</el-row>
			<el-row style="margin-top:15px;margin-bottom:10px;">
				<el-col :span="16">
					订单编号: &nbsp;&nbsp;{{data.subOrder.orderNo}} &nbsp;&nbsp;{{data.subOrder.warehouseName}} &nbsp;&nbsp;
					<el-button type="primary" @click="showLogistics(data.subOrder)" v-permissions="'DD040103'" size="mini">查看物流</el-button>
					<el-button type="primary" @click="orderComp()"  size="mini">订单详情</el-button>
				</el-col>
				<el-col :span="8" style="text-align:right">下单时间：{{stepList.one}}</el-col>
			</el-row>
      <el-table class='table-table orderTableBottom' :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList"
                v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <!--<el-table-column prop="orderNo" label="子订单编号" min-width="150"></el-table-column>-->
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
          <template slot-scope="props">
            ￥{{ props.row.actGoodPrice | currency }}
          </template>
        </el-table-column>
        <el-table-column prop="goodQuantity" label="数量" min-width="100"></el-table-column>
        <el-table-column prop="totalDisAmt" label="总优惠" min-width="100">
          <template slot-scope="props">
            -￥{{ props.row.totalDisAmt | currency }}
          </template>
        </el-table-column>
        <el-table-column prop="realPayAmout" label="实付" min-width="100">
          <template slot-scope="props">
            ￥{{ props.row.actPayAmt | currency }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="120">
          <template slot-scope="props">
            {{ data.subOrder.orderStatusDesc}}
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="130">
          <template slot-scope="scope">
            <el-button
              v-permissions="'DD040102'"
              @click="showRemark(scope.row)"
              type="text"
              size="small">
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
      <el-form :model="StoreRemarkForm" :label-width="FORM_LABEL_WIDTH" :inline="true" ref='StoreRemarkForm'>
        <el-dialog title="备注" :visible.sync="dialogShowRemark" :close-on-click-modal='false'>
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
      <el-dialog :title="'物流详情'" :visible.sync="dialogShowLogistics" :close-on-click-modal='false' width="900px">
        <el-alert  v-if="logisticsList &&logisticsList.length>1" type="warning" :closable="false">{{logisticsList.length+'个包裹已发出'}}
        </el-alert>
        <div v-if="logisticsList &&logisticsList.length>1">
          <template v-for="item in logisticsList">
            <div class="wuliu_box">
              <div class="wuliu_number"><span><i class="el-icon-tickets"></i>{{item.expressStatus}}</span><span>{{item.expressName}}&nbsp;{{item.courierNum}}  </span></div>
              <div class="wuliu_image" style="margin-left:0px;width:640px">
                <div v-for="(good,index) in item.goodsList" :key="index" style="width:120px;height:120px;margin-right:8px;margin-bottom:8px">
                  <img  :src="good.goodImg"/>
                  <div>{{good.goodQuantity}}件</div>
                </div>
              </div>
              <el-button @click="showLogisticsDetail(item)"  type="primary"  size="small" style="float:right;margin-top:-80px"> <span>查看物流</span> </el-button>
              <div class="wuliu_number"><span>共 {{item.goodsList.length}} 件商品</span></div>
            </div>
          </template>
        </div>
      </el-dialog>
      <el-dialog title="查看物流" :visible.sync="dialogLogisticsDetail" :close-on-click-modal='false'>
        <div style="margin-bottom: 10px;">【{{LogisticsDetail.expressName}}】{{LogisticsDetail.courierNum}}</div>

<ul  class="lgul">
        <li  v-for="(item,index) in LogisticsDetail.expressList" >
          <div>{{item.context}}</div>
          <p>{{item.time}}</p>
          <i></i>
          <u v-if="index==0"></u>
        </li>
      </ul>

      </el-dialog>

    </el-form>
  </section>
</template>
<style>
.lgul{
    display:inline-block;
    width:100%
  }
  .lgul li{
    margin: 0;
    margin-left:10px;
    float: left;
    width: 100%;
    border-left:2px solid #409eff;
    position: relative;
    padding-left:20px;
  }
  .lgul div{
    width: 100%;
    float: left;
    line-height: 30px;
    height: 30px;
  }
    .lgul p{
      width: 100%;
      float: left;
      line-height: 20px;
    height: 20px;
    margin-top:-0px
    }
    .lgul i{
      position: absolute;
      width:14px;
      height: 14px;
      border-radius: 50%;
      background: #409eff;
      z-index: 120;
      left:-8px;
      top:8px
    }
       .lgul u{
         position:absolute;
         z-index: 100;
         width:2px;
         height: 10px;
         background: #fff;
         left:-2px;
         top:0;

       }

  .line {
    display: inline-block;
    width: 100%;
    border-top: 1px solid #ccc;
  }

  .middle_main {
    margin: 20px 0px;
  }

  .title_info {
    font-weight: bold;
  }

  .image {
    width: 100%;
    display: block;
  }
	.maijiaspan {
		margin-top: 17px;
		margin-left: 10px;
		float: left;
	}

	.maijiaimg {
		float: left;
	}

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    font-size: 13px;
    color: #999;
  }

  .box-card {
    width: 200px;
  }

  .bigShow_title {
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
  }

  .bigShow_content {
    font-weight: bold;
    font-size: 16px;
    color: red;
    margin-top: 10px;
  }

  .table_top {
    margin-bottom: 10px;
    /*height: 50px;*/
    /*border: solid 1px #999;*/
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

  .wuliu_box .wuliu_image > div {
    position: relative;
    margin-right: 2%;
    width: 23%;
    text-align: center;
  }

  .wuliu_box .wuliu_image > div > img {
    width: 100%;
    height: 120px;
    vertical-align: top;
  }

  .wuliu_box .wuliu_image > div > div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #000000;
    opacity: 0.4;
    color: #ffffff;
  }
</style>
<script>
  import {LIST_LOAD_TIME} from '../../config/config'
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
  } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import axios from 'axios'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import validator from '../../common/validator'

  // 函数集合
  class method extends baseMethod {

  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {
          goodsList: 'controller/order/goodsList/',
          editRemark: 'controller/order/editStoreRemark',
          getLogisticsUrl: 'controller/order/logisticsList'
        },
        [QUERY_FORM]: {},
        [DIALOG_FORM]: {},
        editForm: { //表单验证规则
          // bannerDesc: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
          // positionId: [{required: true, message: '请选择广告位', trigger: 'blur'},
          // {validator: this.checkSort2, message: '', trigger: 'change'}
          // ],
        },
        editForm2: {
          express: [{required: true, message: '请选择快递公司', trigger: 'blur'}],
          courierNum: [{required: true, message: '请输入快递单号', trigger: 'blur'}],
        },
        stepList: {one: '', two: '', tree: '', four: ''},
        data: {mainOrder:{},subOrder: {}, address: {}, user: {}},
        dataList: {},
        userShow: false,
        StoreRemarkForm: {},
        dialogShowRemark: false,//客服备注
        subId: '',
        dialogShowLogistics: false, //物流列表
        logisticsList: {goodsList: []},
        dialogOrderComp:false,
        dialogLogisticsDetail: false, //物流详情
        LogisticsDetail: {expressList: []},
      }
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      },
      currency(val) {
        return util.currency(val, 2)
      }
    },
    created() {

    },
    mounted() {
      let subId = this.$route.query.subId
      this.subId = subId
      this.getList({customUrl: this.URL_PARAM.goodsList + subId})
      this.getDataModel(subId)

      // console.log("----------------",this.URL_PARAM.goodsList+subId)

    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'getDataList':
            // console.info("==================:",this.CALLBACK.data)
            break
        }
      },
      orderComp() {
				this.dialogOrderComp = true;
			},
			closeOrderComp() {
				this.dialogOrderComp = false;
			},
      getDataModel(subId) {
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        this.$http.get(`controller/order/detail/` + subId, {}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            let data = _result.model
            // console.info("_result",main)
            this.$set(this.stepList, 'one', util.formatDate(data.subOrder.orderTime, 'yyyy-MM-dd HH:mm:ss'));
            this.$set(this.stepList, 'two', util.formatDate(data.subOrder.payTime, 'yyyy-MM-dd HH:mm:ss'));
            this.stepList.three = util.formatDate(data.subOrder.deliveryTime, 'yyyy-MM-dd HH:mm:ss')
            this.stepList.four = util.formatDate(data.subOrder.orderEndTime, 'yyyy-MM-dd HH:mm:ss')
            this.data = data

          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      },
      getHeaderUrl() {//用户头像
        return this.data.user.headImageUrl
      },
      showUserInfo() { //显示用户信息
        this.userShow = true
      },
      hideUserInfo() { //隐藏用户信息
        this.userShow = false
      },
      copyContent() { //复制地址信息
        let arry = [this.data.address.receiveAddress, this.data.address.receiver, this.data.address.receivePhone]
        return arry.join(",")
        // this.copyContent=data.address.receiveAddress+","+data.address.receiver+","+data.address.receivePhone
      },
      goBack() {  //上一步
        this.$router.push({path: '/order/completed'})
      },

      onCopy: function (e) {
        // console.log('复制成功！')
      },
      onError: function (e) {
        // console.log('复制失败！')
      },
      // 查看备注
      showRemark(data) {
        this.StoreRemarkForm = {}
        this.StoreRemarkForm.id = data.id
        this.StoreRemarkForm.remark = data.storeRemark
        this.dialogShowRemark = true
      },
      canelRemark() {
        this.StoreRemarkForm = {}
        this.dialogShowRemark = false
      },
      saveRemark() { //保存备注
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        this.$http.post(this.URL_PARAM.editRemark, this.StoreRemarkForm).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.dialogShowRemark = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getList({customUrl: this.URL_PARAM.goodsList + this.subId})
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })

      },
      showLogistics: function (data) {
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json = {orderNo: data.orderNo}
        // console.log("----------------",json)
        this.$http.get(this[URL_PARAM].getLogisticsUrl, {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.logisticsList = _result.resultList
            if (this.logisticsList && this.logisticsList.length > 1) {
              this.dialogShowLogistics = true
            } else if (this.logisticsList && this.logisticsList.length > 0) {
              this.LogisticsDetail = this.logisticsList[0]
              this.dialogLogisticsDetail = true
            } else {
              this.$message({
                message: '无物流信息',
                type: 'error'
              })
            }

          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })

      },
      showLogisticsDetail(data) {
        this.LogisticsDetail = data
        this.dialogLogisticsDetail = true
      }
    }
  }
</script>

