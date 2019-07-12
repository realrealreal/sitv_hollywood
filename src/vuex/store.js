import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //使用 vuex

const state = {
    programCode: '121211',
    programType: '',
    parentCode: '',
    categoryCode: '',
    bizCode: '',
}

const getters = {   
    programCode(state) {  
       return state.programCode
    },
    programType(state) {  
       return state.programType
    },
    parentCode(state) {  
       return state.parentCode
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
		state.programCode = value
	},
    setProgramType(state,value){
        state.programType = value
    },
    setParentCode(state,value){
        state.parentCode = value
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
        context.commit('setProgramCode', value);
    },
    setProgramType(context,value){
        context.commit('setProgramType', value);
    },
    setParentCode(context,value){
        context.commit('setParentCode', value);
    },
    setCategoryCode(context,value){
        context.commit('setCategoryCode', value);
    },
    setBizCode(context,value){
        context.commit('setBizCode', value);
    }
};

export default new Vuex.Store({
    state,//注册state
    mutations,//注册mutations
    actions,//注册actions
    getters//注册getters
})