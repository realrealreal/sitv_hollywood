// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem.js'
import './assets/css/reset.css'
import globalVariable from '@/api/config.js' //引入全局配置
import store from './vuex/store' // 引入store
//import '!style-loader!css-loader!stylus-loader!./assets/css/index.styl'
Vue.prototype.GLOBAL = globalVariable
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
