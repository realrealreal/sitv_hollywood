<template>
  <!-- 猜你喜欢(单剧集底部内容) -->
  <div class='yourlike'>
    <div class='blue'>{{title}}</div>
    <ul>
      <li v-for="(value, index) in items">
        <Poster width='120' :item='value'/>
      </li> 
    </ul>
  </div>
</template>

<script>
import Poster from '@/components/Poster'
export default {
  name: 'YourLike',
  data () {
    return {
      title:'猜你喜欢'
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    Poster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
div.yourlike
  padding 20px 220px 0
  height 255px
  & > ul
    margin-top 10px
    white-space nowrap
    & > li
      margin-right 23px
      display inline-block
</style>