<!-- 测试页面 -->
<template>
  <div>
    <DetailHead :data='data' program-type='vod'/>
    <YourLike :items='like'/>
  </div>
    
</template>
<script>
import DetailHead from '@/components/DetailHead'
import YourLike from '@/components/YourLike'
export default {
  name: 'Test',
  data () {
    return {
      data: {},
      like: []
    }
  },
  created() {
    this.init()
  },
  components: {

  },
  methods: {
    init(){
      this.getDetails()
    },
    getDetails(){
      let vm = this;
      //console.info(code);
      vm.dataService.queryDetails('vod', 'program_ccms_859888', function(res){
        //console.info(res.data);
        vm.data = res.data['vod'];
        if(!vm.utils.empty(vm.data)){
          vm.getYourLike('program_ccms_859888');
        }
        console.info(vm.data)
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
  components: {
    DetailHead,
    YourLike
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index {
}
</style>
