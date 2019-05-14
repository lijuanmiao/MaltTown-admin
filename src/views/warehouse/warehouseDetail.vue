<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
<el-form class='form-item-block'  :inline="true"  :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm" style="padding:10px 20px">
         <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">

            <el-col :span="16" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col >
            <el-col :span="8" align="right" class="titleText">
              <el-button @click="goBack()" style="margin-top:-50px">返回</el-button>
            </el-col>
          </el-row>

<div class="house-div" style="margin-top:10px">
  <i>*</i>
  <u>仓库分类:</u>
        <el-form-item  prop="classifyId" class="ab100" style="width:140px">
          <el-select size="small" style="width:180px" v-model="DIALOG_FORM.classifyId" :disabled="isUserable" placeholder="请选择">
              <el-option
                v-for="item in classifyList"
                :key="item.id"
                :label="item.classifyName"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
             <el-button @click="addClassify" style="margin-top:5px;left:280px" size="small" type="success"  class="ab100"  plain v-show="!isUserable" >+ 新建仓库分类</el-button>
</div>
<div class="house-div">
    <i>*</i>
  <u>仓库名字:</u>
       <el-form-item  prop="warehouseName" class="ab100" style="width:580px;left:132px">
      <el-input v-model="DIALOG_FORM.warehouseName" style="width:400px" size="small" :disabled="isUserable" placeholder="请输入内容" :maxlength="20"></el-input>
      </el-form-item>
       <span class="wordColor-1" style="float:left;width:200px;margin-top:12px;margin-left:410px">
 （不超20个字符）
 </span>
</div>
<div class="house-div">
      <i>*</i>
  <u>供货商名字:</u>
<el-form-item  prop="addSupList"  style="float:left;width:250px;left:132px">
<el-select  size="small" v-model="DIALOG_FORM.addSupList" :disabled="isUserable" multiple  placeholder="请选择">
    <el-option v-for="item in supplierList" :label="item.supplierName" :value="item.id" ></el-option>
  </el-select>
   </el-form-item>
</div>
<div class="house-div" style="margin-top:-30px">

<u>发货地址:</u>
  <i></i>
  <el-cascader class="ab100" style="width:300px;top:4px"
    expand-trigger="hover"
    size="small"
    :options="proAndCityAndEare"
    v-model="DIALOG_FORM.deliverPro"
    prop="deliverPro"
    :disabled="isUserable"
   >
  </el-cascader>
  <el-input  v-model="DIALOG_FORM.deliverAddress" size="small" class="ab100" style="width:400px;top:4px;left:00px" placeholder="发货详细地址" :disabled="isUserable" :maxlength="100"></el-input>
</div>
<div class="house-div">
  <i></i>
<u>发货人姓名:</u>
    <el-input v-model="DIALOG_FORM.deliverName" style="width:400px;top:5px" class="ab100" size="small" placeholder="请输入内容" :maxlength="20" :disabled="isUserable"></el-input>
  </div>
  <div class="house-div">
  <i></i>
<u>联系方式:</u>
<el-input v-model="DIALOG_FORM.deliverPhone" class="ab100" style="width:400px;top:5px" size="small" placeholder="请输入内容" :maxlength="20" :disabled="isUserable"></el-input>
  </div>
<div class="house-div" style="padding-left:108px">
<el-checkbox v-model="checked" @change="changeAddress()">发货地址与退货地址相同</el-checkbox>
</div>
  <div class="house-div" style="margin-top:-10px">
  <i></i>
<u>退货地址:</u>
  <el-cascader size="small" style="width:300px;top:4px"
     expand-trigger="hover"
     :options="proAndCityAndEare"
     v-model="DIALOG_FORM.receivePro" class="ab100"
    :disabled="isUserable"
     >
   </el-cascader>
  <el-input size="small" v-model="DIALOG_FORM.receiveAddress" :disabled="isUserable"  placeholder="收货详细地址" class="ab100" style="width:400px;top:4px;left:00px" :maxlength="100"></el-input>
  </div>
    <div class="house-div">
  <i></i>
<u>收货人姓名:</u>
    <el-input v-model="DIALOG_FORM.receiveName" size="small" class="ab100" style='width:400px;top:5px' :disabled="isUserable" placeholder="请输入内容" :maxlength="20"></el-input>
    </div>
      <div class="house-div" >
  <i></i>
<u>联系方式:</u>
<el-input v-model="DIALOG_FORM.receivePhone" size="small" class="ab100" style='width:400px;top:5px'  :disabled="isUserable" placeholder="请输入内容" :maxlength="20"></el-input></div>
    <div class="house-div">
<i></i>
<u></u>
    <el-radio-group v-model="DIALOG_FORM.isShow" :disabled="isUserable">
         <el-radio :label="'1'" >默认显示</el-radio>
         <el-radio :label="'2'">隐藏</el-radio>
     </el-radio-group>
    </div>
        <div class="house-div">
<i></i>
<u></u>

       <el-button v-show="!isUserable" type="primary" @click="addWarehouse('DIALOG_FORM')">提交保存</el-button>
        </div>
    </el-form>


</template>

