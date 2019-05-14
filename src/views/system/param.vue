<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
        <el-row :gutter="10" class="toolbar" type="flex">
          <el-col :span="24">
            <!--功能按钮区-->
            <el-row>
              <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
              <el-col :span="8" align="right" class="titleText" style="margin-bottom:-5px">
                <el-button  @click="addParam" v-permissions="'WF020401'" style="margin-top:-50px">新增参数</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      <!--条件查询区 -->
      <el-form :model="QUERY_FORM" class="demo-form-inline" size="small"  >
        <el-row>
          <el-col :span="24">
            <el-form-item label="参数编号:" style="float:left;width:250px;">
              <el-input  v-model="QUERY_FORM.configCode" style="width:170px" placeholder="请输入参数编号"></el-input>
            </el-form-item>
            <el-form-item label="参数名称:" style="float:left;width:250px;">
              <el-input  v-model="QUERY_FORM.configName" style="width:170px" placeholder="请输入参数名称"></el-input>
            </el-form-item>
            <el-form-item label="参数值:" style="float:left;width:250px;">
              <el-input  v-model="QUERY_FORM.configValue" style="width:170px" placeholder="请输入参数值"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="seach">查询</el-button>
              <el-button type="info" size="small" @click="queryRest">重置</el-button>
          </el-col>
        
        </el-row>
      </el-form>
        <!--列表-->
        <el-table style="margin-top:-15px;margin-bottom:53px"  class='el-table-new' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
          <el-table-column prop="configCode" label="参数编号" min-width="180"></el-table-column>
          <el-table-column prop="configName" label="参数名称" min-width="180"></el-table-column>
          <el-table-column prop="configValue" label="参数值" min-width="150"></el-table-column>
          <el-table-column prop="configDesc" label="参数描述" min-width="200"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
              @click="editParam(scope.row)"
                type="text"
                v-permissions="'WF020403'"
                size="small">
                  <span>编辑</span>
              </el-button>

               <el-button
                @click="del({'id':scope.row.id,baseUrl:'sysConfig','methods': 'delete','objName':'此参数',page:RESULT_DATA})"
                size="small"
                v-permissions="'WF020404'"
                type="text">
                  <span>删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
    <!--新增参数-->
        <el-dialog :title="isEdit?'编辑参数':'新增参数'" :visible.sync="dialogAddParam" :close-on-click-modal='false'>
            <el-form-item label="参数编码:" prop="configCode" >
                <el-input :disabled="isEdit" v-model="DIALOG_FORM.configCode" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="参数名称:" prop="configName" >
                <el-input  v-model="DIALOG_FORM.configName" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="参数值:" prop="configValue" >
                <el-input  v-model="DIALOG_FORM.configValue" placeholder="请输入200字以内,且不能为空" :maxlength="200" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="参数描述:" prop="configDesc">
                <el-input  v-model="DIALOG_FORM.configDesc" placeholder="请输入100字以内,且不能为空" :maxlength="100" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                  <el-button  @click="canel">取消</el-button>
                  <el-button type="primary" @click="saveParam">保存</el-button>
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
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  // 函数集合
  class method extends baseMethod{
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.dialogAddParam=false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/sysConfig',saveParam:'controller/sysConfig/add',editParam: 'controller/sysConfig/edit'},
        [QUERY_FORM]: {},
        isEdit:false,
        dialogAddParam: false,
        editForm: {
          configCode:[{ required: true, message: '请输入参数编码', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          configName:[{ required: true, message: '请输入参数名称', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          configValue:[{ required: true, message: '请输入参数值', trigger: 'blur' },
                     { min: 1, max: 200, message: '请输入1-200个字符', trigger: 'blur' }],
        },
      };
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.pageList()
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'saveParam':
                this.dialogAddParam=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },
      //检索
      seach(){
          this.pageList(1,{baseUrl:'sysConfig'})
      },
       queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
      },
      //新增参数
      addParam(){
          this.isEdit=false
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM={}
          this.dialogAddParam=true
      },
      //编辑参数
      editParam(data){
          this.isEdit=true
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM=util.simpleClone(data)
          this.dialogAddParam=true
      },
      //保存参数
      saveParam () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
          let methodUrl=util.isEmpty(this.DIALOG_FORM.id)?'saveParam':'editParam'
              let arg = {
                postParam: this[DIALOG_FORM],
                customAct: methodUrl,
                callback: 'saveParam',
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
</style>
