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
import Animations from '@/assets/css/animations.css'
export default {
  name: 'App'
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
  overflow hidden
  background url($bgImg) no-repeat fixed 100% 100%
  background-size 100% 100%
a
  animation scale-down 0.1s ease-in-out 1 forwards  
  &:focus
    outline 2px solid $linkColor
    animation scale-up 0.5s ease-in-out 1 forwards
</style>
