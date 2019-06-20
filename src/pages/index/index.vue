<template>
    <div id="index">
        <div id="header">
            <div id="logo">
              <img :src="copyright_logo" alt="">
              <img :src="biz_logo" alt="">
            </div>
            <ul>
              <li>搜索</li>
              <li>我的</li>
              <li>退出</li>
            </ul>
        </div>
        <div id="carousel">
          
        </div>
        <div>
          
        </div>
        <YaoFeng :json='yao_feng'/>
        <div id="bottomRecommand">
          <div v-for="(value, key, index) in bottom_recommand">
            <Poster  :_width='264' :_bottom='20'/>
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
<style scoped>
#index {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
#header{
  height: 100px;
}
#logo{
  position: absolute;
  left: 70px;
  top: 40px;
}
#carousel{
  width: 100%;
  height: 340px;
}
#bottomRecommand{
  width: 1128px;
  margin: 0 auto;
  white-space: nowrap;
}
#bottomRecommand > div{
  display: inline-block;
  margin-right: 24px;
}
ul {
  display: flex;
  -webkit-align-items: center;
  float: right;
  margin-top: 80px;
  margin-right: 80px;
  font-size: 25px;
  color: rgba(137,137,137,1);
}
li{
  padding: 0 13px; 
}
</style>
