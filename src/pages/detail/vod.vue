<template>
	<div>
    <DetailHead :data='data' :program-type='programType'/>
    <div v-if="programType == 'series'">
      <SeriesContainer :items='episodes'/>
    </div>
    <div v-else>
      <YourLike :items='like'/>
    </div>
  </div>
</template>

<script>
import SeriesContainer from '@/components/SeriesContainer'
import DetailHead from '@/components/DetailHead'
import YourLike from '@/components/YourLike'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Vod',
  data () {
    return {
      config:{},
      data: {},
      like: [],
      episodes: []//多剧集
    }
  },
  watch: {
    programCode(newValue, oldValue) {
      this.getDetails(newValue, this.programType);
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
        this.getDetails(this.programCode, this.programType)
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
        console.info(res.data);
        vm.data = res.data[type];
        if(!vm.utils.empty(vm.data)){
          if(type == 'series'){
            vm.episodes = res.data.episodes;
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
    SeriesContainer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
</style>