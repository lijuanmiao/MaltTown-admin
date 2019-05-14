<template>
  <ul class="menus">
    <li class="menus-submenu" v-for="(data,index) in datas" :key="index">
      <div class="menus-submenu_title"
           @click="updateMenus(data.id)">{{data.title}}</div>
      <ul class="menus-submenu">
        <template v-for="child in data.children">
          <li class="menus-item" @click="updateMenus(child.id)">{{child.title}}</li>
        </template>
        <li @click="addMenus(data.id)"
            class="menus-item"><i class="fa fa-plus"></i></li>
      </ul>
    </li>
    <li class="menus-submenu-add"
        @click="addMenus('000')">
      <div class="menus-submenu_title">
        <i class="fa fa-plus"></i>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'nav-menus',
  props: ['datas'],
  data () {
    return {
      a: 'a'
    }
  },
  methods: {
    addMenus (pid) {
      this.$emit('childChange')
      console.log('创建菜单，此菜单父级id：' + pid)
    },
    updateMenus (id) {
      this.$emit('addMenus')
      console.log('修改菜单，此菜单id：' + id)
    }
  }
}
</script>
<style lang='less'>
ul,li {
  list-style-type: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.menus {
  color: #bfcbd9;
  background-color: #324157;
  display: -moz-box;
  display: -webkit-box;
  display: box;
  .menus-submenu {
    position: relative;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    text-align: center;
    .menus-submenu_title {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      .el-icon-caret-bottom {
        display: none;
      }
    }
    .menus-submenu {
      display: none;
      position: absolute;
      left: 0;
      bottom: 40px;
      width: 100%;
      border: 1px solid #d1dbe5;
      background-color: #fff;
      z-index: 100;
      min-width: 100%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
      .menus-item {
        position: relative;
        color: #48576a;
        display: block;
        padding: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .menus-item:hover {
        background: #D1DBE5
      }
    }
  }
  .is-active {
    .menus-submenu {
      display: block;
    }
  }
  .menus-submenu:hover {
    .menus-submenu {
      display: block;
    }
  }
  .menus-submenu-add {
    position: relative;
    -moz-box-flex: 0.5;
    -webkit-box-flex: 0.5;
    box-flex: 0.5;
    text-align: center;
    background: #324f57;
    .menus-submenu_title {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
    }
  }
}
</style>