import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //使用 vuex

const state = {
    count: 0
}

export default new Vuex.Store({
    state,//注册state
    //mutations,//注册mutations
    //actions,//注册actions
    //getters//注册getters
})