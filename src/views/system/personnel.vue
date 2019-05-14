<template>
  <section style="padding:10px 20px">
      <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
        <el-row :gutter="10" class="toolbar" type="flex">
            <el-col :span="24">
                <!--功能按钮区-->
                <el-row>
                <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
                <el-col :span="8" align="right" class="titleText" style="margin-bottom:-5px">
                    <el-button @click="addPersonnel" v-permissions="'WF020301'" style="margin-top:-20px">新增员工</el-button>
                </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!--条件查询区 -->
        <el-form :model="QUERY_FORM" class="demo-form-inline" size="small"  >
          <el-row>
            <el-col :span="24">
              <el-form-item label="登录名:" style="float:left;width:230px">
                <el-input  v-model="QUERY_FORM.loginName" style="width:160px" placeholder="请输入登录名"></el-input>
              </el-form-item>
              <el-form-item label="姓名:" style="float:left;width:230px">
                <el-input  v-model="QUERY_FORM.realName" style="width:160px"  placeholder="请输入员工姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" style="float:left;width:230px">
              <el-input  v-model="QUERY_FORM.mobile" style="width:160px"  placeholder="请输入员工手机号"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="seach">查询</el-button>
                <el-button type="info" size="small" @click="queryRest">重置</el-button>
            </el-col>
           
          </el-row>
        </el-form>
        <!--列表-->
        <el-table style="margin-top:-15px;margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
            <el-table-column prop="loginName" label="登录名" min-width="120"></el-table-column>
            <el-table-column prop="realName" label="真实姓名" min-width="120"></el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="210"></el-table-column>
            <el-table-column label="操作"  width="280">
                <template slot-scope="scope">
                    <el-button
                        @click="editUser(scope.row)"
                        type="text"
                        v-permissions="'WF020303'"
                        size="small">
                        <span>编辑</span>
                    </el-button>

                    <el-button
                        size="small"
                        @click="del({'id':scope.row.id,baseUrl:'user','methods': 'delete','objName':'此员工',page:RESULT_DATA})"
                        v-permissions="'WF020304'"
                        type="text">
                        <span>删除</span>
                    </el-button>

                    <el-button
                        size="small"
                        @click="resetPw(scope.row.id)"
                        v-permissions="'WF020305'"
                        type="text">
                        <span>重置密码</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <Pagination :pageData="RESULT_DATA"  @change="pageListUser" :param='url'></Pagination>

        <!--新增员工-->
        <el-dialog :title="isEdit?'编辑员工':'新增员工'" :visible.sync="dialogAddPersonnel" :close-on-click-modal='false'>
            <el-tabs v-model="activeTab"  @tab-click="tabHandleClick">
                <el-tab-pane label="基本信息" name="base">
                    <el-form-item label="登录名:" prop="loginName" >
                        <el-input  v-model="DIALOG_FORM.loginName" placeholder="请输入登录名" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名:" prop="realName">
                        <el-input  v-model="DIALOG_FORM.realName" placeholder="请输入姓名" :maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="mobile">
                        <el-input  v-model="DIALOG_FORM.mobile" placeholder="请输入手机号" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input  v-model="DIALOG_FORM.email" placeholder="请输入邮箱地址" :maxlength="50"></el-input>
                    </el-form-item>

                </el-tab-pane>
                <el-tab-pane label="角色权限" name="role">
                    <el-table class='roleSelect' :data="roleList" ref="roleTable" :border="true" v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                        <el-table-column width="55">
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.id" v-model="selectRole" :disabled="selectRoleDis" @change.native="getSelectRoleRow(scope.row.id)"></el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
                        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                    </el-table>
                    <br>
                </el-tab-pane>
            </el-tabs>
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                <el-button  @click="canel">取消</el-button>
                <el-button type="primary" @click="savePersonnel">保存</el-button>
                </el-col>
            </el-row>
        </el-dialog>


    </el-form>
  </section>
</template>

