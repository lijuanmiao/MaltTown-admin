<style scoped lang="less">
  @import "../../styles/variables.less";

  .panel {
    position: relative;
    width: 100%;
    height: @nav-top;
    line-height: @nav-top;
    color:#fff
  }

  .panel-top {
    height: @nav-top;
    line-height: @nav-top;
    .title {
      font-size: 14px;
    }
  }
  .logo{
    position: absolute;
    font-size: @system-name-size;
    img{
      display: inline-block;
      width: @nav-top/2;
      vertical-align: middle;
      margin-left: 20px;
      position: relative;
      top:-5px;
    }
    .logo-left{
      margin-left: 15px;
    }
  }
  .user-info {
    float: right;
    padding-right:30px;
    color:@top-font-color;
    img {
      width: 25px;
      height: 25px;
      vertical-align: -7px;
      margin: 0 0 0 10px;
    };
    label{
      color:#fff;
      margin-left: 10px;
      vertical-align:middle
    };
    .login-out{
      font-size: 30px;
      cursor: pointer;
    }
    .my-info{
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="panel">
    <div class="logo">
      <img src="../../assets/logo.png" :class="collapsed?'logo-left':''">
      <span v-show="!collapsed">{{$t("lang.sysTitle")}}</span>
    </div>
    <div class="user-info" v-if="user">
      <label @click="goMyInfo" class='my-info' >
          <span v-text="user.realName"></span>
          <img src="../../assets/user.png">
      </label>
      <label class='login-out' @click="logout">
          <i class='fa fa-sign-out' ></i>
      </label>
    </div>
  </div>
</template>
<script>
  import {TEXT_MSG } from '../../store/constant'
  import axios from 'axios'
  import api from '../../config/axios-config'
  import {SUCCESS_CODE} from '../../config/config'
  import opInfo from '../../common/opInfo'
  // 函数集合
    export default {
      name: 'top',
      props: ['collapsed'],
      data(){
          return{
            msgFlag: true,
            user: undefined,
          }
      },
      created(){
        this.user = opInfo.getOpInfo().userBasic
      },
      methods:{
        goMyInfo() {
          this.$router.replace(process.env.PATH_ROUTER+'/system/myInfo')
        },
        // 退出
        logout(){
          let text= this.$t("lang.exit.text")
          let title=this.$t("lang.common.title")
          this.$confirm(text,title, {
            type: 'warning'
          }).then(() => {
            api.get(process.env.API_USER+'/logoff', {}).then((result) => {
                opInfo.clearOpInfo()
                this.$router.replace(process.env.PATH_ROUTER+'/login')
            }).catch(() => {

            })
          }).catch(() => {

          })
        }
      }
    }
</script>
