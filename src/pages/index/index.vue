<template>
    <div id="index" :style="{top: top+'px'}">
        <div id="carousel">
          <Carousel :items="middleItems.slice(0,2)"/>
        </div>
        <div id="header">
            <div id="logo">
              <img :src="copyright_logo" alt="">
              <img :src="biz_logo" alt="">
            </div>
            <ul>
              <li><router-link to='list/1'>搜索</router-link></li>
              <li><router-link :to="repo_href">我的</router-link></li>
              <li><a href="">退出</a></li>
            </ul>
        </div>
        <div id="YaoFeng">
          <YaoFeng :items='beltItems'/>
        </div>
        <div id="recommand-1">
          <div v-for="(value, key, index) in bottomItems.slice(0,4)" >
            <Poster width='264' is-img-in :item='value' isKeyListener v-on:keyListener='keydown' :column='1'/>
          </div>
        </div>
        <div id="recommand-2">
          <h3>{{little1}}</h3>
          <div :data-index='`2-${key}`' id="test" v-for="(value, key, index) in waterfallItems.slice(0,6)">
            <Poster width='168' :item='value' isKeyListener v-on:keyListener='keydown' :column='2'/>
          </div> 
        </div>
        <div id="recommand-3">
          <h3>{{little2}}</h3>
          <div v-for="(value, key, index) in waterfallItems.slice(0,6)">
            <Poster width='168' :item='value' is-icon-show :index='key+1' isKeyListener v-on:keyListener='keydown' :column='3'/>
          </div> 
        </div>
        <div id="recommand-4">
          <h3>{{little3}}</h3>
          <div v-for="(value, key, index) in albumItems.slice(0,6)">
            <Poster width="168" :item='value' isKeyListener v-on:keyListener='keydown' :column='4'/>
          </div> 
        </div>
    </div>
</template>
<script>
import Carousel from '@/components/Carousel'
import YaoFeng from '@/components/YaoFeng'
import Poster from '@/components/Poster'
export default {
  name: 'Index',
  data () {
    return {
      repo_href: this.GLOBAL.config.href.repo,
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      copyright_logo: require('../../assets/images/besTVLogo.png'),
      little1: '观看历史',
      little2: '人气排行',
      little3: '蜘蛛侠系列一次看爽',
      middleItems: [],
      beltItems: [],
      bottomItems: [],
      waterfallItems: [],
      albumItems: [],
      test: 'test',
      top: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){ //初始化数据
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
    onfocus(data){
      console.info(data);
      console.info(data.column);
      return;
      if(data.column == 1){
        this.top = -550
      }
    },
    keydown(value){
      if(value.keyCode == 40){
        if(value.column == 1){
          //document.querySelector('div[data-index="2-0"]>a').focus();
          document.getElementById('app').scrollTop = document.getElementById('app').clientHeight;
          /*this.top -= 720;
          this.$nextTick(() => {
            document.querySelector('div[data-index="2-0"]>a').focus();
          });*/      
        }
        if(value.column == 3){
          document.getElementById('app').scrollTop = document.getElementById('app').scrollHeight;
        }
      }
      if(value.keyCode == 38){
        if(value.column == 2){
          document.getElementById('app').scrollTop = 0;
        }
        if(value.column == 4){
          document.getElementById('app').scrollTop = document.getElementById('app').clientHeight;
        }
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
    position absolute
    width 100%
    transition: top 3s
  #header
    position absolute
    top 0
    width  100%
  #logo
    position absolute
    left 70px
    top 40px
  #carousel
    height 440px
    margin-bottom 28px
  #YaoFeng
    margin-bottom 28px
  #recommand-1
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px
  #recommand-2
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px

  #recommand-3
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px

  #recommand-4
    margin-bottom 28px
    width 1128px
    margin 0 auto
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
        &:before
          content ''
          display inline-block
          width 21px
          height 28px
          line-height 28px
          vertical-align top
          margin-right 15px
      &:nth-child(1) > a:before
        background url($searchIcon) no-repeat 0 50%
      &:nth-child(2) > a:before
        background url($personalIcon) no-repeat 0 50%
      &:nth-child(3) > a:before
        background url($exitIcon) no-repeat 0 50%
  h3
    margin-bottom 14px  
</style>
