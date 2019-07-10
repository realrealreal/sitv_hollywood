import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //使用 vuex

const state = {
    programCode: '121211',
    categoryCode: '',
    bizCode: ''
}

const getters = {   
    programCode(state) {  
       return state.programCode
    },
    categoryCode(state) {  
       return state.categoryCode
    },
    bizCode(state) {  
       return state.bizCode
    }
};

const mutations = {
	setProgramCode(state,value){
		console.info('mutations-value:' + value);
		state.programCode = value
	},
    setCategoryCode(state,value){
        state.categoryCode = value
    },
    setBizCode(state,value){
        state.bizCode = value
    }
};

const actions = {
    setProgramCode(context,value){
    	console.info('actions:' + value);
        context.commit('setProgramCode', value);
    },
    setCategoryCode(context,value){
        console.info('actions:' + value);
        context.commit('setCategoryCode', value);
    },
    setBizCode(context,value){
        console.info('actions:' + value);
        context.commit('setBizCode', value);
    }
};

export default new Vuex.Store({
    state,//注册state
    mutations,//注册mutations
    actions,//注册actions
    getters//注册getters
})