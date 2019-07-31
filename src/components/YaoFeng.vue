<template>
  <!-- 腰封组件 -->
  <div>
    <ul>
      <li class="iconfont" v-for='item in items' :key='item.code'>
        <a href="javascript:void(0)" @click='clickItem(item)'>              
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
  },
  methods: {
    /**
     * [clickItem 点击腰封图片处理]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:26:52+0800
     * @param    {[type]}                 item [展示栏目]
     * @return   {[type]}                      [null]
     */
    clickItem(item){
      console.info(item);
      let vm = this;
      vm.$store.dispatch('setParentCode', item.parentCode);
      vm.$store.dispatch('setCategoryCode', item.categoryCode);
      vm.$store.dispatch('setBizCode', item.code);
      /**
       * [if 测试用 （请删除）]
       */
      if(item.parentCode == 'ccms_biz_67449672'){
        vm.$store.dispatch('setParentCode', 'ccms_biz_33445409');
        vm.$store.dispatch('setCategoryCode', 'ccms_category_69703289');
        vm.$store.dispatch('setBizCode', 'ccms_biz_55118392');
      }
      vm.$router.push({path: '/hollywood/movielist'});
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
  overflow-x scroll
  white-space nowrap
  &::-webkit-scrollbar
    display none
  & > ul
    display inline-block
    & > li
      display inline-block
      margin-right 24px
      & img
        width 120px
</style>