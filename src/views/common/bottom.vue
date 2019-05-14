<template>
  <div>
    {{sysTitle}} copyright 2015-2016
  </div>
</template>
<script>
  import {TEXT_MSG} from '../../store/constant'
    export default {
      name: 'bottom',
      data(){
        return{
          sysTitle: TEXT_MSG.sysTitle,
        }
      }
    }
</script>
