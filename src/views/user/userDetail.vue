<template>
  <section style="padding:10px 20px">
    <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
				<el-col :span="16" class="titleText">
					<Breadcrumb></Breadcrumb>
				</el-col>
				<el-col :span="8" align="right" class="titleText">
					<el-button @click="goBack()" style="margin-top:-50px">返回</el-button>
				</el-col>
			</el-row>
    <el-tabs v-model="activeTab"  @tab-click="tabHandleClick"  type="border-card">

      <el-tab-pane label="订单信息" name="orderMain">

        <el-tabs v-model="activeSubTab" @tab-click="tabClickOwen" type="card">
          <!-- 订单信息切换-->
        <el-tab-pane label="自购订单" name="orderMainOwen">

          <el-form :model="QUERY_FORM" class="query_form_info" size="small">
            <el-row>
              <el-col :span="24" >
                <el-form-item label="下单时间" prop="dateTime" style="float:left;width:430px">
                  <el-date-picker size="small"
                                  v-model="queryDateTime"
                                  type="daterange"
                                  format="yyyy-MM-dd HH:mm"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :default-time="['00:00:00', '23:59:59']"
                                  :editable='true' :clearable='false'>
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="主订单号" style="float:left;width:300px">
                <el-input placeholder="请输入关键字" v-model="QUERY_FORM.likeOrderNum" style="width:220px" size="small" />
                </el-form-item>
                  <el-button type="primary" @click="search" style="float:left"  size="small">搜索</el-button>
                  <el-button type="info" @click="queryRest" style="float:left" size="small">重置</el-button>
              </el-col>

            </el-row>
          </el-form>
          <el-row >
            <el-col :span="24" class="titleText">
              主订单数：<span style="color: red;" >{{RESULT_DATA.model?RESULT_DATA.model.nums:0}}</span>
              &nbsp;&nbsp;&nbsp;
              订单金额：<span style="color: red;" >￥{{RESULT_DATA.model?RESULT_DATA.model.totalAmount :0 | currency}}</span>
            </el-col>
          </el-row>
          <!--列表-->
         <table style="width:100%;float:left;margin-bottom:53px" border="0">
        <thead>
          <th style="width:30px"></th>
          <th style="width:30%">订单编号</th>
          <th style="min-width:25%">下单时间</th>
          <th style="width:10%">支付方式</th>
          <th style="width:10%">实付金额</th>
          <th style="width:10%">是否跨境</th>
          <th style="width:10%">订单状态</th>
        </thead>
        <tbody>
        <template v-for="(dataitem,index) in RESULT_DATA.resultList">
          <tr>
            <td class="sub-td" :style="fats[index]==true?'transform:rotate(90deg)':''" @click="subClick(index)">></td>
            <td>{{dataitem.orderNum}}</td>
            <td>{{dataitem.createTime | formatDate}}</td>
            <td>{{dataitem.payPlatform}}</td>
            <td v-if="dataitem.orderStatus==1">{{dataitem.expAmt | currency }}</td>
            <td v-if="dataitem.orderStatus!=1">0.00</td>
            <td>{{dataitem.crossBorderDesc }}</td>
            <td></td>
          </tr>
          <tr v-for="items in dataitem.subList" style="background-color: #f9f9f9" v-show="fats[index]==true">
            <td style="width:30px"></td>
            <td>{{items.orderNo}}</td>
            <td>{{items.orderTime | formatDate}}</td>
            <td>{{items.payPlatformDesc}}</td>
            <td>{{items.realPayAmout | currency }}</td>
            <td></td>
            <td v-if="items.orderStatus==0||items.orderStatus==1">待发货</td>
            <td v-if="items.orderStatus==2">待收货</td>
            <td v-if="items.orderStatus==3">已完成</td>
            <td v-if="items.orderStatus==4">交易关闭</td>
          </tr>
          <tr v-if="!dataitem.subList" style="background-color: #f9f9f9;"   v-show="fats[index]==true">
              <td colspan="7" style="text-align:center;color:#999">暂无信息</td>
          </tr>

        </template>
        <tr v-if="RESULT_DATA.resultList==null||RESULT_DATA.resultList.length==0" style="background-color: #f9f9f9;">
          <td colspan="7" style="text-align:center;">暂无数据</td>
        </tr>
        </tbody>
      </table>

          <!--分页-->
          <Pagination :pageData="RESULT_DATA" @change="pageListFun"></Pagination>
        </el-tab-pane>
        <el-tab-pane label="分销订单" name="orderMainOther">
          <!-- 分销tab切换-->
          <el-tabs v-model="activeTabOrder" @tab-click="tabClickOther">
            <el-tab-pane label="一级分销" name="orderFirst">


              <el-form :model="QUERY_FORM" class="query_form_info" size="small">
                <el-row>
                  <el-col :span="24" class="query_col_info">
                    <el-form-item label="下单时间" prop="dateTime" style="float:left;width:430px">
                      <el-date-picker size="small"
                                      v-model="queryFirstTime"
                                      type="daterange"
                                      format="yyyy-MM-dd HH:mm"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      :default-time="['00:00:00', '23:59:59']"
                                      :editable='true' :clearable='false'
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单状态:" style="float:left;width:217px">
                      <el-select  placeholder="请选择" v-model='QUERY_FORM.orderStatus'>
                        <el-option
                          v-for="item in StatusSearchOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="返利状态:" style="float:left;width:217px">
                      <el-select  placeholder="请选择" v-model='QUERY_FORM.status'>
                        <el-option
                          v-for="item in StatusCommSearchOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="子订单号" style="float:left;width:270px">
                    <el-input placeholder="请输入关键字" v-model="QUERY_FORM.orderNo" style="width:190px"/>
                    </el-form-item>
                    <el-button type="primary" @click="searchFirst" size="small">搜索</el-button>
                      <el-button type="info" @click="queryRestFirst" size="small" style="margin-left:6px">重置</el-button>
                  </el-col>

                </el-row>
              </el-form>
              <el-row>
                <el-col :span="24" class="titleText">
                 <div style="line-height:50px"> 用户： <img :src="getHeaderUrl()" style="width: 50px;height:50px;border-radius:50%;margin-bottom:-15px">&nbsp;{{RESULT_DATA.model?RESULT_DATA.model.nickName:""}}&nbsp;&nbsp;<span style="background:#ffcd00;border-radius:10px">&nbsp;{{RESULT_DATA.model?RESULT_DATA.model.userLevel:""}}&nbsp;</span>
                  &nbsp;&nbsp;&nbsp;
                  累计佣金：<span style="color: red;">￥{{RESULT_DATA.model?RESULT_DATA.model.frtBal:0 | currency}}元</span>
                  &nbsp;&nbsp;&nbsp;
                  待结佣金:<span style="color: red;">￥{{RESULT_DATA.model?RESULT_DATA.model.totalCommissionAmt:0 | currency}}元</span></div>
                </el-col>
              </el-row><br/><br/>

              <!--列表-->
              <el-table style="margin-top:-35px;margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                <el-table-column prop="orderNo" label="子订单号" min-width="180"></el-table-column>
                <el-table-column prop="orderTime" label="下单时间" min-width="210">
                  <template slot-scope="items">
                    {{ items.row.orderTime | formatDate}}
                  </template>
                </el-table-column>
                <el-table-column prop="nickName" label="买家昵称" min-width="200"></el-table-column>
                <el-table-column prop="typeFirst" label="分佣类型" min-width="120"></el-table-column>
                <el-table-column prop="realPayAmout" label="实付金额" min-width="200">
                  <template scope="props">
                    ￥{{ props.row.realPayAmout | currency}}
                  </template>
                </el-table-column>
                <el-table-column prop="orderStatusDesc" label="订单状态" min-width="120"></el-table-column>
                <el-table-column prop="crossBorder" label="是否跨境" min-width="120"></el-table-column>
                <el-table-column prop="expCommissionAmt" label="奖励佣金" min-width="200">
                  <template scope="props">
                    <li v-if="props.row.orderStatus==4">
                    </li>
                    <li v-else-if="props.row.orderStatus!=4">
                      ￥{{ props.row.expCommissionAmt | currency}}
                    </li>
                  </template>
                </el-table-column>
                <el-table-column prop="statusDesc" label="返利状态" min-width="120">
                  <template scope="props">
                    <li v-if="props.row.orderStatus==4">
                    </li>
                    <li v-else-if="props.row.orderStatus!=4">
                      {{ props.row.statusDesc}}
                    </li>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <Pagination :pageData="RESULT_DATA" @change="pageListOwen"></Pagination>
            </el-tab-pane>

            <el-tab-pane label="二级分销" name="orderSec">

              <el-form :model="QUERY_FORM" class="query_form_info" size="small">
                <el-row>
                  <el-col :span="24" class="query_col_info">
                    <el-form-item label="下单时间" prop="dateTime" style="float:left;width:430px">
                      <el-date-picker size="small"
                                      v-model="querySecTime"
                                      type="daterange"
                                      format="yyyy-MM-dd HH:mm"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      :default-time="['00:00:00', '23:59:59']"
                                      :editable='true' :clearable='false'
                      >
                      </el-date-picker>
                    </el-form-item>
                     <el-form-item label="订单状态:"  style="float:left;width:217px">
                      <el-select  placeholder="请选择" v-model='QUERY_FORM.orderStatus'>
                        <el-option
                          v-for="item in StatusSearchOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="返利状态:" style="float:left;width:217px">
                      <el-select  placeholder="请选择" v-model='QUERY_FORM.status'>
                        <el-option
                          v-for="item in StatusCommSearchOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="子订单号" style="float:left;width:270px">
                    <el-input placeholder="请输入关键字" v-model="QUERY_FORM.orderNo" style="width:190px"/>
                    </el-form-item>
                    <el-button type="primary" @click="searchSec" size="small">搜索</el-button>
                    <el-button type="info" @click="queryRestSec" size="small"  style="margin-left:6px">重置</el-button>
                  </el-col>

                </el-row>
              </el-form>

              <el-row>
                <el-col :span="24" class="titleText" style="line-height:50px">
                  用户： <img :src="getHeaderUrl()" style="width: 50px;height:50px;border-radius:50%;margin-bottom:-15px">&nbsp;{{RESULT_DATA.model?RESULT_DATA.model.nickName:0}}&nbsp;&nbsp;<span style="background:#ffcd00;border-radius:10px">&nbsp;{{RESULT_DATA.model?RESULT_DATA.model.userLevel:""}}&nbsp;</span>
                  &nbsp;&nbsp;&nbsp;
                  累计佣金：<span style="color: red;">￥{{RESULT_DATA.model?RESULT_DATA.model.frtBal:0 | currency}}元</span>
                  &nbsp;&nbsp;&nbsp;
                  待结佣金:<span style="color: red;">￥{{RESULT_DATA.model?RESULT_DATA.model.totalCommissionAmt:0 | currency}}元</span>
                </el-col>
              </el-row>

              <!--列表-->
              <el-table  style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                <el-table-column prop="orderNo" label="子订单号" min-width="180"></el-table-column>
                <el-table-column prop="orderTime" label="下单时间" min-width="210">
                  <template slot-scope="items">
                    {{ items.row.orderTime | formatDate}}
                  </template>
                </el-table-column>
                <el-table-column prop="nickName" label="买家昵称" min-width="200"></el-table-column>
                <el-table-column prop="typeSec" label="分佣类型" min-width="200"></el-table-column>
                <el-table-column prop="realPayAmout" label="实付金额" min-width="200">
                  <template scope="props">
                    ￥{{ props.row.realPayAmout | currency}}
                  </template>
                </el-table-column>
                <el-table-column prop="orderStatusDesc" label="订单状态" min-width="120"></el-table-column>
                <el-table-column prop="crossBorder" label="是否跨境" min-width="120"></el-table-column>
                <el-table-column prop="expCommissionAmt" label="奖励佣金" min-width="200">
                  <template scope="props">
                    <li v-if="props.row.orderStatus==4">
                    </li>
                    <li v-else-if="props.row.orderStatus!=4">
                      ￥{{ props.row.expCommissionAmt | currency}}
                    </li>
                  </template>
                </el-table-column>
                <el-table-column prop="statusDesc" label="返利状态" min-width="120">
                  <template scope="props">
                    <li v-if="props.row.orderStatus==4">
                    </li>
                    <li v-else-if="props.row.orderStatus!=4">
                      {{ props.row.statusDesc}}
                    </li>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <Pagination :pageData="RESULT_DATA" @change="pageListOther"></Pagination>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="账户明细" name="acct" >
        <el-row >
          <el-col :span="24" class="titleText">
            累计佣金：<span style="color: red;">{{RESULT_DATA.model?RESULT_DATA.model.totalCommissionAmt:0 | currency}}元</span>
            &nbsp;&nbsp;&nbsp;
            待结余额：<span style="color: red;">{{RESULT_DATA.model?RESULT_DATA.model.frtBal :0 | currency}}元</span>
            &nbsp;&nbsp;&nbsp;
            账户余额:<span style="color: red;">{{RESULT_DATA.model?RESULT_DATA.model.avlBal:0 | currency}}元</span>
          </el-col>
        </el-row>
        <!--列表-->
        <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
          <el-table-column prop="acctTransTypeDesc" label="类型" min-width="150"></el-table-column>
          <el-table-column prop="acctAmt" label="交易金额(元)" min-width="150">
            <template scope="props">
              {{ props.row.acctAmt | currency}}
            </template>
          </el-table-column>
          <el-table-column prop="avlAmt" label="账户余额" min-width="200">
            <template scope="props">
              {{ props.row.avlAmt | currency}}
            </template>
          </el-table-column>
          <el-table-column prop="acctDate" label="交易时间" min-width="150">
            <template slot-scope="items">
              {{ items.row.acctDate | formatDate}}
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <Pagination :pageData="RESULT_DATA" @change="pageListFun"></Pagination>
      </el-tab-pane>
      <el-tab-pane label="积分明细" name="integral">
        <el-row >
          <el-col :span="24" class="titleText">
            积分：<span style="color: red;"> {{RESULT_DATA.model?RESULT_DATA.model.totalSum:0}} </span>
          </el-col>
        </el-row>

        <!--列表-->
        <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
          <el-table-column prop="activityName" label="变化原因" min-width="150"></el-table-column>
          <el-table-column prop="couponValue" label="积分变化" min-width="150"></el-table-column>
          <el-table-column prop="createTimeValue" label="变化时间" min-width="200"></el-table-column>
        </el-table>
        <!--分页-->
        <Pagination :pageData="RESULT_DATA" @change="pageListFun"></Pagination>
      </el-tab-pane>

     </el-tabs>
  </section>
