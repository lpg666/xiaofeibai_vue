<template>
    <div v-if="detail!=''" style="padding-top: 1rem; background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text">{{h}}</span></head-i>
        <div class="title">
            <p class="p1">{{detail.inquiry.title}}</p>
            <p class="p2">{{item(detail.inquiry.add_time)}}</p>
            <div class="p3">
                {{detail.inquiry.content}}
                <ul class="pic" v-if="userInfo && userInfo.id==detail.inquiry.member_id">
                    <li v-for="data in detail.pics" :key="data"><img :src="data.pic+'!/fh/230'"></li>
                </ul>
                <ul class="pic" v-else>
                    <li class="yct">
                        <span>
                            <p>本图片</p>
                            <p>其他用户</p>
                            <p>不可见</p>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="hf">
            <div class="box">
                <div class="tit" v-if="detail.reply_list.volunteer_type=='lawyer'"><img src="../../images/icon_lvshihuifu@2x.png">律师回复</div>
                <div class="tit" v-else><img src="../../images/icon_lvshihuifu@2x.png">记者回复</div>
                <div class="txp"><p>{{detail.reply_list[0].content}}</p></div>
            </div>
        </div>
        <div class="al">
            <div class="hear"><img src="../../images/icon_wangyouzixun@2x.png">资讯案例<img @click="fh($route.query.id)" style="float: right; margin-right: .1rem;" src="../../images/jt_hui.png"></div>
            <div class="box" v-for="data in detail.lists" :key="data">
                <div class="tit">{{data.title}}</div>
                <div class="cen">{{data.inquiry_content}}</div>
                <div class="remind">
                    <div class="yc">
                        <span v-if="data.volunteer_type=='lawyer'">律师回复</span>
                        <span v-else>记者回复</span>
                        {{data.reply_content}}
                    </div>
                </div>
            </div>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                h:'',
                detail:'',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            loading,
            headI
        },
        computed:{

        },
        created(){
            this.fetchData();
        },
        methods:{
            fh(id){
                if(id=='lawyer'){
                    this.$router.push({path:'/lawyer/list?xs=1'});
                }else{
                    this.$router.push({path:'/reporter/list?xs=1'});
                }
            },
            item(s){
                return new Date(parseInt(s) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            },
            fetchData(){
                this.axios.get('/v4/lawyer/case_detail?id='+this.$route.params.id+'&volunteer_type='+this.$route.query.id)
                    .then(res =>{
                        this.detail=res.data;
                        this.h = res.data.inquiry.title.substr(0,10);
                        if(this.detail!=''){
                            this.showLoad=false;
                        }
                    })
            }
        },

    }
</script>

<style lang="less" scoped>
    .al{
        width: 100%;
        height: auto;
        background: #fff;
        padding-bottom: .25rem;
        .hear{
            width: auto;
            margin-left: .22rem;
            height: .66rem;
            line-height: .66rem;
            color: #1D2733;
            font-size: .32rem;
            text-indent: .25rem;
            border-bottom: 1px solid #e6e6e6;
            img{
                width: .36rem;
                height: auto;
                float: left;
                margin-top: .17rem;
            }
        }
        .box{
            width: auto;
            height: auto;
            padding: .15rem .25rem 0 .25rem;
            .tit{
                font-size: .3rem;
                color: #1D2733;
                line-height: .45rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .cen{
                font-size: .26rem;
                color: #999;
                line-height: .4rem;
                height: .4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .remind{
                font-size: .28rem;
                color: #4c4c4c;
                width: auto;
                height: auto;
                background: #F4F5F7;
                margin-top: .2rem;
                padding: .2rem .3rem;
                .yc{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                span{
                    color: #37c27f;
                }
            }
        }
    }
    .hf{
        background: #fff;
        width: 100%;
        height: auto;
        .box{
            width: auto;
            margin-left: .22rem;
            margin-bottom: .2rem;
            .tit{
                width: 100%;
                height: .66rem;
                line-height: .66rem;
                font-size: .32rem;
                color: #37C078;
                border-bottom: 1px solid #e6e6e6;
                img{
                    float: left;
                    width: .38rem;
                    height: .22rem;
                    margin: .22rem .1rem;
                }
            }
            .txp{
                padding: .2rem 0;
                p{
                    font-size: .3rem;
                    color: #1D2733;
                    line-height: .5rem;
                    margin-right: .3rem;
                    text-align: justify;
                }
            }
        }
    }
    .title{
        padding: .4rem .12rem .4rem .2rem;
        .p1{
            font-size: .4rem;
            font-weight: bold;
        }
        .p2{
            margin: .34rem 0 .3rem 0;
            font-size: .22rem;
            color: #999;
        }
        .p3{
            font-size: .3rem;
            color: #1D2733;
            line-height: .5rem;
            text-align: justify;
            margin-right: .18rem;
            .pic{
                width: 100%;
                height: auto;
                overflow: hidden;
                li{
                    width: 1.6rem;
                    height: 1.6rem;
                    margin: .2rem .2rem 0 0;
                    float: left;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
    .yct{
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
</style>