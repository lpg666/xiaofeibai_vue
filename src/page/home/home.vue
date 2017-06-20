<template>
    <div style="padding-top: 2rem; padding-bottom: 1rem;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <nav>
            <div class="recommend" :class="{hover: hover=='recommend'}" @click="navClick('recommend')">推荐<span></span></div>
            <div class="result" :class="{hover: hover=='result'}" @click="navClick('result')">动态<span></span></div>
            <div class="cechoice" :class="{hover: hover=='cechoice'}" @click="navClick('cechoice')">消费电子<span></span></div>
        </nav>
        <swiper id="swiper-nav" :options="swiperNav" ref="mySwiper">
            <swiper-slide class="lis">
                <swiper-l></swiper-l>
                <section class="recommend_list">
                    <div class="list">
                        <div class="list_left">
                            <p class="p1">啊手机卡就是卡就是卡就是卡就是卡就是卡机</p>
                            <p class="p2"><span class="hot">热</span><span>绿瘦</span><span>15分钟</span><span class="status">企业处理</span></p>
                        </div>
                        <div class="list_right">
                            <img src="../../images/default_portrait.png">
                        </div>
                    </div>
                    <div class="list">
                        <div class="list_left" style="width: 100%">
                            <p class="p1">啊手机卡就是卡就是卡就是卡就是卡就是卡机</p>
                            <p class="p2"><span>绿瘦</span><span>15分钟</span><span class="status">企业处理</span></p>
                        </div>
                    </div>
                    <div class="list">
                        <p class="p3">【消费警示】路虎投诉高发，方向盘异常抖动该如何解决?</p>
                        <ul class="pic">
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                        </ul>
                    </div>
                    <div class="list">
                        <p class="p3">【消费警示】路虎投诉高发，方向盘异常抖动该如何解决?</p>
                        <ul class="pic">
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                        </ul>
                    </div>
                    <div class="list">
                        <p class="p3">【消费警示】路虎投诉高发，方向盘异常抖动该如何解决?</p>
                        <ul class="pic">
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                        </ul>
                    </div>
                    <div class="list">
                        <p class="p3">【消费警示】路虎投诉高发，方向盘异常抖动该如何解决?</p>
                        <ul class="pic">
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                            <li><img src="../../images/default_portrait.png"></li>
                        </ul>
                    </div>
                </section>
            </swiper-slide>
            <swiper-slide class="lis">
                2
            </swiper-slide>
            <swiper-slide class="lis">
                3
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <tar></tar>
    </div>
</template>

<script>
import headTop from '../../components/header/header'
import swiperL from '../../components/swiper/swiper'
import tar from '../../components/tar/tar'

export default {
    data(){
        return{
            swiperNav: {
                notNextTick: true,
                onTransitionStart:swiper => {
                    switch (swiper.activeIndex){
                        case 0:
                            this.hover='recommend';
                            break;
                        case 1:
                            this.hover='result';
                            break;
                        default:
                            this.hover='cechoice';

                    }
                    console.log(swiper.activeIndex)
                }
            },
            userInfo:false,
            titleText:false,
            hover:'recommend',
            scrollA: '',
            scrollB: '',
            scrollC: ''
        }
    },
    components:{
        headTop,
        swiperL,
        tar
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods:{
        navClick(data){
            this.hover=data;
            switch (data){
                case 'recommend':
                    this.swiper.slideTo(0);
                    break;
                case 'result':
                    this.swiper.slideTo(1);
                    break;
                default:
                    this.swiper.slideTo(2);
            }
        },
        menuA() {
            this.scrollA = document.querySelectorAll('.lis')[0].scrollTop;
            console.log(this.scrollA)
        },
        menuB() {
            this.scrollB = document.querySelectorAll('.lis')[1].scrollTop;
            console.log(this.scrollB)
        },
        menuC() {
            this.scrollC = document.querySelectorAll('.lis')[2].scrollTop;
            console.log(this.scrollC)
        }
    },
    mounted(){
        document.querySelectorAll('.lis')[0].addEventListener('scroll', this.menuA);
        document.querySelectorAll('.lis')[1].addEventListener('scroll', this.menuB);
        document.querySelectorAll('.lis')[2].addEventListener('scroll', this.menuC);
    },
    created(){

    }
}
</script>

<style lang="less">
    #swiper-nav{
        width: 100%;
        > .swiper-wrapper{
            height: calc(~'100vh - 3rem');
            > .swiper-slide{
                overflow-y:scroll;
            }
        }
    }
    .recommend_list{
        .list{
            overflow: hidden;
            margin-left: .23rem;
            padding: .23rem 0;
            border-bottom: 1px solid #ccc;
            width: calc(~'100% - .23rem');
            .p3{
                width: 100%;
                font-size: .32rem;
                line-height: .48rem;
                margin-bottom: .11rem;
            }
            .pic{
                overflow: hidden;
                width: 100%;
                li{
                    width: calc(~'33.33% - .2rem');
                    float: left;
                    margin-right: .2rem;
                    img{
                        display: block;
                        margin: 0 auto;
                    }
                }
             }
            .list_left{
                float: left;
                width: 5.3rem;
                .p1{
                    font-size: .32rem;
                    line-height: .48rem;
                    margin-bottom: .11rem;
                }
                .p2{
                    .hot{
                        border: 1px solid #FC405B;
                        border-radius: .04rem;
                        width: .33rem;
                        height: .32rem;
                        line-height: .32rem;
                        font-size: .2rem;
                        color: #FC405B;
                        text-align: center;
                        display: inline-block;
                        float: left;
                    }
                    font-size: .26rem;
                    span{
                        color: #999;
                        margin-right: .22rem;
                    }
                    .status{
                        float: right;
                        font-size: .2rem;
                        color: #FEB10D;
                        margin-top: .05rem;
                    }
                }
            }
            .list_right{
                width: 1.67rem;
                height: 1.4rem;
                margin-right: .22rem;
                float: right;
                overflow: hidden;
                img{
                    width: 100%;
                    height: auto;
                    display:block;
                }
            }
        }

    }
    nav{
        text-align: center;
        overflow: hidden;
        width: 100%;
        position: fixed;
        z-index: 99;
        background: #fff;
        left: 0;
        top: 1rem;
        height:1rem;
        div{
            display: block;
            float: left;
            font-size: .34rem;
            height: .6rem;
            line-height: .6rem;
            font-weight: bold;
            margin-top: .15rem;
        }
        div.hover{
            color: #2dc177;
            span{
                width: .4rem;
                height: .05rem;
                background: #2dc177;
                display: block;
                margin: 0 auto;
            }
        }
        .recommend{
            margin-left: 1.75rem;
            margin-right: 1.01rem;
        }
        .cechoice{
            margin-left: 1.01rem;
        }
    }
</style>