<template>
    <div style="padding-top: 1rem;">
        <header id="headI">
            <div id="head_go" @click="$router.push({path:'/help'})"></div>
            <span class="head_title" slot="title_text">记者</span>
        </header>
        <div class="lawyer_nav">
            <div class="list" :class="{hover: hover=='list'}" @click="navClick('list')">列表<span></span></div>
            <div class="example" :class="{hover: hover=='example'}" @click="navClick('example')">案例<span></span></div>
        </div>
        <swiper id="swiper-nav" :options="swiperNav" ref="mySwiper">
            <swiper-slide class="list lis">
                <router-link :to="'/reporter/detail/'+data.id" v-for="data in list" :key="data">
                    <div class="tx" :style="{backgroundImage:'url('+data.avatar+'!/fh/230)'}"></div>
                    <div class="info">
                        <p class="p1">{{data.name}}<span style="font-size: .24rem; margin-left: .6rem;">媒体志愿者</span></p>
                        <p class="p2">已爆料{{data.inquiries}}件热点投诉</p>
                    </div>
                    <router-link :to="'/reporter/commit/'+data.id" class="but">爆料</router-link>
                    <div class="p3">擅长领域：{{data.good_at}}</div>
                </router-link>
            </swiper-slide>
            <swiper-slide class="example lis">
                <router-link :to="'/example/'+data.id+'?id=reporter'" v-for="data in example" :key="data">
                    <p class="p1">{{data.title}}</p>
                    <p class="p2">{{data.inquiry_content}}</p>
                    <div class="hf">
                        <p class="p3"><span>记者回复：</span>{{data.reply_content}}</p>
                    </div>
                </router-link>
            </swiper-slide>
        </swiper>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                swiperNav: {
                    notNextTick: true,
                    touchAngle:30,
                    onTransitionStart:swiper => {
                        switch (swiper.activeIndex){
                            case 0:
                                this.hover='list';
                                break;
                            default:
                                this.hover='example';
                        }
                    }
                },
                list:'',
                example:'',
                hover:'list',
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
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created(){
            this.fetchData();
            this.examples();
        },
        methods:{
            navClick(data){
                this.hover=data;
                switch (data){
                    case 'list':
                        this.hover='list';
                        this.swiper.slideTo(0);
                        break;
                    default:
                        this.hover='example';
                        this.swiper.slideTo(1);
                }
            },
            fetchData(){
                this.axios.get('/v4/reporter/reporter_list')
                    .then(res =>{
                        this.list=res.data.data;
                        if(this.list!=''){
                            this.showLoad=false;
                        }
                        console.log(this.list);
                    })
            },
            examples(){
                this.axios.get('/v4/lawyer/example?resource_type=reporter')
                    .then(res =>{
                        this.example=res.data.data;
                        if(this.example!=''){
                            this.showLoad=false;

                            if(this.$route.query.xs==1){
                                this.hover='example';
                                this.swiper.slideTo(1,0,false);
                            }
                        }
                        console.log(this.example);
                    })
            }
        }
    }


</script>

<style lang="less">
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
        line-height: 1rem;
        color: #37C078;
        font-size: .3rem;
        text-align: center;
    }

    }

    #swiper-nav{
        width: 100%;
        > .swiper-wrapper{
              height: calc(~'100vh - 1.76rem') !important;
        > .swiper-slide{
              overflow-y:scroll;
              -webkit-overflow-scrolling: touch;
          }
        }
    }
    .lawyer_nav{
        background: #fff;
        position: relative;
        border-bottom: 1px solid rgba(204,204,204,.5);
        width: 100%;
        height: .76rem;
        div{
            position: absolute;
            top: 0;
            height: .74rem;
            line-height: .74rem;
            font-size: .32rem;
        }
        .list{
            left: 50%;
            transform: translateX(-150%);
        }
        .example{
            right: 50%;
            transform: translateX(150%);
        }
        .hover{
            border-bottom: 2px solid #2dc177;
            color: #2dc177;
        }
    }
    .example{
        >a{
            display: block;
            padding: .3rem .22rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            .p1{
                font-size: .3rem;
                margin-bottom: .2rem;
            }
            .p2{
                font-size: .26rem;
                line-height: .34rem;
                color: #9a9a9a;
                margin-bottom: .2rem;
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
            }
            .hf{
                background: #f1f1f1;
                padding: .2rem;
                border-radius: .1rem;
                .p3{
                    font-size: .28rem;
                    line-height: .38rem;
                    color: #5a5a5a;
                    overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                    span{
                        color: #2dc177;
                    }
                }
            }
         }
        a:last-child{
            border-bottom: none;
        }
    }
    .list{
        background: #fff;
        >a{
            padding-top: .15rem;
            overflow: hidden;
            margin-left: .22rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            display: block;
            .tx{
                float: left;
                width: 1.08rem;
                height: 1.08rem;
                margin-right: .3rem;
                border-radius: .2rem;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .info{
                float: left;
                .p1{
                    font-size: .3rem;
                    margin-top: .05rem;
                }
                .p2{
                    font-size: .24rem;
                    margin-top: .2rem;
                    color: #999;
                }
            }
            .p3{
                color: #999;
                margin: .2rem auto .15rem auto;
                float: left;
                width: calc(~'100% - .22rem');
                font-size: .26rem;
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
            }
            .but{
                margin-top: .36rem;
                float: right;
                margin-right: .22rem;
                border: 1px solid #2dc177;
                font-size: .28rem;
                color: #2dc177;
                width: 1.36rem;
                height: .58rem;
                line-height: .58rem;
                text-align: center;
                border-radius: .1rem;
                display: block;
            }
        }
        a:last-child{
            border-bottom: none;
        }
    }
</style>