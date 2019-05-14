<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm">
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
            <el-form-item label="用户昵称" style="float:left;width:205px">
              <el-input v-model="QUERY_FORM.nickName" placeholder="请输入用户昵称" style="width:130px"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" style="float:left;width:205px">
              <el-input v-model="QUERY_FORM.mobile" placeholder="请输入手机号码" style="width:130px"></el-input>
            </el-form-item>
            <el-form-item label="提现编号" style="float:left;width:275px">
              <el-input v-model="QUERY_FORM.withdrawalNum" placeholder="请输提现编号" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="审核状态" style="float:left;width:200px">
              <el-select v-model="QUERY_FORM.withdrawalStatus" size="small">
                <el-option v-for="item in selectOptionsStatus" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="头衔" style="float:left;width:172px">
              <el-select v-model="QUERY_FORM.lowestTitle" size="small">
                <el-option v-for="item in selectOptionsTitle" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="申请时间" prop="dateTime" style="float:left; width:420px">
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
              <el-button size="small" style="float:left;" type="primary" @click="seach">搜索</el-button>
              <el-button size="small" style="float:left;"  type="info" @click="queryRest">重置</el-button>
          </el-col>
      
        </el-row>
      </el-form>

      <!--列表-->
      <el-table size="small" style="margin-top:-10px" class='el-table-new margin-bt-tb' :data="RESULT_DATA.resultList" highlight-current-row :border="true"
                @filter-change="filterList" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="withdrawalNum" label="提现编号" min-width="240"></el-table-column>
        <el-table-column prop="nickName" label="用户昵称" min-width="180"></el-table-column>
        <el-table-column prop="mobile" label="用户手机号" min-width="150"></el-table-column>
        <el-table-column prop="lowestTitleValue" label="头衔" min-width="80"></el-table-column>
        <el-table-column prop="withdrawalMoney" label="提现金额" min-width="100"></el-table-column>
        <el-table-column prop="poundage" label="手续费" min-width="100"></el-table-column>
        <el-table-column label="审核状态" min-width="200">
          <template slot-scope="scope">
            <span>{{scope.row.withdrawalStatusValue}}</span>
            <el-tooltip v-if="scope.row.withdrawalStatus == 3" placement="bottom">
              <div slot="content">{{scope.row.remark}}</div>
              <i class="el-icon-question" style="color:#409eff"></i>
            </el-tooltip>
            <el-tooltip v-if="scope.row.withdrawalStatus == 5" placement="bottom">
              <div slot="content">{{scope.row.errCodeDes}}</div>
              <i class="el-icon-question" style="color:#409eff"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="withdrawalApplyTimeValue" label="申请时间" min-width="200"></el-table-column>
        <el-table-column prop="auditName" label="操作人" min-width="100"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.withdrawalStatus == 1"
              @click="rough(scope.row)"
              type="text"
              v-permissions="'WM000201'"
              size="small">
              <span>通过</span>
            </el-button>

            <el-button
              v-if="scope.row.withdrawalStatus == 1"
              @click="rejected(scope.row)"
              size="mini"
              v-permissions="'WM000202'"
              type="text"
              plain>
              <span>驳回</span>
            </el-button>
            <el-button
              v-if="scope.row.withdrawalStatus == 5"
              @click="retryP(scope.row)"
              size="mini"
              v-permissions="'WM000202'"
              type="text"
              plain
              >
              <span>重试</span>
            </el-button>
            <el-button
              @click="withdrawalHistory(scope.row)"
              size="mini"
              v-permissions="'WF020404'"
              type="text"
              plain>
              <span>提现历史</span>
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
      <!--驳回-->
      <el-dialog title="是否确定驳回该笔提现申请？" :visible.sync="dialogRejected" :close-on-click-modal='false'>
        <el-form-item label="驳回原因:" prop="remark">
          <el-input
            class="pre"
            type="textarea"
            :rows="4"
            placeholder="驳回原因限制50字内"
            v-model="DIALOG_FORM.remark">
          </el-input>
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveRejected">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-form>
  </section>
</template>

