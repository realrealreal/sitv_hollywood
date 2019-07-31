<template>
  <div id="app">
    <!-- 分成两个路由 页面会有轻微闪烁 之后看看是否可以优化-->
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="{ enter: 2000, leave: 50 }">
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
        <!-- 这里是会被缓存的组件 -->
      </keep-alive>
    </transition>
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="{ enter: 2000, leave: 50 }">
      <router-view  v-if="!this.$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import animate from 'animate.css'
import url from '@/api/url-config.js'
import Animations from '@/assets/css/animations.css'
export default {
  name: 'App',
  mounted() {
    this.init()
  },
  methods: {
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-02T17:18:43+0800
     * @return   {[type]}                 [null]
     */
    init(){ //初始化数据
      let vm = this;
      vm.authService.login(function(res){
        console.info(res.data);
      });
    }
  }
}
</script>

<style lang='stylus'>
//@import "assets/css/index.styl";
#app
  font-family $defaultFontFamily;
  color $defaultFontColor;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
  min-height 720px
  //overflow hidden
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative
  background url($bgImg) no-repeat fixed 100% 100%
  background-size 100% 100%
  &::-webkit-scrollbar
    display none
a
  animation scale-down 0.1s ease-in-out 1 forwards  
  &:focus
    outline 2px solid $linkColor
    animation scale-up 0.5s ease-in-out 1 forwards
</style>
