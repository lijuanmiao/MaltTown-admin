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
      <div class='tab-set-title'><span>提现规则设置</span></div>
      <!--列表-->
      <el-table class='el-table-new' :data="RESULT_DATA.resultList" highlight-current-row :border="true"
                @filter-change="filterList" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="name" label="设置内容" min-width="180"></el-table-column>
        <el-table-column prop="last" label="上月提现设置" min-width="180"></el-table-column>
        <el-table-column prop="now" label="本月提现设置" min-width="150"></el-table-column>
        <el-table-column prop="next" label="下月设置参数" min-width="200"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="editParam(scope.row)"
              type="text"
              v-permissions="'WM000101'"
              size="small">
              <span>修改下月</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <div class='tab-set-title'><span>提现规则说明</span></div>
      <el-table size="small" class='el-table-new' :data="tableData" highlight-current-row :border="true"
                @filter-change="filterList" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="item" label="项目" width="280"></el-table-column>
        <el-table-column   label="内容" min-width="500">
          <template slot-scope="scope">
            <span class="pre">{{scope.row.instructions }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              @click="editInstructions()"
              type="text"
              v-permissions="'WM000102'"
              size="small">
              <span>修改</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

  
      <!--新增-->
      <el-dialog :visible.sync="dialogMonthTimes" :close-on-click-modal='false' width="650px">
        <el-form-item label="每月可提现次数:" prop="monthTimes" style="width:700px">
          <el-input style="width: 380px;float:left;margin-right:10px" v-model="DIALOG_FORM.monthTimes" placeholder="请输入正整数,且不能为空"
                    :maxlength="30"></el-input>次
    
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
           <el-button type="primary" @click="saveParam1('monthTimesM')">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="dialogMinSingle" :close-on-click-modal='false' width="650px">
        <el-form-item label="单笔最小金额:" prop="minSingle" style="width:700px">
          <el-input style="width: 380px;float:left;margin-right:10px"  v-model="DIALOG_FORM.minSingle" placeholder="请输入数字,且不能为空"
                    :maxlength="30"></el-input>元
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveParam1('minSingleM')">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="dialogMaxSingle" :close-on-click-modal='false' width="650px">
        <el-form-item label="单笔最大金额:" prop="maxSingle" style="width:700px"> 
          <el-input style="width: 380px;float:left;margin-right:10px" v-model="DIALOG_FORM.maxSingle" placeholder="请输入正整数,且不能为空"
                    :maxlength="30"></el-input>元
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
             <el-button type="primary" @click="saveParam1('maxSingleM')">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="dialogCommissionRatio" :close-on-click-modal='false' width="650px">
        <el-form-item label="提现手续费比例:" prop="commissionRatio" style="width:700px">
          <el-input style="width: 380px;float:left;margin-right:10px" v-model="DIALOG_FORM.commissionRatio" placeholder="请输入正整数,且不能为空"
                    :maxlength="30"></el-input>%
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
              <el-button type="primary" @click="saveParam1('commissionRatioM')">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>












      <el-dialog :visible.sync="dialogLowestTitle" :close-on-click-modal='false' width="650px">
        <el-form-item label="最低头衔:" prop="lowestTitle">
            <el-radio-group v-model="DIALOG_FORM.lowestTitle">
              <el-radio :label="1">普通</el-radio>
              <el-radio :label="2">麦芽</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveParam">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="dialogInstructions" :close-on-click-modal='false' width="700px">
        <el-form-item label="请输提现说明:" prop="instructions" style="width:700px">
         <el-input  style="width: 380px;float:left;"
          class="pre"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="DIALOG_FORM.instructions">
        </el-input>
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveInstructions">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>

    </el-form>
  </section>
</template>

<script>
  import {DIALOG_FORM, QUERY_FORM, URL_PARAM} from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import validator from '../../common/validator'
  // 函数集合
  class method extends baseMethod {
    resetForm = function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canel = function () {
      this.dialogAddParam = false
    }
  }

  export default {
    data () {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: 'controller/withdrawalRules',
          saveParam: 'controller/withdrawalRules/saveProxy',
          getInstructions: 'controller/withdrawalRules/getInstructions',
          updateInstructions: 'controller/withdrawalRules/updateInstructions'
        },
        [DIALOG_FORM]: {
          type: null,
          value: null,
          monthTimes: null,
          minSingle: null,
          maxSingle: null,
          commissionRatio: null,
          lowestTitle: 1,
          instructions:''
        },
        monthTimesM :{
          monthTimes: null,
        },
        minSingleM:{
          minSingle: null,
        },
        maxSingleM:{
          maxSingle: null,
        },
        commissionRatioM:{
          commissionRatio: null,
        },
        instructions:'',
        isEdit: false,
        dialogMonthTimes: false,
        dialogMinSingle: false,
        dialogMaxSingle: false,
        dialogCommissionRatio: false,
        dialogLowestTitle: false,
        dialogInstructions:false,
        monthTimesForm :{
          monthTimes:[{required: true,validator:this.checkZz,  trigger: 'blur' }],
        },
        minSingleForm:{
          minSingle: [{required: true,validator: this.checkMinSingle, trigger: 'blur'}],
        },
        maxSingleForm :{
          maxSingle: [{required: true,validator: this.checkMaxSingle, trigger: 'blur'}],
        },
        commissionRatioForm:{
          commissionRatio:[{required: true,validator:this.checkCommissionRatio,
            message: '请输入最多小数后2位的数字', trigger: 'blur' }],
        },
        editForm: {
        },
        tableData: [],
        money : /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/ ,
        number : /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/ ,
        z:/^\+?[1-9][0-9]*$/

      }
    },
    created () {

    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted () {
      this.pageList()
      this.getInstructions()

    },
    methods: {
      ...new method(),
      callBackFun () {
        switch (this.CALLBACK.callback) {
          case 'saveParam':
            this.dialogMonthTimes = false
            this.dialogMinSingle = false
            this.dialogMaxSingle = false
            this.dialogCommissionRatio = false
            this.dialogLowestTitle = false
            this.dialogInstructions = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
          case 'updateInstructions':
            this.dialogInstructions = false
            this.getInstructions()
            break
        }
      },
      //检索
      seach () {
        this.pageList(1, {baseUrl: 'sysConfig'})
      },
      queryRest () {
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ''
        })
      },
      checkZz(rule, value, callback){
        if (!this.z.test(value)) {
          callback(new Error('请输入正整数'));
        }
        callback();
      },

      //单笔最大金额
      checkMaxSingle(rule, value, callback){
        let minSingle
        this.RESULT_DATA.resultList.forEach(item => {
          if(item.type == 2){
            minSingle = item.next * 1
          }
        })
        if(this.DIALOG_FORM.maxSingle == -1){
          callback();
        }
        if (!this.money.test(this.DIALOG_FORM.maxSingle)) {
          callback(new Error('请输入提现最大金额且≥0,最多包含2位小数'));
        }
        if(minSingle && this.DIALOG_FORM.maxSingle < minSingle ){
          callback(new Error('提现最大金额只能大于提现最小金额'));
        }
        callback();
      },
      //单笔最小金额
      checkMinSingle(rule, value, callback){
        let maxSingle
        this.RESULT_DATA.resultList.forEach(item => {
          if(item.type == 3){
            maxSingle = item.next * 1
          }
        })
        if (!this.money.test(this.DIALOG_FORM.minSingle)) {
          callback(new Error('请输入提现最小金额且≥0,最多包含2位小数'));
        }
        if(maxSingle != -1 && maxSingle && this.DIALOG_FORM.minSingle > maxSingle ){
          callback(new Error('提现最小金额只能小于提现最大金额'));
        }
        callback();
      },
      checkCommissionRatio(rule, value, callback){
        if (!this.number.test(this.DIALOG_FORM.commissionRatio)) {
          callback(new Error());
        }

        callback();
      },


      //编辑参数
      editParam (data) {
        this.resetForm('DIALOG_FORM')
        this.DIALOG_FORM.type = data.type
        if (data.type == 1) {
          this.dialogMonthTimes = true
        }
        if (data.type == 2) {
          this.dialogMinSingle = true
        }
        if (data.type == 3) {
          this.dialogMaxSingle = true
        }
        if (data.type == 4) {
          this.dialogCommissionRatio = true
        }
        if (data.type == 5) {
          this.dialogLowestTitle = true
        }
      },
      //保存参数
      saveParam () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'saveParam',
              callback: 'saveParam',
              reLoad: false
            }
            this.customPost(arg)
          }
        })
      },
      saveParam1(formName){
        this.monthTimesM.monthTimes =  this[DIALOG_FORM].monthTimes
        this.minSingleM.minSingle =   this[DIALOG_FORM].minSingle
        this.maxSingleM.maxSingle =  this[DIALOG_FORM].maxSingle
        this.commissionRatioM.commissionRatio =   this[DIALOG_FORM].commissionRatio
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'saveParam',
              callback: 'saveParam',
              reLoad: false
            }
            this.customPost(arg)
          }
        })
      },
      canel () {
        this.dialogMonthTimes = false
        this.dialogMinSingle = false
        this.dialogMaxSingle = false
        this.dialogCommissionRatio = false
        this.dialogLowestTitle = false
        this.dialogInstructions = false
      },
      editInstructions(){
        this.resetForm('DIALOG_FORM')
        this[DIALOG_FORM].instructions = this.instructions
        this.dialogInstructions = true
      },
      saveInstructions(){
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'updateInstructions',
              callback: 'updateInstructions',
              reLoad: false
            }
            this.customPost(arg)
          }
        })
      },
      getInstructions(){
        this.tableData = []
        this.$http.get(this.URL_PARAM.getInstructions, {}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            let data = _result.model
            this.instructions = data.configValue
            let json={
              item:'规则说明',
              instructions:data.configValue,
            }
            this.tableData.push(json)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .pre {
    white-space: pre;
  }
  #total-box .el-table .cell{
    white-space: pre;
  }
</style>
