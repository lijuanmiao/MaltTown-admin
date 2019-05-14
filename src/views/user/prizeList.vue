<template>
  <section style="padding:10px 20px">
        <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
            <el-col :span="10" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>
              </el-row>
        <el-form :model="QUERY_FORM" class="form-item-block" :inline="true" size="small"  >
          <el-row>
             <el-col :span="24">
               <el-form-item label="用户昵称"  style="float:left;width:240px;height:33px;overflow:hidden">
                <el-input  v-model="QUERY_FORM.nickName" placeholder="请输入用户昵称" style="width:160px"></el-input>
              </el-form-item>
              <el-form-item label="用户手机号码" style="float:left;width:265px;height:33px;overflow:hidden">
                <el-input  v-model="QUERY_FORM.mobile" placeholder="请输入用户手机号码" style="width:160px"></el-input>
              </el-form-item>
               <el-form-item label="活动名称" style="float:left;width:240px;height:33px;overflow:hidden">
                <el-input  v-model="QUERY_FORM.activityName" placeholder="请输入活动名称" style="width:160px"></el-input>
              </el-form-item>
              <el-form-item label="奖品名称"  style="float:left;width:240px;height:33px;overflow:hidden">
                <el-input  v-model="QUERY_FORM.prizeName" placeholder="请输入奖品名称" style="width:160px"></el-input>
              </el-form-item>
              <el-form-item label="中奖时间" prop="dateTime" style="float:left;width:426px;height:33px;overflow:hidden" >
              <el-date-picker size="small"
                              v-model="winTime"
                              type="daterange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="兑奖时间" prop="dateTime"  style="float:left;width:426px;height:33px;overflow:hidden" >
              <el-date-picker size="small"
                              v-model="exchangeTime"
                              type="daterange"
                              format="yyyy-MM-dd HH:mm"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                              :editable='true' :clearable='false'
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="兑奖状态" style="float:left;width:200px;height:33px;overflow:hidden">
                 <el-select v-model="QUERY_FORM.status" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
                     <el-button type="primary" @click="seach"  style="float:left" size="small"  v-permissions="'HY0000031'">搜索</el-button>
                <el-button type="info" @click="queryRest" style="float:left" size="small"    v-permissions="'HY0000031'">重置</el-button>
            </el-col>
          </el-row>
      
        </el-form>


      <!-- 列表-->
      <el-table style="margin-top:-10px;margin-bottom:53px"  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="nickName" label="微信昵称" min-width="200"></el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="150"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" min-width="150"></el-table-column>
        <el-table-column prop="selectDes" label="中奖等级" min-width="130"></el-table-column>
        <el-table-column prop="prizeName" label="奖品名称" min-width="150"></el-table-column>
        <el-table-column prop="prizeCount" label="奖品数量" min-width="80"></el-table-column>
        <el-table-column prop="winTimeDesc" label="中奖时间" min-width="150"></el-table-column>
        <el-table-column prop="address" label="收货地址" min-width="150"></el-table-column>
        <el-table-column prop="exchangeTimeDesc" label="兑奖时间" min-width="150"></el-table-column>
        <el-table-column prop="statusDesc" label="兑奖状态" min-width="100"></el-table-column>
        <el-table-column label="操作"  min-width="150">
          <template slot-scope="scope">
              <el-button v-if="scope.row.status==1"
                @click="delUser(scope.row)"
                type="text"
                v-permissions="'HY0000032'"
                size="mini">
                <span>确认兑换</span>
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
  import api from '../../config/axios-config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import opInfo from '../../common/opInfo'
  import { Loading } from 'element-ui'

   // 函数集合
  class method extends baseMethod{
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.dialogAddUser=false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/user/prize'},
        [QUERY_FORM]: {beginWinTime:'',endWinTime:'',beginExchangeTime:'',endExchangeTime:''},
        url:'user',
        isEdit:false,
        winTime:'',
        exchangeTime:'',
        dialogAddUser: false,
        activeTab:'permissions',
         options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '未确认'
        }, {
          value: '2',
          label: '已确认'
        }]
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
            case 'saveUser':
              this.dialogAddUser=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
            case 'delUser':
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
       //查询按钮
      seach(){
        let dateTime=this.winTime+''
        let dateTimes=dateTime.split(',')
        this.QUERY_FORM.beginWinTime=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm:ss')
        this.QUERY_FORM.endWinTime=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm:ss')
        let dateTime1=this.exchangeTime+''
        let dateTimes1=dateTime1.split(',')
        this.QUERY_FORM.beginExchangeTime=util.formatDate(dateTimes1[0],'yyyy-MM-dd HH:mm:ss')
        this.QUERY_FORM.endExchangeTime=util.formatDate(dateTimes1[1],'yyyy-MM-dd HH:mm:ss')
        this.pageList()
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
         this.winTime = ''
         this.exchangeTime = ''
         this.seach();
      },
         //新增参数
      addUser(){
          this.isEdit=false
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM={}
          this.dialogAddUser=true
      },
      //编辑参数
      editUser(data){
          this.isEdit=true
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM=util.simpleClone(data)
          this.dialogAddUser=true
      },
         //保存参数
      saveUser () {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
              let arg = {
                postParam: this[DIALOG_FORM],
                customAct: 'saveUser',
                callback: 'saveUser',
                reLoad: false
              }
              this.customPost(arg)
          }
        })
      },
      delUser(data){
          this.$confirm('是否确认兑换？', '提示', {
              confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

          }).then(() => {
              let loading = Loading.service({ fullscreen: true })
              api.post("controller/user/exPrize",{"id":data.id}).then((result)=>{
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
<style>
</style>
