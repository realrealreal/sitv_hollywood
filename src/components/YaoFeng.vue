<template>
  <div>
    <ul>
      <li class="iconfont" v-for='item in items' :key='item.code'>
        <a :href="item.code">              
          <img :src="`${GLOBAL.config.base + item.image}`" alt="" >
        </a>
      </li>
    </ul>
  </div> 
</template>

<script>
export default {
  name: 'YaoFeng',
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
  div
    width 1128px
    margin 0 auto
    margin-top 10px
    padding 5px
    overflow hidden
    white-space nowrap
    & > ul
      display inline-block
      & > li
        display inline-block
        margin-right 24px
        & img
          width 120px
</style>