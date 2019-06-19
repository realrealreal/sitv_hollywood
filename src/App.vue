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

<style>
#app {
  font-family: 宋体;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(assets/images/hollywoodBG.jpg) no-repeat fixed 100% 100%;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
}
</style>
