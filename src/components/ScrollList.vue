<template>
  <ul>
    <li v-for="(value, index) in loadedData"><Poster :width='config.width' :index='index' :is-img-in="config.isImgIn" isCheck v-on:checkIndex='check'/><!-- <a href="" @focus="check(key)"><img :src="rootImage+'P_'+value+'.jpg'" alt="" onerror="this.src='1.JPG'"></a> --></li>
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
      number: 0
    }
  },
  mounted() {
    this.init()
  },
  props: {
    config: { //配置
      type: Object,
      required: true
      /*default: function () {
        return {
          initNumber: 15, //初始值总数量
          lineNumber: 5, //每行数量
          width: '168',
          isImgIn: false
        }
      }*/
    },
    data: {  // 所有数据
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    init(){ //初始化数据
      let length = this.data.length < this.config.initNumber ? this.data.length : this.config.initNumber;
      for (var i = 0; i < length; i++) {
        this.loadedData.push(this.data[i]);
        this.number++;
      }
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
      //console.info("check:---------"+ data.index);
      if(data.index >= this.number-this.config.lineNumber){
        this.add();
      }
    }
  },
  computed: {
    
  },
  directives: {
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
    margin-bottom 30px
</style>