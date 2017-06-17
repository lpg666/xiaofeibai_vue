import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            component: home
        },
        //信息页
        {
            path: '/news',
            component: news
        },
        //搜索页
        {
            path: '/search',
            component: search
        }
    ]
}]