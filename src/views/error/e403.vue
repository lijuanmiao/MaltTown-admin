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
    <h2>出错了<small>403</small></h2>
    <!-- START row-->
    <div>
      <span>
        您的权限不足
        <p>您所在的用户无权使用该功能，请和管理员联系！</p>
      </span>
    </div>
  </div>
</template>
<script>
    export default {
      name:'e403',
      data:function () {
          return {}
      }
    }
</script>
