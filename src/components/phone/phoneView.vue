<template>
    <div class="phone-panel">
        <div class="phone-view">
            <div class="phone-body" >
                <slot></slot>
            </div>
            <div class="phone-footer">
                <slot name="footer"></slot>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'phone-view',
  props: ['width', 'height'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang='less'>
.phone-panel {
    position: relative;
    background: #111;
    border-radius: 30px;
    box-shadow: 0px 0px 0px 2px #aaa;
    width: 260px;
    height: 480px;
    margin: 10px auto;
    padding: 30px 20px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    .phone-view {
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
        display:-moz-box;
	    display:-webkit-box;
	    display:box;
	    -moz-box-orient:vertical;
	    -webkit-box-orient:vertical;
	    box-orient:vertical;
        .phone-body {
            position: relative;
            width: 100%;
            -moz-box-flex:1;
	        -webkit-box-flex:1;
	        box-flex:1;
        }
        .phone-footer {
            position: relative;
            width: 100%;
        }
    }
}
</style>
