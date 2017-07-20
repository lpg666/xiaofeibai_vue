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
    editInfo:JSON.parse(localStorage.getItem('editInfo'))
}

export default new Vuex.Store({
    state,
    mutations
})