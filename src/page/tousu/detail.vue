<template>
    <div style="padding-top: 1rem; background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text">投诉详情</span></head-i>
        <div class="main" v-if="detail">
            <div class="title">{{detail.title}}</div>
            <div class="name">
                <div class="tx"><img :src="detail.member!=null?detail.member.avatar:require('../../images/default_portrait.png')"></div>
                <div><span class="sp_name">{{detail.name}}</span> <span>发于&nbsp;&nbsp;{{detail.add_time}}</span></div>
                <div class="client">来自{{detail.client}}</div>
                <div @click="gz(1)" class="guanzhu1" v-if="isgz">已关注</div>
                <div @click="gz(0)" class="guanzhu" v-else>+关注</div>
            </div>
            <div style="background: #fff; padding-bottom: .24rem;">
                <div class="info">
                    <div class="problem"><span>投诉问题：{{problems}}</span></div>
                    <div class="suqiu"><span>要求：{{suqius}}</span></div>
                </div>
            </div>
            <div class="content">
                <div class="c_title"><img src="../../images/fileDes.png"><span><div>事件描述</div></span></div>
                <div class="c_text">
                    {{detail.content}}
                </div>
                <div v-if="detail.addons.length>0" class="c_neir" v-for="data in detail.addons">【补充{{data.created_at}}】<br/>{{data.content}}</div>
                <div class="c_pic" v-if="detail.pic.length>0">
                    <ul v-if="userInfo && userInfo.id==detail.member_id">
                        <li v-if="data.is_show==1" v-for="data in detail.pic" :key="data" :style="{backgroundImage:'url('+data.pic+'!/fh/230)'}"></li>
                        <li class="yc" v-else>
                            <span>
                                <p>本图片</p>
                                <p>其他用户</p>
                                <p>不可见</p>
                            </span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-if="data.is_show==1" v-for="data in detail.pic" :key="data" :style="{backgroundImage:'url('+data.pic+'!/fh/230)'}"></li>
                        <li class="yc1" v-else>
                            <span>
                                <p>该图片</p>
                                <p>涉及隐私</p>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content" style="background: #fff;">
                <div class="c_title"><img src="../../images/dealTime.png"><span><div>处理动态</div></span></div>
                <div class="c_dt" v-if="detail.status==0">
                    <img src="../../images/deal_progress01.png">
                    <ul style="margin: .38rem 7% 0 8%;">
                        <li class="p-status">投诉受理</li>
                        <li>企业处理</li>
                        <li>结果审核</li>
                        <li>完成</li>
                    </ul>
                </div>
                <div class="c_dt" v-else-if="detail.status==1">
                    <img src="../../images/deal_progress01.png">
                    <ul style="margin: .38rem 7% 0 8%;">
                        <li class="p-status">投诉受理</li>
                        <li>企业处理</li>
                        <li>结果审核</li>
                        <li>完成</li>
                    </ul>
                </div>
                <div class="c_dt" v-else-if="detail.status==2">
                    <img src="../../images/deal_progress02.png">
                    <ul>
                        <li class="p_gray">投诉受理</li>
                        <li class="p-status">企业处理</li>
                        <li>结果审核</li>
                        <li>完成</li>
                    </ul>
                </div>
                <div class="c_dt" v-else-if="detail.status==3">
                    <img src="../../images/deal_progress03.png">
                    <ul>
                        <li class="p_gray">投诉受理</li>
                        <li class="p_gray">企业处理</li>
                        <li class="p-status">结果审核</li>
                        <li>完成</li>
                    </ul>
                </div>
                <div class="c_dt" v-else-if="detail.status==4">
                    <img src="../../images/deal_progress04.png">
                    <ul style="margin: .38rem 9% 0 6%; width: 85%;">
                        <li class="p_gray">投诉受理</li>
                        <li class="p_gray">企业处理</li>
                        <li class="p_gray">结果审核</li>
                        <li class="p-status">完成</li>
                    </ul>
                </div>
                <div class="result" v-if="detail.default_result">
                    <p>{{detail.default_result.content}}</p>
                    <span>{{detail.default_result.add_time}}</span>
                </div>
                <div class="good" v-if="detail.status==3">
                    <img v-if="!userInfo" src="../../images/lightGood.png" @click="dl">
                    <img v-else-if="!this.isdz" @click="zang" src="../../images/lightGood.png">
                    <img src="../../images/good.png" @click="zang" v-else>
                    <p>已有<span>{{dzs}}</span>人点赞</p>
                </div>
            </div>
        </div>
        <comment style="margin-bottom: .2rem;" :comment="comment" :detail="detail" :type="type"></comment>
        <similars v-if="detail.similars" :detail="detail"></similars>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'
    import comment from '../../components/common/comment'
    import similars from '../../components/common/similars'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail:'',
                comment:'',
                type:'tousu',
                isgz:'',
                isdz:'',
                dzs:'',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            headI,
            comment,
            loading,
            similars
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
            problems(){
                var text = '';
                for(let i in this.detail.problem){
                    text += this.detail.problem[i].name + '、';
                }
                text = text.substring(0,text.lastIndexOf('、'));
                return text;
            },
            suqius(){
                var text = '';
                for(let i in this.detail.suqiu){
                    text += this.detail.suqiu[i].name + '、';
                }
                text = text.substring(0,text.lastIndexOf('、'));
                return text;
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.showLoad=true;
            this.loadType='load';
            this.loadText='正在加载';
            this.fetchData();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            ...mapMutations([
                'AUTO_ROUTE'
            ]),
            zang(){
                if(!this.isdz){
                    this.axios.post('/v4/member/add_complaint_favour',{'complaint_id':this.$route.params.id})
                        .then(res =>{
                            if(res.data.error){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                                if(res.data.msg_type==401){
                                    setTimeout(this.dl,1500);
                                }
                            }else{
                                this.showLoad=true;
                                this.loadType='';
                                this.loadText='点赞成功';
                                this.isdz=true;
                                this.dzs += 1;
                                setTimeout(this.close,1500);
                            }
                        })
                        .catch(err =>{

                        });
                }else{
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='你已点过赞';
                    setTimeout(this.close,1500);
                }
            },
            gz(index){
                if(this.userInfo=='' || this.userInfo==null){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请先登录';
                    setTimeout(this.close,1500);
                    setTimeout(this.dl,1500);
                }else if(index==0){
                    this.axios.get('/v4/member/add_complaint_collect?complaint_id='+this.$route.params.id)
                        .then(res =>{
                            if(res.data.error==1){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                if(res.data.msg_type==401){
                                    setTimeout(this.dl,1500);
                                }
                            }else{
                                this.isgz=true;
                                this.showLoad=true;
                                this.loadText='关注成功';
                            }
                            setTimeout(this.close,1500);
                            console.log(res.data);
                        })
                }else{
                    this.axios.get('/v4/member/drop_complaint_collect?complaint_id='+this.$route.params.id)
                        .then(res =>{
                            if(res.data.error==1){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                if(res.data.msg_type==401){
                                    setTimeout(this.dl,1500);
                                }
                            }else{
                                this.isgz=false;
                                this.showLoad=true;
                                this.loadText='取消关注成功';
                            }
                            setTimeout(this.close,1500);
                            console.log(res.data);
                        })
                }
            },
            dl(){
                this.AUTO_ROUTE(this.$route.path);
                this.$router.push({path:'/login?id=1'});
            },
            close(){
                this.showLoad = false;
            },
            fanhui(){
                document.body.scrollTop=0;
            },
            fetchData () {
                this.axios.get('/v4/complaint/detail?complaint_id='+this.$route.params.id+'')
                    .then(res =>{
                        this.detail=res.data.data;
                        this.comment=res.data.data.comments;
                        this.isgz = this.detail.is_collect;
                        this.isdz = this.detail.is_favour;
                        this.dzs = this.detail.stat.favours;
                        if(this.detail!=''){
                            this.showLoad=false;
                            this.fanhui();
                        }
                        console.log(this.detail,this.isgz);
                    })
                    .catch(err =>{

                    });
                console.log(this.$route.params.id);
            }
        }
    }
