<template>	
	<div class='window'>
    <div>
      <div>{{item.text}}</div>
      <div>
        <a v-focus ref='windowBtn' href="javascript:void(0)" v-for='(value, index) in item.btn' @click='click(value)' @keydown='keydown($event,index)'>{{value.text}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HandleWindow',
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {  
    click(value){
      this.$emit('popWindow',{handle: value.handle})
    },
    keydown(e,i){
      if(e.keyCode == 38 || e.keyCode == 40){
        e.preventDefault()
      }
      if(e.keyCode == 37 && i == 0 || e.keyCode == 39 && i == this.item.btn.length-1){
        e.preventDefault()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.window
  position relative
  width 100%
  height 100%
  text-align center
  background-color rgba(0,0,0,0.8)
  & > div
    position absolute
    width 100%
    bottom 10%
    & > div:first-child
      color $blueFontColor
      font-size 25px
      margin-bottom 20px
    & > div:nth-child(2)
      font-size 21px
      & > a
        background dimgray
        border-radius 5%
        padding 10px 20px
        margin 0 20px
      & > a:focus
        outline none  
        color $blackColor
        background #ddbb44
</style>