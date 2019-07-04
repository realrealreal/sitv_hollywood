<template>
	<div id="index">
    <div v-if="data.title">
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
          <li><a href=""><img src="../../assets/images/china_blur.jpg" alt=""></a></li>
          <li><a href=""><img src="../../assets/images/english_blur.jpg" alt=""></a></li>
          <li><a href=""><img src="../../assets/images/control.png" alt=""><span class="collect">收藏</span></a></li>
        </ul>
        <span class='blue'>*该节目付费后可观看</span>
      </div>
      <img :src="GLOBAL.config.base+data.icon" alt="">
    </div>
    <div>
      <div class='blue'>猜你喜欢</div>
      <ul>
        <li v-for="(value, index) in like">
            <Poster width='120' :item='value'/>
        </li> 
      </ul>
    </div>
  </div>
</template>

<script>
import Poster from '@/components/Poster'
import {mapState} from 'vuex'
export default {
  name: 'Vod',
  data () {
    return {
      config:{},
      data: {},
      like: []
    }
  },
  watch: {
    programCode(newValue, oldValue) {
      console.info('newValue*********'+ newValue);
      console.info('oldValue*********'+ oldValue);
      this.getVodDetail(newValue);
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
      this.getVodDetail(this.programCode)
    },
    getVodDetail(code){
      let vm = this;
      console.info(code);
      vm.dataService.queryVodDetail(code,function(res){
        console.info(res.data);
        vm.data = res.data.vod;
        if(!vm.utils.empty(vm.data)){
          vm.getYourLike(code);
        }
      });
    },
    getYourLike(code){
      console.info('your like***********************'+code);
      let vm = this;
      vm.dataService.search({
        action: 'byTag',
        condition: vm.data.courty+','+vm.data.subFolder+','+vm.data.tags,
        curPage: 1,
        pageSize: 50,
        mainFolder: vm.data.mainFolder,
        hdType: 1
      },function(res){
        console.info('your like***********************');
        vm.like = [];
        while (vm.like.length <  6)
        {
           let randomIndex = Math.floor(Math.random()*50);
           let status = false;
           if(res.data.JSONArray[randomIndex].code == code){
              continue;
           }
           for (var i = 0; i < vm.like.length; i++) {
             if(vm.like[i].code == res.data.JSONArray[randomIndex].code){
                status = true;
                break;
              }
           }
           if(status){
              continue;
           }
           vm.like.push(res.data.JSONArray[randomIndex]);
        }
        console.info(vm.like);
      })
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
    },
    ...mapState([
      'programCode'
    ])
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
  background: url(../../assets/images/bottomBg.png) no-repeat;
  background-size: cover;
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
h1{
  font-size: 36px;
  font-weight: normal;
}
.blue{
  color: $blueFontColor;
}
.white{
  color: $whiteFontColor
}
</style>