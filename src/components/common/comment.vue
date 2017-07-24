<template>
    <div class="comment">
        <div class="tc" v-if="tc" @click="gb"></div>
        <div class="plBox" v-if="tc">
            <input type="text" class="pl_title" name="title" v-model="title" placeholder="评论" v-focus="focusStatus">
            <div class="plBut" @click="plBut">发送</div>
        </div>
        <div class="title"><i></i>网友评论({{type=='tousu'?detail.comments_count:detail.comments}})<div class="but" @click="pl">评论</div></div>
        <ul v-if="comment.length>0">
            <li v-if="key<3" v-for="data,key in comment">
                <img :src="data.member?data.member.avatar:require('../../images/default_portrait.png')">
                <div>
                    <p class="name" v-if="data.member">{{data.member.name}}<span v-if="type=='tousu' && detail.member_id==data.member.id">(投诉人)</span></p>
                    <p class="name" v-else>消费保保</p>
                    <p class="text">{{data.content}}</p>
                    <p class="date">{{data.add_time}}<span v-if="data.client">来自{{data.client}}</span></p>
                </div>
            </li>
        </ul>
        <p v-else class="wupl">暂无评论</p>
        <router-link :to="type=='tousu'?'/tousu/detail/comment/'+$route.params.id+'?id='+detail.member_id:'/article/detail/comment/'+$route.params.id" class="gd" v-if="comment.length>3">查看更多评论</router-link>
        <!--<p class="zhichi" v-if="type=='tousu'" style="margin-top:.4rem;">已经有<span>{{detail.clicks}}</span>人通过关注公众号支持</p>-->
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                re:false,
                tc:false,
                focusStatus:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                title:''
            }
        },
        props:['comment','detail','type'],
        created () {

        },
        mounted(){

        },
        watch: {

        },
        components:{
            loading,
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        },
        methods: {
            ...mapMutations([
                'AUTO_ROUTE'
            ]),
            plBut(){
                if(this.type=='tousu'){
                    if(this.re==false){
                        this.re=true;
                        this.showLoad=true;
                        this.loadType='load';
                        this.loadText='正在提交评论...';
                        this.axios.post('/v4/complaint/comment', {
                            'complaint_id':this.$route.params.id,
                            'content':this.title,
                            'source_type':'wechat',
                            'sign':this.userInfo.sign
                        })
                            .then(res =>{
                                if(res.data.error){
                                    this.showLoad=true;
                                    this.loadType='alert';
                                    this.loadText=res.data.msg;
                                    setTimeout(this.close,1500);
                                }else{
                                    this.showLoad=true;
                                    this.loadText='评论成功';
                                    setTimeout(this.close,1500);
                                    setTimeout(this.gb,1500);
                                    setTimeout(this.shuaxin,1500);
                                }
                                this.re=false;
                                console.log(res);
                            })
                            .catch(err =>{
                                this.re=false;
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText='网络错误';
                                setTimeout(this.close,1500);
                            });
                    }
                }else{
                    if(this.re==false){
                        this.re=true;
                        this.showLoad=true;
                        this.loadType='load';
                        this.loadText='正在提交评论...';
                        this.axios.post('/v4/member/add_article_comment', {
                            'article_id':this.$route.params.id,
                            'content':this.title,
                            'sign':this.userInfo.sign
                        })
                        .then(res =>{
                            if(res.data.error){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                            }else{
                                this.showLoad=true;
                                this.loadText='评论成功';
                                setTimeout(this.close,1500);
                                setTimeout(this.gb,1500);
                                setTimeout(this.shuaxin,1500);
                            }
                            this.re=false;
                            console.log(res);
                        })
                        .catch(err =>{
                            this.re=false;
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText='网络错误';
                            setTimeout(this.close,1500);
                        });
                    }
                }
            },
            pl(){
                if(this.userInfo=='' || this.userInfo==null){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请先登录';
                    setTimeout(this.close,1500);
                    setTimeout(this.dl,1500);
                }else{
                    this.tc=true;
                    this.focusStatus=true;
                    this.i();
                    document.querySelector('body').style.overflow='hidden';
                }
            },
            i(){
                 window.abc = setInterval(function() {
                    document.body.scrollTop = document.body.scrollHeight;
                }, 100);
            },
            dl(){
                this.AUTO_ROUTE(this.$route.path);
                this.$router.push({path:'/login?id=1'});
            },
            close(){
                this.showLoad = false;
            },
            gb(){
                this.tc=false;
                clearInterval(window.abc);
                document.querySelector('body').style.overflow='';
            },
            shuaxin(){
                this.$router.go(0);
            }
        }
    }
</script>

<style lang="less" scoped>
    .wupl{
        font-size: .28rem;
        margin: 0 .22rem;
        padding:.22rem 0 0 .0;
        color: #999;
    }
    .zhichi{
        padding-bottom: .4rem;
        text-align: center;
        font-size: .24rem;
        color: #1D2733;
        span{
            color: #FD9C33;
        }
    }
    .plBut{
        width: calc(~'100% - 1px - 6.35rem');
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        float: left;
        font-size: .3rem;
        color: #37C078;
    }
    .pl_title{
        width: 6.1rem;
        height: .45rem;
        float: left;
        margin-top: .225rem;
        margin-left: .25rem;
        border-right: 1px solid rgba(204,204,204,.5);
        font-size: .26rem;
        border-radius: 0;
    }
    .plBox{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .9rem;
        box-shadow: 1px 1px 1px rgba(0,0,0,.1);
        background: #fff;
        z-index: 10000;
    }
    .tc{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    }
    .comment{
        background: #fff;
        padding-bottom: .22rem;
        margin-top: .2rem;
        width: 100%;
        .title{
            width:auto;
            margin-left: .2rem;
            height: .68rem;
            line-height: .68rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            font-size: .32rem;
            i{
                width: .35rem;
                height: .34rem;
                display: block;
                float: left;
                margin-top: .17rem;
                margin-right: .15rem;
                background: url("../../images/peopleComment.png") no-repeat center;
                background-size: 100%;
            }
            .but{
                width: 1.07rem;
                height: .48rem;
                line-height: .48rem;
                text-align: center;
                float: right;
                margin-top: .09rem;
                border-radius: .1rem;
                margin-right: .2rem;
                font-size: .26rem;
                color: #fff;
                background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
                background-image:linear-gradient(to right,#37C078,#5BDC99);
            }
        }
        ul{
            margin-left: .2rem;
            width: auto;
            li{
                width: 100%;
                margin-top: .3rem;
                overflow: hidden;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 100%;
                    display: block;
                    float: left;
                }
                div{
                    width: 6.2rem;
                    float: right;
                    .name{
                        font-size: .24rem;
                        color: #999;
                        margin-top: .05rem;
                        span{
                            color: #37C078;
                            margin-left: .2rem;
                        }
                    }
                    .text{
                        width: auto;
                        margin-right: .2rem;
                        margin-top: .15rem;
                        font-size: .28rem;
                    }
                    .date{
                        margin-top: .1rem;
                        font-size: .22rem;
                        color: #999;
                        span{
                            margin-left: .35rem;
                            color: #999;
                        }
                    }
                }
            }
        }
        .gd{
            display: block;
            text-indent: .34rem;
            margin: .22rem auto 0 auto;
            width: 2.6rem;
            height: .7rem;
            line-height: .7rem;
            border-radius: .1rem;
            border: 1px solid rgba(204,204,204,.5);
            font-size: .26rem;
            background: url("../../images/jt_hui.png") no-repeat center right .2rem;
            background-size: .35rem;
        }
    }
</style>