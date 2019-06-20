<template>
	<a :href="json.href" :style="{width: toRem(_width)+'rem'}" @focus="test('hi')">              
	  <img :src="json.src" alt="" >
	  <div :style="{bottom: toRem(_bottom)+'rem'}"><span :class="marguee == 0 ? '':'marquee'+marguee">{{json.name}}</span></div>
	</a>
</template>

<script>
import Animations from '@/assets/css/animations.css'
export default {
  name: 'Poster',
  data () {
    return {
    	marguee: 0
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
    _width: {
      type: Number,
      default: function () {
        return 168
      }
    },
    _bottom: {
      type: Number,
      default: function () {
        return 0
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
     test(a) {

        console.info(this.marguee);
        console.info(this.$el.innerHTML)
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
      width: 100%
  & > div
    position relative
    overflow hidden
    & > span
      position relative
  &:focus
    outline 2px solid $linkColor
    animation scale-up 0.5s ease-in-out 1 forwards
    & > div
      background-color $linkColor
      & > span
        &.marquee30
          animation marquee30 4.5s ease-in-out infinite
        &.marquee60
          animation marquee60 6s ease-in-out infinite
        &.marquee90
          animation marquee90 8s ease-in-out infinite
        &.marquee120
          animation marquee120 8s ease-in-out infinite
        &.marquee150
          animation marquee150 10s ease-in-out infinite
        &.marquee180
          animation marquee180 10s ease-in-out infinite
        &.marquee210
          animation marquee210 10s ease-in-out infinite
</style>