<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form :model="QUERY_FORM" class="demo-form-inline" size="small"  >
        <el-row>
         <el-col :span="24" >
        <el-button type="success" size="small"  v-permissions="'WH000202'" @click="addWhClassify">+添加分类</el-button>
        <el-input v-model="QUERY_FORM.classifyName" placeholder="请输入关键字" style="width:300px;margin-left:10px" size="small"></el-input>
        <el-button type="primary" style="margin-left:5px" size="small" @click="seach">搜索</el-button>
        </el-col>

        </el-row>
      </el-form>
      <!--列表-->
      <el-table :show-header="false" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="false" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="id" label="ID号"></el-table-column>
      <el-table-column prop="classifyName" label="分类名"></el-table-column>
      <el-table-column label="操作" >
          <template slot-scope="scope">
           <el-button   v-if="scope.row.isShow=='1'" type="success" @click="isShowData(2,scope.row)" size="mini" plain>显示</el-button>
           <el-button v-else-if="scope.row.isShow=='2'"  type="info" @click="isShowData(1,scope.row)"  size="mini" plain>不显示</el-button>
                  <el-button
                        @click="editWhClassify(scope.row)"
                        type="text"
                        v-permissions="'WH000202'"
                        size="small">
                        <span>编辑</span>
                      </el-button>
                <el-button
                @click="delWhClassify(scope.row)"
                  type="text"
                  v-permissions="'WH000203'"
                  size="small">
                    <span>删除</span>
                </el-button>

          </template>
      </el-table-column>
      </el-table>
      <!--分页-->
    <!--  <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>-->
      <!--显示分类编辑-->
            <el-dialog :title="'分类信息'" :visible.sync="dialogShowClassify" :close-on-click-modal='false'>
               <!-- <el-form-item label="ID号">
                  <el-input v-model="DIALOG_FORM.idNum" :maxlength="10"></el-input>
               </el-form-item>-->
               <el-form-item label="分类名称">
                      <el-input v-model="DIALOG_FORM.classifyName" :maxlength="30"></el-input>
               </el-form-item>
                <el-form-item label="是否显示">
                   <el-radio-group v-model="DIALOG_FORM.isShow" >
                     <el-radio :label="1" >是</el-radio>
                     <el-radio :label="2">否</el-radio>
                   </el-radio-group>
                 </el-form-item>
                  <el-row justify="center">
                    <el-col :span="24" style="text-align:center">
                      <el-button type="primary" @click="saveClassify">提交</el-button>
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
    import api from '../../config/axios-config'
    import baseMethod from '../../common/baseMethods'
    import baseData from '../../common/baseData'
    import common from '../common'
    import util from '../../common/util'
    import opInfo from '../../common/opInfo'
    import { Loading } from 'element-ui'
    import { checkZ,checkNumber,checkZz0,checkZz } from '../../common/validator'
    // 函数集合
    class method extends baseMethod{

    }
 export default {
     data() {
      return {
        ...baseData,

        [URL_PARAM]: { common: 'controller/whClassify',add: 'controller/whClassify/add',edit:'controller/whClassify/edit'},
        [QUERY_FORM]: {},
        isEdit: false,
        dialogShowClassify: false,
        editForm: {

        },
        headers:{
          'x-auth-token': opInfo.getOpInfo().token
        }

      };
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.fileUrl=process.env.API_ROOT + '/file/upload?fileCategoryNO=2&upType=2'
      this.pageList()
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'addClassify':
                this.dialogShowClassify=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },
      //查询按钮
      seach(){
        this.pageList()
      },

      addWhClassify(){
       this.DIALOG_FORM = {}
        this.dialogShowClassify=true
      },
     saveClassify(){
  this.$refs[DIALOG_FORM].validate((valid) => {
        if(valid){
         let arg = {
                      postParam: this[DIALOG_FORM],
                      customAct: 'add',
                      callback: 'addClassify',
                      reLoad: false
                    }
                    if (this.DIALOG_FORM.id) { //修改
                      arg.customAct = 'edit'
                    }
                    this.customPost(arg)
        }
  })
     },

isShowData(type,data){
 var editData=util.simpleClone(data)
    editData.isShow=type
     this.DIALOG_FORM = util.simpleClone(editData)
    let arg = {
                postParam: this[DIALOG_FORM],
                customAct: 'edit',
                callback: 'addClassify',
                reLoad: false
             }
    this.customPost(arg)
 },
 editWhClassify(data){
      this.DIALOG_FORM = util.simpleClone(data)
      this.dialogShowClassify=true

     },
     delWhClassify(data){
             this.$confirm('确认删除该记录吗?', '提示', {}).then(() => {
                  api.delete(`controller/whClassify/del`,{params:{"id":data.id}}).then((result) => {
                    let _result = result.data
                    if (_result.resCode === SUCCESS_CODE) {
                      this.$message({
                        message: '操作成功',
                        type: 'success'
                      })
                      this.pageList(this.RESULT_DATA.currentPage)
                    } else {
                      this.$message({
                        message: _result.resDesc,
                        type: 'error'
                      })
                    }
                  })
                })

     },

     backToListPage(){
      this.pageList()
     }
    }
 }



</script>

<style lang="less">

</style>
