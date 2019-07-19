<template>	
	<iframe name="myframe" :src="src" frameborder="0" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  name: 'Iframe',
  data () {
    return {
    	src:'https://www.baidu.com'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>