<script>
  import {DIALOG_FORM, QUERY_FORM, URL_PARAM} from '../../store/constant'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import util from '../../common/util'
  import {SUCCESS_CODE} from '../../config/config'

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
          common: 'controller/withdrawalBalance',
          saveRough: 'controller/withdrawalBalance/rough',
          saveRejected: 'controller/withdrawalBalance/rejected',
          saveRetry:'controller/withdrawalBalance/retry'
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
        isEdit: false,
        dialogAddParam: false,
        [DIALOG_FORM]: {id: null, remark: ''},
        dialogRejected: false,
        editForm: {
          remark: [{required: true, message: '请输入驳回原因', trigger: 'blur'},
            {min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur'}],
        },
        url: 'user',
        isEdit: false,
        winTime: '',
        exchangeTime: '',
        dialogAddUser: false,
        activeTab: 'permissions',
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '未确认'
        }, {
          value: '2',
          label: '已确认'
        }],
        selectOptionsStatus: [
          {value: '', label: '全部'},
          {value: '1', label: '申请中'},
          {value: '2', label: '已通过'},
          {value: '3', label: '未通过'},
          {value: '4', label: '已打款'}],
        selectOptionsTitle: [
          {value: '', label: '全部'},
          {value: '1', label: '普通'},
          {value: '2', label: '麦芽'}],
      }
    },
    created () {

    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted () {
      let data = this.$route.query.breakWithdrawalBalance;
      if(data){
        this.QUERY_FORM = data
        let newUrl="/withdrawal/withdrawalBalance";
        history.replaceState(0,0,newUrl);
      }
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
          case 'saveRetry':
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
      //通过
      rough (date) {
        this.DIALOG_FORM.id = date.id
        this.$confirm('是否确定通过该笔提现？', '提示', {}).then(() => {
          this.$refs[DIALOG_FORM].validate((valid) => {
            if (valid) {
              this.$http.post(`controller/withdrawalBalance/rough`, this[DIALOG_FORM]).then((result) => {
                let _result = result.data
                if (_result.resCode === SUCCESS_CODE) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                  this.pageList(this.RESULT_DATA.currentPage)
                } else if (_result.resCode === "40014") {
                  this.$message({
                    message: _result.resDesc,
                    type: 'error'
                  })
                  this.pageList(this.RESULT_DATA.currentPage)
                } else {
                  this.$message({
                    message: _result.resDesc,
                    type: 'error'
                  })
                }
              })
            }
          })
        }).catch(() => {
        })
      },
      //重试
      retryP(date){
        this.DIALOG_FORM.id = date.id
        this.$confirm('是否确定重试该笔提现？', '提示', {}).then(() => {
          this.$refs[DIALOG_FORM].validate((valid) => {
            if (valid) {
                this.$http.post(`controller/withdrawalBalance/retry`, this[DIALOG_FORM]).then((result) => {
                  let _result = result.data
                  if (_result.resCode === SUCCESS_CODE) {
                    this.$message({
                      message: '操作成功',
                      type: 'success'
                    })
                    this.pageList(this.RESULT_DATA.currentPage)
                  } else if(_result.resCode === "40014"){
                    this.$message({
                      message: _result.resDesc,
                      type: 'error'
                    })
                    this.pageList(this.RESULT_DATA.currentPage)
                  }else {
                    this.$message({
                      message: _result.resDesc,
                      type: 'error'
                    })
                  }
                })
            }
          })
        }).catch(() => {
        })
      },
      //驳回
       rejected (data) {
        this.DIALOG_FORM.id = null
        this.DIALOG_FORM.remark = ''
        this.dialogRejected = true
        this.DIALOG_FORM.id = data.id
      },
      //保存
      saveRejected () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'saveRejected',
              callback: 'saveRejected',
              reLoad: false
            }
            this.customPost(arg)
          }
        })
      },
      withdrawalHistory(data){
        this.$router.push({
          path: '/withdrawal/withdrawalHistory',
          query: {
            userId :data.userId,
            nickName:data.nickName,
            breakWithdrawalBalance : this.QUERY_FORM
          }
        })
      }
    }
  }
</script>
<style lang="less">
</style>
