import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const article = r => require.ensure([], () => r(require('../page/article/list')), 'article')
const articleDetail = r => require.ensure([], () => r(require('../page/article/detail')), 'articleDetail')
const tousuCreate = r => require.ensure([], () => r(require('../page/tousu/create')), 'tousuCreate')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //登陆
        {
            path: '/login',
            component: login
        },
        //首页
        {
            path: '/home',
            component: home,
            meta: { keepAlive: true },
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
        },
        //文章页
        {
            path: '/article',
            component: article,
        },
        //文章详情页
        {
            path: '/article/detail/:id',
            component: articleDetail
        },
        //
        {
            path: '/tousu/create',
            component: tousuCreate
        }
    ]
}]