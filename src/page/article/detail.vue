<template>
    <div id="wudi_detail" style="padding-top: 1rem; background: #F6F7F9;">
        <header id="headI">
            <div id="head_go" @click="$router.go(-1)"></div>
            <span class="head_title" v-if="detail">{{detail.title.substr(0,12)}}<span style="color: #37C078;" v-if="detail.title.length>12">...</span></span>
            <div v-if="userInfo" class="head_a" @click="sc"><i :class="collected?'hover':''"></i></div>
            <div v-else class="head_a" @click="dl"><i></i></div>
        </header>
        <div class="armain">
            <div class="title">{{detail.title}}</div>
            <div class="info">
                <span v-if="detail.add_time">{{detail.add_time}}</span>
                <span v-if="detail.source">{{detail.source}}</span>
                <span v-if="detail.editor">{{detail.editor}}</span>
            </div>
            <div class="cent" v-html="detail.content"></div>
            <img v-for="data in src" :key="data" v-preview="data" :src="data">
        </div>
        <comment :comment="comment" :detail="detail" :type="type"></comment>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import comment from '../../components/common/comment'
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{
                detail:'',
                collected:'',
                comment:'',
                type:'article',
                showLoad:false,
                loadType:null,
                loadText:null,
                src:[]
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
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'AUTO_ROUTE'
            ]),
            dl(){
                this.AUTO_ROUTE(this.$route.path);
                this.$router.push({path:'/login?id=1'});
            },
            sc(){
                if(this.collected){
                    this.axios.get('/v4/member/drop_article_collect?article_id='+this.$route.params.id+'&sign='+this.userInfo.sign)
                        .then(res=>{
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
                                this.loadText='取消收藏成功';
                                this.collected=false;
                                setTimeout(this.close,1500);
                            }
                        });
                }else{
                    this.axios.get('/v4/member/add_article_collect?article_id='+this.$route.params.id+'&sign='+this.userInfo.sign)
                        .then(res=>{
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
                                this.loadText='收藏成功';
                                this.collected=true;
                                setTimeout(this.close,1500);
                            }
                        });
                }
            },
            fx(){
                let share_info = {
                    title: this.detail.title,
                    desc: this.detail.content,
                    imgUrl: this.detail.thumb?this.detail.thumb:'http://m.xfb315.com/wap/img/share_icon.jpg',
                    link: window.location.href,
                };
                wx.ready(function(){
                    wx.onMenuShareWeibo(share_info);
                    wx.onMenuShareAppMessage(share_info);
                    wx.onMenuShareQQ(share_info);
                    wx.onMenuShareTimeline(share_info);
                });
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
            preview(cur,list){
                wx.previewImage({
                    current: cur, // 当前显示图片的http链接
                    urls: list // 需要预览的图片http链接列表
                });
            },
            escapeChars(str) {
                str = str.replace(/(\n)/g, "");
                str = str.replace(/(\t)/g, "");
                str = str.replace(/(\r)/g, "");
                str = str.replace(/<\/?[^>]*>/g, "");
                str = str.replace(/\s*/g, "");
                str = str.replace(/&nbsp;/g,'');
                str = str.replace(/&quot;/g,'"');
                return str;
            },
            srcm(str){
                let reg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi;
                let i = 0;
                while (reg.exec(str))
                {
                    this.src[i] = RegExp.$1;
                    i +=1;
                }
            },
            fetchData () {
                this.axios.get('/v4/article/detail?article_id='+this.$route.params.id)
                    .then(res =>{
                        this.detail=res.data.data.detail;
                        this.detail.content = this.escapeChars(this.detail.content);
                        this.detail.title = this.escapeChars(this.detail.title);
                        this.comment=res.data.data.comment;
                        //this.srcm(this.detail.content);
                        if(this.detail!=''){
                            this.showLoad=false;
                            this.fx();
                            this.fanhui();
                        }
                        console.log(this.detail);
                    })
                    .catch(err =>{

                    });
                    console.log(this.$route.params.id);
                if(this.userInfo){
                    this.axios.post('/v4/member/article_is_collected',{'article_id':this.$route.params.id,'sign':this.userInfo.sign})
                        .then(res=>{
                            this.collected = res.data.data;
                            console.log(this.collected);
                        })
                }
            },
        }

    }
</script>

<style lang="less">
#wudi_detail{
    #headI{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #cccccc;
        background: #fff;
    #head_go{
        float: left;
        width: 1rem;
        height: 1rem;
        background: url("../../images/head_jt.png") no-repeat left .1rem center;
        background-size: .4rem;
    }
    span.head_title{
        float: left;
        width: calc(~'100% - 2rem');
        text-align: center;
        display: block;
        height: 1rem;
        line-height: 1rem;
        font-size: .34rem;
        color: #37C078;
    }
    .head_a{
        float: right;
        width: 1rem;
        height: 1rem;
        i{
            margin-left: .275rem;
            margin-top: .29rem;
            float: left;
            width: .45rem;
            height: .42rem;
            display: block;
            background-image: url("../../images/sc@2x.png");
            background-repeat: no-repeat;
            background-position: top center;
            background-size: .45rem;
        }
        .hover{
            background-position: bottom;
        }
    }

    }
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
                img{
                    display: block;
                }
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
}
</style>