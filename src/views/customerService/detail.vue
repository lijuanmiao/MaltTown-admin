<template>
	<section style="padding:10px 20px">
		<el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM'
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
				<el-col :span="19">
					<el-steps :space="400" :active="step" finish-status="success">
						<el-step title="客户申请维权"></el-step>
						<el-step title="平台审核介入处理"></el-step>
						<el-step v-if="data.refundStatus==12||data.refundStatus==10||data.refundStatus==11" title="退款完成"></el-step>
						<el-step v-if="data.refundStatus==13" title="驳回申请"></el-step>
					</el-steps>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="5">{{data.refundApplyTime}}</el-col>
				<el-col :span="6" v-if="data.refundStatus!=10">{{data.auditTime}}</el-col>
				<el-col :span="4" v-if="data.refundStatus==12||data.refundStatus==13">{{data.refundEndTime}}</el-col>
			</el-row>

			<el-tabs value="orderMainOwen" type="card" style="width:100%;padding:0">
				<el-tab-pane label="维权信息" name="orderMainOwen" style="width:100%;padding:0">
					<main class="wqxx">
						<div>
							<font>维权类型</font>
							<span>{{data.refundType}}</span>
						</div>
						<div>
							<font>用户订单状态</font>
							<span>
								<u v-if="data.orderStatus==0">已支付</u>
								<u v-if="data.orderStatus==1">待发货</u>
								<u v-if="data.orderStatus==2">待收货</u>
								<u v-if="data.orderStatus==3">已完成</u>
								<u v-if="data.orderStatus==4">交易关闭</u>
							</span>
								<el-button type="primary" size="mini" style="margin-left:20px"  @click="showDetail(data)"><span>详情</span></el-button>
						</div>
						<div>
							<font>退款金额</font>
							<span class="red" v-if="data.refundStatus==10||data.refundStatus==13">{{data.expRefundAmt | currency}}</span>
							<span class="red" v-if="data.refundStatus==11||data.refundStatus==12">{{data.actRefundAmt | currency}}</span>
						</div>

						<div>
							<font>维权原因</font>
							<span>{{data.refundReason}}</span>
						</div>
						<div>
							<font>维权状态</font>
							<span class="yellow">
								<u v-if="data.refundStatus==10">等待平台处理</u>
								<u v-if="data.refundStatus==11">审核通过,退款中</u>
								<u v-if="data.refundStatus==12">维权完成</u>
								<u v-if="data.refundStatus==13">已驳回</u>
							</span>
						</div>
            <div v-if="data.refundStatus==13 " style="width: 600px;">
							<font>驳回原因</font>
							<div style="max-width: 600px;">{{data.rejectReason}}</div>
						</div>
						<div :style="data.refundStatus==13?'':'width:100%'">
							<font>维权说明</font>
							<span><u v-if="data.refundDesc!=''&&data.refundDesc!=null ">{{data.refundDesc}}</u>
								<u v-if="data.refundDesc==''||data.refundDesc==null ">未填</u>
							</span>
							<abbr v-if="data.refundStatus==10" style="margin-left:40px">
								<el-button size="mini" type="primary" @click="openDialogFormVisible(1)" plain>确认退款</el-button>
								<el-button size="mini" type="primary" style="margin-left:5px" @click="openDialogFormVisible(2)" plain>驳回申请</el-button>
								<el-button size="mini" type="primary" style="margin-left:5px" @click="openDialogFormVisible(3)" plain>客服添加备注</el-button>
							</abbr>
						</div>

						<div style="width:100%">
							<font>上传图片</font>
							<abbr v-if="data.imgUrl!=undefined&&data.imgUrl.length>0" style="float:left">
								<b v-for="img in data.imgUrl" style="float:left">
									<img :src="img" style="width: 50px;float:left;margin-right:10px"  @click="showImage(img)" />
								</b>
							</abbr>
							<span v-if="data.imgUrl==undefined ||data.imgUrl.length==0">
								无
							</span>

						</div>
						<div style="width:100%">
							<font>订单编号</font>
							<span>{{data.refundNo}}</span>

						</div>

						<div>
							<font>实付金额</font>
							<span>￥{{data.actPayAmt | currency}}</span>

						</div>
						<div>
								<font>付款方式</font>
								<span>{{data.payPlatform}}</span>
							</div>
						<div style="width:100%">
							<font>买家</font>
							<span>
								{{data.refundAddress}}<br>
								{{data.refunder}},{{data.refundPhone}}

								<el-button type="text" v-clipboard:copy="copyContent(data)" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
							</span>
						</div>
							<div>
								<font>付款时间</font>
								<span>{{data.payTime}}</span>
							</div>

					</main>
				</el-tab-pane>
			</el-tabs>

			<p class="spxq">
				商品详情
			</p>
			 <el-table style="margin-top:-10px;float:left" size="mini" :data="data.goodList" :border="true" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
				  <el-table-column label="商品标题">
					<template slot-scope="props">
						<img :src="props.row.goodImg" style="width: 50px;"/><br/>
						{{props.row.title}}<br/>
						{{props.row.subTitle}}
					</template>
        		</el-table-column>
				 <el-table-column label="规格/编号/供应商名">
					<template slot-scope="props">
						<div class="el-table-2" style="display:table;">
							<span style='display:table-cell;width:66px'>规格</span>
							<span style="display:table-cell">{{ props.row.goodAttrDesc}}</span>
						</div>
						<div class="el-table-2">
							<span>商品编码</span>
							<span>{{ props.row.goodCode }}</span>
						</div>
						<div class="el-table-2">
							<span :span="8">供应商名</span>
							<span :span="16">{{ props.row.supplierName}}</span>
						</div>
						<div class="el-table-2">
							<span>发货仓库</span>
							<span>{{ props.row.warehouseName }}</span>
						</div>
					</template>
        		</el-table-column>
				<el-table-column label="单价">
					<template slot-scope="props">
						￥{{props.row.actGoodPrice | currency}}
					</template>
        		</el-table-column>
				<el-table-column label="数量">
					<template slot-scope="props">
						{{props.row.goodQuantity}}/件
					</template>
        		</el-table-column>
				<el-table-column label="总优惠">
					<template slot-scope="props">
						￥{{props.row.totalDisAmt | currency}}
					</template>
        		</el-table-column>
				<el-table-column label="实付">
					<template slot-scope="props">
						￥{{props.row.actPayAmt | currency}}
					</template>
        		</el-table-column>
			 </el-table>
			<el-button size="small" type="primary" @click="orderComp()" style="margin-top:20px">商品小计</el-button>

      <el-dialog :title="'商品小计'" :visible.sync="dialogOrderComp">
				<el-row style="width:100%">
					<el-col :span="3">&nbsp;</el-col>
					<el-col :span="18">
						<el-row>
							<el-col :span="9">
								<el-row style="text-align:right">商品小计</el-row>
								<el-row style="margin-top:-10px;text-align:right">运费</el-row>
								<el-row class="detail-margin" style="margin-top:-10px;text-align:right">优惠券</el-row>
								<el-row style="margin-top:-10px;text-align:right">下单立减</el-row>
								<el-row style="margin-top:-10px;text-align:right">分享立减</el-row>
								<el-row style="margin-top:-10px;text-align:right">余额抵扣</el-row>
							</el-col>
							<el-col :span="9">
								<el-row style="text-align:right">￥{{data.expPayAmt | currency}}</el-row>
								<el-row style="margin-top:-10px;text-align:right">￥{{data.freight | currency}}</el-row>
								<el-row style="margin-top:-10px;text-align:right;color: darkorange;">
									-￥{{data.disAmt | currency}}
								</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.rebateAmt | currency}}</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.shareDis | currency}}</el-row>
								<el-row style="color: darkorange;margin-top:-10px;text-align:right">-￥{{data.cash| currency}}</el-row>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
						</el-row>
						<el-row style="border-top:1px dashed #ccc;text-align:right;margin-top:-20px">
							<el-col :span="9" class="bigShow_title detail-margin" style="text-align:right">实付款</el-col>
							<el-col :span="9" class="bigShow_content detail-margin">￥{{data.actPayAmt| currency}}</el-col>
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

			<el-dialog title="确认退款" :visible.sync="dialogFormVisible" width="700px">
				<el-form :model="form1" ref="form1" :rules="form1Rules" style="padding-left:100px">
					<p>处理方式:{{data.refundType}}</p>
        <P>
            <span>退款金额:</span>

                  <el-input v-model="form1.refundAmt" style="width:260px;" size="small" :disabled="type == 1"></el-input>
                <el-button type="success" size="small" @click="changeAmt">修改金额</el-button>
        </P>
				</el-form>
				<el-row justify="center" style="margin-top:30px">
					<el-col style="text-align:center;" :span="24">
					<el-button  type="primary" @click="handleRefund('form1')">提交</el-button>
					<el-button  @click="dialogFormVisible = false">取 消</el-button>
					</el-col>
				</el-row>
			</el-dialog>

			<el-dialog title="驳回申请" :visible.sync="dialogFormVisible2" width="700px">
				<el-form :model="form2" ref="form2" :rules="form2Rules" style="padding-left:50px;margin-top:-10px">
					<span>驳回申请原因</span>

							<el-form-item style="margin-top:10px" prop="rejectReason">
								<el-input type="textarea" style="width:550px" v-model="form2.rejectReason" :rows="4" placeholder="填写驳回原因内容 最多不超过30个字符" maxlength="30"></el-input>
							</el-form-item>

				</el-form>
				<el-row justify="center" style="margin-top:10px">
					<el-col style="text-align:center;" :span="24">
					<el-button type="primary" @click="handleRefund('form2')">提交</el-button>
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
						</el-col>
				</el-row>
				</div>
			</el-dialog>
			<el-dialog title="备注" :visible.sync="dialogFormVisible3" width="700px">
				<el-form :model="form3" ref="form3" :rules="form3Rules" style="padding-left:50px;margin-top:-10px">
            <el-form-item prop="remark">
              <el-input type="textarea" style="width:550px" v-model="form3.remark" :rows="4" placeholder="最多不超过100个字符" maxlength="100"></el-input>
            </el-form-item>
				</el-form>
				<el-row justify="center" style="margin-top:10px">
					<el-col style="text-align:center;" :span="24">
					<el-button type="primary" @click="handleRefund('form3')">提交</el-button>
					<el-button @click="dialogFormVisible3 = false">取 消</el-button>
						</el-col>
				</el-row>
			</el-dialog>

      <!--显示图片-->
      <el-dialog :title="'图片展示'" :visible.sync="dialogShowImage" :close-on-click-modal='false'>
        <div style="width: 720px;height: 350px; text-align: center;">
          <img class='bigImg' :src='showBannerUrl'/>
        </div>
      </el-dialog>

		</el-form>
	</section>
