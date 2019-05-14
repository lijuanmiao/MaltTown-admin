<template>
  <section>
    <el-row :gutter="10" class="toolbar" type="flex">
      <el-col :span="24">
        <!--功能按钮区-->
        <el-row>
          <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
          <el-col :span="8" align="right" class="buttonBar">
            <el-button @click='back' >返回</el-button>
          </el-col>
        </el-row>


      </el-col>
    </el-row>

    <!--列表-->
    <el-table style="margin-bottom:53px"  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="bandCount" label="导入总数" min-width="200"></el-table-column>
      <el-table-column prop="opName" label="操作人" min-width="150"></el-table-column>
      <el-table-column prop="opTime" label="操作时间" min-width="200"></el-table-column>
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
        [URL_PARAM]: { common: 'storeBand/importHistory'},
        [QUERY_FORM]: {},
      };
    },
    created(){
      
    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.QUERY_FORM.id=this.$route.query.id
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
      back(){
        this.$router.push(process.env.PATH_ROUTER+'/binding/storeStock')
      },
    }
  }
</script>
<style lang="less">

</style>

