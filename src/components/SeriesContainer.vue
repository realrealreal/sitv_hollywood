<template>
  <!-- 多剧集底部 -->
  <div class='series'>
    <img src="@/assets/images/prev_icon.png" alt="" v-show='currentIndex > 0'> 
    <img src="@/assets/images/next_icon.png" alt="" v-show='list.length > 0 && currentIndex != list.length-1'>
    <ul class='tab'>
      <li v-for='(item, index) in list'><a href="javascript:void(0)" @click='tab(index)' :class="currentIndex == index?'current':''">{{item,index | showTab(index)}}</a></li>
    </ul>
    <div class='container' @keydown=''>
      <transition v-for="(item, index) in list" name="right" enter-active-class="animated fadeInRight"
   leave-active-class="animated fadeOut"
   :duration="{ enter: 1500, leave: 800 }" v-on:before-leave="beforeLeave" v-on:after-enter="afterEnter" :key="'key-'+index">
        <div v-show='currentIndex == index'>
          <ul>
            <li v-for='(value, index) in item'><a ref='episodes' href="javascript:void(0)" @keydown='keydown($event, index+1, item.length)' @click='goPlay(value.programcode)'>{{value.title | showTitle}}</a></li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * [number 单页数量]
 * @type {Number}
 */
const number = 9; 
export default {
  name: 'SeriesContainer',
  data () {
    return {
      /**
       * [currentIndex 当前的页码 从0开始记数]
       * @type {Number}
       */
      currentIndex: 0
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  mounted(){
    //初始化获得焦点
    let vm = this;
    setTimeout(function(){
      console.info(vm.$refs)
      vm.$refs.episodes[0].focus()
    },500)
  },
  methods: {
    /**
     * [tab 切换page]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:31:37+0800
     * @param    {[type]}                 index [页码]
     * @return   {[type]}                       [null]
     */
    tab(index) {
      this.currentIndex = index
    },
    /**
     * [keydown 控制选集最左最右切换页码]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:32:16+0800
     * @param    {[type]}                 e     [event]
     * @param    {[type]}                 index [集数下标]
     * @param    {[type]}                 len   [该页数量]
     * @return   {[type]}                       [null]
     */
    keydown(e, index, len) {
      console.info(e.keyCode, index, len)
      if(e.keyCode == 39 && index%3 == 0 && len == number){
        ++this.currentIndex;
      }
      if(e.keyCode == 37 && (index-1)%3 == 0 && this.currentIndex > 0){
        --this.currentIndex;
      }
    },
    /**
     * [goPlay 播放请求]
     * @Author   shanjing
     * @DateTime 2019-08-01T12:12:08+0800
     * @param    {[type]}                 code [节目code]
     * @return   {[type]}                      [description]
     */
    goPlay(code) {
      console.info(code)
      this.$emit('play-request', {code: code});
    },
    // 过渡离开
    // 设置过渡离开之前的组件状态
    beforeLeave: function (el) {
      document.activeElement.blur()
    },
    // 设置过渡进入完成之后的组件状态
    afterEnter: function (el) {
      el.children[0].children[0].children[0].focus()
    }
  },
  computed: {
    /**
     * [list 分页处理]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:35:00+0800
     * @return   {[type]}                 [null]
     */
    list: function () {
      let length = Math.ceil(this.items.length/number)
      let list = [];
      for (var i = 0; i < length; i++) {
        list.push(this.items.splice(0,number))
      }
      return list;
    }
  },
  filters: {
    /**
     * [showTab tab显示处理]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:35:19+0800
     * @param    {[type]}                 a [description]
     * @param    {[type]}                 b [description]
     * @return   {[type]}                       [null]
     */
    showTab(a,b) {
      let begin = a[0].index || b*number+1;
      let end = a[a.length-1].index || b*number+a.length;
      return begin+'-'+end;
    },
    showTitle(value){
      return value.length > 16 ? value.substring(0,16)+'...' : value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
div.series
  position relative
  padding-top 20px
  height 255px
  & > img
    position absolute
    top 50%
    transform translateY(-50%)
    &:nth-child(1)
      left 40px
    &:nth-child(2)
      right 40px
  & > div.container   
    width 1100px
    margin 0 auto
    position relative
    & > div 
      position absolute
      left 0
      top 0
      & > ul > li > a
        position: relative;
        width 360px
        height 48px
        line-height 48px
        padding-left 2px
        margin 2px
        background-color: #181b22
        &:focus
          z-index:10000;
      
ul > li
  display inline-block
ul.tab
  width 1100px
  margin 0 auto 20px
  & > li
    margin-right 20px
    & > a
      padding 5px
    
.current
  color $linkColor
  &::after
    content ''
    display block
    border-bottom 2px solid $linkColor
    width 24px
    position relative
    top 4px
    left 50%
    margin-left -12px
</style>