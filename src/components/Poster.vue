<template>
	<a :href="json.href" :style="{width: toRem(width)+'rem'}" @focus="onFocus(index,$event)">              
	  <img :src="json.src" alt="" >
	  <div :class="{ shadow: isImgIn }"><span :class="marguee == 0 ? '':'marquee'+marguee">{{json.name}}</span></div>
    <div v-show="isIconShow" style="color: white">{{index}}</div>
	</a>
</template>

<script>
import Animations from '@/assets/css/animations.css'
export default {
  name: 'Poster',
  data () {
    return {
    	marguee: 0,
      leftTopIcon: require('../assets/images/rankings.png')
    }
  },
  mounted() {
    this.init()
  },
  props: {
    json: {
      type: Object,
      default: function () {
        return {
        	href: '#',
      		src: require('../assets/images/test/default1.jpg'),
      	 	name: 'test111111111111111111111111111111' 
      	}
      }
    },
    width: {
      type: String,
      default: function () {
        return "168"
      }
    },
    isImgIn: { //控制文字在图片上，还是图片下方
      type: Boolean,
      default: function () {
        return false
      }
    },
    isIconShow: { // 是否显示左上角图标的开关
      type: Boolean,
      default: function () {
        return false
      }
    },
    isCheck: { //是否检查focus的index值的开关(服务于滚动效果)
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
     init() {//初始化 获取滚动距离 margguee-xxx
     	let parentWidth = this.$el.children[1].offsetWidth;
     	let childWidth = this.$el.children[1].children[0].offsetWidth;
     	if (childWidth <= parentWidth) return;
      this.marguee = Math.ceil((childWidth - parentWidth) / 30) * 30;
     },
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
     toRem(a) {
        return a/21
     }
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
        & > span
          animation marquee30 4.5s ease-in-out infinite
          animation marquee60 6s ease-in-out infinite
          animation marquee90 8s ease-in-out infinite
          animation marquee120 8s ease-in-out infinite
          animation marquee150 10s ease-in-out infinite
          animation marquee180 10s ease-in-out infinite
          animation marquee210 10s ease-in-out infinite
.shadow
  position absolute
  background-color rgba(0,0,0,0.3)
</style>