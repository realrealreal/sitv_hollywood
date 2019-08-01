<template>
    <div id="index">
      <div v-for='(value, index) in config.groups' >
        <h3>{{value.name}}</h3>
        <div>
          <div :ref='`column-${index}`'> 
            <ul v-bind:data-index="index">
              <li>
                <a v-if="index == 0" :href="value.href" v-focus @focus="onfocus(0,index)">    
                  <img :src="value.src" alt="" />
                </a>
                <a v-if="index != 0" :href="value.href" @focus="onfocus(0,index)">    
                  <img :src="value.src" alt="" />
                </a>
              </li>
              <li v-if="index != 2" v-for="(item, key) in list[index].slice(0,10)" ref='posterLi'>
                <Poster :width='config.width' :item='item' :index='key+1' isCheck v-on:checkIndex='check' :column="index"/>
              </li>
              <li v-if="index == 2" v-for="(item, key) in list[index].slice(0,10)">
                  <a class='text-center' href="javascript:void(0)" @focus="onfocus(key+1, index)" @click='goToDetail(item.contentId,item.contentType)'>
                    <img :src="orderDefaultImg" alt="">
                    <div><span>{{item.contentName}}</span><br><span>{{item.expireTime | formatDate}}有效</span></div>
                  </a>
              </li>
              <li>
                <a href="value.href" v-if='list[index].length>10' @focus="onfocus(11,index)">
                  <img src="../../assets/images/more.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          <img class='prev' src="@/assets/images/prev_icon.png" alt="" v-show='list[index].length >5 && scrollLeft[index]>0'> 
          <img class='next' src="@/assets/images/next_icon.png" alt="" v-show='list[index].length >5 && !(focusIndex[index] == 11 || (focusIndex[index] == list[index].length && list[index].length <=10))'>
        </div>
      </div>
    </div>
