<template>
	<div id="index">
    <div>
      <div>
        <h2>{{title}}</h2>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :class="index == current ? 'current' : ''" href="javascript:void(0)" @click="filterbyDate(index)">{{value.name}}</a></li>
      </ul>
    </div>
    <div v-if='current == 0'>
      <span v-show='data.length == 0'>{{empty_tips}}</span>
      <ul v-show='data.length != 0'>
         <li v-for='(value, index) in data'><a href='javascript:void(0)' @click='goToDetail(value)'><span>{{value.contentName}}</span><span>{{value.expireTime | formatDate}}到期</span><span>{{`￥${value.price/100}元`}}</span><span>{{value.expireTime | isExpire}}</span></a></li>
      </ul>
    </div>
    <div v-if='current == 1'>
      <span v-show='currentWeek.length == 0'>{{empty_tips}}</span>
      <ul v-show='currentWeek.length != 0'>
         <li v-for='(value, index) in currentWeek'><a href='javascript:void(0)' @click='goToDetail(value)'><span>{{value.contentName}}</span><span>{{value.expireTime | formatDate}}到期</span><span>{{`￥${value.price/100}元`}}</span><span>{{value.expireTime | isExpire}}</span></a></li>
      </ul>
    </div>
    <div v-if='current == 2'>
      <span v-show='lastWeek.length == 0'>{{empty_tips}}</span>
      <ul v-show='lastWeek.length != 0'>
         <li v-for='(value, index) in lastWeek'><a href='javascript:void(0)' @click='goToDetail(value)'><span>{{value.contentName}}</span><span>{{value.expireTime | formatDate}}到期</span><span>{{`￥${value.price/100}元`}}</span><span>{{value.expireTime | isExpire}}</span></a></li>
      </ul>
    </div>
    <div v-if='current == 3'>
      <span v-show='beforeLastWeek.length == 0'>{{empty_tips}}</span>
      <ul v-show='beforeLastWeek.length != 0'>
         <li v-for='(value, index) in beforeLastWeek'><a href='javascript:void(0)' @click='goToDetail(value)'><span>{{value.contentName}}</span><span>{{value.expireTime | formatDate}}到期</span><span>{{`￥${value.price/100}元`}}</span><span>{{value.expireTime | isExpire}}</span></a></li>
      </ul>
    </div>
  </div> 
</template>

