<template>
	<div id="index">
    <div>
      <div v-if="$route.name == 'Movielist'">
        <div><a href="">搜索</a></div>
        <img :src="biz_logo" alt="">  
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :ref="value.catcode" :class="value.code == $store.state.bizCode ? 'current' : ''" href="javascript:void(0)" @click='toggleCategroy(value)'>{{value.title}}</a></li>
      </ul>
    </div>
    <div v-if='config != null && data.length != 0' class='scroll' :class="config.lineNumber == 3 ? 'line-3' : ''" @keydown='keydown($event)'>
      <ScrollList :data='data' :config='config' ref='poster'/>
    </div>
  </div> 
</template>

<script>
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
import {mapState} from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      data: [],
      config: null,
      leftColumn: [],
    }
  },
  created() {
    console.info('-----------created')
    this.init()
  },
  updated() {
    console.info('-----------updated')
    if(this.$route.meta.isBack){
      console.info('-----------updated------isBack')
      console.info(this.$refs);
      console.info(this.memoryFocusIndex);
    }else{
      this.$refs[this.categoryCode][0].focus();
    } 
  },
  activated() { //keepalive时 该生命周期/钩子函数 才有效
    console.info('-----------activated')
    console.info(this.$route.meta.isBack)
    if(this.$route.meta.isBack){
      console.info('-----------isBack')
      this.$refs.poster.$children[this.memoryFocusIndex].$el.focus()
    }else{
      this.init()
    }
  },
  watch: {
    'categoryCode': {
        immediate: true,
        /**
         * [handler 监听$store categoryCode]
         * @Author   shanjing
         * @DateTime 2019-07-19T10:51:00+0800
         * @param    {[type]}                 newVal [新值]
         * @param    {[type]}                 oldVal [旧值]
         * @return   {[type]}                        [null]
         */
        handler(newVal, oldVal) {
            console.info('watch----');
            console.log(newVal, oldVal);
            let vm = this;
            vm.data = [];
            vm.dataService.getCategroyList(vm.$store.state.categoryCode, function(res){
              if(res.data.status == 200){
                console.info(res.data);
                vm.data = res.data.categoryitem;
                console.info(vm.data)
              }
            });
            if(vm.leftColumn.length != 0){
              let key = vm.leftColumn.filter(function(item){
                  return item.code == vm.$store.state.bizCode
              })[0].subTitle;
              vm.config = {};
              vm.config = vm.GLOBAL.config[key]
            }
        }
    }
  },
  methods: {
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:50:00+0800
     * @return   {[type]}                 [null]
     */
    init(){
      // console.info(this.$route.name);
      // console.info(this.$route.params.type);
      // if(this.$route.name == 'Movielist'){
      let vm = this;
      vm.dataService.getbizList(vm.$store.state.parentCode, function(res){
        if(res.data.status == 200){
          vm.leftColumn = res.data.bizlist;
          let key = vm.leftColumn.filter(function(item){
              return item.code == vm.$store.state.bizCode
          })[0].subTitle;
          vm.config = vm.GLOBAL.config[key]
        }
      });
      // }else{

      // }
    },
    /**
     * [toggleCategroy 切换展示栏目]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:49:23+0800
     * @param    {[type]}                 value [栏目信息]
     * @return   {[type]}                       [null]
     */
    toggleCategroy(value){
      console.info(value);
      let vm = this;
      vm.$store.dispatch('setCategoryCode', value.catcode);
      vm.$store.dispatch('setBizCode', value.code);
    },
    /**
     * [keydown 按键监听]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:48:15+0800
     * @param    {[type]}                 e [事件]
     * @return   {[type]}                   [null]
     */
    keydown(e){
      console.info(e.keyCode)
      if(e.keyCode == 4096){
        e.preventDefault();
        this.backMenu();
      }
    },
    /**
     * [backMenu 返回左侧菜单]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:47:44+0800
     * @return   {[type]}                 [null]
     */
    backMenu(){
      console.info(this.categoryCode)
      console.info(this.$refs[this.categoryCode][0])
      this.$refs[this.categoryCode][0].focus();
    }
  },
  computed: {
    ...mapState([
      'categoryCode',
      'memoryFocusIndex'
    ])
  },
  components: {
    ScrollList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 100%
  height 100%
  margin 0 auto
  vertical-align top
  & > div
    display inline-block
    &:first-child
      padding-left 50px
      padding-right 36px
      width 160px
      text-align center
      height 720px
      position fixed
      top 0
      left 0
      background url(../../assets/images/leftShadow.png)
      & > div
        height 92px
        margin-top 30px
        font-size 20px
        & > img
          width 100%
          margin-top 20px
        & > a
          width 100%
          margin-top 20px
      & > ul
        margin-top 46px
        & > li
          font-size 26px
          margin-bottom 7px

#index > div:first-child > div > a, #index > div:first-child > ul > li > a
  width 100%
  padding 7px 0

#index > div:first-child > div > a:focus, #index > div:first-child > ul > li > a:focus
  outline none
  background-color $linkColor
  color $defaultFontColor
  border-radius 25px

.line-3
  margin-left 314px !important

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

.leftshadow
  position fixed
  left 0
  top 0
  
.scroll
  margin-left 264px
  margin-top 100px
  width 960px
</style>