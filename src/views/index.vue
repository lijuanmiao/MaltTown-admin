<style scoped lang="less">
  .index {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .index > img {
    position: relative;
    top: 50%;
    margin-top: -103px
  }
</style>
<template>
  <div class="index">
    <img src='../assets/welcome.png'>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data: function () {
      return {visible: false}
    }
  }
</script>
