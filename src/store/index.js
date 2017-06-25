import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    userInfo:localStorage.getItem('userInfo'),
    isDeclare:localStorage.getItem('isDeclare'),
    autoRoute:localStorage.getItem('autoRoute'),
}

export default new Vuex.Store({
    state,
    mutations
})