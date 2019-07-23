<template>
  <ul>
    <li v-if="config.name != 'noImage'" v-for="(value, index) in loadedData"><Poster :width='config.width' :index='index' :item='value' :is-img-in="config.isImgIn" isCheck v-on:checkIndex='check' v-on:deleteItem='deleteItem' :column='Math.floor(index/config.lineNumber)'v-on:back='back' :isEdited='isEdited'/></li>
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
      loadedData: [], //加载的数据
      number: 0,
      timer: undefined
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
    init(){ //初始化数据
      console.info(this.data);
      let length = this.data.length < this.config.initNumber ? this.data.length : this.config.initNumber;
      for (var i = 0; i < length; i++) {
        this.loadedData.push(this.data[i]);
        this.number++;
      }
      console.info(this.loadedData);
    },
    add() { //刷新新条目
      //$scope.number += 6;
      for (var i = 0; i < this.config.lineNumber; i++) {
        if(this.data[this.number]){
          this.loadedData.push(this.data[this.number]);
          this.number++;
        }else{
          return;
        }
      }
    },
    check(data) {  //检查是否需要刷新
      console.info("check:---------"+ data.index);
      if(data.index >= this.number-this.config.lineNumber){
        this.add();
      }
      let vm = this;
      vm.$nextTick(() => {
        let column = Math.ceil((data.index+1)/this.config.lineNumber);
        let el = document.getElementById('app');
        let scrollDistance = column-2 < 0 ? 0 : (column-2)*data.el.parentElement.offsetHeight
        //vm.utils.scrollTo(el, 500, scrollDistance, 'scrollTop', vm.timer)
        this.scrollTo(el, 500, scrollDistance, 'scrollTop',this)
        //document.getElementById('app').scrollTop = column-2 < 0 ? 0 : (column-2)*data.el.parentElement.offsetHeight; //无动画效果的
        //console.info(document.getElementById('app').scrollTop);
      });
    },
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
    back(){
      this.$emit("back",{})
    },
    deleteItem(value){
      this.$emit('deleteItem',{code:value.code})
    }
  },
  filters: {
    computeColumn(value) {
      console.info(this)
      console.info('index------'+value);
      console.info('lineNunber------'+this.config.lineNumber);
      return Math.floor(value/this.config.lineNumber);
    }
  },
  computed: {  
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
.poster-li{
  margin-bottom 30px
}
</style>