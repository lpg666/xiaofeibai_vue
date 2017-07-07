import {
    RECORD_USERINFO,
    RECORD_DECLARE,
    AUTO_ROUTE,
    OUT_LOGIN,
    TOUSU_DATA,
    QUANJU_TAN,
    QUANJU_BUTAN
} from './mutation-types.js'

import {setStore,getStore,removeStore} from '../config/mUtils'

export default {
    //记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        //state.login = true;
        setStore('userInfo', info);
    },
    //记录投诉须知状态(关联用户信息，退出登陆时还原)
    [RECORD_DECLARE](state, info) {
        state.isDeclare = info;
        setStore('isDeclare', info);
    },
    //
    [AUTO_ROUTE](state, info){
        state.autoRoute = info;
        setStore('autoRoute', info);
    },
    //
    [OUT_LOGIN](state){
        state.userInfo = null;
        state.isDeclare = null;
        state.autoRoute = null;
        removeStore('userInfo');
        removeStore('isDeclare');
        removeStore('autoRoute');
    },
    //
    [TOUSU_DATA](state,info){
        state.tousuData = info;
    },
    //
    [QUANJU_TAN](state,info){
        state.tanQ = true;
        state.tanQzi = info;
    },
    //
    [QUANJU_BUTAN](state){
        state.tanQ = false;
        state.tanQzi = '';
    }
}