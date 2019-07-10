<template>
	<a href="javascript:void(0)" :style="{width: toRem(width)+'rem'}" @focus="onFocus(index,$event)" @click="goToDetail">              
	  <img :src="`${GLOBAL.config.base + (item.image || item.contentPoster || '/epg/resource/picture' + item.icon)}`" alt="">
	  <div :class="{ shadow: isImgIn }"><span :class="marguee == 0 ? '':'marquee'+marguee">{{item.title || item.contentName}}</span></div>
    <div v-show="isIconShow" style="color: white">{{index}}</div>
	</a>
</template>

<script>
import Animations from '@/assets/css/animations.css'
import {mapActions, mapState,mapGetters} from 'vuex' //注册 action 和 state
export default {
  name: 'Poster',
  data () {
    return {
      /**
       * [marguee 滚动距离 初始值为0]
       * @type {Number}
       */
    	marguee: 0,
      /**
       * [leftTopIcon 左上角 角标]
       * @type {[type]}
       */
      leftTopIcon: require('../assets/images/rankings.png'),
      /**
       * [default 默认图（暂时未用到）]
       * @type {[type]}
       */
      default: require('../assets/images/test/default1.jpg')
    }
  },
  mounted() {
    this.init()
  },
  props: {
    /**
     * [item 数据]
     * @type {Object}
     */
    item: { 
      type: Object,
      required: true
    },
    /**
     * [width 宽度]
     * @type {String}
     */
    width: {
      type: String,
      default: function () {
        return "168"
      }
    },
    /**
     * [isImgIn 控制文字在图片上，还是图片下方]
     * @type {Boolean}
     */
    isImgIn: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    /**
     * [isIconShow 是否显示左上角图标的开关]
     * @type {Boolean}
     */
    isIconShow: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    /**
     * [isCheck 是否检查focus的index值的开关(服务于滚动效果)]
     * @type {Object}
     */
    isCheck: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    index: {
      type: Number,
      default: function () {
        return 1
      }
    }
  },
  methods: {
     /**
      * [init 初始化 获取滚动距离 margguee-xxx]
      * @Author   shanjing
      * @DateTime 2019-07-02T17:21:44+0800
      * @return   {[type]}                 [description]
      */
     init() {
     	let parentWidth = this.$el.children[1].offsetWidth;
     	let childWidth = this.$el.children[1].children[0].offsetWidth;
     	if (childWidth <= parentWidth) return;
      this.marguee = Math.ceil((childWidth - parentWidth) / 30) * 30;
     },
     /**
      * [onFocus 海报组件获得焦点事件处理]
      * @Author   shanjing
      * @DateTime 2019-07-02T17:22:17+0800
      * @param    {[type]}                 index [下标]
      * @param    {[type]}                 e     [event]
      * @return   {[type]}                       [null]
      */
     onFocus(index,e) {
        //e.preventDefault(); 會抖動
        console.info(e.target);
        if(this.isCheck){
          let data = {
            index: index,
            el: e.target
          };
          this.$emit("checkIndex",data)
        }
     },
     /**
      * [toRem 换算rem root font-size 21]
      * @Author   shanjing
      * @DateTime 2019-07-02T17:23:24+0800
      * @param    {[type]}                 a [width]
      * @return   {[type]}                   [null]
      */
     toRem(a) {
        return a/21
     },
     /**
      * [goToDetail description]
      * @Author   shanjing
      * @DateTime 2019-07-03T17:04:20+0800
      * @return   {[type]}                 [description]
      */
     goToDetail() {
        let vm = this;
        console.info('dispatch****1'+vm.$store.state.programCode);
        console.info((vm.item.code || vm.item.contentId));
        vm.$store.dispatch('setProgramCode',(vm.item.code || vm.item.contentId))
        console.info('dispatch****2'+vm.$store.state.programCode);
        vm.$router.push({path: '/hollywood/vod'});
     },
     //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
      ...mapActions([
          'incrementStep'
      ])
  },
  computed: {
    
  },
  directives: {
  	test:{
  		bind:function(){//被绑定
		     console.log('1 - bind');
		},
		inserted:function(){//绑定到节点
		      console.log('2 - inserted');
		},
		update:function(){//组件更新
		      console.log('3 - update');
		},
		componentUpdated:function(){//组件更新完成
		      console.log('4 - componentUpdated');
		},
		unbind:function(){//解绑
		      console.log('1 - bind');
		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
a
  animation scale-down 0.1s ease-in-out 1 forwards
  & > img
    width 100%
  & > div
    &:nth-child(2)
      width 100%
      overflow hidden
      bottom 0
      & > span
        position relative
    &:last-child
      position absolute
      left -2px
      top -6px
      width 27px
      height 33px
      text-align center
      text-indent -6px
      font-size 16px
      line-height 33px
      background url($leftTopIcon) no-repeat
  &:focus
    color $blackColor
    outline 2px solid $linkColor
    animation scale-up 0.5s ease-in-out 1 forwards
    & > div
      &:nth-child(2)
        background-color $linkColor
        & > span.marquee30
          animation marquee30 4.5s ease-in-out infinite
        & > span.marquee60
          animation marquee60 6s ease-in-out infinite
        & > span.marquee90
          animation marquee90 8s ease-in-out infinite
        & > span.marquee120
          animation marquee120 8s ease-in-out infinite
        & > span.marquee150
          animation marquee150 10s ease-in-out infinite
        & > span.marquee180
          animation marquee180 10s ease-in-out infinite
        & > span.marquee210
          animation marquee210 10s ease-in-out infinite
.shadow
  position absolute
  background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3));
  // background-color rgba(0,0,0,0.3)
</style>