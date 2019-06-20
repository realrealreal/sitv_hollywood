<template>
  <div>
    <ul>
      <li class="iconfont" :class='item.icon' v-for='item in json' :key='item.id'>
        <a :href="item.href" :style="{color: item.color}">              
          <img :src="item.src" alt="" >
        </a>
      </li>
    </ul>
  </div> 
</template>

<script>
export default {
  name: 'YaoFeng',
  props: {
    json: {
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