<style>
.house-div{
  width:100%;
  float: left;
  margin-bottom: 25px;
}
.house-div>i{
  color: red;
  margin-top: 15px;
  float: left;
  width: 12px;
}
.house-div>u{
  text-decoration: none;
  width:85px;
    margin-top: 12px;
  margin-right: 10px;
  text-align: right;
  float: left;
}
.ab100{
  position: absolute;
  z-index: 100;
}
.wordColor{
color:#409EFF
}
.wordColor-1{
color:#909399
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<script>
  import {LIST_LOAD_TIME} from '../../config/config'
  import {
     DIALOG_FORM,
    DIALOG_TITLE,
    OPEN_DIALOG_FLAG,
    QUERY_FORM,
    EMPTY_FORM,
    LOADING,
    URL_PARAM,
    RESULT_DATA,
    CALLBACKTAG,
    CALLBACK
  } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import axios from 'axios'
  import api from '../../config/axios-config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import validator from '../../common/validator'

  // 函数集合
  class method extends baseMethod {

  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/whAddress',add:'controller/whAddress/add',edit:'controller/whAddress/edit'},
        [QUERY_FORM]: {},
        [DIALOG_FORM]: {isShow:'1'},
        editForm: { //表单验证规则
        classifyId:[{ required: true, message: '请选择仓库分类', trigger: 'blur' }],
        warehouseName:[{ required: true, message: '请填写仓库名称', trigger: 'blur' }],
        addSupList:[{ required: true, message: '请选择供应商', trigger: 'blur' }],
        deliverPro:[{ required: true, message: '请选择发货省市区', trigger: 'blur' }],
        deliverAddress:[{ required: true, message: '请填写发货地址', trigger: 'blur' }],
        deliverName:[{ required: true, message: '请填写发货人姓名', trigger: 'blur' }],
        deliverPhone:[{ required: true, message: '请填写发货人联系方式', trigger: 'blur' }],
        receiveAddress:[{ required: true, message: '请选择收货省市区', trigger: 'blur' }],
        receiveName:[{ required: true, message: '请填写收货人姓名', trigger: 'blur' }],
        receivePhone:[{ required: true, message: '请填写收货人联系方式', trigger: 'blur' }]
        },
        data: {

        },
        dataList:{},
        dialogSupplier:false,
        supplierList:[],
        classifyList:[],
        proAndCityAndEare:[],
        checked:false,
        whId:'',
        isUserable:false
      }
    },
    filters: {

    },
     watch:{
          CALLBACKTAG: 'callBackFun'
        },
    created() {
    },
    mounted() {
    let whId = this.$route.query.whId
      axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
    if(whId){
      this.DIALOG_FORM={}
         api.get("controller/whAddress/getWHDetail",{params:{"whId" : whId}}).then((result)=>{
                         let _result = result.data
                            if(_result.resCode==SUCCESS_CODE){
                            this.DIALOG_FORM= _result.model
                          }
                })
    }

         api.get("controller/whAddress/getWHOtherInfo").then((result)=>{
                   let _result = result.data
                      if(_result.resCode==SUCCESS_CODE){
                     this.supplierList= util.simpleClone(_result.model.supplierList)
                     this.classifyList= util.simpleClone( _result.model.classifyList)
                     this.proAndCityAndEare=  util.simpleClone(_result.model.proAndCityAndEare)
                      }
          })

            let step = this.$route.query.step
              if(step=="1"){
              this.isUserable=true
              }
    },

    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'addWH': case "editWH":
              this.$router.push({path: '/warehouse/whAddressList'})
             break
            break
        }
      },

    addClassify(){
     this.$router.push({path: '/warehouse/whClassify'})
    },

     goBack() {  //上一步
        this.$router.push({path: '/warehouse/whAddressList'})
      },

      addWarehouse (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var result1 = this.checkDeliverAddress(this[DIALOG_FORM])
            var result2 = this.checkReceiveAddress(this[DIALOG_FORM])
            if (result1 != 0 && result1 != 4) {
              this.$message({
                message: '发货信息请填写完整！',
                type: 'error'
              })
            } else {
              if (result2 != 0 && result2 != 4) {
                this.$message({
                  message: '收货信息请填写完整！',
                  type: 'error'
                })
              } else {
                let arg = {
                  postParam: this[DIALOG_FORM],
                  customAct: 'add',
                  callback: 'addWH',
                  reLoad: false
                }
                if (this.DIALOG_FORM.id) { //修改
                  arg.customAct = 'edit'
                  arg.callback = 'editWH'
                }
                this.customPost(arg)

              }
            }
          }
        })

      },

      checkDeliverAddress(data){
            var i=0
            if(data.deliverPro!=undefined&&data.deliverPro.length >0){
              i++
            }
            if(data.deliverAddress!=undefined&&data.deliverAddress!=''){
            i++
            }
            if(data.deliverName!=undefined&&data.deliverName!=''){
                  i++
            }
             if(data.deliverPhone!=undefined&&data.deliverPhone!=''){
                        i++
             }
             return i
            },

   checkReceiveAddress(data){
            var i=0
            if(data.receivePro!=undefined&&data.receivePro.length >0){
              i++
            }
            if(data.receiveAddress!=undefined&&data.receiveAddress!=''){
            i++
            }
            if(data.receiveName!=undefined&&data.receiveName!=''){
                  i++
            }
             if(data.receivePhone!=undefined&&data.receivePhone!=''){
                        i++
             }
             return i
            },

      addSupplier(){
         this.dialogSupplier=true
      },
      changeAddress(){
      if(this.DIALOG_FORM.checked==true){
      this.DIALOG_FORM.checked= false
       this.DIALOG_FORM.receiveName=''
               this.DIALOG_FORM.receiveAddress=''
               this.DIALOG_FORM.receivePhone= ''
               this.DIALOG_FORM.receivePro=[]
      }else{
          this.DIALOG_FORM.checked= true
         this.DIALOG_FORM.receiveName=this.DIALOG_FORM.deliverName
         this.DIALOG_FORM.receiveAddress=this.DIALOG_FORM.deliverAddress
         this.DIALOG_FORM.receivePhone= this.DIALOG_FORM.deliverPhone
         this.DIALOG_FORM.receivePro=this.DIALOG_FORM.deliverPro

      }
      },
      getDisableResult(){
      return this.isUserable
      }


    }
  }
</script>

