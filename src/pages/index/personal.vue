<template>
    <div id="index">
        <div id="recommand-1">
          <h3>{{little1}}</h3>
          <div v-for="(value, index) in bottom_recommand">
            <Poster width='168' />
          </div> 
        </div>
        <div id="recommand-2">
          <h3>{{little2}}</h3>
          <div v-for="(value, index) in second_recommand">
            <Poster width='168' />
          </div> 
        </div>
        <div id="recommand-3">
          <h3>{{little3}}</h3>
          <div v-for="(value, index) in second_recommand">
            <Poster width='168' />
          </div> 
        </div>
    </div>
</template>
<script>
import Poster from '@/components/Poster'
export default {
  name: 'Personal',
  data () {
    return {
      bottom_recommand:[1,2,3,4,5,6,7,8,9],
      second_recommand:[1,2,3,4,5,6],
      little1: '观看历史',
      little2: '我的收藏',
      little3: '我的订购',
    }
  },
  components: {
    Poster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 1150px
  height 100%
  margin 44px auto
  & > div
    width 1130px
    padding 0 10px
    overflow hidden
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px
    & > h3
      margin-bottom 10px
</style>
