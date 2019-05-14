<template>
  <div>
    <header class="top-navbar" :style="{'backgroundColor': Primary}">
      <top :collapsed="collapse"></top>
    </header>
    <div class="collapse n-screen" :class="collapse?'collapse-c':''">
      <i class="fa fa-align-justify"></i>
    </div>
    <div class="sidebar">
      <sidebar :collapsed="collapse"></sidebar>
    </div>
    <div :class="collapse?'main-collapsed':'main'">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import common from './views/common'
  import opInfo from './common/opInfo'
  import util from './common/util'
  export default {
    name: 'app',
    components: {
      top: common.Top,
      sidebar: common.Sidebar,
      bottom: common.Bottom,
      theme: common.Theme
    },
    data () {
      return {
        collapse: false,
        m_screen:false,
        Primary:'#318bee',
        FontColor:'#FFFFFF'
      }
    },
    created: function () {
      let opUser = opInfo.getOpInfo()
      if (!opUser.token){
        this.$router.push(process.env.PATH_ROUTER+'/login')
      }
    },
    methods: {
      colorChange(color){
        this.Primary=color.bgColor
        this.FontColor=color.fontColor
      }
    },
    mounted() {
      // this.Primary=localStorage.getItem('themeColor')
    }
  }
</script>
<style scoped lang="less">
  @import './styles/common.css';
  @import "./styles/variables.less";
  
  .top-navbar {
    background-color: @top-background-color;
    // color: @top-font-color;
    min-width: 100%;
    z-index: 1024;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: @nav-top;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  }

  .sidebar {
    position: absolute;

    top: @nav-top;
    left: 0;
    bottom: @nav-bottom;
    // background-color: @left-background-color;
    z-index: 100;
     overflow-y:auto ;
    background-color:#eef1f6;
  }

  .main {
    position: absolute;
    left: @nav-left;
    right: 0;
    top: @nav-top;
    bottom: @nav-bottom;
    padding: 5px;
    overflow-y:auto ;
  }

  .main-collapsed {
    position: absolute;
    overflow: auto;
    left: @nav-left-collapsed;
    right: 0;
    top: @nav-top;
    bottom: @nav-bottom;
    padding: 5px;
    overflow-y:auto ;
  }

  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: @nav-bottom;
    line-height: @nav-bottom;
    background-color: @top-background-color;
    border-top: solid 1px #d7dde4;
    font-size: @content-font-size;
    color: @top-font-color;
    text-align: left;
    padding-left: 10px;
    z-index: 200;
  }

  .collapse {
    position: fixed;
    top: @nav-top / 3;
    left: @nav-left;
    cursor: pointer;
    z-index: 2000;
    // color: @top-font-color;
  }

  .collapse-c {
    left: @nav-left-collapsed;
  }

  .theme{
    position: fixed;
    z-index: 1000;
    top:150px;
    right: -75px;
    background: #ccc;
    height: 20px;
  }
  .theme:hover{
    right: 0;
    height: auto;
  }
</style>
