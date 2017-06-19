import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo:null
}

export default new Vuex.Store({
    state
})