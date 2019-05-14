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
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"   ref='DIALOG_FORM' :rules="editForm">

      <div style="margin: 50px 0px 15px 0;">
        <span class="title-set">会员权益设置</span>
      </div>
      <el-form-item label="分佣会员等级限制开关:">
        <el-switch
          v-model="levelSwitch"
          active-color="#13ce66"
          active-value="1"
          inactive-value="2" >
        </el-switch>
      </el-form-item>
      <div style="margin: 5px 0px;">
        <span class="title-set">普通用户权益设置</span>
      </div>
      <el-form-item label="普通会员自购立减:" prop="ordinaryRate" >
        <el-input  v-model="DIALOG_FORM.ordinaryRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <div style="margin: 5px 0px;">
        <span class="title-set">麦芽会员升级设置</span>
      </div>
      <el-form-item label="普通用户升级为麦芽等级:" prop="levelConditionFirst" >
        邀请好友 &nbsp; <el-input-number v-model="DIALOG_FORM.levelConditionFirst" controls-position="right"   :min="1" :max="50"></el-input-number>
        &nbsp;人且完成&nbsp;<el-input-number v-model="DIALOG_FORM.levelConditionSecond" controls-position="right"   :min="0" :max="10"></el-input-number> &nbsp;单订单
      </el-form-item>
      <div style="margin: 5px 0px;">
        <span class="title-set">麦芽会员权益设置</span>
      </div>
      <el-form-item label="麦芽会员自购立减:" prop="maiyaRate" >
        <el-input  v-model="DIALOG_FORM.maiyaRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="个人一级分佣:" prop="oneLevelRate" >
        <el-input  v-model="DIALOG_FORM.oneLevelRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item label="个人二级分佣:" prop="twoLevelRate" >
        <el-input  v-model="DIALOG_FORM.twoLevelRate" ><template slot="append">%</template></el-input>
      </el-form-item>
      <el-row justify="center">
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
        [URL_PARAM]: { queryUrl: 'controller/userprofit/interests',saveUrl:'controller/userprofit/interestsSet'},
        [QUERY_FORM]: {},
        [DIALOG_FORM]:{},
        [FORM_LABEL_WIDTH]: '200px',
        editForm: {
          ordinaryRate:[{ required: true, message: '请输入 普通会员自购立减 比例', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          levelConditionFirst:[{ required: true, message: '请输入 需邀请好友数', trigger: 'blur' }],
          levelConditionSecond:[{ required: true, message: '请输入 需完成的订单数', trigger: 'blur' }],
          maiyaRate:[{ required: true, message: '请输入 普通会员自购立减 比例', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          oneLevelRate:[{ required: true, message: '请输入 个人一级分佣 比例', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],
          twoLevelRate:[{ required: true, message: '请输入 个人二级分佣 比例', trigger: 'blur' },
            { validator: validator.checkZeroToHundred, message: '请输入0-100的整数', trigger: 'blur' }],

        },
        levelSwitch:'1',
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
            // this.$router.push({path: process.env.PATH_ROUTER + '/yyset/interests'})
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
              this.levelSwitch=_result.model.levelSwitch+''
             // console.info("this.DIALOG_FORM:",this.DIALOG_FORM)

          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      saveData(){

        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            this[DIALOG_FORM].levelSwitch=this.levelSwitch
            let levelConditionFirst=this[DIALOG_FORM].levelConditionFirst
            if(!/^[1-9]|[1-9]\d$/.test(levelConditionFirst) || levelConditionFirst>50){
              this.$message({
                message: "普通用户升级为麦芽等级，邀请好友数为1-50的整数.",
                type: 'error'
              })
              return
            }
            let levelConditionSecond=this[DIALOG_FORM].levelConditionSecond
            if(!/^\d{1,2}$/.test(levelConditionSecond) || levelConditionSecond>10){
              this.$message({
                message: "普通用户升级为麦芽等级，完成订单数为0-10的整数.",
                type: 'error'
              })
              return
            }
            // console.log("============", this[DIALOG_FORM])
            let a=parseInt(this[DIALOG_FORM].ordinaryRate) +parseInt(this[DIALOG_FORM].oneLevelRate)+parseInt(this[DIALOG_FORM].twoLevelRate)
            if(a>100){
              this.$message({
                message: "普通会员自购立减+个人一级分佣+个人二级分佣不能大于100%.",
                type: 'error'
              })
              return
            }
            let b=parseInt(this[DIALOG_FORM].maiyaRate) +parseInt(this[DIALOG_FORM].oneLevelRate)+parseInt(this[DIALOG_FORM].twoLevelRate)
            if(b>100){
              this.$message({
                message: "麦芽会员自购立减+个人一级分佣+个人二级分佣不能大于100%.",
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
    /*font-size: large;*/
  }
</style>

