<template>	
	<div><span>{{text}}</span></div>	
</template>

<script>
export default {
  name: 'Marguee',
  data () {
    return {
    	marguee: 0
    }
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  mou
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
	overflow: hidden;
}
a:focus > div{
	background-color: #e6b23e;
}
</style>