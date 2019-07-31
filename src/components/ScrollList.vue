<template>
  <!-- 瀑布流组件 -->
  <ul>
    <li v-if="config.name != 'noImage'" v-for="(value, index) in loadedData"><Poster :width='config.width' :index='index' :item='value' :is-img-in="config.isImgIn" isCheck v-on:checkIndex='check' v-on:deleteItem='deleteItem' :column='Math.floor(index/config.lineNumber)'      :isEdited='isEdited'/></li>
    <li v-if="config.name == 'noImage'" v-for="(value, index) in loadedData"><a :class='config.name' href="" @focus="check({index: index})">{{value.title || value.contentName}}</a></li>
  </ul>
</template>

<script>
import Poster from '@/components/Poster'
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
       * @type {[Object]}
       */
      timer: undefined
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
        this.scrollTo(el, 500, scrollDistance, 'scrollTop',this)
      });
    },
    /**
     * [scrollTo 滚动实现]
     * @Author   shanjing
     * @DateTime 2019-07-31T17:47:39+0800
     */
    scrollTo(el,scrollDuration,distance,direction,vm) {
        console.info('shanjing========='+this.timer);
        var scrollStep = (distance-el[direction]) / (scrollDuration / 15)
        clearInterval(vm.timer);
        vm.timer = setInterval(function(){
          if ( el[direction] != distance ) {
            el[direction] += scrollStep;
            if(scrollStep < 0 && el[direction] < distance || scrollStep > 0 && el[direction] > distance){
              el[direction] = distance
            }
          }else {
              clearInterval(vm.timer);
            }
        },15);
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
    }
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
    padding-bottom 24px
    &:nth-child(4n+3) > a.noImage
    &:nth-child(4n+4) > a.noImage
          background rgba(27, 33, 44, 0.5)
    & > a.noImage
      padding 10px
      width 397px
      &:nth-child(4n+3)
          background rgba(27, 33, 44, 0.5)
      &:nth-child(4n+4)
          background rgba(27, 33, 44, 0.5)
</style>