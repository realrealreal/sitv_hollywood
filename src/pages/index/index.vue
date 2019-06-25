<template>
    <div id="index">
        <div id="header">
            <div id="logo">
              <img :src="copyright_logo" alt="">
              <img :src="biz_logo" alt="">
            </div>
            <ul>
              <li><a href="">搜索</a></li>
              <li><a href="">我的</a></li>
              <li><a href="">退出</a></li>
            </ul>
        </div>
        <div id="carousel">
        </div>
        <YaoFeng :json='yao_feng'/>
        <div id="recommand-1">
          <div v-for="(value, key, index) in bottom_recommand">
            <Poster width='264' is-img-in/>
          </div> 
        </div>
        <div id="recommand-2">
          <h3>{{little1}}</h3>
          <div v-for="(value, key, index) in second_recommand">
            <Poster width='168' />
          </div> 
        </div>
        <div id="recommand-3">
          <h3>{{little2}}</h3>
          <div v-for="(value, key, index) in second_recommand">
            <Poster width='168' is-icon-show :index='key+1' />
          </div> 
        </div>
        <div id="recommand-4">
          <h3>{{little3}}</h3>
          <div v-for="(value, key, index) in second_recommand">
            <Poster width="168" />
          </div> 
        </div>
    </div>
</template>
<script>
import YaoFeng from '@/components/YaoFeng'
import Poster from '@/components/Poster'
export default {
  name: 'Index',
  data () {
    return {
      biz_logo: require('../../assets/images/hollywoodLogo.png'),
      copyright_logo: require('../../assets/images/besTVLogo.png'),
      bottom_recommand:[1,2,3,4],
      second_recommand:[1,2,3,4,5,6],
      little1: '观看历史',
      little2: '人气排行',
      little3: '蜘蛛侠系列一次看爽',
      yao_feng: [
        {
          id: 12345,
          src: require('../../assets/images/test/15604926190803147203.jpg'),
          href: '/'
        },
        {
          id: 12346,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: 'https://www.baidu.com'
        },
        {
          id: 12347,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/discovery'
        },
        {
          id: 12348,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/me'
        },
        {
          id: 12349,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/'
        },
        {
          id: 12350,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: 'https://www.baidu.com'
        },
        {
          id: 12351,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/discovery'
        },
        {
          id: 12352,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/me'
        },
        {
          id: 12353,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/me'
        },
        {
          id: 12354,
          src: require('../../assets/images/test/15604926318192850104.jpg'),
          href: '/#/me'
        },
      ]
    }
  },
  components: {
    YaoFeng,
    Poster
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
#index
  width 100%
  height 100%
  margin 0 auto

#header
  height 100px

#logo
  position absolute
  left 70px
  top 40px

#carousel
  width 100%
  height 300px

#recommand-1
  width 1128px
  margin 0 auto
  white-space nowrap
  & > div
    display inline-block
    margin-right 24px

#recommand-2
  width 1128px
  margin 0 auto
  white-space nowrap
  & > div
    display inline-block
    margin-right 24px

#recommand-3
  width 1128px
  margin 0 auto
  white-space nowrap
  & > div
    display inline-block
    margin-right 24px

#recommand-4
  width 1128px
  margin 0 auto
  white-space nowrap
  & > div
    display inline-block
    margin-right 24px

ul
  display flex
  -webkit-align-items center
  float right
  margin-top 80px
  margin-right 80px
  font-size 25px
  color rgba(137,137,137,1)

li
  padding 0 13px
</style>
