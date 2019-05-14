<style scoped lang="less">
    .index{
        width: 100%;

        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h2{
            color: #666;
        }
    }
</style>
<template>

  <div class="index ">
    <h2>出错了<small>404</small></h2>
    <!-- START row-->
    <div>
      <span>
        页面走丢了
        <p>您所访问的页面不存在，请和管理员联系！</p>
      </span>
    </div>
  </div>
</template>
<script>
    export default {
      name:'e404',
      data:function () {
        return {}
      }
    }
</script>
