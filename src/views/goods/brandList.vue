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
          <el-col :span="24">
            <el-form-item label="品牌名称" style="width:300px">
                <el-input  v-model="QUERY_FORM.brandZhName" style="width:230px" placeholder="品牌中文名称"></el-input>
            </el-form-item>
             <el-button type="primary" @click="seach" size="small">搜索</el-button>
                <el-button type="info" @click="queryRest" size="small">重置</el-button>
          </el-col>
         
        </el-row>
      </el-form>
      <!--列表-->
      <el-table style="margin-top:-20px;margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="brandCode" label="品牌代码" min-width="200"></el-table-column>
      <el-table-column prop="brandZhName" label="品牌名称" min-width="200"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" min-width="200">
        <template slot-scope="items">
          <img style="width:100px;height:100px" :src=' items.row.logoUrl'/>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="品牌描述" min-width="200"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="200">
        <template slot-scope="items">
          {{ items.row.updateTime | formatDate}}
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" width="180">
          <template slot-scope="scope">
                <el-button
                @click="editBrand(scope.row)"
                  type="text"
                  v-permissions="'WF030302'"
                  size="small">
                    <span>编辑</span>
                </el-button>
                <el-button
                  @click="delBrand(scope.row)"
                  size="small"
                  v-permissions="'WF030303'"
                  type="text">
                    <span>删除</span>
                </el-button>
          </template>
      </el-table-column>  -->
      </el-table>
      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
       <el-dialog :title="isEdit?'编辑品牌':'新增品牌'" :visible.sync="dialogAddBrand" :close-on-click-modal='false'>

          <el-tabs v-model="activeTab"  @tab-click="tabHandleClick">
              <el-tab-pane label="品牌信息" name="base">
                  <el-form-item label="品牌代码:" prop="brandCode" >
                      <el-input  v-model="DIALOG_FORM.brandCode" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌中文名称:" prop="brandZhName" >
                      <el-input   v-model="DIALOG_FORM.brandZhName" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌英文名称:" prop="brandEnName" >
                      <el-input   v-model="DIALOG_FORM.brandEnName" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌等级:" prop="brandLevel" >
                      <el-input-number   v-model="DIALOG_FORM.brandLevel" :min="0" placeholder="请输入正整数,且不能为空" ></el-input-number>
                  </el-form-item>
						      <el-form-item label="是否公开:" prop="isPublic" >
                      <el-select v-model="DIALOG_FORM.isPublic" placeholder="请选择" value-key="value">
                          <el-option value="1" label="是"></el-option>
                          <el-option value="2" label="否"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="排序:" prop="orderNum" >
                      <el-input-number   v-model="DIALOG_FORM.orderNum"></el-input-number>
                  </el-form-item>
                  <el-form-item label="备注:" prop="remark" >
                      <el-input type="textarea"  v-model="DIALOG_FORM.remark" placeholder="请输入200字以内,且不能为空" :maxlength="200"></el-input>
                  </el-form-item>
                  <el-form-item label="Logo图片:" prop="logoUrl" class='required upload' >
                      <el-upload
                        class="upload-demo"
                        :limit="1"
                        :action="fileUrl"
                        :on-success="uploadLogoCallBack"
                        :on-remove="removeLogoFile"
                        :file-list="logoFileList"
                        :before-upload="beforeAvatarUpload"
                        :headers="headers"
                        list-type="picture-card">
                        <el-button :class="logoFileList.length > 0 ? 'upload-dis-btn' : ''" size="small" type="primary" v-permissions="'YY010105'" >点击上传</el-button>
                        <div slot="tip" class="el-upload__tip" style='line-height:15px'>只能上传jpg/png格式文件，文件不能超过1MB</div>
                       </el-upload>
                  </el-form-item>
                  <el-form-item label="Banner图片:" prop="banner" class='required upload' >
                      <el-upload
                        class="upload-demo"
                        :limit="1"
                        :action="fileUrl"
                        :on-success="uploadBannerCallBack"
                        :on-remove="removeBannerFile"
                        :file-list="bannerFileList"
                        :before-upload="beforeAvatarUpload"
                        :headers="headers"
                        list-type="picture-card">
                        <el-button :class="bannerFileList.length > 0 ? 'upload-dis-btn' : ''" size="small" type="primary" v-permissions="'YY010105'" >点击上传</el-button>
                        <div slot="tip" class="el-upload__tip" style='line-height:15px'>只能上传jpg/png格式文件，文件不能超过1MB</div>
                       </el-upload>
                  </el-form-item>
              </el-tab-pane>
          </el-tabs>
          <el-row justify="center">
              <el-col :span="24" style="text-align:center">
                  <el-button  @click="canel">取消</el-button>
                  <el-button type="primary" @click="saveBrand">保存</el-button>
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
          // tab切换事件
        tabHandleClick = function(tab, event) {
          let tabName = tab.name
          switch (tabName){
            case 'value':
              this.activeTab= 'value'
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
            this.dialogAddBrand=false
        }
    }
 export default {
     data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/brand',addBrand: 'controller/brand/addBrand',editBrand: 'controller/brand/editBrand',delBrand:'controller/brand/delBrand'},
        [QUERY_FORM]: {},
        isEdit: false,
        dialogAddBrand: false,
        fileUrl:'',//图片上传地址
        logoFileList: [],//logo图片列表 json
        bannerFileList: [],//banner图片列表 json
        editForm: {
          brandCode:[{ required: true, message: '请输入品牌代码', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          brandZhName:[{ required: true, message: '请输入品牌中文名称', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          isCrossBorder:[{ required: true, message: '请选择是否跨境', trigger: 'blur' }],
          country:[{ required: true, message: '请输入国家', trigger: 'blur' },
                     { min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur' }],
          brandLevel:[{ required: true, message: '请输入品牌等级', trigger: 'blur' }],
          paymentDay:[{required: true, message: '请输入账期',trigger: 'blur'}],

        },
        headers:{
          'x-auth-token': opInfo.getOpInfo().token
        },
         activeTab:'base',
         specValueList:[],
      };
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      }
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
            case 'saveBrand':
                this.dialogAddBrand=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
            case 'delBrand':
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
      //新增品牌
      addBrand(){
          this.isEdit=false
          this.activeTab="base"
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM={}
          this.logoFileList=[]
          this.bannerFileList = []
          this.dialogAddBrand=true
      },
      //编辑品牌
      editBrand(data){
          this.isEdit=true
          this.activeTab="base"
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM=util.simpleClone(data)
          this.logoFileList=[]
          this.bannerFileList = []
          this.dialogAddBrand=true
          let json={
              url:data.logoUrl
          }
          let bannerJson={
            url:data.banner
          }
          this.logoFileList.push(json)
          this.bannerFileList.push(bannerJson)
      },
      //保存品牌
      saveBrand () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
              if(this.logoFileList.length==0){
                this.$message({
                    message:'请选Logo图片',
                    type: 'error'
                })
                return
              }
              if(this.bannerFileList.length==0){
                this.$message({
                    message:'请选Banner图片',
                    type: 'error'
                })
                return
              }
              let methodUrl=util.isEmpty(this.DIALOG_FORM.id)?'addBrand':'editBrand'
              let arg = {
                confirmMsg: "是否保存",
                postParam: this[DIALOG_FORM],
                customAct: methodUrl,
                callback: 'saveBrand',
                reLoad: false
              }
              this.customPost(arg)
          }
        })
      },
      delBrand(data){
          this.$confirm(this.$t('lang.del.confirm', { msg: "此品牌" }), this.$t('lang.common.title'), {

          }).then(() => {
              let loading = Loading.service({ fullscreen: true })
              api.delete("controller/brand/delBrand",{params:{"id":data.id}}).then((result)=>{
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
      },
      //上传图片回调处理
      uploadLogoCallBack(response){
          //console.info("上传图片回调处理：",response)
          this[DIALOG_FORM]["logoUrl"] = response.data
         if(response.resCode === SUCCESS_CODE){
            let json={
               url:response.data
            }
            this.logoFileList.push(json)
         }else{
           this.$message({
              message: response.resDesc,
              type: 'error'
           })
         }
      },
      uploadBannerCallBack(response){
          //console.info("上传图片回调处理：",response)
          this[DIALOG_FORM]["banner"] = response.data
         if(response.resCode === SUCCESS_CODE){
            let json={
               url:response.data
            }
            this.bannerFileList.push(json)
         }else{
           this.$message({
              message: response.resDesc,
              type: 'error'
           })
         }
      },
      //移除图片处理
      removeLogoFile(file){
          this.logoFileList=[]
          this[DIALOG_FORM]["logoUrl"] = ""
      },
      removeBannerFile(file){
          this.bannerFileList=[]
          this[DIALOG_FORM]["banner"] = ""
      },
      //上传图片前的格式及大小判断
      beforeAvatarUpload (file) {
        let isJPG = false
        if (!(file.type === 'image/jpeg'||file.type === 'image/png')) {
            this.$message({
                message: '上传图片暂时只支持jpg/png格式',
                type: 'error'
            })
            this.$emit('closeEditUpload');
        }else if (!(Math.ceil(file.size/1024) <= 1024)) {
            this.$message({
                message: '上传图片大小不能超过1MB',
                type: 'error'
            })
            this.$emit('closeEditUpload');
        }else{
          isJPG = true
        }
        return isJPG
      },
    }
 }



</script>

<style lang="less">

</style>
