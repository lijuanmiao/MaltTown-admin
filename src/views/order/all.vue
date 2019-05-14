<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' >
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
            <el-select v-model="QUERY_FORM.payPlatform" placeholder="支付方式" size="small" style="float:left;margin-right:5px">
              <el-option
                v-for="item in payTypeSearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <el-select v-model="QUERY_FORM.timeCondition" placeholder="不按时间" size="small" style="float:left;margin-right:5px">
              <el-option
                v-for="item in timeConditionSearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              <el-date-picker size="small"  style="float:left;margin-right:5px"
                              v-model="queryDateTime"
                              type="daterange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
              <el-input placeholder="请输入关键字" v-model="QUERY_FORM.otherContent" class="input-with-select" size="small" style="float:left;width:330px;margin-right:5px">
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
            <el-button type="info" @click="queryRest" size="small" style="margin-left:0px">重置</el-button>
          </el-col>

        </el-row>
      </el-form>
    <!--列表-->
    <table style="width:100%;float:left;" border="0">
        <thead style="color: #909399;">
          <th style="width:30px"></th>
          <th style="width:25%">订单编号</th>
          <th style="min-width:20%">下单时间</th>
          <th style="width:10%">支付方式</th>
          <th style="width:15%">实付金额</th>
          <th style="width:10%">订单状态</th>
          <th style="width:15%">操作</th>
        </thead>
        <tbody>
        <template v-for="(dataitem,index) in RESULT_DATA.resultList">
          <tr>
            <td class="sub-td" :style="fats[index]==true?'transform:rotate(90deg)':''" @click="subClick(index)">></td>
            <td>{{dataitem.orderNum}}</td>
            <td>{{dataitem.createTime | formatDate}}</td>
            <td>{{dataitem.payPlatform}}</td>
            <td>{{dataitem.expAmt | currency }}</td>
            <td>{{dataitem.orderStatusDesc}}</td>
            <td>
              <el-button  @click="showDetail(dataitem)" type="text" size="small"  v-permissions="'DD070100'" > <span>详情</span> </el-button>
              <el-button  @click="showRemark(dataitem)" type="text"  size="small"  v-permissions="'DD070200'" > <span>备注</span> </el-button>
            </td>
          </tr>
          <tr v-for="items in dataitem.subList" style="background-color: #f9f9f9" v-show="fats[index]==true">
            <td style="width:30px"></td>
            <td>{{items.orderNo}}</td>
            <td>{{items.createTime | formatDate}}</td>
            <td>{{items.payPlatformDesc}}</td>
            <td>{{items.realPayAmout | currency }}</td>
            <td>{{items.orderStatusDesc}}</td>
            <td>
              <el-button  @click="showLogistics(items)" type="text" size="small" v-permissions="'DD070400'" > <span>物流</span> </el-button>
              <el-button  @click="showRemark(items)" type="text"  size="small" v-permissions="'DD070200'"> <span>备注</span> </el-button>
            </td>
          </tr>
          <tr v-if="!dataitem.subList" style="background-color: #f9f9f9;"   v-show="fats[index]==true">
              <td colspan="7" style="text-align:center;color:#999">暂无信息</td>
          </tr>
        </template>
        <template  v-if="!RESULT_DATA.resultList ||RESULT_DATA.resultList.length==0">
          <tr >
            <td colspan="7" align="center" valign="center" style="height: 60px;">
                <span class="el-table__empty-text">暂无数据</span>
            </td>
          </tr>
        </template>

        </tbody>
      </table>


    <!--分页-->
    <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
    <div style="float: left;width: 100%;height: 66px"></div>

    <!--显示备注-->
    <el-dialog :title="'备注'" :visible.sync="dialogShowRemark" :close-on-click-modal='false'>
      <!--<el-form-item label=""   style="margin-bottom: 20px;">-->
      <div style="margin-bottom: 20px;">
        <el-input type="textarea" v-model="DIALOG_FORM.remark" :maxlength="200" :readonly="true"></el-input>
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
  import { LIST_LOAD_TIME } from '../../config/config'
  import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import axios from 'axios'

  // 函数集合
  class method extends baseMethod{

  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/allorder',getLogisticsUrl: 'controller/order/logisticsList',downloadUrl:'export/orderExport'},
        [QUERY_FORM]: {otherCondition:'likeOrderNum'},
        dialogDownViewVisible:false,
        DownLoadUrl:'',
        dialogShowRemark: false,
        [DIALOG_FORM]: {},
        queryDateTime:'',
        fats:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,20:false,21:false,22:false,23:false,24:false,25:false,26:false,27:false,28:false,29:false},
        otherConditionSearchOptions:[
          {value: 'likeOrderNum',label: '主订单号'},{value: 'likeUserName',label: '会员信息'},{value: 'likeReceiver',label: '收件人信息'},
          {value: 'likeAddress',label: '地址信息'},{value: 'likeCourierNum',label: '快递单号'},{value: 'likeGoodsName',label: '商品名称'},{value: 'likeGoodsNo',label: '商品编码'},{value: 'likeSupplierName',label: '供应商名称'}
        ],
        payTypeSearchOptions:[ {value: '',label: '全部'},{value: '1',label: '微信'},{value: '2',label: '支付宝'},{value: '3',label: '余额'},{value: '4',label: '其他'}],
        timeConditionSearchOptions:[{value: '',label: '不按时间'},{value: '1',label: '下单时间'},{value: '2',label: '付款时间'}],
        orderType:'7',
        countData:{nums:0,totalAmount:0},
        dialogShowLogistics:false,
        logisticsList:{goodsList:[]},
        dialogLogisticsDetail:false,
        LogisticsDetail:{expressList:[]}

      };
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      },
      currency(val){
        return util.currency(val,2)
      }
    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.pageList(1,{callback:"getList"});

    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
          case 'getList':
            this.countData=this[RESULT_DATA].model
            break
          case 'export':
            break
        }
      },

      subClick(index){
        var flag=this.fats[index];
          this.fats[index]=flag?false:true;

      },
      //检索查询
      seach(){
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


        // console.info("query_from:",this.QUERY_FORM)
        this.pageList(1, {baseUrl: 'order',callback:"getList"})
      },
      queryRest() {
        this.queryDateTime=''
        this[QUERY_FORM]={}
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
      // 查看备注
      showRemark(data) {
        this.DIALOG_FORM = {}
        this.DIALOG_FORM.id = data.id
        this.DIALOG_FORM.remark = data.userRemark
        this.dialogShowRemark = true
      },
      canelRemark: function () {
        this.dialogShowRemark = false
      },
      showDetail(data) {
        let query = {
          'mainId': data.id,
        }
        this.$router.push({path: '/order/allDetail', query: query})
      },
      showLogistics:function (data) {
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json={orderNo:data.orderNo}
        this.$http.get(this[URL_PARAM].getLogisticsUrl, {params:json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.logisticsList = _result.resultList
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
        data.expressList.reverse();
        this.LogisticsDetail=data
        this.dialogLogisticsDetail=true
      }

    }
  }
</script>
<style lang="less">
  table th, table  td { border:1px solid #ebebeb; line-height: 40px;padding-left:10px;text-align: center; }
        table { border-collapse: collapse;}
  tr:hover{
    background: #f0f0f0
  }
  table td{color: #606266;}

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
  .tab-set-title span{
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #1f2d3d;
    font-weight: bold;
    position: relative;
  }
  .sub-table{
    background-color: #409EFF;
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
  .sub-td{
    padding:0;width:30px;font-size:12px; color:#999; text-align:center; vertical-align:middle;cursor:pointer;
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
</style>

