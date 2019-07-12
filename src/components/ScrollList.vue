<template>
  <ul>
    <li v-if="config.name != 'noImage'" v-for="(value, index) in loadedData"><Poster :width='config.width' :index='index' :item='value' :is-img-in="config.isImgIn" isCheck v-on:checkIndex='check' v-on:back='back'/><!-- <a href="" @focus="check(key)"><img :src="rootImage+'P_'+value+'.jpg'" alt="" onerror="this.src='1.JPG'"></a> --></li>
    <li v-if="config.name == 'noImage'" v-for="(value, index) in loadedData"><a :class='config.name' href="" @focus="check({index: index})">{{value.title}}</a></li>
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
      //console.info("check:---------"+ data.index);
      if(data.index >= this.number-this.config.lineNumber){
        this.add();
      }
    },
    back(){
      this.$emit("back",{})
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
    margin-bottom 24px
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