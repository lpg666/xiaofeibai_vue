import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const login1 = r => require.ensure([], () => r(require('../page/login/login1')), 'login1')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const help = r => require.ensure([], () => r(require('../page/help/help')), 'help')
const member = r => require.ensure([], () => r(require('../page/member/member')), 'member')
const setting = r => require.ensure([], () => r(require('../page/member/setting')), 'setting')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const article = r => require.ensure([], () => r(require('../page/article/list')), 'article')
const articleDetail = r => require.ensure([], () => r(require('../page/article/detail')), 'articleDetail')
const tousuDetail = r => require.ensure([], () => r(require('../page/tousu/detail')), 'tousuDetail')
const tousuCreate = r => require.ensure([], () => r(require('../page/tousu/create')), 'tousuCreate')
const tousuSuccess = r => require.ensure([], () => r(require('../page/tousu/success')), 'tousuSuccess')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //账号登陆
        {
            path: '/login',
            component: login
        },
        //短信登陆
        {
            path: '/login1',
            component: login1
        },
        //首页
        {
            path: '/home',
            component: home,
            meta: { keepAlive: true },
        },
        //求助
        {
            path: '/help',
            component: help,
            meta: { keepAlive: true },
        },
        //个人信息页
        {
            path: '/member',
            component: member,
        },
        //个人信息设置页
        {
            path:'/member/setting',
            component:setting
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
            meta: { keepAlive: true },
        },
        //文章详情页
        {
            path: '/article/detail/:id',
            component: articleDetail,
        },
        //填写投诉
        {
            path: '/tousu/create',
            component: tousuCreate,
            meta:{
                aR:true
            }
        },
        //投诉成功
        {
            path: '/tousu/success/:id',
            component: tousuSuccess
        },
        //投诉详情页
        {
            path: '/tousu/detail/:id',
            component: tousuDetail
        }
    ]
}]