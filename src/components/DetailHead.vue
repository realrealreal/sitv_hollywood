<template>
    <!-- 详情页头部组件 -->
    <div class='head' v-if="data.title">
      <h1 class="white">{{data.title}}</h1>
      <div>{{programInfo}}
        <div>
          <span class="white">导演</span>
          <ul>
            <li v-for='(value, index) in data.directors[0].split(",")'>{{value}}</li>
          </ul>
          <br>
          <span class="white">演职员</span>
          <ul>
            <li v-for='(value, index) in data.actors[0].split(",")'>{{value}}</li>
          </ul>
        </div>
      </div>
      <p>{{description}}</p>
      <div>
        <ul>
          <li v-if="programType == 'mix'"><a id="play1" href="" v-focus='true'><img src="@/assets/images/china_blur.jpg" alt=""></a></li>
          <li v-if="programType == 'mix'"><a href=""><img src="@/assets/images/english_blur.jpg" alt=""></a></li>
          <li v-if="programType== 'vod'"><a id="play2" href="" v-focus='true'><img src="@/assets/images/control_bf.png" alt=""><span class="collect">播放</span></a></li>
          <li><a href=""><img src="@/assets/images/control.png" alt=""><span class="collect">收藏</span></a></li>
        </ul>
        <span class='blue'>*该节目付费后可观看</span>
      </div>
      <img :src="GLOBAL.config.base+data.icon" alt="">
  </div>
</template>

<script>
export default {
  name: 'DetailHead',
  data () {
    return {
    	
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    programType: {
      type: String,
      required: true
    }
  },
  computed: {
    description: function () {
      return this.data.desc.length > 78 ? this.data.desc.substring(0,78-3)+'...' : this.data.desc
    },
    programInfo: function(){
      let arr = [];
      let vm = this;
      if(vm.data.country){
        arr.push(vm.data.country);
      }
      if(vm.data.year){
        arr.push(vm.data.year);
      }
      if(vm.data.displayRunTime){
        arr.push(vm.data.displayRunTime+'分钟');
      }
      if(vm.data.mainFolder){
        arr.push(vm.data.mainFolder)
      }
      return arr.join(' • ');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
div.head
  position relative
  height 395px
  margin-left 270px
  margin-top 50px
  width 560px
  & > div
    &:nth-child(2)
      position relative
      margin-bottom 21px
    &:nth-child(4)
      position absolute
      left 0
      bottom 20px
      & > ul
        margin-bottom 21px
        & > li
          margin-right 24px
          display inline-block
    & > div
      position absolute
      left -201px
      top 0
      width 151px
      text-align right
      word-wrap break-word
  & > img
    position absolute
    top 0
    right -330px
    width 264px
    
.collect
  position absolute
  left 50%
  bottom 15px
  transform translate(-50%)
  white-space nowrap

h1
  font-size 36px
  font-weight normal
  
.blue
  color $blueFontColor

.white
  color $whiteFontColor
</style>