<template>
  <section>
    <el-row :gutter="10" class="toolbar" type="flex">
      <el-col :span="24">
        <!--检索-->
            <el-popover ref="searchForm" width="500" trigger="click">
                <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="QUERY_FORM">
                    <el-form-item label="汇总时间:">
                        <el-date-picker
                        v-model="dateTime"
                        type="daterange"
                        :editable='false'
                        placeholder="请选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-row justify="center">
                        <el-col :span="24" style="text-align:center">
                        <el-button type="primary"  @click="search()">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-popover>
        <!--功能按钮区-->
        <el-row>
          <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
          <el-col :span="8" align="right" class="buttonBar">
            <el-button @click='back' >返回</el-button>
            <el-button v-popover:searchForm >检索</el-button>
          </el-col>
        </el-row>


      </el-col>
    </el-row>

    <!--列表-->
    <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column prop="mainBand" label="当日主手环数" min-width="150"></el-table-column>
      <el-table-column prop="tempBand" label="临时手环数" min-width="150"></el-table-column>
      <el-table-column prop="lostBand" label="丢失数" min-width="120"></el-table-column>
      <el-table-column prop="disBand" label="损坏数" min-width="120"></el-table-column>
      <el-table-column prop="statisticsDate" label="日期" min-width="150"></el-table-column>
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
        [URL_PARAM]: { common: 'storeBand/storeRepertoryDetail'},
        [QUERY_FORM]: {startTime:'',endTime:''},
        dateTime:[]
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
      //查询按钮
      search(){
        if(!util.isEmpty(this.dateTime[0])){
          this.QUERY_FORM.startTime=util.formatDate(this.dateTime[0],'yyyy-MM-dd')
          this.QUERY_FORM.endTime=util.formatDate(this.dateTime[1],'yyyy-MM-dd')
        }else {
          this.QUERY_FORM.startTime=''
          this.QUERY_FORM.endTime=''
        }
        this.pageList()
      },
      back(){
        this.$router.push(process.env.PATH_ROUTER+'/binding/storeStock')
      },
    }
  }
</script>
<style lang="less">

</style>

