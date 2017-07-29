import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    userInfo:JSON.parse(localStorage.getItem('userInfo')),
    isDeclare:localStorage.getItem('isDeclare'),
    autoRoute:localStorage.getItem('autoRoute'),
    tousuData:'',
    tanQ:false,
    tanQzi:'',
    wechat:'',
    editInfo:JSON.parse(localStorage.getItem('editInfo')),
    tousuPra:JSON.parse(localStorage.getItem('tousuPra')),
    search:JSON.parse(localStorage.getItem('search')),
}

export default new Vuex.Store({
    state,
    mutations
})