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
import {mapState} from 'vuex'
export default {
  name: 'Vod',
  data () {
    return {
      config:{},
      data: {},
      like: [],
      episodes: [],//多剧集
      //isFocus:true
    }
  },
  watch: {
    programCode(newValue, oldValue) {
      console.info('newValue*********'+ newValue);
      console.info('oldValue*********'+ oldValue);
      this.getDetails(newValue);
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
      this.getDetails(this.programCode)
    },
    getDetails(code){
      let vm = this;
      console.info(code);
      console.info(vm.programType);
      vm.dataService.queryDetails(vm.programType, code, function(res){
        console.info(res.data);
        vm.data = res.data[vm.programType];
        if(!vm.utils.empty(vm.data)){
          if(vm.programType == 'series'){
            vm.episodes = res.data.episodes;
          }else{
            vm.getYourLike(code);
          }
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
    }
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