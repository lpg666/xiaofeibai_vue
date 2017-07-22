<template>
    <div style="padding-top: 1rem; background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text" v-if="detail">{{detail.title.substr(0,12)}}<span style="color: #37C078;" v-if="detail.title.length>12">...</span></span></head-i>
        <div class="armain">
            <div class="title">{{detail.title}}</div>
            <div class="info">
                <span v-if="detail.add_time">{{detail.add_time}}</span>
                <span v-if="detail.source">{{detail.source}}</span>
                <span v-if="detail.editor">{{detail.editor}}</span>
            </div>
            <div class="cent" v-html="detail.content"></div>
        </div>
        <comment :comment="comment" :detail="detail" :type="type"></comment>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import comment from '../../components/common/comment'
    import loading from '../../components/common/loading'

    export default {
        data(){
            return{
                detail:'',
                comment:'',
                type:'article',
                showLoad:false,
                loadType:null,
                loadText:null,
            }
        },
        components:{
            headI,
            comment,
            loading
        },
        created () {

        },
        mounted(){
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
            fx(){
                var url=encodeURIComponent(window.location.href.split('#')[0]);
                //alert(url);
                this.axios.get('/v4/weixin?url='+url)
                    .then(res =>{
                        console.log(res.data);
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.signature,// 必填，签名，见附录1
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        var share_info = {
                            title: this.detail.title,
                            desc: this.detail.content,
                            imgUrl: 'http://m.xfb315.com/wap/img/share_icon.jpg',
                            link: window.location.href,
                        };
                        wx.ready(function(){
                            wx.onMenuShareWeibo(share_info);
                            wx.onMenuShareAppMessage(share_info);
                            wx.onMenuShareQQ(share_info);
                            wx.onMenuShareTimeline(share_info);
                        });
                    });
            },
            close(){
                this.showLoad = false;
            },
            fanhui(){
                document.body.scrollTop=0;
            },
            fetchData () {
                this.axios.get('/v4/article/detail?article_id='+this.$route.params.id+'')
                    .then(res =>{
                        this.detail=res.data.data;
                        this.comment=res.data.data.comment;
                        if(this.detail!=''){
                            this.showLoad=false;
                            this.fanhui();
                        }
                        this.fx();
                        console.log(this.detail);
                    })
                    .catch(err =>{

                    });
                    console.log(this.$route.params.id);
            }
        }

    }
</script>

<style lang="less" scoped>
    .armain{
        width: auto;
        background: #fff;
        padding: 0 .22rem;
        .title{
            font-size: .4rem;
            line-height: .56rem;
            padding: .4rem 0 .2rem 0;
        }
        .info{
            width: 100%;
            margin-bottom: .2rem;
            font-size: .22rem;
            span{
                color: #999;
                margin-right: .5rem;
            }
        }
        .cent{
            padding-bottom: .35rem;
            width: 100%;
            font-size: .3rem;
            p{
                margin-bottom: .2rem;
                font-size: .3rem !important;
                line-height: .5rem;
            }
        span{
            text-align: justify;
            font-size: .3rem !important;
            display: block;
                img{
                    display: block;
                }
            }
        }
    }
</style>