<template>
  <section style="padding:10px 20px">
        <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM'>
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
                <el-form-item label="SPU编码" style="width:230px;float:left">
                    <el-input  v-model="QUERY_FORM.goodsNumber" style="width:160px" placeholder="请输入SPU编码"></el-input>
                </el-form-item>
                <el-form-item label="SKU条形码" style="width:250px;float:left">
                    <el-input  v-model="QUERY_FORM.barCode" style="width:160px" placeholder="请输入SKU条形码"></el-input>
                </el-form-item>
                <el-form-item label="品牌名称"  style="width:240px;float:left">
                    <el-input  v-model="QUERY_FORM.brandZhName" style="width:160px" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="供应商"  style="width:250px;float:left">
                    <el-input  v-model="QUERY_FORM.supplierName" style="width:160px" placeholder="请输入供应商"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" style="float:left;width:680px;">
                    <el-select v-model="cateOneId" medium
                      placeholder="一级分类" filterable remote @change="changeOneCate"
                      reserve-keyword :remote-method="findCateOneList" style="width:133px;float:left">
                          <el-option
                              v-for="item in cateOneList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                          </el-option>
                    </el-select>
                    <el-select v-model="cateTwoId" medium style="width:133px;float:left"
                      placeholder="二级分类" filterable remote @change="changeTwoCate"
                      reserve-keyword :remote-method="findCateTwoList">
                          <el-option
                              v-for="item in cateTwoList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                          </el-option>
                    </el-select>
                    <el-select v-model="cateThreeId" medium style="width:133px;float:left"
                      placeholder="三级分类" filterable remote
                      reserve-keyword :remote-method="findCateThreeList">
                          <el-option
                              v-for="item in cateThreeList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                          </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="seach" size="small" style="float:left;margin-left:-214px">搜索</el-button>
                    <el-button type="info" @click="queryRest" size="small" style="float:left;margin-left:-148px">重置</el-button>
                    <el-button @click="exportSku" v-permissions="'WF030500'" type="warning" size="small" style="float:left;margin-left:-82px">导出</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!--列表-->
          <div style="margin-top:-15px;margin-bottom:5px;float:left;width:100%">
              <el-button type='success' plain size="small" @click="onLine('1')">上架</el-button>
              <el-button type='warning' style="margin-left:3px" plain size="small" @click="onLine('2')">下架</el-button>
          </div>
          <el-table style="margin-bottom:53px"  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')"  @selection-change="changeFun">
          <el-table-column prop="id" type="selection" width="35"></el-table-column>
          <el-table-column prop="goodsNumber" label="SPU编码" min-width="80"></el-table-column>
          <el-table-column prop="skuName" label="SKU商品名称" min-width="120"></el-table-column>
          <el-table-column prop="barCode" label="SKU条形码" min-width="120"></el-table-column>
          <el-table-column prop="title" label="商品标题" min-width="100"></el-table-column>
          <el-table-column prop="brandZhName" label="品牌名称" min-width="80"></el-table-column>
          <el-table-column prop="supplierName" label="供应商" min-width="80"></el-table-column>
          <el-table-column prop="pcs" label="箱规" min-width="50"></el-table-column>
          <el-table-column prop="spec" label="规格" min-width="200"></el-table-column>
          <el-table-column prop="retailPrice" label="建议零售价(元)" min-width="80">
            <template scope="props">
              {{ props.row.retailPrice | currency}}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="售价(元)" min-width="80">
            <template scope="props">
              {{ props.row.price | currency}}
            </template>
          </el-table-column>
          <el-table-column prop="dummyStock" label="虚拟库存(个)" min-width="70"></el-table-column>
          <el-table-column prop="sales" label="销量(个)" min-width="70"></el-table-column>
          <el-table-column prop="dummySales" label="虚拟销量(个)" min-width="100">
            <template slot-scope="items">
              <el-input  v-model="items.row.dummySales" placeholder="请输入虚拟销量" @blur="editSales(items.row.id,items.row.dummySales)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="productDate" label="合作时间" min-width="100">
            <template slot-scope="items">
              {{ items.row.productDate | formatTime}} 至 {{ items.row.expireDate | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="65">
           <template slot-scope="items">
            {{ items.row.status == 0 ? '待上架' : (items.row.status == 1 ? '已上架' : '已下架')}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" min-width="100">
            <template slot-scope="items">
              {{ items.row.updateTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button
                @click="viewGoods(scope.row.goodsId,scope.row.id)"
                  type="text"
                  size="small">
                    <span>详情</span>
                </el-button>
                <el-button
                  v-if="scope.row.status != '1'"
                @click="editGoods(scope.row.goodsId,scope.row.id)"
                  type="text"
                  size="small">
                    <span>编辑</span>
                </el-button>
            </template>
          </el-table-column>
          </el-table>
          <!--分页-->
          <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
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
    import { Loading } from 'element-ui'
    // 函数集合
    class method extends baseMethod{
        resetForm=function (formName) {
            this.$refs[formName].resetFields()
        }
        //取消按钮
        canel=function (){
            this.dialogAddSpec=false
        }
    }
 export default {
     data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/sku',editSales: 'controller/sku/editSales',onLine:'controller/sku/onLine',downloadUrl:'export/skuExport'},
        [QUERY_FORM]: {},
        cateOneList:[],
        cateTwoList:[],
        cateThreeList:[],
        cateOneId:'',
        cateTwoId:'',
        cateThreeId:'',
        multipleSelection :[],
      };
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      },
      formatTime(time){
       return util.dateTimeFormat(time, 'yyyy-MM-dd');
      },
      currency(val){
        return util.currency(val,2)
      }
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun',
      cateOneId(newName, oldName){
        this.cateTwoId = null;
      },
      cateTwoId(newName, oldName){
        this.cateThreeId=null;
      }
    },
    mounted(){
    api.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
      this.findCateOneList("")
      this.pageList()
    },

    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'delGoods':
                 this.queryCate()
                this.pageList(this.RESULT_DATA.currentPage)
                break
            case 'editSales' :
                break
            case 'onLine' :
                 this.queryCate()
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },
      //查询按钮
      seach(){
        this.queryCate()
        this.pageList()
      },
      queryCate(){
        this[QUERY_FORM]["categoryId"] = null
        if(this.cateOneId!=null&&this.cateOneId!=''){
         this[QUERY_FORM]["categoryId"] = this.cateOneId
        }
        if(this.cateTwoId!=null&&this.cateTwoId!=''){
          this[QUERY_FORM]["categoryId"] = this.cateTwoId
        }
        if(this.cateThreeId!=null&&this.cateThreeId!=''){
          this[QUERY_FORM]["categoryId"] = this.cateThreeId
        }
      },
      findCateOneList (name){
        api.get('controller/category/findListByParams',{params:{"name" : name,"type":0,"pid":0}}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.cateOneList = util.simpleClone(_result.resultList)
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
             })
          }
        })
      },
      changeOneCate(value){
        this.cateTwoList = [];
        this.cateThreeList = [];
        if(value !=null && value !=""){
          this.findCateTwoList("");
        }
      },
      findCateTwoList (name){
        if(this.cateOneId==null||this.cateOneId==''){
            this.$message({
              message: "请选择一级分类",
              type: 'error'
             })
        }
        api.get('controller/category/findListByParams',{params:{"name" : name,"type":0,"pid": this.cateOneId}}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.cateTwoList = util.simpleClone(_result.resultList)
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
             })
          }
        })
      },
      changeTwoCate(value){
        this.cateThreeList = [];
        if(value !=null && value !=""){
          this.findCateThreeList("");
        }
        this.cateThreeId==null
      },
      findCateThreeList (name){
        if(this.cateOneId==null||this.cateOneId==''){
            this.$message({
              message: "请选择一级分类",
              type: 'error'
             })
        }
        if(this.cateTwoId==null||this.cateTwoId==''){
            this.$message({
              message: "请选择二级分类",
              type: 'error'
             })
        }
        api.get('controller/category/findListByParams',{params:{"name" : name,"type":0,"pid":this.cateTwoId}}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.cateThreeList = util.simpleClone(_result.resultList)
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
             })
          }
        })
      },
      onLine(type){
        let selection = {
          "ids" : this.multipleSelection.join(','),
          "type" : type
        }
        let arg = {
          postParam: selection,
          customAct: 'onLine',
          callback: 'onLine',
          reLoad: false
        }
        this.customPost(arg)
      },
      changeFun(val){
        this.multipleSelection = []
        val.forEach( it =>  {
          this.multipleSelection.push(it.id)
        })
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
         this.cateTwoList=[];
         this.cateThreeList=[];
         this.cateOneId=null,
         this.cateTwoId=null,
         this.cateThreeId=null,
         this.seach();
      },
      //编辑商品
      editGoods(goodsId,id){
          this.$router.push({
            path: '/goods/goodsView',
            query: {id:goodsId,skuId:id}
          })
      },
      viewGoods(goodsId,id){
          this.$router.push({
            path: '/goods/skuView',
            query: {id:goodsId,skuId:id}
          })
      },
      //鼠标失去焦点 编辑
      editSales(id,dummySales){
              let sales = {
              "id" : id ,
              "sales" : dummySales
              }
              let arg = {
                postParam: sales,
                customAct: 'editSales',
                callback: 'editSales',
                reLoad: false
              }
            this.customPost(arg)
      },
      exportSku(){
        let url=process.env.API_ROOT + process.env.PATH_API+this[URL_PARAM].downloadUrl;
        url+='?search='+encodeURIComponent(JSON.stringify(this[QUERY_FORM]));
        window.open(url);
      }
    }
 }



</script>

<style lang="less">

</style>
