<template>
	<div id="index">
    <div>
      <div v-if="$route.name == 'RepoList'">
        <h2>{{title[$route.params.name]}}</h2>
        <a href="javascript:void(0)" @click='edit'>{{editText}}</a>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'><a :ref="value.title" :class="value.title == current ? 'current' : ''" href="javascript:void(0)" @click='toggleCategroy(value)'>{{value.title}}</a></li>
      </ul>
    </div>
    <div v-if='config != null && data.length != 0' class='scroll' :class="config.lineNumber == 3 ? 'line-3' : ''" @keydown='keydown($event)'>
      <ScrollList :data='data' :config='config' :isEdited='isEdited' v-on:deleteItem='deleteItem' />
    </div>
    <div class='popupWindow' v-if='popWindow'>
      <HandleWindow :item='content' v-on:popWindow='popWindowHandle'/>
    </div>
  </div> 
</template>

<script>
const content1 = {
  text: '您将执行如下操作',
  btn: [
    {
      text: '删除单条',
      handle: function(vm){
        vm.isEdited = true;
        vm.popWindow = false;
        console.info('删除单条');
      }
    },{
      text: '清空历史',
      handle: function(vm){
        console.info(vm);
        console.info('清空历史');
        vm.content = content2
      }
    }
  ]
}
const content2 = {
   text: '您即将对历史进行清空，执行确认后将无法撤回',
   btn: [
    {
      text: '清空历史',
      handle: function(vm){
        console.info('清空历史');
      }
    },{
      text: '再考虑下',
      handle: function(vm){
        vm.popWindow = false;
        vm.content = content1;
        console.info('再考虑下');
      }
    }
  ]
}
const title = {
  'history': '观看历史',
  'collection': '我的收藏'
}
const leftColumn = [
  {
    title: '全部',
  },
  {
    title: '电影',
  },
  {
    title: '电视剧',
  },
  {
    title: '纪实',
  },
  {
    title: '少儿',
  },
  {
    title: '综艺',
  },
  {
    title: '其他',
  }
];
import HandleWindow from '@/components/HandleWindow'
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
import {mapState} from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      data: [],
      current: leftColumn[0].title,
      config: this.GLOBAL.config.poster,
      leftColumn: leftColumn,
      title:title,
      isEdited:false,
      popWindow: false,
      content:content1
    }
  },
  created() {
    console.info('-----------created')
    this.init()
  },
  mounted() {
    console.info('-----------mounted')
    //this.domInit()
  },
  /*updated() {
    console.info('-----------updated')
    this.$refs[this.current][0].focus();
  },*/
  watch: {
    'current': {
        //immediate: true,
        /**
         * [handler 监听$store categoryCode]
         * @Author   shanjing
         * @DateTime 2019-07-19T10:51:00+0800
         * @param    {[type]}                 newVal [新值]
         * @param    {[type]}                 oldVal [旧值]
         * @return   {[type]}                        [null]
         */
        handler(newVal, oldVal) {

            let vm = this;
            vm.data = [];     
            if(this.$route.params.name == 'history'){
              vm.dataService.queryHistory(function(res){
                console.info(res);
                vm.data = res.data.historyList;
              },newVal == '全部' ? '':newVal);
            }else{
              vm.dataService.queryCollection(function(res){
                console.info(res);
                vm.data = res.data.collectionList;
              },newVal == '全部' ? '':newVal);
            }
        }
    },

  },
  props: {
    
  },
  methods: {
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:50:00+0800
     * @return   {[type]}                 [null]
     */
    init(){
      console.info(this.$route.name);
      let vm = this;
      if(this.$route.params.name == 'history'){
        vm.dataService.queryHistory(function(res){
          console.info(res);
          vm.data = res.data.historyList;
        },'');
      }else{
        vm.dataService.queryCollection(function(res){
          console.info(res);
          vm.data = res.data.collectionList;
        },'');
      }
    },
    /**
     * [toggleCategroy 切换展示栏目]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:49:23+0800
     * @param    {[type]}                 value [栏目信息]
     * @return   {[type]}                       [null]
     */
    toggleCategroy(value){
      console.info(value);
      let vm = this;
      vm.current = value.title;
      //vm.$store.dispatch('setCategoryCode', value.catcode);
      //vm.$store.dispatch('setBizCode', value.code);
    },
    /**
     * [keydown 按键监听]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:48:15+0800
     * @param    {[type]}                 e [事件]
     * @return   {[type]}                   [null]
     */
    keydown(e){
      console.info(e.keyCode)
      if(e.keyCode == 4096){
        e.preventDefault();
        this.backMenu();
      }
    },
    /**
     * [backMenu 返回左侧菜单]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:47:44+0800
     * @return   {[type]}                 [null]
     */
    backMenu(){
      console.info(this.categoryCode)
      console.info(this.$refs[this.current][0])
      this.$refs[this.current][0].focus();
    },
    popWindowHandle(value){
      value.handle(this);
      //console.info(value.index)
    },
    edit(){
      this.popWindow = true
    },
    deleteItem(value){
      console.info('父级--------'+value.code)
      /*let data = this.data.filter(function(item){
          return item.contentId != value.code
      });*/
      //this.data = [];
      //this.data = data;
      for (var i = 0; i < this.data.length; i++) {
        if(this.data[i].contentId == value.code){
          this.data.splice(i,1);
          //this.$forceUpdate()
          break;
        }
      }
      console.info(this.data)
      //console.info(this.data)
    }
  },
  computed: {
    editText(){
      return this.isEdited? '按返回完成':'编辑'
    }
  },
  directives: {
  },
  components: {
    ScrollList,
    HandleWindow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  position relative
  width 100%
  height 100%
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
.popupWindow
  position fixed
  left 0
  top 0
  width 100%
  height 100%
</style>