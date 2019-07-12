<template>
	<div id="index">
    <div>
      <div v-if="$route.name == 'Movielist'">
        <div><a href="">搜索</a></div>
        <img :src="biz_logo" alt="">  
      </div>
      <div v-if="$route.name == 'RepoList'">
        <h2>{{title[$route.params.name]}}</h2>
        <a href="">编辑</a>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :id="value.catcode" :class="value.code == $store.state.bizCode ? 'current' : ''" href="javascript:void(0)" @click='toggleCategroy(value)' v-test='categoryCode'>{{value.title}}</a></li>
      </ul>
    </div>
    <div v-if='config != null && data.length != 0' class='scroll' :class="config.lineNumber == 3 ? 'line-3' : ''">
      <ScrollList :data='data' :config='config' v-on:back='backMenu'/>
    </div>
  </div> 
</template>

<script>
const title = {
  'history': '观看历史',
  'collection': '我的收藏'
}
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
import {mapState} from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      data: [],
      config: null,
      leftColumn: [],
      title:title
      //current: this.$store.state.bizCode
    }
  },
  created() {
    this.init()
  },
  // mounted() {
  //   this.init()
  // },
  watch: {
    'categoryCode': {
        immediate: true,
        handler(newVal, oldVal) {
            console.log(this.leftColumn);
            console.info('watch----');
            console.log(newVal, oldVal);
            let vm = this;
            vm.data = [];
            vm.dataService.getCategroyList(vm.$store.state.categoryCode, function(res){
              if(res.data.status == 200){
                console.info(res.data);
                vm.data = res.data.categoryitem;
                console.info(vm.data)
              }
            });
            if(vm.leftColumn.length != 0){
              let key = vm.leftColumn.filter(function(item){
                  return item.code == vm.$store.state.bizCode
              })[0].subTitle;
              vm.config = {};
              vm.config = vm.GLOBAL.config[key]
            }
        }
    },

  },
  props: {
    
  },
  methods: {
    init(){
      console.info(this.$route.name);
      console.info(this.$route.params.type);
      if(this.$route.name == 'Movielist'){
        let vm = this;
        console.info('movie-------');
        console.info(vm.$store.state.parentCode);
        console.info(vm.$store.state.categoryCode);
        console.info(vm.$store.state.bizCode);
        console.info('-------');
        vm.dataService.getbizList(vm.$store.state.parentCode, function(res){
          console.info(res.data);
          if(res.data.status == 200){
            vm.leftColumn = res.data.bizlist;
            let key = vm.leftColumn.filter(function(item){
                return item.code == vm.$store.state.bizCode
            })[0].subTitle;
            vm.config = vm.GLOBAL.config[key]
            //vm.config = vm.GLOBAL.config.noImage;
          }
        });
      }else{

      }
    },
    toggleCategroy(value){
      console.info(value);
      let vm = this;
      vm.$store.dispatch('setCategoryCode', value.catcode);
      vm.$store.dispatch('setBizCode', value.code);
    },
    backMenu(){
      document.getElementById(this.categoryCode).focus();
    }
  },
  computed: {
    ...mapState([
      'categoryCode'
    ])
  },
  directives: {
    test:{
      inserted:function(el,binding,){//绑定到节点
            console.log('2 - inserted');
            console.log(binding);
            if(el.id == binding.value) el.focus();
   
      }
    }
  },
  components: {
    ScrollList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 100%
  height 100%
  margin 0 auto
  vertical-align top
  & > div
    display inline-block
    &:first-child
      padding-left 50px
      padding-right 36px
      width 160px
      text-align center
      height 720px
      position fixed
      top 0
      left 0
      background url(../../assets/images/leftShadow.png)
      & > div
        height 92px
        margin-top 30px
        font-size 20px
        & > img
          width 100%
          margin-top 20px
        & > a
          width 100%
          margin-top 20px
      & > ul
        margin-top 46px
        & > li
          font-size 26px
          margin-bottom 7px

#index > div:first-child > div > a, #index > div:first-child > ul > li > a
  width 100%
  padding 7px 0

#index > div:first-child > div > a:focus, #index > div:first-child > ul > li > a:focus
  outline none
  background-color $linkColor
  color $defaultFontColor
  border-radius 25px

.line-3
  margin-left 314px !important

.current
  color $linkColor
  &::after
    content ''
    display block
    border-bottom 2px solid $linkColor
    width 24px
    position relative
    top 4px
    left 50%
    margin-left -12px

.leftshadow
  position fixed
  left 0
  top 0
  
.scroll
  margin-left 264px
  margin-top 100px
  width 960px
</style>