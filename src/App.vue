<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <router-view/>
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
      // console.info('old'+vm.GLOBAL.store.getItem('page'))
      // console.info('set'+vm.GLOBAL.store.setItem('page','test'))
      // console.info('new'+vm.GLOBAL.store.getItem('page'))
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
