<template>
  <section style="padding:10px 20px">
    <el-row :gutter="10" class="toolbar" type="flex">
      <el-col :span="24">
        <!--功能按钮区-->
        <el-row>
          <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-form class='form-item-block' :inline="true"  :model="DIALOG_FORM"  ref='DIALOG_FORM' :rules="editForm" :label-width="FORM_LABEL_WIDTH" >
      <div style="line-height:30px;margin-bottom: 5px;font-weight:bold;margin-top:45px">分佣配置: </div>

      <el-form-item label="可分配利润:" prop="rebateBaseRate" >
        <el-input v-model="DIALOG_FORM.rebateBaseRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="个人可分配利润:" prop="rebateTwoPersion" >
        <el-input v-model="DIALOG_FORM.rebateTwoPersion" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="团队可分配利润:" prop="rebateTwoTeam" >
        <el-input v-model="DIALOG_FORM.rebateTwoTeam" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-row style="margin-top:-20px;padding-left:202px;color:#666">
        <div style='line-height:15px;margin: 10px 0px;font-size: smaller '>个人可分配利润 + 团队可分配利润 不能超过100%</div>
      </el-row>

      <div style="line-height:30px;margin-bottom: 10px;font-weight:bold">分享优惠配置: </div>

      <el-form-item label="可分配利润:" prop="shareBaseRate" >
        <el-input v-model="DIALOG_FORM.shareBaseRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="第一次分享:" prop="shareOneRate" >
        <el-input v-model="DIALOG_FORM.shareOneRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="第二次分享:" prop="shareTwoRate" >
        <el-input v-model="DIALOG_FORM.shareTwoRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="第三次分享:" prop="shareThreeRate" >
        <el-input v-model="DIALOG_FORM.shareThreeRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-row style="margin-top:-20px;padding-left:202px;color:#666">
        <div style='line-height:15px;margin: 10px 0px;font-size: smaller '>第一次分享 + 第二次分享+第三次分享 不能超过100%</div>
      </el-row>
      <div style="line-height:30px;margin-bottom: 5px;font-weight:bold;margin-top:45px;">分享优惠活动开关:&nbsp;<el-switch
        v-model="levelSwitch"
        active-color="#13ce66"
        active-value="1"
        inactive-value="1" style="padding-left:58px;">
      </el-switch>
      </div>


      <el-row justify="center" class="btn-profit" style="margin-top:40px">
        <el-col :span="24" style="text-align:center">
          <el-button type="primary" @click="saveData">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
  import { LIST_LOAD_TIME } from '../../config/config'
  import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK,FORM_LABEL_WIDTH } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import axios from 'axios'
  import validator from '../../common/validator'

  // 函数集合
  class method extends baseMethod{
    resetForm=function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { queryUrl: 'controller/userprofit/profit',saveUrl:'controller/userprofit/profitSet'},
        [QUERY_FORM]: {},
        [DIALOG_FORM]:{},
        [FORM_LABEL_WIDTH]: '200px',
        editForm: {
          rebateBaseRate:[{ required: true, message: '请输入 分配利润', trigger: 'blur' },
            { validator: this.checkOneToHundred, message: '请输入1-100的整数', trigger: 'blur' }],
          rebateTwoPersion:[{ required: true, message: '请输入 个人可分配利润', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          rebateTwoTeam:[{ required: true, message: '请输入 团队可分配利润', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          shareBaseRate:[{ required: true, message: '请输入 可分配利润', trigger: 'blur' },
            { validator: this.checkOneToHundred, message: '请输入1-100的整数', trigger: 'blur' }],
          shareOneRate:[{ required: true, message: '请输入 第一次分享利润', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          shareTwoRate:[{ required: true, message: '请输入 第二次分享利润', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          shareThreeRate:[{ required: true, message: '请输入 第三次分享利润', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],

        },
        levelSwitch:'2',
      };
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.DIALOG_FORM={}
      this.queryData()
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
          case 'saveBack':
            this.DIALOG_FORM={}
            this.queryData()
            break
        }
      },
      queryData:function () {//查询数据
        let json={}
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        this.$http.get(this[URL_PARAM].queryUrl, {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.DIALOG_FORM=_result.model
            // console.info("this.DIALOG_FORM:",this.DIALOG_FORM)

          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      checkOneToHundred: (rule, value, callback) => {//1-100
        if (!/^100$|^([1-9]|[1-9]\d)$/.test(value)) {
          callback(new Error(rule.message))
        } else {
          callback()
        }
      },
      saveData(){

        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
          this[DIALOG_FORM].levelSwitch=this.levelSwitch
            let a=parseInt(this[DIALOG_FORM].rebateTwoPersion) +parseInt(this[DIALOG_FORM].rebateTwoTeam)
            if(a>100){
              this.$message({
                message: "个人可分配利润 + 团队可分配利润 不能超过100%",
                type: 'error'
              })
              return
            }
            let b=parseInt(this[DIALOG_FORM].shareOneRate) +parseInt(this[DIALOG_FORM].shareTwoRate)+parseInt(this[DIALOG_FORM].shareThreeRate)
            if(b>100){
              this.$message({
                message: "第一次分享 + 第二次分享+第三次分享 不能超过100%",
                type: 'error'
              })
              return
            }

            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'saveUrl',
              callback: 'saveBack',
              baseUrl:'userprofit',
              reLoad: false
            }
            this.customPost(arg)
          }
        })

      },

    }
  }
</script>
<style lang="less">
  .el-select .el-input {
    width: 130px;
  }
  .title-set{
    font-weight:bold;
  }

  .btn-profit{
    margin-top: 20px;
  }

</style>

