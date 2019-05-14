<style scoped lang="less">
  @import "../../styles/variables.less";

  .leftNav {
    height: 100%;
  }
  .menu{
   float: left;
    overflow-y: auto;
    overflow-x: auto;
  }
  /* for Chrome */
  .menu::-webkit-scrollbar {
    display: none;
  }
  .menu-n {
    width: @nav-left;
  }
  .menu-n i{
    width: 20px;
    text-align:center
  }
  .menu-collapsed {
    width: @nav-left-collapsed;
  }

  .menu .el-menu-item-group__title {
    padding: 10px 0 10px 20px
  }

  .menu-collapsed .collapsed .el-submenu {
    position: relative;
  }

  .menu-collapsed .collapsed .submenu {
    position: fixed;
    background-color: #e4e8f1;
    top: 0px;
    left: 60px;
    z-index: 10;
    height: auto;
    display: none;
    z-index: 102;
  }
  .menu-collapsed .collapsed .submenu  .el-menu-item-group__title{
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d7dde4;
  }
  .menu-collapsed .el-submenu:hover .submenu {
    display: block;
  }

  .menu-collapsed .collapsed i {
    font-size: 20px;
  }

  .menu-collapsed .collapsed .submenu i {
    font-size: 16px;
    padding-right: 10px;
  }

  .menu .fa{
   margin-right: 10px;
  }
  
  .submenu .el-submenu .el-menu-item {
    padding: 0;
  }

  .el-submenu.is-active .el-submenu__title {
    color: #318bee;
  }
</style>
<template>
  <div class="menu" :class="collapsed ? 'menu-collapsed' : 'menu-n'" id="menuNav">
     <el-menu class="leftNav" :default-active="$route.path" router v-show="!collapsed">
      <template v-for="(item,index) in menus">
        <el-submenu :index="index+''" :key="index+''" v-if="item.children && !item.hidden" v-permissions="item.permissions">
          <template slot="title"><i :class="item.iconCls"></i>{{$t(item.name)}}</template>

          <template v-for="(child,index2) in item.children" >
            <el-submenu :index="index + '-' + index2+ ''" :key="index + '-' + index2+ ''" v-if="child.children&& !child.hidden" v-permissions="child.permissions">
              <template slot="title"><i :class="child.iconCls"></i>{{$t(child.name)}}</template>
              <el-menu-item v-for="child2 in child.children" :index="child2.path" :key="child2.path" v-if="!child2.hidden" v-permissions="child2.permissions"><i :class="child2.iconCls"></i>{{$t(child2.name)}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!child.children&& !child.hidden" :index="child.path" :key="child.path" v-permissions="child.permissions">
              <i :class="child.iconCls"></i>{{$t(child.name)}}
            </el-menu-item>
          </template>

        </el-submenu>
        <el-menu-item v-if="!item.children&& !item.hidden"  :index="item.path" :key="item.path" v-permissions="item.permissions" >
          <i :class="item.iconCls"></i>{{$t(item.name)}}
        </el-menu-item>
      </template>
    </el-menu> 

    <!--导航菜单-折叠后-->
    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed">
      <template v-for="(item,x) in menus" v-if="!item.hidden && !item.hidden && checkMenuCode(item.permissions)">
        <template v-if="!item.children && !item.hidden && checkMenuCode(item.permissions)">
          <li class="el-submenu el-menu-item-group" @click="$router.push(item.path)" :title="$t(item.name)" :class="$route.path == item.path ? 'is-active' : '' ">
            <div class="el-submenu__title">
              <i :class="item.iconCls"></i></div>
          </li>
        </template>
        <template v-if="item.children && !item.hidden && checkMenuCode(item.permissions)" v-for="child in item.children">
          <template v-if="!child.children&& !child.hidden && checkMenuCode(child.permissions)">
            <li class="el-submenu el-menu-item-group"  :class="$route.path==child.path?'is-active':''"  @click="$router.push(child.path)" :title="$t(child.name)">
              <div class="el-submenu__title">
                <i  :class="child.iconCls"></i></div>
            </li>
          </template>
          <template v-if="child.children&& !child.hidden&& checkMenuCode(child.permissions)">
            <li class="el-submenu"  :title="$t(item.name)" @mouseover="mouseover($event)" :class="(isActive($route.path,child.children))?'is-active':''">
              <div class="el-submenu__title">
                <i class="fa" :class="child.iconCls"></i></div>
              <div class="submenu" :style="submenu">
                <div class="el-menu-item-group__title" :title="$t(child.name)">
                  <i :class="child.iconCls"></i>{{$t(child.name)}}
                </div>
                <ul class="el-menu">
                  <li class="el-menu-item" :title="$t(child1.name)" v-if='!child1.hidden && checkMenuCode(child1.permissions)' v-for="child1 in child.children" :class="$route.path==child1.path?'is-active':''" @click="$router.push(child1.path)" :key="child1.path" >
                    <i  :class="child1.iconCls"></i>{{$t(child1.name)}}
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </template>
      </template>
    </ul>
  </div>

</template>
<script>
  import opInfo from '../../common/opInfo'
  export default {
    name: 'sidebar',
    props: ['collapsed'],
    data(){
      return {
        menus: [],
        submenu:""
      }
    },
    created(){
      this.initLeftMenu()
    },
    methods: {
      initLeftMenu: function () {
        this.$router.options.routes[0].children.forEach((menu) => {
          if (!menu.hidden)
            this.menus.push(menu)
          })
      },
      mouseover(obj){
        var header_h=60;
        var footer_h=40;
        var scrollTop=document.getElementById("menuNav").scrollTop;
        var offset=obj.currentTarget.offsetTop;
        if(obj.currentTarget.offsetParent!=null)
          offset+=this.getTop(obj.currentTarget.offsetParent);
        var w_h=document.getElementById("app").offsetHeight-header_h-footer_h;
        var d_h=offset-scrollTop+obj.currentTarget.children[1].offsetHeight;
        if(w_h>d_h){
          this.submenu="top:"+(offset-scrollTop)+"px;"
        }else{
          this.submenu="top:"+(offset-scrollTop-footer_h)+"px;"
        }
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera
        var isEdge = userAgent.indexOf("Edge") > -1
        var isFF=userAgent.indexOf("Firefox") > -1
        if (isFF||isIE||isEdge) {
          this.submenu+="left:"+(obj.currentTarget.scrollWidth)+"px";
        }
        
      },
      getTop(e){
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
      },
      isActive(rpath, datas){
        var isActive = false;
        for (let data of datas) {
          if (rpath == data.path) {
            isActive = true;
            break;
          }
        }
        return isActive;
      },
      checkMenuCode (val) {
        let userBasic = opInfo.getOpInfo().userBasic
        let menuCode = {}
        if (userBasic) {
          menuCode = { ...userBasic.menuCodes }
        }
        return menuCode[val]
      }
    }
  }
</script>