</script>

<style lang="less" scoped>
.yc,.yc1{
    background: rgba(0,0,0,.8);
    span{
        width: 100%;
        display: block;
    }
    p{
        font-size: .26rem;
        text-align: center;
        line-height: .4rem;
        color: #fff;
    }
    p:first-child{
        margin-top: .2rem;
    }
}
.yc1{
    p:first-child{
        margin-top: .4rem;
    }
}
.main{
    width: auto;
    .title{
        background: #fff;
        font-size: .4rem;
        line-height: .56rem;
        padding: .4rem .22rem .2rem .22rem;
    }
    .name{padding:0 .22rem .25rem .22rem; color:#999; background: #fff; font-size: .22rem; overflow: hidden; position: relative;}
    .name span{ color: #999;}
    .name .client{ color: #999;}
    .name .tx{ width: .8rem; height: .8rem; border-radius: 50%; overflow: hidden; float: left; margin: 0 .26rem 0 0;}
    .name .tx img{ width: 100%;}
    .name .sp_name{color: #1d2733; margin-right: .26rem; font-size:.28rem;}
    .name .guanzhu{font-size: .26rem; color: #fff; padding: .08rem .24rem .1rem .2rem; position: absolute; top: 0; right: .22rem; background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
        background-image:linear-gradient(to right,#37C078,#5BDC99); border-radius:4px;}
    .name .guanzhu1{font-size: .26rem; color: #999; padding: .08rem .2rem .1rem .2rem; position: absolute; top: 0; right: .22rem; border-radius:4px; background: #e0e0e0; border: 1px solid #e0e0e0;}
    .info{ font-size: .26rem; color: #1d2733; background: #fff; border-left:.06rem solid #37c078; margin: 0 .22rem;}
    .info span{color: #323232; margin-right: .24rem;}
    .info .problem{margin-bottom: .34rem; margin-left: .22rem; padding-top: .14rem;}
    .info .suqiu{ padding-bottom: .14rem; margin-left: .22rem;}
    .content{background: #fff; margin-top: .2rem; border-bottom: 1px solid #ebebeb;}
    .content .c_title{border-bottom: 1px solid #ebebeb; height: auto; overflow: hidden; width:auto; margin-left:.22rem;}
    .content .c_title img{ width: .32rem; height: .32rem; float: left; margin: .18rem .16rem .18rem 0;}
    .content .c_title span{font-size: .32rem; color: #1d2733; line-height: .68rem;}
    .content .c_text{ font-size: .3rem; color: #1d2733; padding: .32rem .22rem; line-height: .50rem; text-indent: 2em; text-align: justify; display: inline-block;}
    .content .c_neir{font-size: .3rem; color: #1d2733; padding: 0 .25rem; text-indent: -.4em; line-height: .55rem; margin-bottom: .4rem;}
    .content .c_neir span{color: #999; margin-right:.2rem;}
    .content .c_pic{font-size: .3rem; color: #1d2733; padding: 0 .25rem; text-indent: -.4em; line-height: .55rem;}
    .content .c_pic span{color: #999; margin-right:.2rem;}
    .content .c_pic ul{overflow: hidden; padding-bottom: .35rem;}
    .content .c_pic ul li{float: left; width: 1.6rem; height: 1.6rem; overflow: hidden; margin-right: .2rem; margin-bottom: .2rem; background-position: center; background-size: cover; background-repeat: no-repeat;}
    .content .c_pic ul li:nth-child(4n){margin-right: 0;}
    .content .c_pic ul li img{width: 100%; display: block; margin: 0 auto;}
    .c_dt{padding-bottom: .4rem;}
    .c_dt img{ width:calc(~'100% - 2.16rem'); margin: .64rem auto 0 auto; display:block;}
    .c_dt ul{font-size: .28rem; color: #bfbfbf; overflow: hidden; width: 85%; margin: .38rem auto 0 auto;}
    .c_dt ul li{ width: 25%; float: left; text-align: center;}
    .result{ overflow: hidden; padding-bottom: .4rem;}
    .result p{padding: 0 .22rem; font-size: .26rem; color: #feb535; line-height: .5rem; text-align: justify;}
    .result span{font-size: .22rem; color: #feb535; float: right; margin-right: .25rem;}
    .good{padding-bottom: .36rem; margin-bottom: .15rem;}
    .good img{ width: .88rem; height: .88rem; margin: 0 auto; display: block;}
    .good p{font-size: .22rem; color: #999; text-align: center; margin-top: .1rem;}
    .good p span{color: #19d688;}
    .p_gray{color: #19D688;}
    .p-status{color: #ff9d1f;}
}
</style>