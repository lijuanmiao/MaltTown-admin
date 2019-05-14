<template>
  <section>
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
            <el-col :span="8" align="right" class="buttonBar">
              <el-button @click="addCategory" v-permissions="'WF030201'">新增分类</el-button>
            </el-col>
          </el-row>
          <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="QUERY_FORM">
            <el-row>
              <el-col :span="6">
                <el-form-item label="分类编号:">
                    <el-input  v-model="QUERY_FORM.code" placeholder="请输入分类编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分类名称:" >
                  <el-input  v-model="QUERY_FORM.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分类等级:" >
                  <el-input  v-model="QUERY_FORM.level" placeholder="请输入分类等级"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary" @click="seach">搜索</el-button>
                  <el-button type="info" @click="queryRest">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="code" label="分类编号" min-width="200"></el-table-column>
      <el-table-column prop="name" label="分类名称" min-width="200"></el-table-column>
      <el-table-column prop="level" label="分类等级" min-width="200"></el-table-column>
      <el-table-column prop="isPublic" label="是否公开" min-width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" min-width="200"></el-table-column>
      <el-table-column label="操作"  width="180">
          <template slot-scope="scope">
                <el-button
                @click="editCategory(scope.row)"
                  type="text"
                  v-permissions="'WF030202'"
                  size="small">
                    <span>编辑</span>
                </el-button>
                <el-button
                  @click="delCategory({'id':scope.row.id,'objName':'此参数',page:RESULT_DATA})"
                  size="small"
                  v-permissions="'WF030203'"
                  type="text">
                    <span>删除</span>
                </el-button>
          </template>
      </el-table-column>
      </el-table>
      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>

       <el-dialog :title="isEdit?'编辑分类':'新增分类'" :visible.sync="dialogAddCategory" :close-on-click-modal='false'>
          <el-tabs v-model="activeTab"  @tab-click="tabHandleClick">
              <el-tab-pane label="分类信息" name="base">
                  <el-form-item label="分类编号:" prop="code" >
                      <el-input  v-model="DIALOG_FORM.code" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="分类名称:" prop="name" >
                      <el-input   v-model="DIALOG_FORM.name" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="分类等级:" prop="level" >
                      <el-input   v-model="DIALOG_FORM.level" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="排序:" prop="sort" >
                      <el-input-number   v-model="DIALOG_FORM.sort"></el-input-number>
                  </el-form-item>
						      <el-form-item label="是否公开:" prop="isPublic" >
                      <el-select v-model="DIALOG_FORM.isPublic" placeholder="请选择" value-key="value">
                          <el-option value="1" label="是"></el-option>
                          <el-option value="2" label="否"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="备注:" prop="remark" >
                      <el-input type="textarea"  v-model="DIALOG_FORM.remark" placeholder="请输入200字以内,且不能为空" :maxlength="200"></el-input>
                  </el-form-item>
				          <el-form-item label="父分类:" prop="pid" >
                      <el-select v-model="DIALOG_FORM.pid" @change="changeValue"
                      :disabled="isEdit"
                      placeholder="请选择（可搜索）" filterable remote
                      reserve-keyword :remote-method="findCategoryList">
	                        <el-option
                                v-for="item in categoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-tab-pane>
          </el-tabs>
          <el-row justify="center">
              <el-col :span="24" style="text-align:center">
                  <el-button  @click="canel">取消</el-button>
                  <el-button type="primary" @click="saveCategory">保存</el-button>
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
    // 函数集合
    class method extends baseMethod{
            tabHandleClick = function(tab, event) {
              let tabName = tab.name
              switch (tabName){
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
            this.dialogAddCategory=false
        }
    }
 export default {
     data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/category',addCategory: 'controller/category/addCategory',editCategory: 'controller/category/editCategory'},
        [QUERY_FORM]: {},
        isEdit: false,
        dialogAddCategory: false,
        editForm: {
          code:[{ required: true, message: '请输入分类编号', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          name:[{ required: true, message: '请输入分类名称', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          isPublic:[{ required: true, message: '请选择是否公开', trigger: 'blur' }],
          pid:[{ required: true, message: '请选择父分类', trigger: 'blur' }]
        },
         activeTab:'base',
         categoryList:[],
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
            case 'saveCategory':
                this.dialogAddCategory=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },
      //查询按钮
      seach(){
        this.pageList()
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
         this.seach();
      },
      //新增规格
      addCategory(){
          this.isEdit=false
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM={}
          this.activeTab="base"
          this.dialogAddCategory=true
          this.categoryList=[]
          this.findCategoryList("")
      },
      //编辑规格
      editCategory(data){
          this.isEdit=true
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM=util.simpleClone(data)
          this.activeTab="base"
          this.dialogAddCategory=true
          this.categoryList=[]
          this.findCategoryList("")
      },

      findCategoryList (name){
          api.get('controller/category/findListByParams',{params:{"name" : name,"type" : "1"}}).then((result) => {
              let _result = result.data
              if (_result.resCode === SUCCESS_CODE) {
                   this.categoryList=util.simpleClone(_result.resultList)
              } else {
                  this.$message({
                      message: _result.resDesc,
                      type: 'error'
                  })
              }
          })
      },
      changeValue(id){
        let cate = {};
        cate = this.categoryList.find((item)=>{return item.id === id;});
        var plevel = cate.name.split("-")[0];
        this.DIALOG_FORM.level = Number(plevel)+1;
      },
      //保存规格
      saveCategory () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
              let methodUrl=util.isEmpty(this.DIALOG_FORM.id)?'addCategory':'editCategory'
              let arg = {
                confirmMsg: "是否保存",
                postParam: this[DIALOG_FORM],
                customAct: methodUrl,
                callback: 'saveCategory',
                reLoad: false
              }
              this.customPost(arg)
          }
        })
      },
      delCategory(data){
                this.$confirm(this.$t('lang.del.confirm', { msg: "此分类" }), this.$t('lang.common.title'), {

                }).then(() => {
                    let loading = Loading.service({ fullscreen: true })
                    api.delete("controller/category/delCategory",{params:{"id":data.id}}).then((result)=>{
                      let _result = result.data
                      loading.close()
                      if (_result.resCode === SUCCESS_CODE) {
                          this.pageList(this.RESULT_DATA.currentPage)
                      }else{
                          this.$message({
                              message: _result.resDesc,
                              type: 'error'
                          })
                      }
                    })
                }).catch(() => {

                })
      }
    }
 }



</script>

<style lang="less">

</style>
