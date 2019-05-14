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
    <div style="display:flex;width:100%;">
      <div style="width:250px;background:#f9fdfd; border:1px solid #71aaff;margin-left:-4px">
        <el-form size="small" style="width:250px;">
          <el-form-item style="width:250px;">
            <el-tree
              :data="cateListData"
              ref="tree"
              :expand-on-click-node="false"
              highlight-current
              default-expand-all
              @node-click="handleNodeClick"
              node-key="id"
            ></el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:calc(100% - 260px);margin-left:10px">
        <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM'>
          <el-form :model="QUERY_FORM" class="demo-form-inline" size="small"  >
            <el-row>
              <el-col :span="24">
                <el-form-item label="SPU编码" style="width:225px">
                    <el-input  v-model="QUERY_FORM.goodsNumber" style="width:160px" placeholder="请输入SPU编码"></el-input>
                </el-form-item>
                <el-form-item label="SPU商品名称" style="width:255px">
                    <el-input  v-model="QUERY_FORM.goodsName" style="width:160px" placeholder="请输入SPU商品名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌名称" style="width:220px">
                    <el-input  v-model="QUERY_FORM.brandZhName" style="width:160px" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="供应商" style="width:215px">
                    <el-input  v-model="QUERY_FORM.supplierName" style="width:160px" placeholder="请输入供应商"></el-input>
                </el-form-item>
                <el-button type="primary" @click="seach" size="small">搜索</el-button>
                    <el-button type="info" @click="queryRest" size="small">重置</el-button>
              </el-col>

            </el-row>
          </el-form>
          <!--列表-->
          <el-table style="margin-top:-15px;margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
            <el-table-column prop="goodsNumber" label="SPU编码" ></el-table-column>
            <el-table-column prop="goodsName" label="SPU商品名称" ></el-table-column>
            <el-table-column prop="brandZhName" label="品牌名称" ></el-table-column>
            <el-table-column prop="supplierName" label="供应商" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间" >
              <template slot-scope="items">
                {{ items.row.createTime | formatDate}}
              </template>
            </el-table-column>
            <el-table-column prop="isDraft" label="状态" >
              <template slot-scope="items">
                {{ items.row.isDraft == '1' ? '未编辑' : '已编辑'}}
              </template>
            </el-table-column>
            <el-table-column label="操作"  >
              <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.isDraft == '1'"
                  @click="editGoods(scope.row.id)"
                    type="text"
                    v-permissions="'WF030400'"
                    size="small">
                      <span>编辑</span>
                  </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
        </el-form>
      </div>
    </div>
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
        [URL_PARAM]: { common: 'controller/goods',addSpec: 'controller/goods/addGoods',editSpec: 'controller/goods/editGoods',delSpec:'controller/goods/delGoods'},
        [QUERY_FORM]: {},
        //分类菜单树数据
        cateListData: [],
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
    api.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
      this.cateList()
      this.pageList()
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'delGoods':
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },
      //查询按钮
      seach(){
        this.pageList()
      },
      handleNodeClick(data, node, vuecomponent){
       this[QUERY_FORM]["categoryId"]=""
      if(data.id!=0){
         this[QUERY_FORM]["categoryId"]=data.id
      }
      this.pageList()
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
         this.seach();
      },
      //编辑商品
      editGoods(goodsId){
          this.$router.push({
            path: `${process.env.PATH_ROUTER}/goods/goodsView`,
            query: {id:goodsId}
          })
      },
      cateList(){
          api.get('controller/category/listNoPage').then((result) => {
              let _result = result.data
              if (_result.resCode === SUCCESS_CODE) {
                   this.cateListData=[]
                   let json = {id:0,label:'全部'}
                   json.children=this.getTrees(_result.resultList,'0')
                   this.cateListData.push(json)
              } else {
                  this.$message({
                      message: _result.resDesc,
                      type: 'error'
                  })
              }
          })
      },
      //处理树结构
      getTrees(list, parentId) {
            let items = {};
            for(let i = 0; i < list.length; i++) {
                let key = list[i].pid
                let json={
                  id:list[i].id,
                  label:list[i].name,
                }
                if(items[key]) {
                    items[key].push(json);
                } else {
                    items[key] = []
                    items[key].push(json);
                }
            }
            return this.formatTree(items, parentId)
      },
      formatTree(items, parentId) {
          let result = [];
          if(!items[parentId]) {
              return result
          }
          for(let t of items[parentId]) {
              t.children = this.formatTree(items, t.id)
              result.push(t)
          }
          return result
      }
    }
 }



</script>

<style lang="less">

</style>
