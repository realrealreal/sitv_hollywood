<!-- 测试页面 -->
<template>
  <div id='test'>
    <div @click='click'>click</div>
    <div>click</div>
  </div>
    
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {
    }
  },
  created() {
  },
  components: {
  },
  methods: {
    click() {
      console.info('click')
      this.$toast('欢迎')
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#test{
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
