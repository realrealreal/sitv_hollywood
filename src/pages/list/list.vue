<template>
	<div id="index">
    <div>
      <div v-if="$route.name == 'VodList'">
        <div><a href="">搜索</a></div>
        <img :src="biz_logo" alt="">  
      </div>
      <div v-if="$route.name == 'RepoList'">
        <h2>{{title[$route.params.name]}}</h2>
        <a href="">编辑</a>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :class="index == $route.params.type ? 'current' : ''" :href="'#/list/'+index">{{value.name}}</a></li>
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
  width: '168',
  isImgIn: false
};
const title = {
  'history': '观看历史',
  'collection': '我的收藏'
}
const column = [
  {
    index:0,
    name:'院线',
  },
  {
    index:1,
    name:'全部',
  },
    {
    index:2,
    name:'动作',
  },
  {
    index:3,
    name:'动画',
  },
  {
    index:4,
    name:'喜剧',
  },
  {
    index:5,
    name:'科幻',
  },
  {
    index:6,
    name:'惊悚',
  },
  {
    index:7,
    name:'情感',
  },
  {
    index:8,
    name:'IN迷',
  }
];
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
export default {
  name: 'List',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      config:{},
      data: [],
      leftColumn: [],
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

      console.info(this.$route.name);
      console.info(this.$route.params.type);
      console.info(this.$store.state.categoryCode);
      console.info(this.$store.state.bizCode);
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
        for (var i = 0; i < 46; i++) {
          array.push(i);
        }
        return array;
      })();
      this.leftColumn = column;
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
#index
  width 100%
  height 100%
  margin 0 auto
  vertical-align top
  & > div
    display inline-block
    &:first-child
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
        height 92px
        margin-top 30px
        font-size 20px
        & > img
          width 100%
          margin-top 20px
        & > a
          width 100%
          margin-top 20px
      & > ul
        margin-top 46px
        & > li
          font-size 26px
          margin-bottom 7px
    &:last-child
      margin-left 264px
      margin-top 100px
      width 960px

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