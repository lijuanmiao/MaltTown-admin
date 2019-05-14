<template>
  <span v-if='isShow'>
    <slot>
      {{content}}
    </slot>
  </span>
</template>
<script>
  export default {
    data(){
      return {
        content: '',
        timer:''
      }
    },
    props:{
      startTime:{
        type: String,
        default :''
      },
      isShow:{
        type: Boolean ,
        default :true
      }
    },
    mounted () {
      this.timer = setInterval(()=>{
          if(this.startTime==''||this.startTime==null){
            clearInterval(this.timer)
            this.content ='00:00:00'
          }else{
            this.countdowm(this.startTime)
          }
      },1000)
    },
    beforeDestroy() {
        clearInterval(this.timer); //关闭
    },
    methods: {
      countdowm(date){
          let startTimedata = new Date(date);
          let nowTime = new Date();
          let t = nowTime.getTime()-startTimedata.getTime();
          if(t>0){
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24)+day*24;
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = `${hour}:${min}:${sec}`;
            // if(day > 0){
            //   format = `${day}天${hour}小时${min}分${sec}秒`;
            // } 
            // if(day <= 0 && hour > 0 ){
            //   format = `${hour}小时${min}分${sec}秒`; 
            // }
            // if(day <= 0 && hour <= 0){
            //   format =`${min}分${sec}秒`;
            // }
            this.content = format;
          }
      },
    }
  }
</script>