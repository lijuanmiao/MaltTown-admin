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
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
        <el-form-item label="登录名:" style="margin-top:40px">
            <el-input  v-model="loginName" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
            <el-input  v-model="realName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
            <el-input  v-model="mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码:" prop="oldPwd" >
            <el-input type='password'  v-model="DIALOG_FORM.oldPwd" placeholder="请输入原密码":maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="password" >
            <el-input type='password' v-model="DIALOG_FORM.password" placeholder="请输入新密码":maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirm_password">
            <el-input type='password' v-model="DIALOG_FORM.confirm_password" placeholder="请输入确认密码":maxlength="18"></el-input>
        </el-form-item>
        <el-row justify="center" style="margin-top:40px">
            <el-col :span="24" style="text-align:center">
                 <el-button type="primary" @click="updatePsw">修改密码</el-button>
            <el-button  @click="canel">取消</el-button>
           
            </el-col>
        </el-row>
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
  import opInfo from '../../common/opInfo'
  import util from '../../common/util'
  // 函数集合
  class method extends baseMethod{
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.$router.push(process.env.PATH_ROUTER+'/index')
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { updatePsw: 'my/edit/password',},
        [QUERY_FORM]: {},
        editForm: {
            oldPwd:[{ required: true, message: '请输入原密码', trigger: 'blur' }],
            password:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
            confirm_password:[{ required: true, message: '请输入确认密码', trigger: 'blur' },
                                { validator:this.checkSame, message: '密码不相同', trigger: 'blur' }],
        },
        loginName:'',
        realName:'',
        mobile:''
      };
    },
    created(){
      
    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
        this.resetForm('DIALOG_FORM')
        this.DIALOG_FORM={}
        let opUser=opInfo.getOpInfo()
        this.loginName=opUser.userBasic.loginName
        this.realName=opUser.userBasic.realName
        this.mobile=opUser.userBasic.mobile
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'updatePsw':
                this.resetForm('DIALOG_FORM')
                this.DIALOG_FORM={
                    oldPwd:'',
                    password:'',
                    confirm_password:''
                }
                break
        }
      },
      updatePsw(){
        
        this.$refs[DIALOG_FORM].validate((valid) => {
            if (valid) {
                this.$confirm('确认修改密码吗?', '提示', {

                }).then(() => {
                    let arg = {
                        postParam: this[DIALOG_FORM],
                        customAct: 'updatePsw',
                        callback: 'updatePsw',
                        baseUrl:'user',
                        reLoad: false
                    }
                    this.customPost(arg)
                }).catch(() => {

                })
            }
        })
        
      },
      // 验证2个输入值是否相同
      checkSame(rule, value, callback) {
        let val2 = this.DIALOG_FORM.password
        if (value !== val2) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
      },
    }
  }
</script>
<style lang="less">
.roles .el-tabs__content{
    max-height: 400px;
    overflow-y:auto ;
}
.roleSelect .el-radio__label{
    display: none;
}
</style>

