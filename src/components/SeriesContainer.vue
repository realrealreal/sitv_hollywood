<template>
    <div class='series'>
      <ul class='tab'>
        <li v-for='(item, index) in list' :class="currentIndex == index?'current':''" @click='tab(index)'>{{item | showTab}}</li>
      </ul>
      <div class='container' @keydown=''>
        <transition v-for="(item, index) in list" name="right" enter-active-class="animated fadeInRight"
     leave-active-class="animated fadeOut"
     :duration="{ enter: 2000, leave: 800 }" v-on:before-leave="beforeLeave" v-on:after-enter="afterEnter" :key="'key-'+index">
          <div v-show='currentIndex == index'>
            <ul>
              <li v-for='value in item'><a ref='episodes' href="" @keydown='keydown($event, value.index, item.length)'>{{value.title}}</a></li>
            </ul>
          </div>
        </transition> 
      </div>
    </div>
</template>

<script>
const number = 9; 
export default {
  name: 'SeriesContainer',
  data () {
    return {
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
    let vm = this;
    setTimeout(function(){
      console.info(vm.$refs)
      vm.$refs.episodes[0].focus()
    },500)
    // this.$nextTick(() => {
    //   console.info(this.$refs)
    //   this.$refs.episodes[0].focus()
    // })
  },
  methods: {
    tab(index) {
      this.currentIndex = index
    },
    keydown(e, index, len) {
      console.info(e.keyCode, index, len)
      if(e.keyCode == 39 && index%3 == 0 && len == number){
        ++this.currentIndex;
      }
      if(e.keyCode == 37 && (index-1)%3 == 0 && this.currentIndex > 0){
        --this.currentIndex;
      }
    },
    // 过渡离开
    // 设置过渡离开之前的组件状态
    beforeLeave: function (el) {
      document.activeElement.blur()
    },
    // 设置过渡进入完成之后的组件状态
    afterEnter: function (el) {
      // ...
      console.info(el.children[0].children[0].children[0].focus())
    }
  },
  computed: {
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
    showTab(value) {
      let begin = value[0].index;
      let end = value[value.length-1].index;
      return begin+'-'+end;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
div.series
  padding-top 20px
  height 255px
  background url(../assets/images/bottomBg.png) no-repeat
  background-size cover
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