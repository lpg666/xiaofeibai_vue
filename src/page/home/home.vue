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
        <router-link to="/tousu/create" id="ts_btn"><span>一键<br/>投诉</span></router-link>
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
                <section class="result_list" v-if="resultData.length">
                    <div class="list" v-for="result in resultData" :key="result">
                        <div class="list_left" :style="{'width':result.default_pic==null ? '100%' : false}">
                            <p class="p1">{{result.title}}</p>
                            <p class="p2"><span class="sp1">网友回音：</span>{{result.recommend_result.content}}</p>
                            <p class="p3">{{result.add_time}}</p>
                        </div>
                        <div v-if="result.default_pic" class="list_right">
                            <img :src="result.default_pic.pic+'!/fh/230'">
                        </div>
                    </div>
                    <p v-if="showLoading" class="loading">正在加载更多数据...</p>
                </section>
                <section class="seat_list" v-else>
                    <div class="result_seat" v-for="item in 10" :key="item">
                        <div class="seat_left">
                            <p class="p1"></p>
                            <p class="p2"></p>
                            <p class="p3"></p>
                        </div>
                        <div class="seat_right"></div>
                    </div>
                </section>
            </swiper-slide>
            <swiper-slide class="lis">
                <section class="cechoice_list">
                    <div class="list">
                        <div class="list_left">
                            <p class="p1">“小蚯蚓”杨紫—戏内蠢萌戏外女汉子 期待AR杂志的出现</p>
                            <p class="p2"><span class="cechoice_tag">人物</span><span>明星潮人</span><span>15分钟前</span></p>
                        </div>
                        <div class="list_right">
                            <img src="../../images/default_portrait.png">
                        </div>
                    </div>
                </section>
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
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{
            swiperNav: {
                notNextTick: true,
                touchAngle:30,
                onTransitionStart:swiper => {
                    switch (swiper.activeIndex){
                        case 0:
                            this.hover='recommend';
                            break;
                        case 1:
                            this.hover='result';
                            if(this.resultData == '' && this.resultRepeat == false){
                                this.resultRepeat = true;
                                this.resultAjax();
                            }
                            break;
                        default:
                            this.hover='cechoice';
                    }
                }
            },
            showLoading:false,
            titleText:false,
            hover:'recommend',
            recommendData:[],
            resultData:'',
            cechoiceData:'',
            recommendRepeat:false,
            resultRepeat:false,
            cechoiceRepeat:false,
            recommendI:0,
            resultI:0,
            cechoiceI:0,
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
        ...mapState([
            'userInfo'
        ]),
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
                    if(this.resultData == '' && this.resultRepeat == false){
                        this.resultRepeat = true;
                        this.resultAjax();
                    }
                    break;
                default:
                    this.swiper.slideTo(2);
            }
        },
        resultAjax(){
            this.showLoading = true;
            this.axios.get('v3/home/list-result?page='+this.resultI)
                .then(res => {
                    if(this.resultI==0){
                        this.resultData = res.data.data;
                    }else{
                        this.resultData = this.resultData.concat(res.data.data);
                    }
                    this.showLoading = false;
                    this.resultRepeat = false;
                    console.log(this.resultData);
                })
                .catch(err => {
                    this.showLoading = false;
                    this.resultRepeat = false;
                    console.log(err);
                })
        },
        menuA() {
            this.scrollA = document.querySelectorAll('.lis')[0].scrollTop;
        },
        menuB() {
            this.scrollB = document.querySelectorAll('.lis')[1].scrollTop;
            if(document.querySelector('.lis').clientHeight + this.scrollB +2 >= document.querySelector('.result_list').offsetHeight && this.resultRepeat==false){
                this.resultRepeat = true;
                this.resultI += 1;
                this.resultAjax();
                console.log(this.resultI);
            }
        },
        menuC() {
            this.scrollC = document.querySelectorAll('.lis')[2].scrollTop;
        }
    },
    mounted(){
        document.querySelectorAll('.lis')[0].addEventListener('scroll', this.menuA);
        document.querySelectorAll('.lis')[1].addEventListener('scroll', this.menuB);
        document.querySelectorAll('.lis')[2].addEventListener('scroll', this.menuC);
        document.querySelector('header').addEventListener("touchmove", function (event) {
            event.preventDefault();
        },false);
        document.querySelector('nav').addEventListener("touchmove", function (event) {
            event.preventDefault();
        },false);
        document.querySelector('#tar').addEventListener("touchmove", function (event) {
            event.preventDefault();
        },false);
    },
    created(){

    }
}
</script>

