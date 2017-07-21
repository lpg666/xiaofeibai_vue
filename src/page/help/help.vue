<template>
    <div style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <div class="dz">
            <div class="title">今日当值</div>
            <div class="box">
                <router-link to="/lawyer/list" class="box_top">律师<span>查看全部</span></router-link>
                <router-link :to="'/lawyer/detail/'+lawyer.id" class="box_info">
                    <div class="img" :style="{backgroundImage:'url('+lawyer.avatar+'!/fh/230)'}"></div>
                    <!--<img :src="lawyer.avatar">-->
                    <div class="box_x">
                        <p class="name">{{lawyer.name}}</p>
                        <p class="dw">{{lawyer.organization}}</p>
                        <p class="dt">3分钟前回复了Kelly</p>
                        <router-link :to="'/lawyer/commit/'+lawyer.id+'?name='+lawyer.name">向Ta咨询</router-link>
                    </div>
                </router-link>
            </div>
            <div class="box">
                <router-link to="/reporter/list" class="box_top">记者<span>查看全部</span></router-link>
                <router-link :to="'/reporter/detail/'+reporter.id" class="box_info" style="border-bottom: none;">
                    <div class="img" :style="{backgroundImage:'url('+reporter.avatar+'!/fh/230)'}"></div>
                    <!--<img :src="reporter.avatar">-->
                    <div class="box_x">
                        <p class="name">{{reporter.name}}</p>
                        <p class="dw">{{reporter.organization}}</p>
                        <p class="dt">3分钟前回复了Kelly</p>
                        <router-link :to="'/reporter/commit/'+reporter.id+'?name='+reporter.name">向Ta爆料</router-link>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="js">
            <router-link to="/article?type=1" class="title">消费警示<span>实用消费警示，远离消费陷阱</span></router-link>
            <router-link :to="'/article/detail/'+article.id" class="box" v-if="article && article.default_pics.length<=0">
                <div class="box_pic1 img" :style="{backgroundImage:'url('+article.thumb+'!/fh/230)'}"></div>
                <div class="box_top">{{article.title}}</div>
            </router-link>
            <router-link :to="'/article/detail/'+article.id" class="box" v-else>
                <div class="box_top">{{article.title}}</div>
                <ul class="box_pic">
                    <li v-if="key<3" class="img" v-for="data,key in article.default_pics" :style="{backgroundImage:'url('+data.pic+'!/fh/230)'}"></li>
                </ul>
            </router-link>
        </div>
        <div class="tuij">
            <router-link to="/product/recommend" class="title">产品推荐<span>消费电子行业最新产品测评</span></router-link>
            <router-link :to="'/cechoice/detail/'+chanpin.article_id" class="box">
                <div class="box_pic img" :style="{backgroundImage:'url('+chanpin.thumb+')'}"></div>
                <div class="box_top">{{chanpin.title}}</div>
            </router-link>
        </div>
        <div class="tongj">
            <router-link to="/article?type=3" class="title">行业统计<span>消各行业投诉数据</span></router-link>
            <router-link :to="'/article/detail/'+hanye.id" class="box">
                <div class="box_pic img" :style="{backgroundImage:'url('+hanye.thumb+'!/fh/230)'}"></div>
                <div class="box_top">{{hanye.title}}</div>
            </router-link>
        </div>
        <router-link to="/tousu/create" id="ts_btn"><span>一键<br/>投诉</span></router-link>
        <tar></tar>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import tar from '../../components/tar/tar'

    export default {
        data(){
            return {
                reporter:'',
                lawyer:'',
                article:'',
                hanye:'',
                chanpin:'',
            }
        },
        components:{
            headTop,
            tar
        },
        created(){
            this.reporterAjax();
            this.lawyerAjax();
            this.articleAjax();
            this.hanyeAjax();
            this.chanpinAjax();
        },
        methods:{
            chanpinAjax(){
                this.axios.get('/v4/cechoice_article/article_list?type_id=2&getRecommend=1')
                    .then(res =>{
                        this.chanpin=res.data.data;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },
            reporterAjax(){
                this.axios.get('/v4/reporter/watch_reporter')
                    .then(res =>{
                        this.reporter=res.data.data;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },
            lawyerAjax(){
                this.axios.get('/v4/lawyer/watch_lawyer')
                    .then(res =>{
                        this.lawyer=res.data.data;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },
            hanyeAjax(){
                this.axios.get('/v4/article/article_index?type_id=3')
                    .then(res =>{
                        this.hanye=res.data.data;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },
            articleAjax(){
                this.axios.get('/v4/article/article_index?type_id=1')
                    .then(res =>{
                        this.article=res.data.data;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },

        }
    }
</script>

<style lang="less" scoped>
    #ts_btn{
        margin: 0;
        display: table;
        position: fixed;
        right: .2rem;
        bottom: 1.32rem;
        background: url("../../images/FAB@2x.png") no-repeat center;
        background-size: 100%;
        z-index: 999;
        width: 1.22rem;
        height: 1.22rem;
    span{
        text-align: center;
        font-size: .24rem;
        color: #fff;
        vertical-align: middle;
        display: table-cell;
    }
    }
    .img{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .dz{
        background: #fff;
        margin-bottom: .2rem;
        width: 100%;
        .title{
            font-size: .34rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            width: auto;
            margin-left: .2rem;
            height: 1rem;
            line-height: 1rem;
            font-weight: bold;
        }
        .box{
            margin-left: .2rem;
            width:auto;
            .box_top{
                display: block;
                width: 100%;
                font-size: .32rem;
                font-weight: bold;
                background: url("../../images/list_jt.png") no-repeat right .2rem center;
                background-size:.34rem;
                height: .9rem;
                line-height: .9rem;
                span{
                    font-size: .26rem;
                    float: right;
                    margin-right: .7rem;
                }
            }
            .box_info{
                display: block;
                width: 100%;
                padding-bottom: .35rem;
                border-bottom: 1px solid rgba(204,204,204,.5);
                .img{
                    width: 1.9rem;
                    height:2.4rem;
                    float: left;
                }
                .box_x{
                    width: auto;
                    margin-left: 2.8rem;
                    p{ margin-bottom: .1rem}
                    .name{  font-size: .32rem; font-weight: bold;}
                    .dw{  font-size: .28rem;  }
                    .dt{  font-size: .28rem; color: #6b6b6b; }
                    a{ width: 1.6rem; height: .6rem; margin-top: .4rem; line-height: .6rem; text-align: center; border-radius: .1rem; font-size: .3rem; color: #fff; display: block; background: linear-gradient(to right, #37C078, #5BDC99)}
                }
            }
        }
    }
    .js,.tuij,.tongj{
        background: #fff;
        margin-bottom: .2rem;
        width: 100%;
        .title{
            width: auto;
            margin-left: .2rem;
            height: 1rem;
            display: block;
            line-height: 1rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            background: url("../../images/list_jt.png") no-repeat right .2rem center;
            background-size:.34rem;
            font-size: .34rem;
            font-weight: bold;
            span{
                font-size: .26rem;
                float: right;
                margin-right: .7rem;
            }
        }
        .box{
            width: auto;
            margin-left: .2rem;
            padding-bottom: .3rem;
            display: block;
            overflow: hidden;
            .box_top{
                font-size: .32rem;
                line-height: .48rem;
                padding: .3rem .22rem .3rem 0;
            }
            .box_pic{
                width: 100%;
                display: block;
                overflow: hidden;
                li{
                    width: calc(~'100%/3 - .2rem');
                    float: left;
                    height: 1.9rem;
                    margin-right: .2rem;
                }
            }
        }
    }
    .tongj .box,.tuij .box{
        .box_pic{
            width: 1.65rem;
            height: 1.4rem;
            display: block;
            float: left;
            margin-top: .3rem;
            margin-right: .3rem;
        }
    }
    .js .box{
        .box_pic1{
            width: 1.65rem;
            height: 1.4rem;
            display: block;
            float: left;
            margin-top: .3rem;
            margin-right: .3rem;
        }
    }
</style>