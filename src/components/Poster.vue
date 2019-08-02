<template>
  <!-- 海报组件 -->
	<a href="javascript:void(0)" :style="{width: toRem(width)+'rem'}" @focus="onFocus(index,$event)" @keydown="keyListener($event)" @click="clickPoster">              
	  <img :src="`${GLOBAL.config.base + (item.image || item.contentPoster || item.contentposter
|| item.contenticon || '/epg/resource/picture' + item.icon)}`" alt="" :onerror="defaultImg">
	  <div :class="{ shadow: isImgIn }"><span :class="marguee == 0 ? '':'marquee'+marguee">{{item.title || item.contentName}}</span></div>
    <div class='leftTopIcon' v-show="isIconShow" style="color: white">{{index}}</div>
    <div class='delete iconfont iconjinzhi' v-if="isEdited" style="color: white">  删除</div>
	</a>
</template>

<script>
import '@/assets/css/iconfont/iconfont.css'
import {mapActions, mapState, mapGetters} from 'vuex' //注册 action 和 state
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
      defaultImg: require('../assets/images/test/default1.jpg')
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
    },
    column: {
      type: Number,
      default: function () {
        return -1
      }
    },
    isKeyListener: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    isEdited: {//是否可以编辑
      type: Boolean,
      default: false
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
        if(this.isCheck){
          let data = {
            index: index,
            el: e.target,
            column: this.column
          };
          this.$emit("checkIndex",data)
        }
     },
     keyListener(e){
        if(!this.isKeyListener) return;
        let data = {
          el: e.target,
          event: e,
          keyCode: e.keyCode,
          column: this.column,
          index: this.index
        }
        this.$emit("keyListener", data)
    
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
      * [goToDetail 跳转详情页]
      * @Author   shanjing
      * @DateTime 2019-07-03T17:04:20+0800
      * @return   {[type]}                 [null]
      */
     goToDetail() {
        let vm = this;
        console.info(this.index)
        vm.setProgramCode(vm.item.code || vm.item.contentId || vm.item.itemcode)
        vm.setProgramType(vm.item.type || vm.item.itemtype || vm.item.contentType)
        vm.setProgramType(vm.item.type || vm.item.itemtype || vm.item.contentType)
        if(vm.$route.name == 'Movielist'){ // 列表页跳转到详情页记忆焦点
          vm.setMemoryFocusIndex(vm.index);
        }
        if(vm.$route.name != 'Details'){ //当前页 就不push跳转啦 实际路由一样也不会跳转(ps:如果加了query 则页面)
          vm.$router.push({path: '/hollywood/detail'});
        }
     },
     /**
      * [clickPoster 点击海报处理]
      * @Author   shanjing
      * @DateTime 2019-07-31T14:55:06+0800
      * @return   {[type]}                 [null]
      */
     clickPoster(){
        let vm = this; 
        if(vm.isEdited){
          let code = vm.item.code || vm.item.contentId || vm.item.itemcode;
          console.info('删除'+code)
          vm.$emit('deleteItem',{code:code})
        }else{
          vm.goToDetail()
        }
     },
     //在这里引入 action 里的方法，使用方法和 methods 里的其他方法一样
      ...mapActions([
          'setProgramCode',
          'setProgramType',
          'setMemoryFocusIndex'
      ])
  },
  computed: {
      ...mapState([
        'programCode',
        'programType',
        'memoryFocusIndex'
      ])
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
        white-space nowrap
    &.delete
      position absolute
      left 0
      top 50%
      transform translateY(-50%)
      width 100%
      background-color red
      text-align center
      padding 5px 0
      display none
    &.leftTopIcon
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
        background $linkColor
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
      &.delete
        display block
.shadow
  position absolute
  background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3));

</style>