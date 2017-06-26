// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/'
import FastClick from 'fastclick'
import './config/rem'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false

/*实例化FastClick*/
if('addEventListener' in document){                           //document.addEventListener == true
  document.addEventListener('DOMContentLoaded',function () {  //document.addEventListener("事件名称", 函数, false);
      FastClick.attach(document.body);                        //如果为true事件执行顺序为 addEventListener ---- 标签的onclick事件 ---- document.onclick　
  },false);                                                   //如果为false事件的顺序为 标签的onclick事件 ---- document.onclick  ---- addEventListener
}

Vue.use(VueRouter)
Vue.use(VueAxios,axios)
Vue.use(VueAwesomeSwiper)

/*设置线上环境api前缀*/
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'http://api.xfb315.com';
}

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.meta.aR){
        if(store.state.userInfo){
            next();
        }else{
            store.commit('AUTO_ROUTE',to.path);
            next("/login?id=1");
        }
    }else{
        next();
    }
});

/* eslint-disable no-new */
new Vue({
    router,
    store
}).$mount('#app')
