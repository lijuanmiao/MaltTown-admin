<template>
  <section>
    <el-row justify="center" style='margin-bottom:10px;'>
        <el-col :span="12" align="left">
          <el-button type="primary" @click='preWeek'>上一周</el-button>
          <el-button @click='nextWeek' :disabled="endState">下一周</el-button>
        </el-col>
        <el-col :span="12" align="right" class="buttonBar">
            <el-button v-if="isShowCopyBtn" type="primary" @click='copyPlan'>复制上周课表</el-button>
          </el-col>
    </el-row>
    <div class='plan-row'>
        <div class='plan-col-header'>周一</div>
        <div class='plan-col-header'>周二</div>
        <div class='plan-col-header'>周三</div>
        <div class='plan-col-header'>周四</div>
        <div class='plan-col-header'>周五</div>
        <div class='plan-col-header'>周六</div>
        <div class='plan-col-header'>周日</div>
        <div class="clear"></div>
    </div>
    <div class='plan-row' v-for="(week,index) in data" :key='index+"week"'>
        <div class='plan-col' :class="{'his-bg-color': day.isHistory,'now-bg-color':day.isNowDay}" v-for="(day,index) in week.day" :key='index+"day"'>
          <div class='day-date'>{{day.isNowDay ? '今天' : day.date}}</div>
          <div class='course-plans'>
            <div class='course-plan' :style='"background-color:"+course.color' v-for="(course,index) in day.courseList" :key='index+"course"'>
              <span class='course-title' @click="editCoursePlan(course.id,day.isHistory,day.isSevenDay,day.isNowDay)">{{course.courseName}}</span>
              <span class="del"><i class="el-icon-delete" @click="delCoursePlan(course.id)" v-if='!day.isHistory&&!day.isSevenDay'></i></span>
            </div>
          </div>
          <div class='add-plan' :class="{'now-bg-color':day.isNowDay,'his-bg-color': day.isHistory,'seven-bg-color': day.isSevenDay}" @click="addCoursePlan(day.yDate)" v-if='!day.isHistory&&!day.isNowDay'>
            <span class='add-btn'><i class="el-icon-plus"></i></span>
          </div>
        </div>
        <div class="clear"></div>
    </div>
  </section>
</template>

