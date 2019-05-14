<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
            <el-col :span="10" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>
            <el-col :span="14" class="titleText">
             <el-button @click="export1" v-permissions="'DD010300'" type="warning" style="float:right;margin-top:-12px">导出订单</el-button>
              <div style="float:right;margin-right:50px">订单数：<span style="color: red;">{{countData.nums}}</span>
                 &nbsp;&nbsp;&nbsp;累计订单金额：<span style="color: red;">￥{{countData.totalAmount| currency}}</span>
              </div>
            </el-col>
      </el-row>
      <el-form :model="QUERY_FORM" class="query_form_info" size="small">
        <el-row>
          <el-col :span="24">
            <el-select v-model="QUERY_FORM.payPlatform" placeholder="支付方式" size="small" style="float:left;margin-right:10px">
              <el-option
                v-for="item in payTypeSearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-form-item label="下单时间" prop="dateTime" style="float:left;width:408px">
              <el-date-picker size="small"
                              v-model="queryDateTime"
                              type="daterange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
            </el-form-item>
            <el-input placeholder="请输入关键字" v-model="QUERY_FORM.otherContent" class="input-with-select" size="small" style="float:left;width:390px;margin:0 12px">
              <el-select v-model="QUERY_FORM.otherCondition" slot="prepend" placeholder="请选择">
                <el-option
                  v-for="item in otherConditionSearchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-input>
             <el-button type="primary" @click="seach" size="small">搜索</el-button>
            <el-button type="info" @click="queryRest" size="small" style="margin-left:5px">重置</el-button>
          </el-col>

        </el-row>
      </el-form>
      <!--列表-->
      <el-table style="margin-top:-17px;margin-bottom:53px"   class='table-table' :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList"
                v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <!--<el-table-column prop="orderNum" label="父订单编号" min-width="120"></el-table-column>-->
        <el-table-column prop="orderNum" label="订单编号" min-width="120"></el-table-column>
        <el-table-column label="下单时间" min-width="180">
          <template slot-scope="props">
            {{ props.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="payPlatformDesc" label="支付方式" min-width="150"></el-table-column>
        <el-table-column prop="realPayAmout" label="实付金额" min-width="100">
          <template slot-scope="props">
            ￥{{ props.row.expAmt | currency }}
          </template>
        </el-table-column>
        <el-table-column prop="mainOrderStatus" label="订单状态" min-width="120">
          <template slot-scope="props">
            已删除
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="130">
          <template slot-scope="scope">
            <el-button
              v-permissions="'DD060400'"
              v-if="scope.row.subOrderStatus"
              @click="showLogistics(scope.row)"
              type="text"
              size="small">
              <span>物流</span>
            </el-button>
            <el-button
              v-permissions="'DD060100'"
              @click="showDetail(scope.row)"
              type="text"
              size="small">
              <span>详情</span>
            </el-button>
            <el-button
              v-permissions="'DD060200'"
              @click="showRemark(scope.row)"
              type="text"
              size="small">
              <span>备注</span>
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageListOrder" :param='url'></Pagination>


      <!--显示备注-->
      <el-dialog :title="'备注'" :visible.sync="dialogShowRemark" :close-on-click-modal='false'>
        <!--<el-form-item label=""   style="margin-bottom: 20px;">-->
        <div style="margin-bottom: 20px;">
          <el-input type="textarea" v-model="DIALOG_FORM.remark" :maxlength="200"  :readonly="true"></el-input>
        </div>
        <!--</el-form-item>-->
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canelRemark">取消</el-button>
            <!--<el-button type="primary" @click="saveRemark">保存</el-button>-->
          </el-col>
        </el-row>
        </el-row>
      </el-dialog>
      <!--显示物流-->
      <el-dialog :title="'物流详情'" :visible.sync="dialogShowLogistics" :close-on-click-modal='false'>
        <el-alert  v-if="logisticsList &&logisticsList.length>1" type="warning" :closable="false">{{logisticsList.length+'个包裹已发出'}}
        </el-alert>
        <div v-if="logisticsList &&logisticsList.length>1">
          <template v-for="item in logisticsList">
            <div class="wuliu_box">
              <div class="wuliu_number"><span><i class="el-icon-tickets"></i>{{item.expressStatus}}</span><span>{{item.expressName}}&nbsp;{{item.courierNum}}  </span></div>
              <div class="wuliu_image">
                <div v-for="(good,index) in item.goodsList" :key="index">
                  <img  :src="good.goodImg"/>
                  <div>{{good.goodQuantity}}件</div>
                </div>
              </div>
              <div class="wuliu_number"><span>共 {{item.goodsList.length}} 件商品</span><el-button    @click="showLogisticsDetail(item)"  type="primary"  size="small"> <span>查看物流信息</span> </el-button></div>
            </div>
          </template>
        </div>
      </el-dialog>
      <el-dialog :title="'查看物流'" :visible.sync="dialogLogisticsDetail" :close-on-click-modal='false'>
        <div style="margin-bottom: 10px;">【{{LogisticsDetail.expressName}}】{{LogisticsDetail.courierNum}} </div>

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
    resetForm = function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canelRemark = function () {
      this.dialogShowRemark = false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: 'controller/orderclosed',
          editUserRemark: 'controller/order/editUserRemark',
          getLogisticsUrl: 'controller/order/logisticsList',
          downloadUrl:'export/orderExport'
        },
        [QUERY_FORM]: {otherCondition:'likeOrderNum'},
        url: 'order',
        orderType:'6',
        countData:{nums:0,totalAmount:0},
        dialogShowRemark: false,
        [DIALOG_FORM]: {},
        editForm: { //表单验证规则
          // bannerDesc: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
          // positionId: [{required: true, message: '请选择广告位', trigger: 'blur'},
          // {validator: this.checkSort2, message: '', trigger: 'change'}
          // ],
        },
        queryDateTime:'',
        payTypeSearchOptions:[ {value: '',label: '全部'},{value: '1',label: '微信'},{value: '2',label: '支付宝'},{value: '3',label: '余额'},{value: '4',label: '其他'}],
        otherConditionSearchOptions:[
          {value: 'likeOrderNum',label: '订单号'},{value: 'likeUserName',label: '会员信息'},{value: 'likeReceiver',label: '收件人信息'},
          {value: 'likeAddress',label: '地址信息'},{value: 'likeCourierNum',label: '快递单号'},{value: 'likeGoodsName',label: '商品名称'},{value: 'likeGoodsNo',label: '商品编码'},{value: 'likeSupplierName',label: '供应商名称'}
        ],
        dialogShowLogistics:false,
        logisticsList:{goodsList:[]},
        dialogLogisticsDetail:false,
        LogisticsDetail:{expressList:[]}
      }
        ;
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      },
      currency(val){
        return util.currency(val,2)
      }
    },
    created() {
      // this.positionList()
    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted() {
      this[QUERY_FORM].orderType=this.orderType
      this.pageList(1, {baseUrl: 'order',callback:"getList"})
    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'getList':
            this.countData=this[RESULT_DATA].model
            break
          case 'saveUserRemark':
            this.dialogShowRemark = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
      //分页list
      pageListOrder(page) {
        this.pageList(page, {baseUrl: 'order'})
      },
      //检索
      seach() {
        let dateTime=this.queryDateTime+''
        let dateTimes=dateTime.split(',')
        let beginTime1=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm')
        let endTime1=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm')
        if(beginTime1){
          beginTime1+=":00"
          this.QUERY_FORM.beginTime1=beginTime1
        }
        if(endTime1){
          endTime1+=":59"
          this.QUERY_FORM.endTime1=endTime1
        }
        this.countData={nums:0,totalAmount:0}
        this.pageList(1, {baseUrl: 'banner',callback:"getList"})
      },
      queryRest() {
        this.queryDateTime=''
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ""
        });
        this[QUERY_FORM].orderType=this.orderType
      },
      export1() {
        var resultCount=this[RESULT_DATA].resultCount
        if(resultCount>3000){
          this.$message({
            message: '数据超出3000条无法导出!',
            type: 'error'
          })
        }else{
          let url=process.env.API_ROOT + process.env.PATH_API+this[URL_PARAM].downloadUrl;
          this[QUERY_FORM].orderType=this.orderType
          url+='?search='+encodeURIComponent(JSON.stringify(this[QUERY_FORM]))
          window.open(url)
        }
      },
      showDetail(data) {
        let query = {
          // 'page': this.RESULT_DATA.currentPage,
          'mainId': data.mainId,
          'subId': data.subId,
        }
        console.info("query:", query)
        this.$router.push({path: '/order/recycleDetail', query: query})
      },
      // 查看备注
      showRemark(data) {
        this.DIALOG_FORM = {}
        this.DIALOG_FORM.id = data.id
        this.DIALOG_FORM.remark = data.userRemark
        this.dialogShowRemark = true
      },
      saveRemark() { //保存备注
        let arg = {
          postParam: this.DIALOG_FORM,
          customAct: 'editUserRemark',
          callback: 'saveUserRemark',
          reLoad: false
        }
        this.customPost(arg)
      },
      showLogistics:function (data) {
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json={orderNo:data.orderNum}
        this.$http.get(this[URL_PARAM].getLogisticsUrl, {params:json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.logisticsList = _result.resultList
            // console.log("=========",this.logisticsList)
            if(this.logisticsList && this.logisticsList.length>1){
              this.dialogShowLogistics=true
            }else if(this.logisticsList && this.logisticsList.length>0){
              this.LogisticsDetail=this.logisticsList[0]
              this.dialogLogisticsDetail=true
            }else {
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
      showLogisticsDetail(data){
        this.LogisticsDetail=data
        this.dialogLogisticsDetail=true
      }

    }
  }
</script>
<style lang="less">
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

  .query_form_info{
    margin: 15px 0px;
  }
  .query_col_info{
    padding-right: 5px;
  }

</style>

