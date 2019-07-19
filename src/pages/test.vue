<!-- 测试页面 -->
<template>
    <div id="index">
          <div @click="clickShow">clickShow</div>
          <transition name="fade" enter-active-class="animated topIn"
       leave-active-class="animated topOut"
       :duration="{ enter: 2000, leave: 2000 }">
          <div v-show="isShow">11111</div>
        </transition>
          <transition name="fade" enter-active-class="animated bottomIn"
       leave-active-class="animated bottomOut"
       :duration="{ enter: 2000, leave: 2000 }">
          <div v-show="!isShow">22222</div>
          </transition>
    </div>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {
      isShow: true
    }
  },
  components: {

  },
  methods: {
    clickShow(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 10px;
}
</style>
