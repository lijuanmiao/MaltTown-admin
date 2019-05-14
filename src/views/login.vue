<style scoped>
  .card-box {
    padding: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    display:block;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
    /* position: absolute!important;
    z-index: 100000000000000000000000!important;
    left: 50%!important;
    top:120px!important; */
  }
</style>

<template>
  <el-form :model="loginForm" :rules="rulesForm" ref="loginForm" label-position="left" label-width="0px" class="card-box loginform" @keyup.enter.native="login">
    <h3 class="title">{{$t('lang.sysLoginTitle')}}</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="登录名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {TEXT_MSG } from '../store/constant'
  import common from '../views/common'
  import axios from 'axios'
  import api from '../config/axios-config'
  import opInfo from '../common/opInfo'
  import {SUCCESS_CODE} from '../config/config'
  import util from '../common/util'
  export default {
    data() {
      return {
        loginForm: {userName: '',password: ''},
        rulesForm: {
          userName: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      handleReset2() {
        this.$refs.loginForm.resetFields();
      },
      login(ev) {
        let _this=this;
        _this.$refs.loginForm.validate((valid) => {
          if (valid) {
            api.get(process.env.API_USER+'/userInfo', {
              headers: {'authorization': 'Basic '+ util.encode(this.loginForm.userName + ':'+ this.loginForm.password)}
            }).then((result) => {
                let _result = result.data
                if (_result.resCode === SUCCESS_CODE){
                  opInfo.setOpInfo(_result)
                    _this.$router.push(process.env.PATH_ROUTER+'/index')
                }else{
                  this.$message({
                      message: _result.resDesc,
                      type: 'error'
                  })
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

