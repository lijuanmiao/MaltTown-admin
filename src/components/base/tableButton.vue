<template>
  <el-table-column :label="label || $t('lang.common.opAction')" :width="width || $store.state.column.width" :fixed="fixed || $store.state.column.fixed">
    <template slot-scope="scope">
      <el-button v-for="btn in buttonList" :key="btn.permissions" type="text" v-permissions="btn.permissions" size="small" @click.stop="actFun(btn.event,scope)">{{$t(btn.text)}}</el-button>
    </template>
  </el-table-column>
</template>

<script>

  export default {
    name: 'tableButton',
    props: ['buttonList', 'scopeParent', 'label', 'width', 'fixed'],
    data () {
      return {}
    },
    created () {
    },
    methods: {
      actFun: function (fun, scope) {
        /*eslint-disable no-unused-vars,no-eval */
        let _scopeParent = this.scopeParent
        eval('_scopeParent.' + fun)
      }
    }
  }
</script>
