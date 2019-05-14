<template>
  <section style="padding:10px 20px">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="16" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
      <!--条件查询区 -->
      <el-form :model="QUERY_FORM" class="form-item-block" :inline="true" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="提现编号" style="float:left;width:280px">
              <el-input v-model="QUERY_FORM.withdrawalNum" style="width:200px" placeholder="请输提现编号"></el-input>
            </el-form-item>
             <el-form-item label="头衔" style="width:174px;float:left">
              <el-select v-model="QUERY_FORM.lowestTitle" size="small">
                <el-option v-for="item in selectOptionsTitle" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请时间" prop="dateTime" style="float:left;width:420px">
              <el-date-picker size="small"
                              v-model="winTime"
                              type="daterange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
            </el-form-item>
            <el-button size="small" type="primary" @click="seach" style="float:left">搜索</el-button>
              <el-button size="small" type="info" @click="queryRest" style="float:left">重置</el-button>
              <el-button size="small" @click="callBackTop" style="float:left">返回</el-button>
          </el-col>
  
        </el-row>
      <el-row>
        <el-col :span="6">
          <span class='infos'>会员昵称:</span>{{nickName}}
        </el-col>
      </el-row>
      <!--列表-->
      <el-table class='el-table-new margin-bt-tb' :data="RESULT_DATA.resultList" highlight-current-row :border="true"
                @filter-change="filterList" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="withdrawalApplyTimeValue" label="申请时间" min-width="200"></el-table-column>
        <el-table-column prop="withdrawalNum" label="提现编号" min-width="240"></el-table-column>
        <el-table-column prop="lowestTitleValue" label="头衔" min-width="80"></el-table-column>
        <el-table-column prop="withdrawalMoney" label="提现金额" min-width="100"></el-table-column>
        <el-table-column prop="poundage" label="手续费" min-width="100"></el-table-column>
      </el-table>

      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
    </el-form>
  </section>
</template>

<script>
  import {DIALOG_FORM, QUERY_FORM, URL_PARAM} from '../../store/constant'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import util from '../../common/util'
  // 函数集合
  class method extends baseMethod {
    resetForm = function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canel = function () {
      this.dialogRejected = false
    }
  }

  export default {
    data () {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: 'controller/withdrawalBalance'
        },
        [QUERY_FORM]: {
          nickName: '',
          mobile: '',
          withdrawalNum: '',
          lowestTitle: '',
          userId: '',
          beginTime: '',
          endTime: '',
          withdrawalStatus:''
        },
        dialogAddParam: false,
        url: 'user',
        nickName: "",
        winTime: '',
        selectOptionsTitle: [
          {value: '', label: '全部'},
          {value: '1', label: '普通'},
          {value: '2', label: '麦芽'}],
        breakWithdrawalBalance:[]
      }
    },
    created () {

    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted () {
      let urlData = this.$route.query;
      this.QUERY_FORM.userId = urlData.userId.toString()
      this.nickName = urlData.nickName
      this.breakWithdrawalBalance = urlData.breakWithdrawalBalance
      this.pageList()
    },
    methods: {
      ...new method(),
      callBackFun () {
        switch (this.CALLBACK.callback) {
          case 'saveRough':
            this.pageList(this.RESULT_DATA.currentPage)
            break
          case 'saveRejected':
            this.dialogRejected = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
      //检索
      seach () {
        let dateTime=this.winTime+''
        let dateTimes=dateTime.split(',')
        this.QUERY_FORM.beginTime=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm:ss')
        this.QUERY_FORM.endTime=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm:ss')
        this.pageList()
      },
      queryRest () {
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ''
        })
      },
      //返回
      callBackTop(){
        this.$router.push({
          path: '/withdrawal/withdrawalBalance',
          query: {
            breakWithdrawalBalance : this.breakWithdrawalBalance
          }
        })
      }
    }
  }
</script>
<style lang="less">
</style>
