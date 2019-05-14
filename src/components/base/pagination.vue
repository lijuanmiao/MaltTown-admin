<template>
  <el-col :span="24" class="page-bar" v-if="pageData.resultCount">
    <el-pagination v-if='type==""||type==null||type==undefined' :current-page="pageData.currentPage"
                   :page-sizes="$store.state.pagination.pageSizes"
                   :page-size="pageData.pageSize"
                   :layout="$store.state.pagination.layout"
                   :total="pageData.resultCount" class="pager-right"
                   @current-change="pageList" @size-change="pageSizeChange">
    </el-pagination>
    <el-pagination v-if='type==2'
      @size-change="pageSizeChange"
      @current-change="pageList"
      :current-page.sync="pageData.currentPage"
      :page-size="pageData.pageSize"
      layout="prev, pager, next, jumper"
      :total="pageData.resultCount" class="pager-right">
    </el-pagination>
  </el-col>
</template>

<script>
  import { mapActions } from 'vuex'
  import util from '../../common/util'
  export default {
    name: 'pagination',
    props: ['pageData','type'],
    methods: {
      ...mapActions(['changePageSize']),
      pageSizeChange: function (pageSize) {
        //修改store 的pageSize
        this.changePageSize(pageSize)
        this.$emit('change',1);
      },
      //分页list
      pageList(pageSize){
         this.$emit('change',pageSize);
      },
    }
  }
</script>
<style>
.page-bar{
  position: fixed;
  background: none;
  bottom: 10px;
  width: 620px;
  right: 20px;
  z-index: 1000;
}
</style>

