<template>
	<div id="index">
    <div>
      <h1>人类消减计划</h1>
      <div>美国2016 136分钟 科幻
        <div>
          <span>导演</span>
          <ul>
            <li>1121212121212121212112</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <span>演职员</span>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <p v-test>{{miaoshu1}}</p>
      <div>
        <ul>
          <li><a href=""><img src="../../assets/images/china_blur.jpg" alt=""></a></li>
          <li><a href=""><img src="../../assets/images/english_blur.jpg" alt=""></a></li>
          <li><a href=""><img src="../../assets/images/control.png" alt=""><span class="collect">收藏</span></a></li>
        </ul>
        <span class='blue'>*该节目付费后可观看</span>
      </div>
      <img src="../../assets/images/test/544459_icon.jpg" alt="">
    </div>
    <div>
      <div class='blue'>猜你喜欢</div>
      <ul>
        <li v-for="(value, index) in bottom_recommand">
            <Poster width='120' />
        </li> 
      </ul>
    </div>
  </div>
</template>

<script>
import Poster from '@/components/Poster'
export default {
  name: 'Vod',
  data () {
    return {
      config:{},
      data: [],
      bottom_recommand: [1,2,3,4,5,6],
      miaoshu: '未来世界，为了解决人口过度膨胀的危机未来世界，为了解决人口过度膨胀的危机未来世界，为了解决人口过度膨胀的危机未来世界，为了解决人口过度膨胀的危机未来世界，为了解决人口过度'
    }
  },
  created() {
    this.init()
  },
  // mounted() {
  //   this.init()
  // },
  props: {
    
  },
  methods: {
    init(){
    }
  },
  computed: {
    miaoshu1: function () {
      return this.miaoshu.length > 78 ? this.miaoshu.substring(0,78-3)+'...' : this.miaoshu
    }
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
#index{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
#index > div:first-child {
  position: relative;
  height: 395px;
  margin-left: 270px;   
  margin-top: 50px;
  width: 560px;
}
#index > div:first-child > div:nth-child(2) {
  position: relative;
  margin-bottom: 21px;
}
#index > div:first-child > div:nth-child(4) {
  position: absolute;
  left: 0;
  bottom: 20px;
}
#index > div:first-child > div:nth-child(4) > ul > li {
  margin-right: 24px;
  display: inline-block;
}
#index > div:first-child > div:nth-child(4) > ul {
  margin-bottom: 21px;
}
#index > div:first-child > div > div {
    position: absolute;
    left: -201px;
    top: 0;
    width: 151px;
    text-align: right;
    word-wrap: break-word
}
#index > div:first-child > img {
  position: absolute;
  top: 0;
  right: -330px;
  width: 264px;
}
#index > div:last-child{
  padding: 20px 220px 0;
  height: 255px;
  background: url(../../assets/images/bottomBg.png);
}
#index > div:last-child > ul {
  margin-top: 10px;
  white-space: nowrap;
}
#index > div:last-child > ul > li {
  margin-right: 23px;
  display: inline-block;
}
.collect{
  position: absolute;
  left: 50%;
  bottom: 15px;
  transform: translate(-50%); 
}
.blue{
  color: #3B6BA5;
}
</style>