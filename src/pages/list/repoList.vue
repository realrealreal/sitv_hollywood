<template>
	<div id="index">
    <div @keydown='keydownInLeft($event)'>
      <div v-if="$route.name == 'RepoList'">
        <h2>{{title[$route.params.name]}}</h2>
        <div v-if='isEdited'>{{editText}}</div>
        <a v-if='!isEdited' href="/#/hollywood/repo/history" @click='edit'>{{editText}}</a>
      </div>
      <ul>
        <li v-for='(value, index) in leftColumn'>
          <a v-if='index == 0' v-focus='false' :ref="value.index" :class="value.index == current ? 'current' : ''" href="javascript:void(0)" @click='toggleCategroy(value)'>{{value.title}}</a>
          <a v-if='index != 0' :ref="value.index" :class="value.index == current ? 'current' : ''" href="javascript:void(0)" @click='toggleCategroy(value)'>{{value.title}}</a>
        </li>
      </ul>
    </div>
    <div v-if='config != null && data.length != 0' class='scroll' :class="config.lineNumber == 3 ? 'line-3' : ''" @keydown='keydownInRight($event)'>
      <ScrollList ref='list' :data='data' :config='config' :is-edited='isEdited' v-on:deleteItem='deleteItem' />
    </div>
    <div class='popupWindow' v-if='popWindow'>
      <HandleWindow :item='content' v-on:popWindow='popWindowHandle'/>
    </div>
  </div> 
</template>

<script>
// 获取本周的时间戳
function getCurrentWeekTimestamp(){
  let current = new Date();
  let week = current.getDay() == 0 ? 6 : current.getDay()-1;
  //let times = current.getTime();
  let hour = current.getHours();
  let minute = current.getMinutes();
  let second = current.getSeconds();
  let weekBeginTime = Math.floor(current / 1000)*1000 - week *24 *60 *60 *1000 - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000;
  //let lastWeekBeginTime = weekBeginTime - 7 *24 *60 *60 *1000;
  return weekBeginTime;
}
const content1 = {
  text: '您将执行如下操作',
  btn: [
    {
      text: '删除单条',
      handle: function(vm){
        vm.isEdited = true;
        vm.popWindow = false;
        console.info(vm)
        vm.$nextTick(() => {
          
          let _a = vm.$refs.list.$el.children[0].children[0]  //vm.$refs.list.$children[0].$el
          _a.focus()

        });
        // setTimeout(function(){
        //   vm.$refs.list.$children[0].$el.focus()
        // });
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
        vm.popWindow = false;
        vm.data = [];
        console.info('清空历史');
        vm.$nextTick(() => {
          vm.$refs[vm.current][0].focus()
        });
      }
    },{
      text: '再考虑下',
      handle: function(vm){
        vm.popWindow = false;
        vm.content = content1;
        console.info('再考虑下');
        vm.$nextTick(() => {
          vm.$refs[vm.current][0].focus()
        });
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
    index:0,
    title:'全部',
  },
  {
    index:1,
    title:'本周',
  },
    {
    index:2,
    title:'上周',
  },
  {
    index:3,
    title:'更早',
  }
];
import HandleWindow from '@/components/HandleWindow'
import ScrollList from '@/components/ScrollList'
import Animations from '@/assets/css/animations.css'
import {mapState} from 'vuex'
import {dateToStr} from '@/api/utils.js'
export default {
  name: 'List',
  data () {
    return {
      data: [],
      current: leftColumn[0].index,
      config: this.GLOBAL.config.noImage,//this.GLOBAL.config.poster
      leftColumn: leftColumn,
      title:title,
      isEdited:false,
      popWindow: false,
      content:content1
    }
  },
  created() {
    this.init()
  },
  mounted() {
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
                if(newVal == 0){
                  vm.data = res.data.historyList;
                }else if(newVal == 1){
                  vm.data = res.data.historyList.filter(function(item){
                      console.info(item.updateTime);
                      return item.updateTime >= dateToStr(new Date(getCurrentWeekTimestamp()))
                  })
                }else if(newVal == 2){
                  vm.data = res.data.historyList.filter(function(item){
                      return item.updateTime < dateToStr(new Date(getCurrentWeekTimestamp())) && item.updateTime >= dateToStr(new Date(sj - 7 *24 *60 *60 *1000 ))
                  })
                }else{
                  vm.data = res.data.historyList.filter(function(item){
                      return item.updateTime < dateToStr(new Date(sj - 7 *24 *60 *60 *1000 ))
                  })
                }
                //vm.data = res.data.historyList;
              },'');
            }else{
              vm.dataService.queryCollection(function(res){
                console.info(res);
                //vm.data = res.data.collectionList;
                if(newVal == 0){
                  vm.data = res.data.collectionList;
                }else if(newVal == 1){
                  vm.data = res.data.collectionList.filter(function(item){
                      console.info(item.updateTime);
                      return item.updateTime >= dateToStr(new Date(getCurrentWeekTimestamp()))
                  })
                }else if(newVal == 2){
                  vm.data = res.data.collectionList.filter(function(item){
                      return item.updateTime < dateToStr(new Date(getCurrentWeekTimestamp())) && item.updateTime >= dateToStr(new Date(sj - 7 *24 *60 *60 *1000 ))
                  })
                }else{
                  vm.data = res.data.collectionList.filter(function(item){
                      return item.updateTime < dateToStr(new Date(getCurrentWeekTimestamp() - 7 *24 *60 *60 *1000 ))
                  })
                }
              },'');
            }
        }
    },

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
      vm.current = value.index;
    },
    keydownInLeft(e){
      if(e.keyCode == 4096 && this.isEdited){
        e.preventDefault();
        this.isEdited = false;
      }
    },
    /**
     * [keydownInRight 右侧按键监听]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:48:15+0800
     * @param    {[type]}                 e [事件]
     * @return   {[type]}                   [null]
     */
    keydownInRight(e){
      if(e.keyCode == 4096){
        e.preventDefault();
        if(this.isEdited){
          this.isEdited = false;
        }else{
          this.backMenu();
        } 
      }
    },
    /**
     * [backMenu 返回左侧菜单]
     * @Author   shanjing
     * @DateTime 2019-07-19T10:47:44+0800
     * @return   {[type]}                 [null]
     */
    backMenu(){
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
      let data = this.data.filter(function(item){
          return item.contentId != value.code
      });
      //this.data = [];
      //this.data = data;
      //let data = [];
      for (var i = 0; i < data.length; i++) {
        this.$set(this.data, i, data[i]);
      }
      //this.data = data;
      //console.info(this.data)
      //console.info(this.data)
    }
  },
  computed: {
    editText(){
      return this.isEdited? '按返回完成':'编辑'
    }
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
        & > a
          width 100%
          margin-top 20px
          padding 7px 0
        & > div
          width 100%
          margin-top 20px
          color $whiteFontColor
      & > ul
        margin-top 46px
        & > li
          font-size 26px
          margin-bottom 7px
          
#index > div:first-child > ul > li > a
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