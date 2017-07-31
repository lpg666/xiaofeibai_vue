// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/'
import FastClick from 'fastclick'
import './config/rem'
//import './config/vconsole.min'
import axios from 'axios'
import Qs from 'qs'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import vuePicturePreview from 'vue-picture-preview'
//import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false;

/*实例化FastClick*/
if('addEventListener' in document){                           //document.addEventListener == true
  document.addEventListener('DOMContentLoaded',function () {  //document.addEventListener("事件名称", 函数, false);
      FastClick.attach(document.body);                        //如果为true事件执行顺序为 addEventListener ---- 标签的onclick事件 ---- document.onclick　
  },false);                                                   //如果为false事件的顺序为 标签的onclick事件 ---- document.onclick  ---- addEventListener
}
/*全局转换时间方法*/
Vue.prototype.getTimeWord = function (time){
    let times = time.replace(/\s/, 'T');
    times = new Date(times).getTime();
    let curr = Date.parse(new Date());
    let tmp = (curr - times)/1000;
    let word = '';
    let month = '';
    if(tmp < 60){
        word = '刚刚';
    }else if(tmp < 3600){
        word = Math.floor(tmp/60)+'分钟前';
    }else if(tmp < 86400){
        word = Math.floor(tmp/3600)+'小时前';
    }else if(tmp < 86400*2){
        word = Math.floor(tmp/86400)+'天前';
    }else{
        if(new Date(times).getFullYear() >= new Date(curr).getFullYear()){
            if(new Date(times).getMonth()<9){
                month = '0'+ (new Date(times).getMonth()+1) + '月';
            }else{
                month = (new Date(times).getMonth()+1) + '月';
            }
            word = month+new Date(times).getDate()+'日';
        }else{
            if(new Date(times).getMonth()<9){
                month = '0'+ (new Date(times).getMonth()+1) + '月';
            }else{
                month = (new Date(times).getMonth()+1) + '月';
            }
            word = new Date(times).getFullYear()+'年'+month+new Date(times).getDate()+'日';
        }
    }
    return word;
}

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(VueAwesomeSwiper);
Vue.use(vuePicturePreview)

const router = new VueRouter({
    //mode: 'history',
    routes,
});

/*设置线上环境api前缀*/
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'http://api.test.xfb315.com';
    axios.defaults.transformRequest = function (data) {
        return Qs.stringify(data);
    };
    //POST传参序列化(添加请求拦截器)
    /*axios.interceptors.request.use((config) => {
        //在发送请求之前做某件事
        if(config.method  === 'post'){
            config.data = qs.stringify(config.data);
        }
        return config;
    });*/
}

router.beforeEach((to, from, next) => {
    if(to.meta.aR){
        if(store.state.userInfo){
            Vue.axios.post('/v4/auth/check_member_info',{'sign':store.state.userInfo.sign}).then((response) => {
                if(response.data.error){
                    store.commit('QUANJU_TAN',response.data.msg);
                    store.commit('OUT_LOGIN');
                    setTimeout(fu,1500);

                    function fu() {
                        store.commit('QUANJU_BUTAN');
                        if(to.query){
                            let arr = Object.keys(to.query);
                            let diyi = arr[0];
                            let cs = '';
                            console.log(diyi);
                            for(let key in to.query){
                                if(key==diyi){
                                    cs += '?'+key+'='+to.query[key];
                                }else{
                                    cs += '&'+key+'='+to.query[key];
                                }
                                console.log(cs);
                            }
                            store.commit('AUTO_ROUTE',to.path+cs);
                        }else{
                            store.commit('AUTO_ROUTE',to.path);
                        }
                        next("/login?id=1");
                    }

                }else{
                    next();
                }
                console.log(response.data)
            });
            next();
        }else{
            if(to.query){
                let arr = Object.keys(to.query);
                let diyi = arr[0];
                let cs = '';
                console.log(diyi);
                for(let key in to.query){
                    if(key==diyi){
                        cs += '?'+key+'='+to.query[key];
                    }else{
                        cs += '&'+key+'='+to.query[key];
                    }
                    console.log(cs);
                }
                store.commit('AUTO_ROUTE',to.path+cs);
            }else{
                store.commit('AUTO_ROUTE',to.path);
            }
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
}).$mount('#app');
