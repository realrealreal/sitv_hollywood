<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
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
  overflow hidden
  background url($bgImg) no-repeat fixed 100% 100%
  background-size 100% 100%
a
  animation scale-down 0.1s ease-in-out 1 forwards  
  &:focus
    outline 2px solid $linkColor
    animation scale-up 0.5s ease-in-out 1 forwards
</style>
