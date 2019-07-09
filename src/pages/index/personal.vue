<template>
    <div id="index">
      <div v-for='(value, index) in config.groups'>
        <h3>{{value.name}}</h3>
        <div>
          <div> 
            <ul v-bind:data-index="index" :style="{left: scrollLeft[index]+'px'}">
              <li>
                <a :href="value.href" @focus="onfocus($event,1)">              
                  <img :src="value.src" alt="" />
                </a>
              </li>
              <li v-for="(item, key) in list[index].slice(0,10)">
                <Poster :width='config.width' :item='item' isCheck v-on:checkIndex='check' :index='key+1'/>
              </li>
              <li>
                <a :href="value.href" v-if='list[index].length>10' @focus='onfocus($event,2,index)'>
                  <img src="../../assets/images/more.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          <span class='prev' v-if='scrollTimes[index] > 0'><</span>
          <span class='next' v-if='list[index].length >= 6 && ((list[index].length > 10  && scrollTimes[index] < 6) || (list[index].length <= 10  && scrollTimes[index] < list[index].length-5))'>></span>
        </div>
     </div>
  <!--       <h3>{{config.groups[1].name}}</h3>
  <div>
    <div>
      <ul :style="{left: left2}">
        <li>
           <a :href="config.groups[1].href" @focus="onfocus($event,1)">              
            <img :src="config.groups[1].src" alt="" />
          </a>
        </li>
        <li v-for="(value, index) in collectionList.slice(0,10)">
          <Poster :width='config.width' :item='value' isCheck v-on:checkIndex='check' :index='index+1'/>
        </li>
        <li>
           <a :href="config.groups[1].href" v-if='collectionList.length>10' @focus='onfocus($event,2)'>              
            <img src="../../assets/images/more.png" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <span class='prev' v-if='left2 > 0'><</span>
    <span class='next' v-if='collectionList.length > 6 || left2'>></span>
  </div> -->
        <!-- <h3>{{config.groups[2].name}}</h3>
        <div>
          <ul style="left: 0">
            <li>
              <a :href="config.groups[2].href" @focus="onfocus($event,1)">              
                <img :src="config.groups[2].src" :width='config.width' alt="" />
              </a>
            </li>
            <li v-for="(value, index) in second_recommand.slice(0,10)">
              <Poster :width='config.width' :item='value' isCheck v-on:checkIndex='check' :index='index+1'/>
            </li>
            <li>
              <a :href="config.groups[2].href" v-if='second_recommand.length>10' @focus='onfocus($event,2)'>              
                <img src="../../assets/images/more.png" alt="" />
              </a>
            </li>
          </ul>
        </div> -->
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
      config: config,
      list:[[],[],[]],
      historyList: [],
      collectionList: [],
      scrollLeft: [0,0,0],
      scrollTimes: [0,0,0]
    }
  },
  watch: {
    scrollTimes(oldValue, newValue) {
      console.info('new:'+ newValue[1]);
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let vm = this;
      //console.info(this.config);
      //vm.config = config;
      vm.dataService.queryHistory(function(res){
        console.info(res);
        vm.list.splice(0, 1,  res.data.historyList)
      });
      vm.dataService.queryCollection(function(res){
        console.info(res);
        vm.list.splice(1, 1,  res.data.collectionList)
      });
    },
    test(){
      console.info(this.$el)
    },
    clear(index) {  //清除當前行之外的left
      /*for (var i = 0; i < this.$el.children.length; i++) {
        if(this.$el.children[i].tagName != 'DIV'){
          continue;
        }else{
          if(this.$el.children[i] != a.parentElement.parentElement.parentElement){
            //this.$el.children[i].children[0].style.left = "0";
            this.scrollLeft[index] = "0";
          }
        }
      }*/
      let vm = this;
      for (var i = 0; i < vm.scrollLeft.length; i++) {
        if(i != index){
          vm.scrollTimes.splice(i, 1, 0);
          vm.scrollLeft.splice(i, 1, 0);
        }
      }
    },
    onfocus(event, type, index){
      //e.preventDefault(); 會抖動
      let vm = this;
      event.target.parentElement.parentElement.parentElement.scrollLeft = 0;
      vm.clear(index);
      if(type == 2){
        vm.scrollTimes.splice(index, 1, 6);
        vm.scrollLeft.splice(index, 1, 0 - event.target.parentElement.offsetWidth*6);
        //event.target.parentElement.parentElement.style.left ="-"+event.target.parentElement.offsetWidth*6+"px";
      }
    },
    check(data){
      let vm = this;
      console.info("index:-------"+data.index)
      let container = data.el.parentElement.parentElement.parentElement;//container
      container.scrollLeft = 0;
      let ul = data.el.parentElement.parentElement;
      vm.clear(ul.dataset.index);
      console.info("left:"+ul.style.left);
      console.info("index:"+ul.dataset.index);
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
          vm.scrollTimes.splice(ul.dataset.index, 1, data.index-5);
          vm.scrollLeft.splice(ul.dataset.index, 1, 0 - onceLeft*(data.index-5));//vm.scrollLeft[ul.dataset.index] 不更新视图  vm.items.splice(indexOfItem, 1, newValue)  Vue.set(vm.items, indexOfItem, newValue)  更新视图
      }else{
          vm.scrollTimes.splice(ul.dataset.index, 1, 0);
          vm.scrollLeft.splice(ul.dataset.index, 1, 0);
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
  & > div
    & > h3
      margin 8px
      font-size 21px
    & > div
      position relative
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
.prev,.next
  position  absolute
  top 50%
  transform translateY(-50%)
.prev
  left -10px
.next
  right -10px
</style>
