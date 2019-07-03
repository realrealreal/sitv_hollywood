import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //使用 vuex

const state = {
    programCode: '121211'
}

const getters = {   
    programCode(state) {  
       return state.programCode
    }
};

const mutations = {
	setProgramCode(state,value){
		console.info('mutations-value:' + value);
		state.programCode = value
	}
};

const actions = {
    setProgramCode(context,value){
    	console.info('actions:' + value);
        context.commit('setProgramCode', value);
    }
};

export default new Vuex.Store({
    state,//注册state
    mutations,//注册mutations
    actions,//注册actions
    getters//注册getters
})