<template>
	<div id="index">
    <div>
      <div>
        <h2>{{title}}</h2>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :class="index == $route.params.type ? 'current' : ''" :href="'#/list/'+index">{{value.name}}</a></li>
      </ul>
    </div>
    <div>
      <ul>
         <li v-for='(value, index) in data'><a href='#'><span>{{value.contentName}}</span><span>{{value.expireTime | formatDate}}到期</span><span>{{`￥${value.price/100}元`}}</span><span>{{value.expireTime | isExpire}}</span></a></li>
      </ul>
    </div>
  </div> 
</template>

<script>
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
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
export default {
  name: 'orderList',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      config:{},
      data: [],
      leftColumn: column,
      title:title,
      current: 1
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
    }
  },
  filters: {
    formatDate(value) {
      let time = value.substring(0,8);
      return time.substring(0,4)+'.'+time.substring(4,6)+'.'+time.substring(6,8)
    },
    isExpire(value) {
      let current = this.utils.dateToStr(new Date());
      if(current < value){
         return '过期'
      }else{
        return '有效'
      }
    }
  },
  directives: {
  },
  components: {
    ScrollList
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
      & > ul > li > a
        width 932px
        padding 14px
    
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