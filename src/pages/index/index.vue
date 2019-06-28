<template>
    <div id="index">
        <div id="carousel">
          <Carousel />
        </div>
        <div id="header">
            <div id="logo">
              <img :src="copyright_logo" alt="">
              <img :src="biz_logo" alt="">
            </div>
            <ul>
              <li><router-link to='list/1'>搜索</router-link></li>
              <li><router-link :to="repo_href">我的</router-link></li>
              <li><a href="">退出</a></li>
            </ul>
        </div>
        <div id="YaoFeng">
          <YaoFeng :json='yao_feng'/>
        </div>
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
import Carousel from '@/components/Carousel'
import YaoFeng from '@/components/YaoFeng'
import Poster from '@/components/Poster'
console.info();
export default {
  name: 'Index',
  data () {
    return {
      repo_href: this.GLOBAL.config.href.repo,
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
    Poster,
    Carousel
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
    position absolute
    top 0
    width  100%
  #logo
    position absolute
    left 70px
    top 40px
  #carousel
    height 440px
    margin-bottom 28px
  #YaoFeng
    margin-bottom 28px
  #recommand-1
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px
  #recommand-2
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px

  #recommand-3
    width 1128px
    margin 0 auto
    margin-bottom 28px
    white-space nowrap
    & > div
      display inline-block
      margin-right 24px

  #recommand-4
    margin-bottom 28px
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
    & > li
      padding 0 13px
      & > a
        padding 5px
        color $greyColor
        &:before
          content ''
          display inline-block
          width 21px
          height 28px
          line-height 28px
          vertical-align top
          margin-right 15px
      &:nth-child(1) > a:before
        background url($searchIcon) no-repeat 0 50%
      &:nth-child(2) > a:before
        background url($personalIcon) no-repeat 0 50%
      &:nth-child(3) > a:before
        background url($exitIcon) no-repeat 0 50%
  h3
    margin-bottom 14px  
</style>
