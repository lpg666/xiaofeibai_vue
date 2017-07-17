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
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

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
Vue.use(ElementUI)

const router = new VueRouter({
    mode: 'history',
    routes,
});

/*设置线上环境api前缀*/
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'http://api.test.xfb315.com';
}

router.beforeEach((to, from, next) => {
    if(to.meta.aR){
        if(store.state.userInfo){
            /*Vue.axios.post('/v3/auth/check-member-info',{'sign':store.state.userInfo.sign}).then((response) => {
                if(response.data.msg_type==401){
                    store.commit('QUANJU_TAN','账号已在其他地方登陆');
                    store.commit('OUT_LOGIN');
                    setTimeout(fu,2000);

                    function fu() {
                        store.commit('QUANJU_BUTAN');
                        store.commit('AUTO_ROUTE',to.path);
                        next("/login?id=1");
                    }

                }else{
                    next();
                }
                console.log(response.data)
            });*/
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
