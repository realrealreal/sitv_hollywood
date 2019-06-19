<template>
	<a :href="json.href" :style="{width: _width+'px'}" @focus="test('hi')">              
	  <img :src="json.src" alt="" >
	  <div :style="{bottom: _bottom + 'px'}"><span :class="marguee == 0 ? '':'marquee'+marguee">{{json.name}}</span></div>
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
     init() {
     	let parentWidth = this.$el.children[1].offsetWidth;
     	let childWidth = this.$el.children[1].children[0].offsetWidth;
     	if (childWidth <= parentWidth) return;
        this.marguee = Math.ceil((childWidth - parentWidth) / 30) * 30;
        console.info(this.marguee);
     },
     test(a) {

        console.info(this.marguee);
        console.info(this.$el.innerHTML)
     }
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
<style scoped>
a {
	animation: scale-down 0.1s ease-in-out 1 forwards;
}
a > div {
	position: relative;
	overflow: hidden;
}
a > div > span{
	position: relative;
}
a:focus{
	outline: 2px solid #e6b23e;
	animation: scale-up 0.5s ease-in-out 1 forwards;
}
a:focus > div{
	background-color: #e6b23e;
}
a:focus > div > span.marquee30{
    animation: marquee30 4.5s ease-in-out infinite;
}

a:focus > div > span.marquee60{
    animation: marquee60 6s ease-in-out infinite;
}

a:focus > div > span.marquee90{
    animation: marquee90 8s ease-in-out infinite;
}

a:focus > div > span.marquee120{
    animation: marquee120 8s ease-in-out infinite;
}


a:focus > div > span.marquee150{
    animation: marquee150 10s ease-in-out infinite;
}

a:focus > div > span.marquee180{
    animation: marquee180 10s ease-in-out infinite;
}

a:focus > div > span.marquee210{
    animation: marquee210 10s ease-in-out infinite;
}
</style>