</template>

<script>
  import { LIST_LOAD_TIME } from '../../config/config'
  import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import api from '../../config/axios-config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import opInfo from '../../common/opInfo'
  import { Loading } from 'element-ui'
  import axios from 'axios'
  import { checkZ,checkNumber,checkZz0,checkZz } from '../../common/validator'
    // 函数集合
  class method extends baseMethod{
    // tab切换事件
    tabHandleClick = function(tab, event) {
      let tabName = tab.name
      switch (tabName){
        case 'acct':
          this.activeTab= 'acct'
          this.QUERY_FORM= {id:this.id}
          this.pageList(1,{customAct:'acctList'})
          break
        case 'integral':
           this.activeTab= 'integral'
           this.QUERY_FORM= {id:this.id}
           this.pageList(1,{customAct:'integralList'})

           this.hahah = this[RESULT_DATA].model==null?0:this[RESULT_DATA].model
           break
        case 'orderMain':
           this.activeTab= 'orderMain'
           this.QUERY_FORM= {id:this.id}
           if(this.activeSubTab != 'orderMainOwen'){
            if(this.activeTabOrder == 'orderFirst'){
              this.tabClickOther({ name: 'orderFirst' }, null)
            }else if(this.activeTabOrder == 'orderSec'){
              this.tabClickOther({ name: 'orderSec' }, null)
            }
           }else{
            this.pageList(1,{customAct:'orderMainList'})
           }
           break
      }
    }
    tabClickOwen = function(tab, event){//自购订单
       let tabName = tab.name
       switch (tabName){
        case 'orderMainOwen':
           this.activeSubTab= 'orderMainOwen'
           this.QUERY_FORM= {id:this.id}
           this.pageList(1,{customAct:'orderMainOwenList'})
           break
        case 'orderMainOther':
           this.activeTabOrder= 'orderFirst'
           this.QUERY_FORM= {id:this.id}
           this.pageList(1,{customAct:'orderFirstList'})
           break
       }
    }

    tabClickOther = function(tab, event){//分销订单
       let tabName = tab.name
       switch (tabName){
        case 'orderFirst':
           this.activeTabOrder= 'orderFirst'
           this.QUERY_FORM= {id:this.id}
           this.pageList(1,{customAct:'orderFirstList'})
           break
        case 'orderSec':
           this.activeTabOrder= 'orderSec'
           this.QUERY_FORM= {id:this.id}
           this.pageList(1,{customAct:'orderSecList'})
           break
       }
    }
  }
  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: '',
          acctList:"controller/user/acct",
          orderMainList:"controller/allorder",
          integralList:"controller/user/integral",
          orderFirstList:"controller/allorder/first",
          orderSecList:"controller/allorder/sec",
          orderMainOwenList:"controller/allorder"
        },
        [QUERY_FORM]: {otherCondition:'likeOrderNo'},
        queryDateTime:'',
        queryFirstTime:'',
        hahah:0,
       fats:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,20:false,21:false,22:false,23:false,24:false,25:false,26:false,27:false,28:false,29:false},
        querySecTime:'',
        activeTab:"orderMain", //父
        activeSubTab:'orderMainOwen',//订单
        activeTabOrder:"orderFirst", //分销
        dateTime:[],
        id:"",
        type:0,
        StatusSearchOptions:[{
            value: '',
            label: '全部'
        },{
            value: '0,1',
            label: '待发货'
        },{
            value: '2',
            label: '待收货'
        },{
            value: '3',
            label: '已完成'
        },{
            value: '4',
            label: '已关闭'
        }],
         StatusCommSearchOptions:[{
            value: '',
            label: '全部'
        },{
            value: '0',
            label: '待发放'
        },{
            value: '1',
            label: '已发放'
        }],
      };
    }, filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      },currency(val){
        return util.currency(val,2)
      }
    },
    watch:{

    },
    create(){

    },
    mounted(){
     this.id = this.$route.query.id
     this.tabClickOwen({ name: 'orderMainOwen' }, null)
    },
    methods: {
      ...new method(),
      callBackFun(){
       },
      //查询按钮
      search(){

        this.QUERY_FORM.id = this.$route.query.id
        let dateTime=this.queryDateTime+''
        let dateTimes=dateTime.split(',')
        let beginTimeSt=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm')
        let endTimeEnd=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm')
        if(beginTimeSt){
          beginTimeSt+=":00"
          this.QUERY_FORM.beginTimeSt=beginTimeSt
        }
        if(endTimeEnd){
          endTimeEnd+=":59"
          this.QUERY_FORM.endTimeEnd=endTimeEnd
        }
        this.pageList(1,{customAct:'orderMainList'})
      },
            subClick(index){
        var flag=this.fats[index];
          this.fats[index]=flag?false:true;

      },
       searchFirst(){

        this.QUERY_FORM.id = this.$route.query.id
        let dateTime=this.queryFirstTime+''
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
        this.pageList(1,{customAct:'orderFirstList'})
      },
       searchSec(){

        this.QUERY_FORM.id = this.$route.query.id
        let dateTime=this.querySecTime+''
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
        this.pageList(1,{customAct:'orderSecList'})
      },
       queryRest() {//自购订单重置
        this.queryDateTime=''
        this[QUERY_FORM]={}
        this.search();
      },queryRestFirst() {//分销一级重置
        this.queryFirstTime=''
        this[QUERY_FORM]={}
        this.searchFirst();
      },
      queryRestSec() {//分销二级重置
        this.querySecTime=''
        this[QUERY_FORM]={}
        this.searchSec();
      },
      goBack() {//返回按钮
        this.$router.push({path: '/user/userList'})
      },
       getHeaderUrl(){//用户头像
        return this.RESULT_DATA.model?this.RESULT_DATA.model.headImageUrl:""
      },
       pageListFun(pageSize){//父级分页
        switch (this.activeTab){
          case 'orderMain':
            this.QUERY_FORM= {id:this.id}
            this.pageList(pageSize,{customAct:'orderMainList'})
            break
          case 'acct':
            this.QUERY_FORM= {id:this.id}
            this.pageList(pageSize,{customAct:'acctList'})
            break
          case 'integral':
           this.QUERY_FORM= {id:this.id}
           this.pageList(pageSize,{customAct:'integralList'})
           break
        }
      },
        pageListOwen(pageSize){//订单分页
        switch (this.activeSubTab){
          case 'orderMainOwen':
            this.QUERY_FORM= {id:this.id}
            this.pageList(pageSize,{customAct:'orderMainOwenList'})
            break
          case 'orderMainOther':
            this.QUERY_FORM= {id:this.id}
             this.pageList(pageSize,{customAct:'orderFirstList'})
            break
        }
      },
        pageListOther(pageSize){//分销分页
        switch (this.activeSubTab){
          case 'orderFirst':
            this.QUERY_FORM= {id:this.id}
            this.pageList(pageSize,{customAct:'orderFirstList'})
            break
          case 'orderSec':
            this.QUERY_FORM= {id:this.id}
            this.pageList(pageSize,{customAct:'orderSecList'})
            break
        }
      }
    }
  }

</script>
<style lang="less">
table th, table  td { border:1px solid #ebebeb; line-height: 40px;padding-left:10px }
        table { border-collapse: collapse;}
  tr:hover{
    background: #f0f0f0
  }

    .hand_validity .hand_validity01 .el-checkbox {
        width:90px;
        margin-left: 0;
    }
    .el-tag {
        display: inline-block;
        margin-right: 8px;
        margin-top: 5px;
    }
    .image {
      width: 100%;
      display: block;
    }
</style>
