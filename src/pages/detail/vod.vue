<template>
	<div id="detail">
    <!-- 单剧集&&多剧集 -->
    <div v-if="!openFrame">
      <DetailHead v-if="programType == 'vod' || programType == 'mix' || programType == 'series' " :data='data' :program-type='programType' :collected='collected' v-on:play-request='play' v-on:collect-request='toggleCollect'/>
      <div v-if="programType == 'album'" :class='programType' :style="{background: `url(${GLOBAL.config.base + data.background}) no-repeat`}">
        <SeriesContainer :items='episodes' v-on:play-request='play'/>
      </div>
      <div v-if="programType == 'series'" :class='programType'>
        <SeriesContainer :items='episodes' v-on:play-request='play'/>
      </div>
      <div v-if="programType == 'vod' || programType == 'mix'" :class='programType'>
        <YourLike :items='like'/>
      </div>
      <a href="javsscript:void(0)" class='collect' v-if="programType == 'album'" @click='toggleCollect'>
        <span>{{collected ? '已':''}}收藏</span>
      </a>
    </div>
    <!-- iframe -->
    <Iframe v-if='openFrame'/>
  </div>
</template>

<script>
import {empty} from '@/api/utils.js'
import Iframe from '@/components/Iframe'
import SeriesContainer from '@/components/SeriesContainer'
import DetailHead from '@/components/DetailHead'
import YourLike from '@/components/YourLike'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Vod',
  data () {
    return {
      /**
       * [config 配置]
       * @type {Object}
       */
      config:{},
      /**
       * [data 影片信息]
       * @type {Object}
       */
      data: {},
      like: [],
      /**
       * [episodes 多剧集]
       * @type {Array}
       */
      episodes: [],
      /**
       * [openFrame 是否打开iframe]
       * @type {Boolean}
       */
      openFrame: false,
      /**
       * [collected 是否收藏]
       * @type {Boolean}
       */
      collected: false
    }
  },
  watch: {
    programCode(newValue, oldValue) {
      this.getDetails(newValue, this.programType);
      this.isCollectd(newValue)
    }
    // '$route' (to, from) {
    //   console.info('watch-------') 
    //   console.info(to)
    //   console.info(from)
    // }
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
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-30T16:12:56+0800
     * @return   {[type]}                 [null]
     */
    init(){
      // console.info(this.$route.query)
      if(this.$route.query.programcode && this.$route.query.programtype){
        this.setProgramType(this.$route.query.programtype);
        this.setProgramCode(this.$route.query.programcode);
        //this.getDetails(this.$route.query.programcode, this.$route.query.programtype)
      }else{
        this.getDetails(this.programCode, this.programType);
        this.isCollectd(this.programCode);
      }
    },
    /**
     * [getDetails 获取节目信息]
     * @Author   shanjing
     * @DateTime 2019-07-30T16:13:32+0800
     * @param    {[type]}                 code [节目code]
     * @param    {[type]}                 type [节目类型]
     * @return   {[type]}                      [null]
     */
    getDetails(code, type){
      let vm = this;
      vm.dataService.queryDetails(type, code, function(res){
        //console.info(res.data);
        vm.data = res.data[type];
        if(type == 'mix'){
          vm.data['mixPrograms'] = res.data['mixPrograms'];
        }
        console.info(vm.data)
        if(!empty(vm.data)){
          if(type == 'series'){
            vm.episodes = res.data.episodes;
          }else if(type == 'album'){
            vm.episodes = res.data.albumitem;
          }else{
            vm.getYourLike(code);
          }
        }
      });
    },
    /**
     * [getYourLike 获取猜你喜欢信息]
     * @Author   shanjing
     * @DateTime 2019-07-30T16:14:13+0800
     * @param    {[type]}                 code [节目code]
     * @return   {[type]}                      [null]
     */
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
        let num = res.data.JSONArray.length;
        if(num == 0) return;
        while (vm.like.length <  6)
        {
           let randomIndex = Math.floor(Math.random()*num);
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
    },
    /**
     * [isCollectd 判断是否收藏]
     * @Author   shanjing
     * @DateTime 2019-08-01T16:51:39+0800
     * @param    {[type]}                 code [description]
     * @return   {Boolean}                     [description]
     */
    isCollectd(code) {
      let vm = this;
      vm.dataService.queryIsCollected(function(res){
        if(res.data.collectionList.length > 0){
          vm.collected = true
        }else{
          vm.collected = false
        }
      },code);
    },
    toggleCollect(value){
      let vm = this;
      // let _query = {
      //   'contentType': vm.programType,
      //   'contentId': vm.programCode,
      //   'contentName': vm.data.title,
      //   'contentPoster': vm.data.poster,
      //   'category': vm.data.mainFolder ? vm.data.mainFolder : ''
      // }
      if(vm.collected){//取消收藏
        // vm.dataService.deleteCollection(function(res){
        //   if(res.result == 200){
        //     vm.collected = false
        //   }
        // },_query);
      }else{//添加收藏
        // vm.dataService.addCollection(function(res){
        //   if(res.result == 200){
        //     vm.collected = true
        //   }
        // },_query);
      }
      vm.collected = !vm.collected 
    },
    /**
     * [play 点击播放]
     * @Author   shanjing
     * @DateTime 2019-08-01T12:04:58+0800
     * @param    {[type]}                 data [description]
     * @return   {[type]}                      [null]
     */
    play(data){
      if(this.auth(data.code)){//鉴权成功
        this.openFrame = true
        console.info('play-----------------');  
      }else{
        console.info('order----------------');
      }
    },
    /**
     * [auth 鉴权]
     * @Author   shanjing
     * @DateTime 2019-08-01T12:06:39+0800
     * @return   {[type]}                 [description]
     */
    auth(code){
      console.info(code)
      console.info('auth-----------------');
      return true
    },
       //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
    ...mapActions([
        'setProgramCode',
        'setProgramType'
    ])
  },
  computed: {
    ...mapState([
      'programCode',
      'programType'
    ])
  },
  components: {
    DetailHead,
    YourLike,
    SeriesContainer,
    Iframe
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
div#detail
  height 100%
  & > div > div.album
    padding-top 445px
    background-size cover !important;
  & > div > div.series,& > div > div.vod
    background url(../../assets/images/bottomBg.png) no-repeat
    background-size cover
a.collect
  position absolute
  right 0
  top 50%
  transform translateY(-50%)
  width 120px
  height 72px
  background url(../../assets/images/album_coll.png) no-repeat
  outline none
  animation none
  text-align center
  line-height 100px
  background-size cover
  &:focus
    color $blackColor
    background url(../../assets/images/album_coll_focus.png) no-repeat
    background-size cover
</style>