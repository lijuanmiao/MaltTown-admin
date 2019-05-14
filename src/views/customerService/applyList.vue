<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="5" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
      <el-form :model="QUERY_FORM">
        <el-row>
          <el-col :span="24">
            <el-form-item label="维权时间" prop="dateTime" style="float:left;width:500px">
              <el-date-picker size="small"
                              v-model="queryDateTime"
                              type="datetimerange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="退货退款状态" style="float:left;width:240px">
              <el-select v-model="QUERY_FORM.refundType" size="small">
                <el-option
                  v-for="item in refundTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维权状态" style="float:left;width:200px;margin-left:-7px">
              <el-select v-model="QUERY_FORM.refundStatus" size="small">
                <el-option
                  v-for="item in refundStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="seach" size="small" style="margin-top:5px">搜索</el-button>
            <el-button type="info" @click="queryRest" size="small" style="margin-left:0px">重置</el-button>
          </el-col>

        </el-row>
      </el-form>
      <!--列表-->
      <div style="width:100%;float:left;margin-top:-25px">
        订单数：<span style="color: red;">{{RESULT_DATA.resultCount}}</span>
      </div>

      <el-table size="mini" ref="multipleTable" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row
                :border="false" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">

        <el-table-column prop="applyTime" label="申请时间"></el-table-column>
        <el-table-column label="产品/规格" min-width="200px">
          <template slot-scope="scope">
            <div v-for="good in scope.row.goodList"
                 style="width:calc(100% + 20px);float:left;padding:3px;margin-left:-10px">
              <img :src="good.goodImg" width="50" style="float:left"/>
              <span style="float:left;width:calc(100% - 135px);margin-left:5px">
                {{good.title}}</br>
                {{good.subTitle}}</br>
                {{good.goodAttrDesc}}
              </span>
              <span style="float:right;width:80px">
                  ￥{{good.actGoodPrice | currency}}</br>
                X{{good.goodQuantity}}
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="用户信息">
          <template slot-scope="props">
            {{props.row.nickName}}</br>
            {{props.row.realName}}</br>
            {{props.row.phone}}
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="支付方式"></el-table-column>
        <el-table-column label="总实付">
          <template slot-scope="props">
            ￥{{props.row.actPayAmt | currency}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="props">
            <p class="refundType" v-if="props.row.status==10||props.row.status==11">{{props.row.refundType}}</p>
            <p v-if="props.row.status==10">等待平台处理</p>
            <p v-if="props.row.status==11">退款中</p>
            <p v-if="props.row.status==12">维权完成</p>
            <p v-if="props.row.status==13">已驳回</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button v-if="props.row.status==10" @click="handelApply(props.row.id)"
                       type="text" size="small" v-permissions="'CS000102'"><span>处理申请</span></el-button>
            <el-button v-if="props.row.status==11||props.row.status==12 ||props.row.status==13"
                       type="text" size="small" @click="handelApply(props.row.id)" v-permissions="'CS000202'">
              <span>详情</span></el-button>
            <el-button @click="showRemark(props.row)" type="text" size="small"><span>备注</span></el-button>

          </template>
        </el-table-column>


      </el-table>

      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>

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
  import api from '../../config/axios-config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import opInfo from '../../common/opInfo'
  import {Loading} from 'element-ui'
  import {checkZ, checkNumber, checkZz0, checkZz} from '../../common/validator'

  // 函数集合
  class method extends baseMethod {
    //取消按钮
    canelRemark = function () {
      this.dialogShowRemark = false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {common: 'controller/customerService'},
        [QUERY_FORM]: {},
        isEdit: false,
        dialogAddBrand: false,
        dialogShowRemark: false,
        editForm: {},
        headers: {
          'x-auth-token': opInfo.getOpInfo().token
        },
        activeTab: 'base',
        refundTypes: [
          {value: '0', label: '全部'},
          {value: '1', label: '仅退款'},
          {value: '2', label: '退货退款'}
        ],
        refundStatusList: [
          {value: '0', label: '全部'},
          {value: '1', label: '等待平台处理'},
          {value: '2', label: '维权驳回'},
          {value: '3', label: '维权完成'}
        ],
        queryDateTime: '',
      }
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
      let queryCondition = window.localStorage.getItem("wx_refund_query1")//从缓存中获取查询条件
      if (queryCondition) {
        window.localStorage.removeItem("wx_refund_query1")
        let queryJson=JSON.parse(queryCondition)
        // let json = JSON.parse(decodeURIComponent(queryCondition))
        // console.log("json:", queryJson)
        this.queryDateTime = [queryJson.startTime, queryJson.endTime]
        this.QUERY_FORM = queryJson
        let page = queryJson.page
        this.pageList(page?page:1)
      }else {
        this.pageList()
      }

    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'pass':
            this.dialogAddBrand = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
          case 'noPass':
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },

      //查询按钮
      seach() {
        let dateTime = this.queryDateTime + ''
        if (dateTime != 'null') {
          let dateTimes = dateTime.split(',')
          this.QUERY_FORM.startTime = util.formatDate(dateTimes[0], 'yyyy-MM-dd HH:mm:ss')
          this.QUERY_FORM.endTime = util.formatDate(dateTimes[1], 'yyyy-MM-dd HH:mm:ss')
        } else {
          this.QUERY_FORM.startTime = null
          this.QUERY_FORM.endTime = null
        }
        this.pageList(1)
      },
      handelApply(data) {
        let dd = this.QUERY_FORM
        dd.page = this.RESULT_DATA.currentPage
        window.localStorage.setItem("wx_refund_query1", JSON.stringify(dd))
        this.$router.push({path: '/customerService/detail', query: {id: data}})
      },
      // 查看备注
      showRemark(data) {
        this.DIALOG_FORM.remark = data.remark
        this.dialogShowRemark = true
      },
      queryRest() {
        this.queryDateTime = ''
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ""
        });

      },

    },

  }


</script>

<style lang="less">
  .bg-purple {
    background: #d3dce6;
  }

  .status {
    color: #097fe3
  }

  .refundType {
    color: #13b62e
  }
</style>
