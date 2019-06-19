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
<style scoped>
div {
  width: 88.125%;
  margin: 0 auto;
  margin-top: 10px;
}
div > ul {
  width: 100%;
  list-style: none;
  overflow: hidden;
  white-space: nowrap;
}
div > ul > li{
  display: inline-block;
  margin-right: 24px;
}
</style>