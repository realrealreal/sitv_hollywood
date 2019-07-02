<template>
    <div id="index">
        <h3>{{config.groups[0].name}}</h3>
        <div> 
          <ul style="left: 0">
            <li>
              <a :href="config.groups[0].href" @focus="onfocus($event,1)">              
                <img :src="config.groups[0].src" alt="" />
              </a>
            </li>
            <li v-for="(value, index) in bottom_recommand.slice(0,10)">
              <Poster :width='config.width' isCheck v-on:checkIndex='check' :index='index+1'/>
            </li>
            <li>
              <a :href="config.groups[0].href" v-if='bottom_recommand.length>10' @focus='onfocus($event,2)'>              
                <img src="../../assets/images/more.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <h3>{{config.groups[1].name}}</h3>
        <div>
          <ul style="left: 0">
            <li>
               <a :href="config.groups[1].href" @focus="onfocus($event,1)">              
                <img :src="config.groups[1].src" alt="" />
              </a>
            </li>
            <li v-for="(value, index) in collectionList.slice(0,10)">
              <Poster :width='config.width' isCheck v-on:checkIndex='check' :index='index+1'/>
            </li>
            <li>
               <a :href="config.groups[1].href" v-if='collectionList.length>10' @focus='onfocus($event,2)'>              
                <img src="../../assets/images/more.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <h3>{{config.groups[2].name}}</h3>
        <div>
          <ul style="left: 0">
            <li>
              <a :href="config.groups[2].href" @focus="onfocus($event,1)">              
                <img :src="config.groups[2].src" :width='config.width' alt="" />
              </a>
            </li>
            <li v-for="(value, index) in second_recommand.slice(0,10)">
              <Poster :width='config.width' isCheck v-on:checkIndex='check' :index='index+1'/>
            </li>
            <li>
              <a :href="config.groups[2].href" v-if='second_recommand.length>10' @focus='onfocus($event,2)'>              
                <img src="../../assets/images/more.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
const config = {
  width: '170',
  groups: [
    {
      name: '观看历史',
      href: '#/repo/history/1',
      src: require('../../assets/images/all_history.png')
    },
    {
      name: '我的收藏',
      href: '#/repo/collection/1',
      src: require('../../assets/images/all_coll.png')
    },
    {
      name: '我的订购',
      href: '#/repo/ordered',
      src: require('../../assets/images/all_order.png')
    }
  ]
}
import Poster from '@/components/Poster'
export default {
  name: 'Personal',
  data () {
    return {
      config: {
      },
      historyList: [],
      collectionList: [],
      bottom_recommand:[1,2,3,4,5,6,7,8,9,10,11],
      second_recommand:[1,2,3,4,5,6],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let vm = this;
      vm.config = config;
      vm.dataService.queryHistory(function(res){
        console.info(res);      
        vm.historyList = res.data.historyList;
      });
      vm.dataService.queryCollection(function(res){
        console.info(res);      
        vm.collectionList = res.data.collectionList;
      });
    },
    test(){
      console.info(this.$el)
    },
    clear(a) {  //清除當前行之外的left
      for (var i = 0; i < this.$el.children.length; i++) {
        if(this.$el.children[i].tagName != 'DIV'){
          continue;
        }else{
          if(this.$el.children[i] != a.parentElement.parentElement.parentElement){
            this.$el.children[i].children[0].style.left = "0";
          }
        }
      }
    },
    onfocus(event,type){
      //e.preventDefault(); 會抖動
      event.target.parentElement.parentElement.parentElement.scrollLeft = 0;
      this.clear(event.target);
      if(type == 2){
        event.target.parentElement.parentElement.style.left ="-"+event.target.parentElement.offsetWidth*6+"px";
      }
    },
    check(data){
      console.info("index:-------"+data.index)
      this.clear(data.el);
      let container = data.el.parentElement.parentElement.parentElement;//container
      container.scrollLeft = 0;
      let ul = data.el.parentElement.parentElement;
      console.info("left:"+ul.style.left);
      if(data.index >= 6){   
          let li = data.el.parentElement;//li
          console.info(container);
          console.info(container.scrollWidth);
          console.info(container.offsetWidth);
          let onceLeft = li.offsetWidth;//单次滚动距离
          //let maxScroll = container.scrollWidth - container.offsetWidth;//最大滚动距离
          //let maxScroll = li.offsetWidth*10;//最大滚动距离
          //let scrollLeft = (data.index-5)*onceLeft < maxScroll ? (data.index-5)*onceLeft : maxScroll; //滚动距离
          console.info('onceLeft:-----'+ onceLeft);
          //console.info('maxScroll:-----'+ maxScroll);
          //console.info('scrollLeft:-----'+ scrollLeft);
          //container.scrollLeft = scrollLeft;
          ul.style.left="-"+onceLeft*(data.index-5)+"px";
      }else{
          ul.style.left="0";
      }
    }
  },
  components: {
    Poster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 1160px
  height 100%
  margin 44px auto
  & > h3
    margin 8px
    font-size 21px 
  & > div
    height 280px
    position relative
    overflow-x hidden
    overflow-y hidden
    white-space nowrap 
    &::-webkit-scrollbar
      display none
    & > ul
      margin 8px
      position absolute
      transition: left 1.5s
      font-size 0px
      letter-spacing -4px
      // display inline
      & > li
        padding-right 24px
        display inline-block
        font-size 21px
        & > a
          vertical-align top
          & > img
            width 170px
</style>
