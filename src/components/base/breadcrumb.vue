<style scoped>
  .breadcrumb-loc {
    float: left;
  }
</style>
<template>
  <el-breadcrumb separator="/">
    <span class="breadcrumb-loc">{{$t('lang.common.breadcrumbText')}}</span>
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
      {{ $t(item.name) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data () {
    return {
      breadcrumbText: '',
      breadcrumbs: []
    }
  },
  mounted () {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || []
  }
}
</script>