</template>
<script>
	import {
		LIST_LOAD_TIME
	} from '../../config/config'
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
	import {
		SUCCESS_CODE
	} from '../../config/config'
	import api from '../../config/axios-config'
	import baseMethod from '../../common/baseMethods'
	import baseData from '../../common/baseData'
	import common from '../common'
	import util from '../../common/util'
	import opInfo from '../../common/opInfo'
	import {Loading} from 'element-ui'
	import validator from '../../common/validator'
  import axios from 'axios'


	// 函数集合
	class method extends baseMethod {


	}
	export default {
		data() {
			return {
				...baseData,
				[URL_PARAM]: {
					common: 'controller/customerService'
				},
				[QUERY_FORM]: {},
				isEdit: false,
				dialogAddBrand: false,
				form1: {},
				form2: {
					"rejectReason": ''
				},
				form3: {
					"remark": ''
				},
				wqsm:true,
				dialogOrderComp:false,
				refundId: 0,
				headers: {
					'x-auth-token': opInfo.getOpInfo().token
				},
				activeTab: 'base',
				data: {},
				dialogFormVisible: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
        dialogShowImage: false,
        showBannerUrl:'',
				type: 1,
				step: 1,
				editForm: {},
				form1Rules: {
					refundAmt: [{
							required: true,
							message: '请输入金额',
							trigger: 'blur'
						},
						{
							validator: validator.checkMoney1,
							message: '退款金额需大于0，且不能输入超过2位小数点',
							trigger: 'blur'
						}
					]
				},
				form2Rules: {
					rejectReason: [{
						required: true,
						message: '请输入驳回原因',
						trigger: 'blur'
					}]
				},
				form3Rules: {
					// remark: [{
					// 	required: true,
					// 	message: '请输入备注',
					// 	trigger: 'blur'
					// }]
				}


			};
		},
		created() {

		},
		filters: {
			currency(val) {
				return util.currency(val, 2)
			}
		},
		watch: {
			CALLBACKTAG: 'callBackFun'
		},
		mounted() {
			let id = this.$route.query.id
      axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
      this.$http.get("controller/customerService/detail", {params: {"id": id}}).then((result) => {
				let _result = result.data
				if (_result.resCode === SUCCESS_CODE) {
					this.data = _result.model
					this.refundId = id
					if (this.data.refundStatus == '10') {
						this.step = 1
					} else if (this.data.refundStatus == '11') {
						this.step = 2
					} else {
						this.step = 3
					}
				} else {
					this.$message({
						message: _result.resDesc,
						type: 'error'
					})
				}
			})

		},
		methods: {
			...new method(),
			callBackFun() {
				switch (this.CALLBACK.callback) {
					case 'saveBrand':
						this.dialogAddBrand = false
						this.pageList(this.RESULT_DATA.currentPage)
						break
					case 'delBrand':
						this.pageList(this.RESULT_DATA.currentPage)
						break
				}
			},
    orderComp() {
				this.dialogOrderComp = true;
			},
			closeOrderComp() {
				this.dialogOrderComp = false;
			},

			copyContent(data) {
				return data.refundAddress + "," + data.refunder + "," + data.refundPhone
			},
			onCopy: function(e) {
				// console.log('复制成功！')
			},
			onError: function(e) {
				// console.log('复制失败！')
			},

			openDialogFormVisible(type) {
				if (type == 1) {
					this.type = 1
					this.form1 = {
						"refundAmt": this.data.expRefundAmt,
						"id": this.refundId,
						"type": "1"
					}
					this.dialogFormVisible = true
				} else if (type == 2) {
					this.type = 2
					this.form2 = {
						"rejectReason": this.data.rejectReason,
						"id": this.refundId,
						"type": "2"
					}
					this.dialogFormVisible2 = true
				} else if (type == 3) {
					this.type = 3
					this.form3 = {
						"remark": this.data.remark,
						"id": this.refundId,
						"type": "3"
					}
					this.dialogFormVisible3 = true
				}
			},
			changeAmt() {
				this.type = 2
			},
			handleRefund(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
					  if(formName == "form1"){
              const rechargemoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/
              if(!rechargemoney.test(this[formName].refundAmt)) {
               this.$message({
                 message: '退款金额需大于0，且不能输入超过2位小数点',
                 type: 'error'
               })
                return
             }
            }
            else if(formName == "form2"){
              var rejectReason=this[formName].rejectReason.replace(/\s*/g,"")
              if(rejectReason==''){
                this.$message({
                  message: '驳回原因不能为空!',
                  type: 'error'
                })
                return
              }
            }else if(formName == "form3"){
              var remark=this[formName].remark.replace(/\s*/g,"")
              // if(remark==''){
              //   this.$message({
              //     message: '备注不能为空!',
              //     type: 'error'
              //   })
              //   return
              // }
            }

						let param = this[formName]
						api.post('controller/customerService/edit', param).then((result) => {
							let _result = result.data
							if (_result.resCode == SUCCESS_CODE) {
								this.$message({
									message: _result.resDesc,
									type: 'success'
								})
								if (formName == "form1") {
									this.dialogFormVisible = false
									this.getRefundDetail(this.refundId)

								}
								if (formName == "form2") {
									this.dialogFormVisible2 = false
									this.getRefundDetail(this.refundId)
								}
								if (formName == "form3") {
									this.dialogFormVisible3 = false
									this.getRefundDetail(this.refundId)

								}
							} else {
								this.$message({
									message: _result.resDesc,
									type: 'error'
								})
							}
						})
					}
				});

			},
			getRefundDetail(data) {
				api.get("controller/customerService/detail", {
					params: {
						"id": data
					}
				}).then((result) => {
					let _result = result.data
					if (_result.resCode === SUCCESS_CODE) {
						this.data = _result.model
						this.refundId = data
						if (this.data.refundStatus == '10') {
							this.step = 1
						} else if (this.data.refundStatus == '11') {
							this.step = 2
						} else {
							this.step = 3
						}
					} else {
						this.$message({
							message: _result.resDesc,
							type: 'error'
						})
					}
				})
			},
			showDetail(data) {
				let query = {
					'page': this.RESULT_DATA.currentPage,
					'subId': this.data.id,
					'refundId': this.refundId
				}

				if (this.data.orderStatus == 1 || this.data.orderStatus == 0) {
					this.$router.push({
						path: '/customerService/shippedDetail',
						query: query
					})
				} else if (this.data.orderStatus == 2) {
					this.$router.push({
						path: '/customerService/receivedDetail',
						query: query
					})
				} else if (this.data.orderStatus == 3) {
					this.$router.push({
						path: '/customerService/completedDetail',
						query: query
					})
				} else if (this.data.orderStatus == 4) {
					let query1 = {
						'page': this.RESULT_DATA.currentPage,
						'subId': this.data.id,
						'mainId': this.data.mainId,
						'refundId': this.refundId
					}
					this.$router.push({
						path: '/customerService/closedDetail',
						query: query1
					})
				}
			},
			goBack() {
				this.$router.push({
					path: '/customerService/applyList'
				})
			},
      showImage(imgUrl) { //图片展示
        this.showBannerUrl = imgUrl
        this.dialogShowImage = true
      },
		}
	}
</script>

<style lang="less">
  img.bigImg {
    width : auto;height : 100%;
    max-width: 640px;
  }
.wqxx{
	width: 100%;
	max-width: 1000px;
}
.wqxx u{
text-decoration: none
}
.wqxx>div{
	width: calc(50% - 10px);
	float: left;
	padding: 10px 0;
}
.wqxx>div>font{
background: #f0f0f0;
width: 88px;
padding:5px 10px;
border-radius: 3px;
margin-right:10px;
text-align: right;
float: left;
}
.wqxx>div>span{
	float: left;
	padding:5px 10px 5px 0;
}
.spxq{
	border-top:1px solid #e4e7ed;float:left;margin-top:30px;width:100%;
	padding: 15px 0;
	font-weight: bold;
	color: #409eff;
	font-size: 16px

}
	.yellow {
		color: #E6A23C
	}

	.red {
		color: #F56C6C
	}

	.board {
		border: 1px solid #ccc;
		padding: 10px 10px 10px 50px;
	}

	.myTitle {
		font-weight: bolder;
		font-size: 18px;
	}
</style>