<script>
const sj = getCurrentWeekTimestamp();//本周开始时间时间戳 
const emptyTips = '没有更多的订购记录';
const config264 = {
  initNumber: 12, //初始值总数量
  lineNumber: 3, //每行数量
  width: '264',
  isImgIn: true
};
const config168 = {
  initNumber: 15,
  lineNumber: 5,
  width: '168',
  isImgIn: false
};
const configText = {
  initNumber: 28,
  lineNumber: 2,
  isPoster: false
};
const title = '我的订购';
const column = [
  {
    index:0,
    name:'全部',
  },
  {
    index:1,
    name:'本周',
  },
    {
    index:2,
    name:'上周',
  },
  {
    index:3,
    name:'更早',
  }
];
function dateToStr(now){
  var yy = now.getFullYear();      //年
  var mm = now.getMonth() + 1;     //月
  var dd = now.getDate();          //日
  var hh = now.getHours();         //时
  var ii = now.getMinutes();       //分
  var ss = now.getSeconds();       //秒
  //var clock = yy + "-";
  var clock = yy;
  if(mm < 10) clock += "0";
  clock += mm; //+ "-";
  if(dd < 10) clock += "0";
  clock += dd; //+ " ";
  if(hh < 10) clock += "0";
  clock += hh; //+ ":";
  if (ii < 10) clock += '0'; 
  clock += ii; //+ ":";
  if (ss < 10) clock += '0'; 
  clock += ss;
  console.info(clock); 
  return clock;
}
function getCurrentWeekTimestamp(){
  let current = new Date();
  let week = current.getDay() == 0 ? 6 : current.getDay()-1;
  //let times = current.getTime();
  let hour = current.getHours();
  let minute = current.getMinutes();
  let second = current.getSeconds();
  let weekBeginTime = Math.floor(current / 1000)*1000 - week *24 *60 *60 *1000 - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000;
  //let lastWeekBeginTime = weekBeginTime - 7 *24 *60 *60 *1000;
  return weekBeginTime;
}
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
export default {
  name: 'orderList',
  data () {
    return {
      empty_tips: emptyTips,
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      config:{},
      data: [],
      leftColumn: column,
      title:title,
      current: 0
    }
  },
  created() {
    this.init()
  },
  // mounted() {
  //   this.init()
  // },
  props: {
    
  },
  methods: {
    init(){
      this.utils.dateToStr(new Date());
      console.info(this.$route.name);
      console.info(this.$route.params.type);
      if(this.$route.name == 'VodList'){
        
      }else{

      }
      this.config = configText;
      /*if(this.$route.params.type == 8){
        this.config = config264;
      }else{
        this.config = config168;
      }*/
      this.data = (function(){
        let array = [];
        var obj = {
          "userId": "00264c50fb0f",
          "category": null,
          "categoryCode": "ccms_category_57032916",
          "contentId": "program_ccms_843420",
          "contentType": null,
          "contentName": "惊奇队长",
          "contentPoster": "/content/201907/01/549529_poster.jpg",
          "bizCode": "ccms_biz_56470301",
          "offeringId": null,
          "serviceName": null,
          "serviceCode": null,
          "serviceType": null,
          "price": "500",
          "protocolType": null,
          "fileName": null,
          "param1": null,
          "param2": null,
          "param3": null,
          "orderTime": null,
          "validTime": "20190704105306",
          "expireTime": "20190714105306",
          "updateTime": "20200223082700"
        };
        for (var i = 0; i < 46; i++) {
          array.push(obj);
        }
        return array;
      })();
    },
    filterbyDate(index){
      let vm = this;
      vm.current = index;
    },
    goToDetail(item) {
      let vm = this;
      console.info('dispatch****1'+vm.$store.state.programCode);
      vm.$store.dispatch('setProgramCode',item.contentId)
      console.info('dispatch****2'+vm.$store.state.programCode);
      vm.$router.push({path: '/hollywood/vod'});
    }
  },
  filters: {
    formatDate(value) {
      let time = value.substring(0,8);
      return time.substring(0,4)+'.'+time.substring(4,6)+'.'+time.substring(6,8)
    },
    isExpire(value) { 
      return dateToStr(new Date()) > value ? '过期' : '有效';
    }
  },
  computed: {
    currentWeek(){
      return this.data.filter(function(item){
          return item.expireTime >= dateToStr(new Date(sj))
      })
    },
    lastWeek(){
      return this.data.filter(function(item){
          return item.expireTime < dateToStr(new Date(sj)) && item.expireTime >= dateToStr(new Date(sj - 7 *24 *60 *60 *1000 ))
      })
    },
    beforeLastWeek(){
      return this.data.filter(function(item){
          return item.expireTime < dateToStr(new Date(sj - 7 *24 *60 *60 *1000 ))
      })
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 100%
  height 100%
  margin 0 auto
  vertical-align top
  & > div
    display inline-block
    &:first-child
      color $whiteFontColor
      padding-left 50px
      padding-right 36px
      width 160px
      text-align center
      height 720px
      position fixed
      top 0
      left 0
      background url(../../assets/images/leftShadow.png)
      & > div
        margin-top 80px
        font-size 20px
        & > h2
          font-size 36px
          font-weight normal
      & > ul
        margin-top 60px
        & > li
          font-size 26px
          margin-bottom 7px
    &:last-child
      margin-left 264px
      margin-top 100px
      width 960px
      text-align center
      & > span
        line-height 300px
      & > ul > li:nth-child(2n) > a
        background rgba(27, 33, 44, 0.5)
      & > ul > li > a
        text-align left
        width 932px
        padding 14px
        display flex
        flex-direction row
        & > span
          display block
          &:nth-child(1)
          &:nth-child(2)
            width 0
            flex-grow 2
          &:nth-child(3)
            width 0 
            flex-grow 1
#index > div:first-child > div > a, #index > div:first-child > ul > li > a
  width 100%
  padding 7px 0

#index > div:first-child > div > a:focus, #index > div:first-child > ul > li > a:focus
  outline none
  background-color $linkColor
  color $defaultFontColor
  border-radius 25px

.line-3
  margin-left 314px !important

.current
  color $linkColor
  &::after
    content ''
    display block
    border-bottom 2px solid $linkColor
    width 24px
    position relative
    top 4px
    left 50%
    margin-left -12px

.leftshadow
  position fixed
  left 0
  top 0
</style>