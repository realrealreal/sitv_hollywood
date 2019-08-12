<template>
  <!-- 瀑布流组件 -->
  <ul>
    <li v-if="config.name != 'noImage'" v-for="(value, index) in loadedData"><Poster :width='config.width' :index='index' :item='value' :is-img-in="config.isImgIn" isCheck v-on:checkIndex='check' v-on:deleteItem='deleteItem' :column='Math.floor(index/config.lineNumber)' :isEdited='isEdited'/></li>
    <li v-if="config.name == 'noImage'" v-for="(value, index) in loadedData"><a :class='config.name' href="javascript:void(0)" @focus="checkInText($event, index)" @click='clickText(value.code || value.contentId || value.itemcode, value.type || value.itemtype || value.contentType, index)'>{{value.title || value.contentName}}<span class="iconfont iconjinzhi" v-if="isEdited"> 删除</span></a></li>
  </ul>
</template>

<script>
import '@/assets/css/iconfont/iconfont.css'
import {scrollTo} from '@/api/utils.js'
import Poster from '@/components/Poster'
import {mapActions} from 'vuex' //注册 action 和 state
import Animations from '@/assets/css/animations.css'
export default {
  name: 'ScrollList',
  data () {
    return {
      /**
       * [loadedData 加载的数据(不是所有数据)]
       * @type {Array}
       */
      loadedData: [],
      /**
       * [index 已经加载的数据条目(未加载的第一条数据的下标)]
       * @type {Number}
       */
      index: 0,
      /**
       * [timer 滚动定时器]
       * @type {[Array]}
       */
      timer: [undefined]
    }
  },
  watch: { //监听
    'data': {
      deep: true,
      handler(newVal, oldVal) {
        console.info('watch------',newVal)
      }
    }
  },
  mounted() {
    this.init()
  },
  props: {
    config: { //配置
      type: Object,
      required: true
    },
    data: {  // 所有数据
      type: Array,
      default: function () {
        return []
      }
    },
    isEdited: {//是否可以编辑
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * [init 初始化数据]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:42:53+0800
     * @return   {[type]}                 [null]
     */
    init(){
      console.info('init-----------',this.data);
      let length = this.data.length < this.config.initNumber ? this.data.length : this.config.initNumber;
      for (var i = 0; i < length; i++) {
        this.loadedData.push(this.data[i]);
        this.index++;
      }
      console.info(this.loadedData);
    },
    /**
     * [add 批量刷新]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:43:19+0800
     */
    add() {
      for (var i = 0; i < this.config.lineNumber; i++) {
        if(this.data[this.index]){
          this.loadedData.push(this.data[this.index]);
          this.index++;
        }else{
          return;
        }
      }
    },
    /**
     * [check 检查是否需要刷新]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:46:07+0800
     * @param    {[type]}                 data [所有数据]
     * @return   {[type]}                      [description]
     */
    check(data) {
      if(data.index >= this.loadedData.length-this.config.lineNumber){
        this.add();
      }
      let vm = this;
      vm.$nextTick(() => {
        let column = Math.ceil((data.index+1)/this.config.lineNumber);
        let el = document.getElementById('app');
        let scrollDistance = column-2 < 0 ? 0 : (column-2)*data.el.parentElement.offsetHeight
        scrollTo(el, 500, scrollDistance, 'scrollTop', 0, this)
      });
    },
    /**
     * [checkInText 文字聚焦]
     * @Author   shanjing
     * @DateTime 2019-08-12T14:27:18+0800
     * @param    {[type]}                 e [event]
     * @param    {[type]}                 i [description]
     * @return   {[type]}                   [description]
     */
    checkInText(e, i) {
      if(i >= this.loadedData.length-this.config.lineNumber){
        this.add();
      }
      let vm = this;
      vm.$nextTick(() => {
        let column = Math.ceil((i+1)/this.config.lineNumber);
        let el = document.getElementById('app');
        let scrollDistance = column-11 < 0 ? 0 : (column-11)*e.target.offsetHeight
        scrollTo(el, 500, scrollDistance, 'scrollTop', 0, this)
      });
    },
    /**
     * [clickText 点击文字]
     * @Author   shanjing
     * @DateTime 2019-08-12T14:15:49+0800
     * @return   {[type]}                 [description]
     */
    clickText(code,type,i){
      let vm = this; 
      if(vm.isEdited){
        vm.deleteItem({code:code})
      }else{
        vm.setProgramCode(code)
        vm.setProgramType(type)
        // if(vm.$route.name == 'Movielist'){ // 列表页跳转到详情页记忆焦点
        //   vm.setMemoryFocusIndex(i);
        // }
        vm.$router.push({path: '/hollywood/detail'});
      }
    },
    /**
     * [deleteItem 删除单条处理(删除一条添加一条)]
     * @Author   shanjing
     * @DateTime 2019-07-31T18:02:29+0800
     * @param    {[type]}                 value [description]
     * @return   {[type]}                       [description]
     */
    deleteItem(value){
      let loadedData = this.loadedData.filter(function(item){
          return item.contentId != value.code
      });
      this.loadedData = loadedData;
      if(this.data[this.index]!= undefined){
        this.loadedData.push(this.data[this.index]);
        this.index++;
      }
    },
    //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
    ...mapActions([
        'setProgramCode',
        'setProgramType',
        'setMemoryFocusIndex'
    ])
  },
  components: {
    Poster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
ul
  & > li
    display inline-block
    vertical-align middle
    margin-left 24px
    //margin-bottom 24px
    //padding-bottom 24px
    &:nth-child(4n+3) > a.noImage
    &:nth-child(4n+4) > a.noImage
          background rgba(27, 33, 44, 0.5)
    & > a.noImage
      padding-left 18px
      width 375px
      height 52px
      line-height 52px
      & > span
        position absolute
        right 2px
        top 2px
        bottom 2px
        width 73px
        background red
        text-align right
        padding-right 5px
        display none
      &:nth-child(4n+3)
        background rgba(27, 33, 44, 0.5)
      &:nth-child(4n+4)
        background rgba(27, 33, 44, 0.5)
      &:focus
        position relative
        z-index 19999
        & > span
          display block
</style>