<script>

  export default {
    props: ['datas'],
    data () {
      return {
        data:[],
        startDay:'',
        endState:true,
        isShowCopyBtn:true,
        lastWeek:[],
        nowDay:'',
      }
    },
    watch:{
      datas: 'doInit',
    },
    created () {
    },
    mounted(){
      //得到这一周的周一是多少号
      this.startDay= this.getWeekDayDate(new Date(),1)
      //得到当天日期
      this.nowDay=this.GetDate(new Date(),0)
      this.doInit()
    },
    methods: {
        doInit(){
          //从本周1开始  4周
          this.setComInit(this.startDay,this.datas)
          this.isShowCopy()
        },
        // 是否展示copy按钮
        isShowCopy(){
          //看到这里了
          this.lastWeek=[]
          this.isShowCopyBtn=true
          for(let x=21 ; x<28 ; x++){
            this.lastWeek.push(this.GetDate(new Date(this.startDay),x))
          }
          for(let x in this.datas){
            for(let y in this.lastWeek){
              if(this.datas[x].date== this.formatDate(this.lastWeek[y],'yyyy-MM-dd')){
                this.isShowCopyBtn=false
                break
              }else{
                this.isShowCopyBtn=true
              }
            }
          }
        },
        //添加课程安排
        addCoursePlan(date){
          this.$emit('addPlan',date)
        },
        //编辑课程安排
        editCoursePlan(id,isHistory,isSevenDay,isNowDay){
          let json = {
            id:id,
            isHistory:isHistory,
            isSevenDay:isSevenDay,
            isNowDay:isNowDay
          }
          this.$emit('editPlan',json)
        },
        //删除课程安排
        delCoursePlan(id){
          this.$emit('delPlan',id)
        },
        //上一周
        preWeek(){
          this.startDay=this.GetDate(new Date(this.startDay),-7)
          this.endState=false
          this.$emit('preNextWeek', this.startDay)
        },
        //下一周
        nextWeek(){
          this.startDay=this.GetDate(new Date( this.startDay),7)
          if(this.dateSize(this.getWeekDayDate(new Date(this.nowDay),1),this.startDay)==0){
            this.endState=true
          }else{
            this.endState=false
          }
          this.$emit('preNextWeek', this.startDay)
        },
        // 复制排课
        copyPlan(){
          this.$emit('copyPlan','')
        },
        //根据当前日期展示组件
        setComInit(startDay,list){
          // 初始化四周
          this.data=[]
          for(let x =0 ; x<4 ;x++){
            let json={
              day:[]
            }
            this.data.push(json)
          }
          //初始化28天数据
          for(var x=1,y=0 ;x<=28;x++){
            if(x==8||x==15||x==22){
              y++
            }
            let day=this.GetDate(new Date(startDay),x-1)
            let json={
              date:day.substring(5,10),
              yDate:day,
              isHistory:false,
              isSevenDay:false,
              isNowDay:false,
              courseList:[]
            }
            // 判断是否是今天
            if(day===this.nowDay){
              json.isNowDay=true
            }
            // 判断是否是已过日期
            if(this.dateSize(day,this.nowDay)==2){
              json.isHistory=true
            }
            // 判断是否是之后7天
            if(this.dateSize(day,this.nowDay)!=2 && this.dateSize(this.GetDate(new Date(this.nowDay),0),day)!=2){
              json.isSevenDay=true
            }
            // 插入数据
            for(let index in list){
              let listDay=list[index].date.replace(/-/g, '/').substring(5,10)
              if(listDay===day.substring(5,10)){
                let _data=this.simpleClone(list[index].courseList)
                _data.forEach((item,index)=>{
                  if(item.isStop==1){
                    item.color="#d1dbe5";
                  };
                })
                json.courseList=_data;
              }
            }
            this.data[y].day.push(json)
          }
        },
        // 获取N天后的日期  
        GetDate(startDay,days) { 
          var d = startDay;
          var year = d.getFullYear();
          var mon=d.getMonth()+1;
          var day=d.getDate();
          if(day <= days){
            if(mon>1) {
                mon=mon-1;
            } else {
              year = year-1;
              mon = 12;
            }
          }
          d.setDate(d.getDate()+days);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();
          return year+"/"+(mon<10?('0'+mon):mon)+"/"+(day<10?('0'+day):day);
        },
        // 根据某一个日期获取他所在周的周几的日期
        getWeekDayDate(date,weekDay){ 
          // 0是星期日,1是星期一,... 
          weekDay%=7; 
          var day = date.getDay()
          if(day==0){
            day=7
          }
          var time = date.getTime()
          var sub = weekDay-day
          time+=sub*24*3600000
          date.setTime(time)
          return this.formatDate(date,'yyyy/MM/dd')
        },
        // 比较日期大小
        dateSize(date1,date2){
            var oDate1 = new Date(date1)
            var oDate2 = new Date(date2)
            var x=0
            if(oDate1.getTime() === oDate2.getTime()){
                x=0
            } else if(oDate1.getTime() > oDate2.getTime()){
                x=1
            } else {
                x=2
            }
            return x
        },
        //格式化日期
        formatDate(date, format) {
          if (!date) {
            return
          }
          if (!format) {
            format = 'yyyy-MM-dd HH:mm:ss'
          }
          switch (typeof date) {
            case 'string':
              date = new Date(date.replace(/-/, '/'))
              break
            case 'number':
              date = new Date(date)
              break
          }
          if (!(date instanceof Date)) {
            return
          }
          var dict = {
            'yyyy': date.getFullYear(),
            'M': date.getMonth() + 1,
            'd': date.getDate(),
            'H': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
            'MM': ('' + (date.getMonth() + 101)).substr(1),
            'dd': ('' + (date.getDate() + 100)).substr(1),
            'HH': ('' + (date.getHours() + 100)).substr(1),
            'mm': ('' + (date.getMinutes() + 100)).substr(1),
            'ss': ('' + (date.getSeconds() + 100)).substr(1)
          }
          return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]]
          })
        },
        // 对象浅拷贝
        simpleClone: function (data) {
          var obj = {}
          obj = JSON.parse(JSON.stringify(data))
          return obj
        },
        isEmpty: function (obj) {
          if (obj === null || obj === undefined || obj === '') {
            return true
          }
          return false
        },
        // this.datas=[{
          //   date:date,
          //   courseList:[{
          //     courseId:'0001',
          //     courseName:'哈达瑜伽',
          //     color:'#80FFFF'
          //   },{
          //     courseId:'0002',
          //     courseName:'动感单车',
          //     color:'#FF8040'
          //   },{
          //     courseId:'0003',
          //     courseName:'力量训练',
          //     color:'#81C0C0'
          //   }],
          // }]
    }
  }
</script>
<style lang="less">
.plan-row {
  position: relative;
  box-sizing: border-box;
}
.plan-col {
  position: relative;
  float: left;
  box-sizing: border-box;
  width:14.28571%;
  height: 150px;
  border-right: 1px solid #dfe6ec;
  border-bottom: 1px solid #dfe6ec;
  &:first-child{
    border-left: 1px solid #dfe6ec;
  }
}
.course-plans{
  position: relative;
  width:65%;
  height: 140px;
  margin:6px 0 5px 5px;
  overflow: auto;
  z-index: 5;
}
.course-plan{
  position: relative;
  padding: 3px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom:5px;
  &:last-child{
    margin-bottom:0
  };
  &:hover{
    .del{
      display: inline-block;
    }
  }
}
.course-title{
  cursor:pointer;
}
.del{
  position: absolute;
  right: 0;
  top:0;
  line-height: 23px;
  padding: 2px 5px 0;
  cursor:pointer;
  z-index: 1;
  display: none;
}
.plan-col-header{
  float: left;
  box-sizing: border-box;
  width:14.28571%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #eef1f6;
  border-top: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  border-bottom: 1px solid #dfe6ec;
  &:first-child{
    border-left: 1px solid #dfe6ec;
  }
}
.day-date{
  position: absolute;
  right: 10px;
  top:10px;
  z-index: 6;
}
.add-plan{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 1;
  cursor:pointer;
  &:hover{
    .add-btn{
      display: inline-block;
    }
  }
}
.add-btn{
  font-size: 20px;
  position: absolute;
  left:75%;
  bottom:45%;
  z-index: 7;
  display:none;
}
.now-bg-color{
  background-color: #E0E0E0
}
.his-bg-color,.seven-bg-color{
  background-color: #F0F0F0
}
</style>
