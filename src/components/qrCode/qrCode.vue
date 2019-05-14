<template>
  <div>
    <qrcode-vue :size="size" 
      :value = "value" 
      :logo="logo" 
      :bgColor="bgColor" 
      :fgColor="fgColor"></qrcode-vue>
</div>
</template>
<script>
  import qrcodeVue from 'qrcode-vue'
  export default {
    name:'qrcode',
    props: ['size','bgColor','fgColor','value','logo'],
    data () {
      return {}
    },
    components: {
      qrcodeVue
    }
  }
</script>