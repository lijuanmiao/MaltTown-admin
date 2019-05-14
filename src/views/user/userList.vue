<template>
  <section style="padding:10px 20px">
      <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
              <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
            <el-col :span="10" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>
              </el-row>
        <el-form :model="QUERY_FORM" class="demo-form-inline" size="small" >
          <el-row>
            <el-col :span="24">
              <el-form-item label="会员等级" prop="positionId" style="float:left;width:200px">
                  <el-select v-model="QUERY_FORM.userLevel" placeholder="会员等级">
                    <el-option
                      v-for="item in userLevelSearchOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
        
                <el-input  v-model="QUERY_FORM.allLike" style="width:300px;float:left" size="small" placeholder="可搜索用户昵称/手机号码/"></el-input>
                <el-button type="primary" @click="seach" size="small" style="float:left;margin-left:12px">搜索</el-button>
                <el-button type="info" @click="queryRest" size="small" style="float:left">重置</el-button>
            </el-col>
           
          </el-row>
        </el-form>

      <!-- 列表-->
      <el-table style="margin-top:-20px"  class='table-table margin-bt-tb' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="id" label="ID" min-width="50"></el-table-column>
        <el-table-column prop="headImageUrl" label="微信昵称" min-width="130">
          <template slot-scope="items">
            <img style="width:50px;height:50px" :src=' items.row.headImageUrl'/>
            {{ items.row.nickName}}
          </template>
        </el-table-column>
        <el-table-column prop="userLevelDesc" label="会员等级" min-width="180"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" min-width="150"></el-table-column>
        <el-table-column prop="createTime" label="注册时间" min-width="180">
          <template slot-scope="items">
            <div v-if="items.row.createTime>0">{{ items.row.createTime | formatDate}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="lastLoginTime" label="上次登录时间" min-width="180">
          <template slot-scope="items">
            <div v-if="items.row.lastLoginTime>0"> {{ items.row.lastLoginTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作"  min-width="120">
          <template slot-scope="scope">

            <el-button
              @click="editUser(scope.row)"
              type="text"
              v-permissions="'HY000002'"
              size="small">
              <span>查看详情</span>
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
    import opInfo from '../../common/opInfo'
    import { Loading } from 'element-ui'
    import { checkZ,checkNumber,checkZz0,checkZz } from '../../common/validator'

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
        [URL_PARAM]: { common: 'controller/user'},
        [QUERY_FORM]: {},
        url:'user',
        isEdit:false,
        dialogAddUser: false,
        activeTab:'permissions',
        editForm: {
          userName:[{ required: true, message: '请输入用户名称', trigger: 'blur' },
                     { min: 1, max: 25, message: '请输入1-25个字符', trigger: 'blur' }],
        },
        userLevelSearchOptions: [ {
          value: 1,
          label: '普通会员'
        },{
          value: 2,
          label: '麦芽会员'
        }],
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
        this.pageList()
      },
      queryRest(){
         Object.keys(this[QUERY_FORM]).forEach(element => {
           this[QUERY_FORM][element]=""
         });
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
          this.$router.push({
            path: `${process.env.PATH_ROUTER}/user/userDetail`,
            query: {id:data.id}
          })
      }
    }
  }
</script>
<style>
</style>