<script>
  import { LIST_LOAD_TIME } from '../../config/config'
  import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import axios from 'axios'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import validator from '../../common/validator'
  import opInfo from '../../common/opInfo'
  // 函数集合
  class method extends baseMethod{
      // tab切换事件
    tabHandleClick = function(tab, event) {
      let tabName = tab.name
      switch (tabName){
        case 'role':
          this.activeTab= 'role'
          break
        case 'base':
          this.activeTab= 'base'
          break
      }
    }
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.dialogAddPersonnel=false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'user/op',addUser: 'user/op/add',editUser: 'user/op/edit'},
        [QUERY_FORM]: {},
        isEdit:false,
        url:'user',
        dialogAddPersonnel: false,
        editForm: {
            loginName:[{ required: true, message: '请输入登录名', trigger: 'blur' },
                     { min: 1, max: 20, message: '请输入1-20个字符', trigger: 'blur' }],
            realName:[{ required: true, message: '请输入姓名', trigger: 'blur' },
                     { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'blur' }],
            mobile:[{ required: true, message: '请输入手机号', trigger: 'blur' },
                     { validator:validator.mobile, message: '请输入正确的手机号', trigger: 'blur' }],
            email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { validator:this.checkEmail, message: '请输入正确的邮箱地址', trigger: 'blur' }],
        },
        activeTab:'base',
        roleList:[],
        selectRole:'',
        selectRoleDis:false,
        storeName:'',
        type:1
      };
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.pageList(1,{baseUrl:'user'})
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'saveUser':
                this.dialogAddPersonnel=false
                this.pageList(this.RESULT_DATA.currentPage,{baseUrl:'user'})
                break
        }
      },
      //分页list
      pageListUser(page){
          // 这里分页调用的是API_USER接口服务，所以用{baseUrl:'user'}
        this.pageList(page,{baseUrl:'user'})
      },
      //检索
      seach(){
          this.pageList(1,{baseUrl:'user'})
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
      },
      //新增员工
      addPersonnel(){
          this.isEdit=false
          this.resetForm('DIALOG_FORM')
          this.roleList=[]
          this.tabHandleClick({ name: 'base' }, null)
          this.DIALOG_FORM={
              storeId:0,
              isInauguration:1
          }
          this.storeName=''
          this.selectRole=''
          this.roleMenuList('0')
          this.dialogAddPersonnel=true
      },
      //编辑员工
      editUser(data){
          this.isEdit=true
          this.resetForm('DIALOG_FORM')
          this.roleName=''
          this.roleList=[]
          this.tabHandleClick({ name: 'base' }, null)
          this.DIALOG_FORM=util.simpleClone(data)
          this.storeName=this.DIALOG_FORM.storeName
          this.selectRole=''
          this.dialogAddPersonnel=true
          this.roleMenuList(this.DIALOG_FORM.id)
      },
      //保存按钮
      savePersonnel(){
          this.$refs[DIALOG_FORM].validate((valid) => {
            if (valid) {
                let methodUrl=util.isEmpty(this.DIALOG_FORM.id)?'addUser':'editUser'
                if(!util.isEmpty(this.selectRole)){
                    this.DIALOG_FORM.roleIds=util.simpleClone(this.selectRole)
                    this.DIALOG_FORM.storeName=this.storeName
                    let arg = {
                        postParam: this[DIALOG_FORM],
                        customAct: methodUrl,
                        callback: 'saveUser',
                        baseUrl:'user',
                        reLoad: false
                    }
                    this.customPost(arg)
                }else{
                    this.$message({
                        message:'请选择角色',
                        type: 'error'
                    })
                    return
                }
            }
            })
      },

      //获得角色列表
      roleMenuList(id){
          axios.defaults.baseURL = process.env.API_USER + process.env.PATH_API
          this.$http.get('user/op/roleList/'+ id, {}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
              this.roleList=util.simpleClone(_result.resultList)
              this.selectRoleDis=false
              if(id!=='0'){
                  for(let index in this.roleList){
                    if(this.roleList[index].isSelected){
                        this.selectRole=this.roleList[index].id
                        this.selectRoleDis=true
                        break
                    }
                }
              }
          }else if (_result.resCode === '60003') {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
            opInfo.clearOpInfo()
            this.$router.push(process.env.PATH_ROUTER + '/login')
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      //角色单选变化方法
      getSelectRoleRow(id){
          this.selectRole=util.simpleClone(id)
      },
      //重置密码
      resetPw(data){
        this.$confirm('确认重置密码吗?', '提示', {

        }).then(() => {
            axios.defaults.baseURL = process.env.API_USER + process.env.PATH_API
            this.$http.post(`user/op/${data}/resetPw`, {}).then((result) => {
                let _result = result.data
                if (_result.resCode === SUCCESS_CODE) {
                    this.$message({
                    message: '重置密码操作成功',
                    type: 'success'
                    })
                    this.pageList(this.RESULT_DATA.currentPage,{baseUrl:'user'})
                }else if (_result.resCode === '60003') {
                    this.$message({
                    message: _result.resDesc,
                    type: 'error'
                    })
                    opInfo.clearOpInfo()
                    this.$router.push(process.env.PATH_ROUTER + '/login')
                } else {
                    this.$message({
                    message: _result.resDesc,
                    type: 'error'
                    })
                }
            })
        }).catch(() => {

        })
      },
      checkEmail: (rule, value, callback) =>{
        if(!util.isEmpty(value)){
            let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱格式的验证
            if (!myreg.test(value)) {
                callback(new Error(rule.message))
            } else {
                callback()
            }
        }else{
            callback(new Error('请输入正确的邮箱地址'))
        }
      },
      checkBand(rule, value, callback){
          if(this.DIALOG_FORM.type==1){
            if(util.isEmpty(value)){
                callback(new Error(rule.message))
            }else{
                callback()
            }
          }else{
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

