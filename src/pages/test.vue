<!-- 测试页面 -->
<template>
    <div id="index">
        <Poster />
        <Poster :_bottom='20'/>
    </div>
</template>
<script>
import Poster from '@/components/Poster'
export default {
  name: 'Test',
  data () {
    return {
      
    }
  },
  components: {
    Poster
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
