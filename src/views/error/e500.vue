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
    <h2>出错了<small>500</small></h2>
    <!-- START row-->
    <div>
      <span>
        系统出现异常
        <p>您所进行的操作出现了异常，请和管理员联系！</p>
      </span>
    </div>
  </div>
</template>
<script>
    export default {
      name:'e500',
      data:function () {
        return {}
      }
    }
</script>
