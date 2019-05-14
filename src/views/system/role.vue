<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
        <el-row :gutter="10" class="toolbar" type="flex">
          <el-col :span="24">
            <!--功能按钮区-->
            <el-row>
              <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
              <el-col :span="8" align="right" class="titleText" style="margin-bottom:-5px">
                <el-button @click="addRole" v-permissions="'WF020202'"  style="margin-top:-50px">新增角色</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!--列表-->
        <el-table  class='el-table-new' style="margin-bottom:53px" :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
          <el-table-column prop="roleName" label="角色名称" min-width="200"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" min-width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">

              <el-button
                @click="del({'id':scope.row.id,baseUrl:'user','methods': 'delete','objName':'此角色', page:RESULT_DATA})"
                size="small"
                v-permissions="'WF020203'"
                type="text">
                  <span>删除</span>
              </el-button>
              <el-button
                @click="editRole(scope.row)"
                v-permissions="'WF020201'"
                type="text"
                size="small">
                  <span>分配权限</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <Pagination :pageData="RESULT_DATA" @change="pageListUser" :param='url'></Pagination>

        <!--新增角色-->
        <el-dialog title="角色权限" :visible.sync="dialogAddRole" class='roles' :close-on-click-modal='false'>
            <el-tabs v-model="activeTab" @tab-click="tabHandleClick">
                <el-tab-pane label="角色信息" name="role">
                    <el-form-item label="角色名称:" prop="roleName" >
                        <el-input :disabled="!isAddRole" v-model="DIALOG_FORM.roleName" placeholder="请输入25字以内,且不能为空、不能重复" :maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述:" prop="roleDesc">
                        <el-input :disabled="!isAddRole" v-model="DIALOG_FORM.roleDesc" placeholder="请输入100字以内,且不能为空" :maxlength="100" type="textarea" :rows="5"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="权限信息" name="permissions">
                    <el-tree
                        :data="menuListData"
                        ref="tree"
                        show-checkbox
                        default-expand-all
                        :default-checked-keys="checkedTreeNode"
                        node-key="id"
                        >
                    </el-tree>
                    <br>
                </el-tab-pane>
            </el-tabs>
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                <el-button  @click="canel">取消</el-button>
                <el-button type="primary" @click="saveRole">保存</el-button>
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
  import axios from 'axios'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import opInfo from '../../common/opInfo'
  // 函数集合
  class method extends baseMethod{
    // tab切换事件
    tabHandleClick = function(tab, event) {
      let tabName = tab.name
      switch (tabName){
        case 'role':
          this.activeTab= 'role'
          break
        case 'permissions':
          this.activeTab= 'permissions'
          break
      }
    }
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.dialogAddRole=false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'role',addRole: 'role/add',editRole: 'role/edit'},
        [QUERY_FORM]: {},
        url:'user',
        dialogAddRole: false,
        activeTab:'permissions',
        editForm: {
          roleName:[{ required: true, message: '请输入角色名称', trigger: 'blur' },
                     { min: 1, max: 25, message: '请输入1-25个字符', trigger: 'blur' }],
        },
        //权限菜单树数据
        menuListData: [],
        checkedTreeNode:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        //新增还是编辑
        isAddRole:false
      };
    },
    created(){

    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      let arg = {
        baseUrl:'user',
      }
      this.pageList(1,arg)
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'saveRole':
                this.dialogAddRole=false
                let arg = {
                  baseUrl:'user',
                }
                this.pageList(this.RESULT_DATA.currentPage,arg)
                break
        }
      },
      //分页list
      pageListUser(page){
        this.pageList(page,{baseUrl:'user'})
      },
      //新增角色
      addRole(){
          this.isAddRole=true;
          this.resetForm('DIALOG_FORM')
          this.tabHandleClick({ name: 'role' }, null)
          this.DIALOG_FORM={}
          this.dialogAddRole=true
          this.menuList('0')
      },
      //编辑角色
      editRole(data){
          this.isAddRole=false;
          this.resetForm('DIALOG_FORM')
          this.tabHandleClick({ name: 'role' }, null)
          this.DIALOG_FORM=util.simpleClone(data)
          this.dialogAddRole=true
          this.menuList(this.DIALOG_FORM.id)
      },
      //保存角色
      saveRole(){
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            let methodUrl=util.isEmpty(this.DIALOG_FORM.id)?'addRole':'editRole'
            let seleteTreeNode=this.$refs.tree.getCheckedKeys()
            if(seleteTreeNode.length>0){
              this.DIALOG_FORM.menuIds=seleteTreeNode.join(',')
              this.DIALOG_FORM.channelCode="1"
              let arg = {
                postParam: this[DIALOG_FORM],
                customAct: methodUrl,
                callback: 'saveRole',
                baseUrl:'user',
                reLoad: false
              }
              this.customPost(arg)
            }else{
              this.$message({
                  message:'请选择权限',
                  type: 'error'
                })
                return
            }
          }
        })
      },
      //获得菜单列表
      menuList(roleId){
        axios.defaults.baseURL = process.env.API_USER + process.env.PATH_API
        this.$http.get('role/menuList/'+ roleId, {}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
              this.menuListData=[]
              this.checkedTreeNode=[]
              this.menuListData=this.getTrees(_result.resultList,'#')
          }else if (_result.resCode === '60003') {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
            opInfo.clearOpInfo()
            this.$router.push(process.env.PATH_ROUTER + '/login')
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
                if(list[i].state.selected){
                  this.checkedTreeNode.push(list[i].id)
                }
                let key = list[i].parent
                let json={
                  id:list[i].id,
                  label:list[i].text,
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
.roles .el-tabs__content{
    max-height: 350px;
    overflow-y:auto ;
}
</style>

