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
const memberEdit = r => require.ensure([], () => r(require('../page/member/edit')), 'memberEdit')
const memberFrom = r => require.ensure([], () => r(require('../page/member/editFrom')), 'memberFrom')
const memberTousu = r => require.ensure([], () => r(require('../page/member/tousu')), 'memberTousu')
const memberGrade = r => require.ensure([], () => r(require('../page/member/grade')), 'memberGrade')
const collectArticle = r => require.ensure([], () => r(require('../page/member/collectArticle')), 'collectArticle')
const followTousu = r => require.ensure([], () => r(require('../page/member/followTousu')), 'followTousu')
const setting = r => require.ensure([], () => r(require('../page/member/setting')), 'setting')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const article = r => require.ensure([], () => r(require('../page/article/list')), 'article')
const articleDetail = r => require.ensure([], () => r(require('../page/article/detail')), 'articleDetail')
const articleDetailComment = r => require.ensure([], () => r(require('../page/article/comment')), 'articleDetailComment')
const cechoiceDetail = r => require.ensure([], () => r(require('../page/cechoice/detail')), 'cechoiceDetail')
const tousuDetail = r => require.ensure([], () => r(require('../page/tousu/detail')), 'tousuDetail')
const tousuDetailComment = r => require.ensure([], () => r(require('../page/tousu/comment')), 'tousuDetailComment')
const tousuCreate = r => require.ensure([], () => r(require('../page/tousu/create')), 'tousuCreate')
const tousuCreate1 = r => require.ensure([], () => r(require('../page/tousu/create1')), 'tousuCreate1')
const tousuSuccess = r => require.ensure([], () => r(require('../page/tousu/success')), 'tousuSuccess')
const tousuErrormember = r => require.ensure([], () => r(require('../page/member/error')), 'tousuErrormember')
const tousuError = r => require.ensure([], () => r(require('../page/tousu/error')), 'tousuError')
const activity = r => require.ensure([], () => r(require('../page/activity/activity')), 'activity')
const productRecommend = r => require.ensure([], () => r(require('../page/product/recommend')), 'productRecommend')
const productIndex = r => require.ensure([], () => r(require('../page/product/index')), 'productIndex')
const productList = r => require.ensure([], () => r(require('../page/product/list')), 'productList')
const productInfo = r => require.ensure([], () => r(require('../page/product/info')), 'productInfo')
const productInfo1 = r => require.ensure([], () => r(require('../page/product/info1')), 'productInfo1')
const productConsult = r => require.ensure([], () => r(require('../page/product/consult')), 'productConsult')
const productDetail = r => require.ensure([], () => r(require('../page/product/detail')), 'productDetail')
const dt = r => require.ensure([], () => r(require('../page/member/dt')), 'dt')


export default [{
    path: '',
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
        //产品管家介绍页
        {
            path: '/product/info1',
            component: productInfo1,
        },
        //产品管家-咨询客服
        {
            path: '/product/consult/:id',
            component: productConsult,
            meta: { aR: true },
        },
        //产品管家-产品详情页
        {
            path: '/product/detail/:id',
            component: productDetail,
            meta: { aR: true },
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
        //个人信息修改页
        {
            path: '/member/edit',
            component: memberEdit,
            meta: { aR:true },

        },
        //个人信息修改数据页
        {
            path: '/member/from',
            component: memberFrom,
            meta: { aR:true },
        },
        //个人信息设置页
        {
            path:'/member/setting',
            component:setting
        },
        //我的投诉页
        {
            path: '/member/tousu',
            component: memberTousu,
            meta: { aR:true },
        },
        //我的投诉错误页
        {
            path: '/member/error',
            component: tousuErrormember
        },
        //关注的投诉页
        {
            path: '/member/followTousu',
            component: followTousu,
            meta: { aR:true },
        },
        //我的收藏文章列表
        {
            path: '/member/collectArticle',
            component: collectArticle,
            meta: { aR:true },
        },
        //投诉评价页
        {
            path: '/member/grade',
            component: memberGrade,
            meta: { aR:true },
        },
        //信息页
        {
            path: '/news',
            component: news,
            meta: { aR:true },
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
            meta: { keepAlive: true }
        },
        //文章详情页
        {
            path: '/article/detail/:id',
            component: articleDetail,
        },
        //文章评论列表
        {
            path: '/article/detail/comment/:id',
            component: articleDetailComment
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
        //填写投诉1
        {
            path: '/tousu/create1',
            component: tousuCreate1,
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
        //投诉详情页
        {
            path: '/tousu/error/:id',
            component: tousuError
        },
        //投诉评论列表
        {
            path: '/tousu/detail/comment/:id',
            component: tousuDetailComment
        },
        //活动页
        {
            path: '/activity',
            component: activity,
            meta: { keepAlive: true }
        },
        //答题页
        {
            path: '/dt',
            component: dt,
            meta: { keepAlive: true }
        }
    ]
}]