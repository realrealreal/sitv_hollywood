<template>
	<div id="index">
    <div>
      <div><a href="">搜索</a></div>
      <img :src="biz_logo" alt="">
      <ul>
        <li><a class='current' href="">院线</a></li>
        <li><a href="">全部</a></li>
        <li><a href="">动作</a></li>
        <li><a href="">动画</a></li>
        <li><a href="">喜剧</a></li>
        <li><a href="">科幻</a></li>
        <li><a href="">惊悚</a></li>
        <li><a href="">情感</a></li>
        <li><a href="">IN迷</a></li>
      </ul>
    </div>
    <div :class="config.lineNumber == 3 ? 'line-3' : ''">
      <ScrollList :data='data' :config='config'/>
    </div>
  </div>
</template>

<script>
const config264 = {
  initNumber: 12, //初始值总数量
  lineNumber: 3, //每行数量
  width: '264',
  isImgIn: true
}
const config168 = {
  initNumber: 15,
  lineNumber: 5,
  width: '168',
  isImgIn: false
}
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
export default {
  name: 'List',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      config:{},
      data: []
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
      this.config = config168;
      this.data = (function(){
        let array = [];
        for (var i = 0; i < 46; i++) {
          array.push(i);
        }
        return array;
      })()
    }
  },
  computed: {
    
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
#index {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
}
#index > div {
  display: inline-block;
}
#index > div:first-child {
  margin-left: 50px;
  margin-right: 36px;
  width: 160px;
  text-align: center;
  height: 720px;
  position: fixed;
  top: 0;
  left: 0;
}
#index > div:first-child > img {
  width: 100%;
  margin-top: 20px;
}
#index > div:first-child > div {
  margin-top: 30px;
  font-size: 20px;
}
#index > div:first-child > ul {
  margin-top: 46px;
}
#index > div:first-child > ul > li {
  font-size: 26px;
  margin-bottom: 7px;
}
#index > div:first-child > div > a, #index > div:first-child > ul > li > a {
  width:100%;
  padding: 7px 0;
}
#index > div:first-child > div > a:focus, #index > div:first-child > ul > li > a:focus {
  outline: none;
  background-color: $linkColor;
  color: $defaultFontColor;
  border-radius: 25px; 
}
#index > div:last-child {
  margin-left: 264px;
  margin-top: 100px;
  width: 960px;
}
.line-3 {
  margin-left: 314px !important;
}
.current{
  color: $linkColor
}
.current::after{
  content: '';
  display: block;
  border-bottom: 2px solid $linkColor;
  width: 24px;
  position: relative;
  top: 4px;
  left: 50%;
  margin-left: -12px;
}
</style>