</template>
<script>
const config = {
  width: '170',
  groups: [
    {
      name: '观看历史',
      href: '#/hollywood/repo/history',
      src: require('@/assets/images/all_history.png')
    },
    {
      name: '我的收藏',
      href: '#/hollywood/repo/collection',
      src: require('@/assets/images/all_coll.png')
    },
    {
      name: '我的订购',
      href: '#/hollywood/repo/orderlist',
      src: require('@/assets/images/all_order.png')
    }
  ]
}
import {mapActions} from 'vuex' //注册 action 和 state
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
      focusIndex: [0,0,0],
      test: false,
      //isSecond:[false,false,false],
      orderDefaultImg: require('@/assets/images/order.png'),
      timer:[undefined,undefined,undefined,undefined]
    }
  },
  watch: {
    // isSecond(oldValue, newValue) {
    //   for (var i = 0; i < newValue.length; i++) {
    //     if(oldValue[i] != newValue[i]){
    //       break;
    //     }
    //   }
    // }
  },
  mounted() {
    this.init()
  },
  destroyed(){
    this.$parent.$el.scrollTop = 0;
  },
  filters: {
    /**
     * [formatDate 格式化时间]
     * @Author   shanjing
     * @DateTime 2019-07-23T12:18:42+0800
     * @param    {[type]}                 value [time]
     * @return   {[type]}                       [timeString]
     */
    formatDate(value) {
      let time = value.substring(0,8);
      return time.substring(0,4)+'.'+time.substring(4,6)+'.'+time.substring(6,8)
    }
  },
  methods: {
    /**
     * [init 初始化]
     * @Author   shanjing
     * @DateTime 2019-07-19T13:04:30+0800
     * @return   {[type]}                 [description]
     */
    init() {
      let vm = this;
      //vm.config = config;
      vm.dataService.queryHistory(function(res){
        console.info(res);
        vm.list.splice(0, 1,  res.data.historyList)
      },'电影');
      vm.dataService.queryCollection(function(res){
        console.info(res);
        vm.list.splice(1, 1,  res.data.collectionList)
      },'电影');
      vm.list.splice(2, 1, (function(){
        let array = [];
        var obj = {
          "userId": "00264c50fb0f",
          "category": null,
          "categoryCode": "ccms_category_57032916",
          "contentId": "program_ccms_859888",
          "contentType": 'vod',
          "contentName": "惊奇队长",
          "contentPoster": "/content/201907/01/549529_poster.jpg",
          "bizCode": "ccms_biz_56470301",
          "offeringId": null,
          "serviceName": null,
          "serviceCode": null,
          "serviceType": null,
          "price": "500",
          "protocolType": null,
          "fileName": null,
          "param1": null,
          "param2": null,
          "param3": null,
          "orderTime": null,
          "validTime": "20190704105306",
          "expireTime": "20190714105306",
          "updateTime": "20200223082700"
        };
        for (var i = 0; i < 46; i++) {
          array.push(obj);
        }
        return array;
      })())
    },
    goToDetail(code, type) {
        let vm = this;
        vm.setProgramCode(code);
        vm.setProgramType(type);
        vm.$router.push({path: `/hollywood/detail`});
    },
    /**
     * [check 接收emit的回调函数]
     * @Author   shanjing
     * @DateTime 2019-07-23T12:20:26+0800
     * @param    {[type]}                 value [value]
     * @return   {[type]}                       [null]
     */
    check(value) {
      this. onfocus(value.index,value.column);
    },
    /**
     * [onfocus 获得焦点处理]
     * @Author   shanjing
     * @DateTime 2019-07-23T12:21:19+0800
     * @param    {[type]}                 index  [第几个]
     * @param    {[type]}                 column [第几行]
     * @return   {[type]}                        [null]
     */
    onfocus(index,column){
      /* 上下滚动 */
      if(column == 2){
        let el = this.$parent.$el;
        this.scrollTo(el, 500, el.scrollHeight - el.offsetHeight, 'scrollTop', 3, this);
      }
      if(column == 1 || column == 0){
        let el = this.$parent.$el;
        this.scrollTo(el, 500, 0, 'scrollTop', 3, this);
      }
      /* 左右滚动 */
      if(index >= 6){
        let leftOnce = this.$refs.posterLi[0].offsetWidth; //单次移动距离
        this.$refs[`column-${column}`][0].scrollLeft = this.scrollLeft[column];
        this.scrollTo(this.$refs[`column-${column}`][0], 500, (index-5)*leftOnce, 'scrollLeft', column, this);
        this.scrollLeft.splice(column, 1, (index-5)*leftOnce);
      }else{
        this.scrollTo(this.$refs[`column-${column}`][0], 500, 0, 'scrollLeft', column, this);
        this.scrollLeft.splice(column, 1, 0 );
      }
      this.focusIndex.splice(column, 1, index);
      console.info(this.focusIndex)
    },
    /**
     * [scrollTo 滚动效果函数 (暂时无法全局 this作用域)]
     * @Author   shanjing
     * @DateTime 2019-07-19T16:18:56+0800
     * @param    {[type]}                 el             [滚动元素]
     * @param    {[type]}                 scrollDuration [滚动时长]
     * @param    {[type]}                 distance       [滚动距离]
     * @param    {[type]}                 direction      [滚动方向 'scrollTop' 'scrollLeft']
     * @param    {[type]}                 num            [timer]
     * @param    {[type]}                 vm             [this]
     * @return   {[type]}                                [description]
     */
    scrollTo(el,scrollDuration,distance,direction,num,vm) {
        var scrollStep = (distance-el[direction]) / (scrollDuration / 15)
        clearInterval(vm.timer[num]);
        vm.timer[num] = setInterval(function(){
          if ( el[direction] != distance ) {
            el[direction] += scrollStep;
            if(scrollStep < 0 && el[direction] < distance || scrollStep > 0 && el[direction] > distance){
              el[direction] = distance
            }
          }else {
              clearInterval(vm.timer[num]);
          }
        },15);
    },
    //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
    ...mapActions([
        'setProgramCode',
        'setProgramType'
    ])
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
        overflow-x scroll
        overflow-y hidden
        white-space nowrap 
        &::-webkit-scrollbar
          display none
        & > ul
          margin 8px
          position absolute
          transition: left 1.5s
          font-size 0px
          //letter-spacing -4px
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
    left -30px
  .next
    right -30px
  .text-center
    position relative
    & > div
      position absolute
      left 50% 
      top 50%
      transform translate(-50%)
</style>
