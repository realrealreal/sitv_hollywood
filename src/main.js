// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem.js'
import './assets/css/reset.css'
import './assets/css/app.css'
import globalVariable from '@/api/global-config.js'
import authService from '@/api/auth/auth.service.js'
import dataService from '@/api/data/data.service.js'
import utils from '@/api/utils.js'
import store from './vuex/store' // 引入store

/**
 * [GLOBAL]
 * @type {[type]}
 */
Vue.prototype.GLOBAL = globalVariable
Vue.prototype.authService = authService
Vue.prototype.dataService = dataService
Vue.prototype.utils = utils
Vue.directive('focus',{
  inserted:function(el){
    el.focus()
  },
  update:function(el,binding){//组件更新
    console.log('3 - update');
    console.log(binding.value);
    if(binding.value){
    	el.focus();
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
