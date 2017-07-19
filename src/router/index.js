import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const login1 = r => require.ensure([], () => r(require('../page/login/login1')), 'login1')
const register = r => require.ensure([], () => r(require('../page/login/register')), 'register')
const resetPassword = r => require.ensure([], () => r(require('../page/login/resetPassword')), 'resetPassword')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const help = r => require.ensure([], () => r(require('../page/help/help')), 'help')
const lawyer = r => require.ensure([], () => r(require('../page/lawyer/list')), 'lawyer')
const reporter = r => require.ensure([], () => r(require('../page/reporter/list')), 'reporter')
const lawyerDetail = r => require.ensure([], () => r(require('../page/lawyer/detail')), 'lawyerDetail')
const reporterDetail = r => require.ensure([], () => r(require('../page/reporter/detail')), 'reporterDetail')
const lawyerCommit = r => require.ensure([], () => r(require('../page/lawyer/commit')), 'lawyerCommit')
const reporterCommit = r => require.ensure([], () => r(require('../page/reporter/commit')), 'reporterCommit')
const example = r => require.ensure([], () => r(require('../page/lawyer/example')), 'example')
const commitSuccess = r => require.ensure([], () => r(require('../page/lawyer/success')), 'commitSuccess')
const member = r => require.ensure([], () => r(require('../page/member/member')), 'member')
const memberTousu = r => require.ensure([], () => r(require('../page/member/tousu')), 'memberTousu')
const followTousu = r => require.ensure([], () => r(require('../page/member/followTousu')), 'followTousu')
const setting = r => require.ensure([], () => r(require('../page/member/setting')), 'setting')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const article = r => require.ensure([], () => r(require('../page/article/list')), 'article')
const articleDetail = r => require.ensure([], () => r(require('../page/article/detail')), 'articleDetail')
const cechoiceDetail = r => require.ensure([], () => r(require('../page/cechoice/detail')), 'cechoiceDetail')
const tousuDetail = r => require.ensure([], () => r(require('../page/tousu/detail')), 'tousuDetail')
const tousuCreate = r => require.ensure([], () => r(require('../page/tousu/create')), 'tousuCreate')
const tousuSuccess = r => require.ensure([], () => r(require('../page/tousu/success')), 'tousuSuccess')
const tousuError = r => require.ensure([], () => r(require('../page/member/error')), 'tousuError')
const activity = r => require.ensure([], () => r(require('../page/activity/activity')), 'activity')
const productRecommend = r => require.ensure([], () => r(require('../page/product/recommend')), 'productRecommend')
const productIndex = r => require.ensure([], () => r(require('../page/product/index')), 'productIndex')
const productList = r => require.ensure([], () => r(require('../page/product/list')), 'productList')
const productInfo = r => require.ensure([], () => r(require('../page/product/info')), 'productInfo')
const productConsult = r => require.ensure([], () => r(require('../page/product/consult')), 'productConsult')


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
        //注册
        {
            path: '/register',
            component: register
        },
        //重置密码
        {
            path: '/resetPassword',
            component: resetPassword
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
        //产品推荐列表
        {
            path: '/product/recommend',
            component: productRecommend,
            meta: { keepAlive: true },
        },
        //产品管家首页
        {
            path: '/product',
            component: productIndex,
            meta: { aR: true },
        },
        //产品管家列表
        {
            path: '/product/list',
            component: productList,
            meta: { aR: true },
        },
        //产品管家介绍页
        {
            path: '/product/info',
            component: productInfo,
        },
        //产品管家-咨询客服
        {
            path: '/product/consult/:id',
            component: productConsult,
        },
        //律师列表
        {
            path: '/lawyer/list',
            component: lawyer,
            meta: { keepAlive: true },
        },
        //律师详情
        {
            path: '/lawyer/detail/:id',
            component: lawyerDetail,
        },
        //律师咨询
        {
            path: '/lawyer/commit/:id',
            component: lawyerCommit,
            meta: { aR:true },
        },
        //记者列表
        {
            path: '/reporter/list',
            component: reporter,
            meta: { keepAlive: true },
        },
        //记者详情
        {
            path: '/reporter/detail/:id',
            component: reporterDetail,
        },
        //记者爆料
        {
            path: '/reporter/commit/:id',
            component: reporterCommit,
        },
        //案例详情
        {
            path:'example/:id',
            component:example,
        },
        //爆料/咨询结束页
        {
            path:'commit/success/:id',
            component:commitSuccess,
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
        //我的投诉页
        {
            path: '/member/tousu',
            component: memberTousu
        },
        //我的投诉错误页
        {
            path: '/member/error',
            component: tousuError
        },
        //关注的投诉页
        {
            path: '/member/followTousu',
            component: followTousu,
            meta: { aR:true },
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
            component: articleDetail,
        },
        //消费电子详情页
        {
            path: '/cechoice/detail/:id',
            component: cechoiceDetail,
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
        },
        //活动页
        {
            path: '/activity',
            component: activity,
            meta: { keepAlive: true }
        }
    ]
}]