<template>
  <iframe :src="url">
  
  </iframe>
</template>

<script>
export default {
  name: 'url-load',
  props: ['url'],
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang='less'>
iframe {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>