<style lang="less">
    #ts_btn{
        display: table;
        position: fixed;
        right: .2rem;
        bottom: 1.2rem;
        background: url("../../images/FAB@2x.png") no-repeat center;
        background-size: 100%;
        z-index: 999;
        width: 1.1rem;
        height: 1.1rem;
        span{
            text-align: center;
            font-size: .24rem;
            color: #fff;
            vertical-align: middle;
            display: table-cell;
        }
    }
    #swiper-nav{
        width: 100%;
        > .swiper-wrapper{
            height: calc(~'100vh - 3rem');
            > .swiper-slide{
                overflow-y:scroll;
                -webkit-overflow-scrolling: touch;
            }
        }
    }
    .loading{
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #333;
        text-align: center;
        background: rgba(153,153,153,.2);
    }
    .cechoice_list{
        .list{
            width: calc(~'100% - .44rem');
            overflow: hidden;
            padding: .26rem 0;
            border-bottom: 1px solid #ccc;
            margin: 0 auto;
            .list_left{
                width: 4.96rem;
                height: auto;
                float: left;
                .p1{
                    font-size: .32rem;
                    line-height: .45rem;
                    margin-bottom: .2rem;
                    overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                }
                .p2{
                    height:.3rem;
                    span{
                        font-size: .24rem;
                        color: #999;
                        margin-right: .23rem;
                        float: left;
                    }
                    .cechoice_tag{
                        float: left;
                        width: 1.42rem;
                        height: .4rem;
                        border-radius: .1rem;
                        border: 1px solid #999;
                        display: block;
                        text-align: center;
                        margin-top: -.05rem;
                    }
                }
            }
            .list_right{
                width: 1.67rem;
                height: 1.4rem;
                float: right;
                overflow: hidden;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
    }
    .seat_list{
        .result_seat{
            width: calc(~'100% - .44rem');
            overflow: hidden;
            padding: .28rem 0;
            margin: 0 auto;
            .seat_left{
                width: 4.96rem;
                height: auto;
                float: left;
                .p1{
                    background: #f6f6f6;
                    height: .5rem;
                    margin-bottom: .15rem;
                }
                .p2{
                    background: #f6f6f6;
                    margin-bottom: .15rem;
                    height: .35rem;
                }
                .p3{
                    background: #f6f6f6;
                    height: .25rem;
                }
            }
            .seat_right{
                background: #f6f6f6;
                width: 1.67rem;
                height: 1.4rem;
                float: right;
            }
        }
    }
    .result_list{
        .list:nth-last-child(2){
            border-bottom: none;
        }
        .list{
            width: calc(~'100% - .44rem');
            overflow: hidden;
            padding: .28rem 0;
            border-bottom: 1px solid #ccc;
            margin: 0 auto;
            .list_left{
                width: 4.96rem;
                height: auto;
                float: left;
                .p1{
                    font-size: .32rem;
                    line-height: .45rem;
                    margin-bottom: .15rem;
                    overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                }
                .p2{
                    overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                    color: #6B6B6B;
                    font-size: .28rem;
                    margin-bottom: .15rem;
                    line-height: .38rem;
                    span.sp1{
                        color: #37C078;
                    }
                    span.sp2{
                        color: #FEB10D;
                    }
                }
                .p3{
                    font-size: .24rem;
                    color: #999;
                }
            }
            .list_right{
                width: 1.67rem;
                height: 1.4rem;
                float: right;
                overflow: hidden;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
    }
    .recommend_list{
        .list:last-child{
            border-bottom: none;
        }
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