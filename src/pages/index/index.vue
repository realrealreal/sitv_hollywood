<template>
    <div id="index">
        <!-- 高配轮播图 -->
        <div id="carousel">
          <Carousel :items="middleItems.slice(0,2)"/>
        </div>
        <!-- header(logo && 导航栏) -->
        <div id="header">
            <div id="logo">
              <img :src="copyright_logo" alt="">
              <img :src="biz_logo" alt="">
            </div>
            <ul>
              <li><router-link to='list/1' class='iconfont iconsousuo'>&nbsp搜索</router-link></li>
              <li><router-link :to="repo_href" class='iconfont iconicon-user'>&nbsp我的</router-link></li>
              <li><a href="" class='iconfont iconh'>&nbsp退出</a></li>
            </ul>
        </div>
        <!-- 腰封 -->
        <div id="YaoFeng">
          <YaoFeng :items='beltItems'/>
        </div>
        <!-- 推荐 4组 -->
        <div class="recommand">
          <div v-for="(value, index) in bottomItems.slice(0,4)" @keydown='keydown($event,1,index)'>
            <Poster width='264' is-img-in :item='value' ref='recommand-1'/>
          </div>
        </div>
        <div class="recommand">
          <h3>{{little1}}</h3>
          <div v-for="(value, index) in waterfallItems.slice(0,6)" @keydown='keydown($event,2,index)'>
            <Poster width='168' :item='value' ref='recommand-2' />
          </div> 
        </div>
        <div class="recommand">
          <h3>{{little2}}</h3>
          <div v-for="(value, index) in waterfallItems.slice(0,6)" @keydown='keydown($event,3,index)'>
            <Poster width='168' :item='value' is-icon-show :index='index+1' ref='recommand-3'/>
          </div>
        </div>
        <div class="recommand">
          <h3>{{little3}}</h3>
          <div v-for="(value, index) in albumItems.slice(0,6)" @keydown='keydown($event,4,index)'>
            <Poster width="168" :item='value' ref='recommand-4' />
          </div> 
        </div>
    </div>
</template>
<script>
const little = ['观看历史', '人气排行', '蜘蛛侠系列一次看爽'];
import {scrollTo} from '@/api/utils.js'
import Carousel from '@/components/Carousel'
import YaoFeng from '@/components/YaoFeng'
import Poster from '@/components/Poster'
export default {
  name: 'Index',
  data () {
    return {
      repo_href: this.GLOBAL.config.href.repo,
      biz_logo: require('@/assets/images/hollywoodLogo.png'),
      copyright_logo: require('@/assets/images/besTVLogo.png'),
      little1: little[0],
      little2: little[1],
      little3: little[2],
      middleItems: [],
      beltItems: [],
      bottomItems: [],
      waterfallItems: [],
      albumItems: [],
      timer: [undefined]
    }
  },
  created() {
    console.info('init------------index')
    this.init()
  },
  /*destroyed(){
    this.$parent.$el.scrollTop = 0;
  },*/
  methods: {
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-19T11:03:35+0800
     * @return   {[type]}                 [null]
     */
    init(){
      console.info(this);
      //console.info(this.$refs.recommand[0]);
      let vm = this;
      vm.dataService.getMovieIndex(function(res){
        console.info(res.data);      
        vm.middleItems = res.data.positions[1].middleItems ? res.data.positions[1].middleItems : [];
        vm.beltItems = res.data.positions[2].beltItems ? res.data.positions[2].beltItems : [];
        vm.bottomItems = res.data.positions[3].bottomItems ? res.data.positions[3].bottomItems : [];
        vm.waterfallItems = res.data.positions[4].waterfallItems ? res.data.positions[4].waterfallItems : [];
        vm.albumItems = res.data.positions[5].albumItems ? res.data.positions[5].albumItems : [];
      });
    },
    /**
     * [keydown 按键监听]
     * @Author   shanjing
     * @DateTime 2019-07-19T11:04:36+0800
     * @param    {[type]}                 value [e && dom元素]
     * @return   {[type]}                       [null]
     */
    keydown(e,column,index){
      if(e.keyCode == 40){
        if(column == 1){
          //value.event.preventDefault();
          let el = this.$parent.$el;//document.getElementById('app');
          scrollTo(el, 500, el.clientHeight, 'scrollTop', 0, this);
        }
        if(column == 3){
          //value.event.preventDefault();
          let el = this.$parent.$el;
          scrollTo(el, 500, el.scrollHeight - el.offsetHeight,'scrollTop', 0, this);
        }
        setTimeout(function(el){
          el.focus();
        },0,this.$refs[`recommand-${column+1}`][index].$el)
      }
      if(e.keyCode == 38){
        if(column == 2){
          let el = this.$parent.$el;
          scrollTo(el, 500, 0,'scrollTop', 0, this);
        }
        if(column == 4){
          let el = this.$parent.$el;
          scrollTo(el, 500, el.clientHeight,'scrollTop', 0, this);
        }
        setTimeout(function(el){
          el.focus();
        },0,this.$refs[`recommand-${column-1}`][index].$el)
      }
    }
  },
  components: {
    YaoFeng,
    Poster,
    Carousel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
  #index
    //position absolute
    //width 100%
    //transition: top 3s
  #header
    position absolute
    top 0
    width  100%
  #logo
    position absolute
    left 70px
    top 40px
    & > img:nth-child(1)
      width 73px
    & > img:nth-child(2)
      width 187px
  #carousel
    height 440px
    margin-bottom 28px
  #YaoFeng
    margin-bottom 28px
  .recommand
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px
  ul
    display flex
    -webkit-align-items center
    float right
    margin-top 80px
    margin-right 80px
    font-size 25px
    & > li
      padding 0 13px
      & > a
        padding 5px
        color $greyColor
      // &:nth-child(1) > a:before
      //   background url($searchIcon) no-repeat 0 50%
      // &:nth-child(2) > a:before
      //   background url($personalIcon) no-repeat 0 50%
      // &:nth-child(3) > a:before
      //   background url($exitIcon) no-repeat 0 50%
  h3
    margin-bottom 14px  
</style>
