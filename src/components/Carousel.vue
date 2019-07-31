<template>
  <!-- 轮播图组件 -->
  <div class="carousel">
    <transition v-for="(value, index) in items" name="fade" enter-active-class="animated fadeIn"
   leave-active-class="animated fadeOut"
   :duration="{ enter: 2000, leave: 800 }" :key="value.key">
      <img v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon1}`" alt="">
    </transition> 
    <a href="javascript:void(0)" v-focus="false" @click="click">
       <transition v-for="(value, index) in items" name="left" enter-active-class="animated fadeInLeft"
     leave-active-class="animated fadeOut"
     :duration="{ enter: 2000, leave: 800 }" :key="value.key">
          <img class='leftImg' v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon2}`" alt="">
      </transition>
     <transition v-for="(value, index) in items" name="right" enter-active-class="animated fadeInRight"
     leave-active-class="animated fadeOut"
     :duration="{ enter: 2000, leave: 800 }" :key="value.key">
          <img class='rightImg' v-show='showIndex == index' :src="`${GLOBAL.config.base + '/epg/resource/picture' + value.icon3}`" alt="">
      </transition>
      <div v-show="showIndex >= 0">
        <div v-for="(value, index) in items" class="outer-indicator" :class="showIndex == index ? 'indicator-selected': ''"></div>
      </div>
    </a>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex' //注册 action 和 state
export default {
  name: 'Carousel',
  data () {
    return {
      showIndex: -1
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
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-31T16:59:13+0800
     * @return   {[type]}                 [null]
     */
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
    },
    /**
     * [click 点击轮播图]
     * @Author   shanjing
     * @DateTime 2019-07-31T16:59:30+0800
     * @return   {[type]}                 [null]
     */
    click() {
      let vm = this;
      vm.setProgramCode(vm.items[vm.showIndex].code)
      vm.setProgramType(vm.items[vm.showIndex].type)
      vm.$router.push({path: `/hollywood/detail`});
    },
    //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
    ...mapActions([
        'setProgramCode',
        'setProgramType'
    ])
  },
  computed: {
    ...mapState([
      'programCode',
      'programType'
    ])
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
      &.leftImg
        width 1280px
        top -90px
        left -70px
      &.rightImg
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
