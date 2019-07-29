<template>
    <div class='yourlike'>
      <div class='blue'>猜你喜欢</div>
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
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
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
  background url(../assets/images/bottomBg.png) no-repeat
  background-size cover
  & > ul
    margin-top 10px
    white-space nowrap
    & > li
      margin-right 23px
      display inline-block
</style>