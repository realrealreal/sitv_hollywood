<template>
  <div class="carousel">

    <transition v-for="(value, index) in items" name="fade" enter-active-class="animated fadeIn"
   leave-active-class="animated fadeOut"
   :duration="{ enter: 2000, leave: 800 }" :key="value.key">
      <img v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon1}`" alt="">
    </transition> 
    <a href="">
       <transition v-for="(value, index) in items" name="left" enter-active-class="animated fadeInLeft"
     leave-active-class="animated fadeOut"
     :duration="{ enter: 2000, leave: 800 }" :key="value.key">
          <img v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon2}`" alt="">
      </transition>
     <transition v-for="(value, index) in items" name="right" enter-active-class="animated fadeInRight"
     leave-active-class="animated fadeOut"
     :duration="{ enter: 2000, leave: 800 }" :key="value.key">
          <img v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon3}`" alt="">
      </transition>
      <div v-show="showIndex >= 0">
        <div v-for="(value, index) in items" class="outer-indicator" :class="showIndex == index ? 'indicator-selected': ''"></div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      show2: false,
      showIndex: -1,
      imgData:[
        {
          key: 11121,
          img1: require('../assets/images/test/15598114011743429154_1.png'),
          img2: require('../assets/images/test/15598114011743429154_2.png'),
          img3: require('../assets/images/test/15598114011743429154_3.png')
        },{
          key: 11122,
          img1: require('../assets/images/test/15598112133213404680_1.png'),
          img2: require('../assets/images/test/15598112133213404680_2.png'),
          img3: require('../assets/images/test/15598112133213404680_3.png')
        }
      ]
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
     init() {
        setTimeout(()=>{
            this.showIndex = this.showIndex+1;
            setInterval(()=>{
              if(this.showIndex == 1){
                this.showIndex = 0
              }else{
                this.showIndex = this.showIndex+1
              }
            },5000)
        },1000)
     } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
  .carousel
    padding-top 130px
    margin-bottom 30px
    & > a
      display block
      width 1128px
      margin 0 auto
      height 300px
      bottom 0
      & > img
        position absolute  
        &:nth-child(2n+1)
          width 1280px
          top -90px
          left -70px
        &:nth-child(2n+2)
          width 1128px
          top -50px
      & > div
        position absolute
        bottom 0
        left 50%
        transform translateX(-50%)
    & > img
      position absolute
      width 1280px 
      top 0
      left 0
      // &:nth-child(3n+1)
      //   top 0
      //   left 0
      // &:nth-child(3n+2)
      //   top 0
      //   left 0
      // &:nth-child(3n+3)
      //   top 0
      //   left 0
        
  .outer-indicator
      width 8px
      height 8px
      border-radius 50%
      border 2px solid white
      margin 4px
      display inline-block
      
  .indicator-selected
    background white


</style>
