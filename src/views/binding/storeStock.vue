<template>
  <section>
    <el-row :gutter="10" class="toolbar" type="flex">
      <el-col :span="24">
        <!--检索-->
        <el-popover ref="searchForm" width="500" trigger="click">
            <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="QUERY_FORM">
                <el-form-item label="门店名称:">
                    <el-input  v-model="QUERY_FORM.storeName" placeholder="请输入门店名称"></el-input>
                </el-form-item>
                <el-row justify="center">
                    <el-col :span="24" style="text-align:center">
                      <el-button type="primary"  @click="seach()">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
          </el-popover>
        <!--功能按钮区-->
        <el-row>
          <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
          <el-col :span="8" align="right" class="buttonBar">
            <el-button v-popover:searchForm  v-permissions="'WF120301'">检索</el-button>
          </el-col>
        </el-row>


      </el-col>
    </el-row>

    <!--列表-->
    <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="storeName" label="门店名称" min-width="200"></el-table-column>
      <el-table-column prop="allBand" label="导入总数" min-width="150"></el-table-column>
      <el-table-column prop="availableBand" label="当前可用数" min-width="180"></el-table-column>
      <el-table-column prop="mainBand" label="当前主手环数" min-width="180"></el-table-column>
      <el-table-column prop="tempBand" label="临时手环数" min-width="180"></el-table-column>
      <el-table-column prop="lostBand" label="丢失数" min-width="120"></el-table-column>
      <el-table-column prop="disBand" label="损坏数" min-width="120"></el-table-column>
      <el-table-column label="操作"  min-width="180">
          <template slot-scope="scope">

            <el-button
              type="text"
              @click="importHistory(scope.row.id)"
              v-permissions="'WF120302'"
              size="small">
                <span>导入记录</span>
            </el-button>

            <el-button
              type="text"
              @click="detailHistory(scope.row.id)"
              v-permissions="'WF120303'"
              size="small">
                <span>详情</span>
            </el-button>
           
          </template>         
        </el-table-column>
</el-table>

    <!--分页-->
    <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>
    

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
  import opInfo from '../../common/opInfo'
  // 函数集合
  class method extends baseMethod{
    
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'storeBand/storeRepertory'},
        [QUERY_FORM]: {},
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
            case '':
                
                break
        }
      },
      //查询按钮
      seach(){
        this.pageList()
      },
      // 导入记录
      importHistory(id){
        this.$router.push({path:process.env.PATH_ROUTER+'/binding/storeStock/importHistory',query:{id:id}})
      },
      // 详情记录
      detailHistory(id){
        this.$router.push({path:process.env.PATH_ROUTER+'/binding/storeStock/detailHistory',query:{id:id}})
      },
    }
  }
</script>
<style lang="less">

</style>

