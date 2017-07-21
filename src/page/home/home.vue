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
                <div id="home_swiper"><swiper-l></swiper-l></div>
                <section class="recommend_list" v-if="recommendData.length>0">
                    <router-link v-for="data in recommendData" :key="data" :to="'/tousu/detail/'+data.id" class="list" v-if="data.resources_type==0">
                        <div class="list_left" :style="data.default_pic==null?'width:100%':'height:1.4rem; position:relative;'">
                            <p class="p1">{{data.title}}</p>
                            <p class="p2" :style="data.default_pic!=null?'position:absolute; left:0; bottom:0; width:100%;':''">
                                <span class="hot" v-if="data.is_hot==1">热</span>
                                <span v-if="data.complaint_keyword">{{data.complaint_keyword.name}}</span>
                                <span>{{data.add_time.substr(0,10)}}</span>
                                <span class="status status0" v-if="data.status==0">投诉受理</span>
                                <span class="status status1" v-else-if="data.status==1">企业处理</span>
                                <span class="status status2" v-else-if="data.status==2">结果审核</span>
                                <span class="status status3" v-else>完成</span>
                            </p>
                        </div>
                        <div class="list_right" v-if="data.default_pic" :style="{backgroundImage:'url('+data.default_pic.pic+'!/fh/230)'}"></div>
                    </router-link>
                    <router-link :to="'/article/detail/'+data.id" class="list" v-else-if="data.resources_type==1">
                        <div v-if="data.pic==null">
                            <div class="list_left">
                                <p class="p1" :style="data.pic==null?'min-height:.84rem;':''">【消费警示】{{data.title}}</p>
                                <p class="p2">{{data.add_time.substr(0,10)}}</p>
                            </div>
                            <div class="list_right" :style="{backgroundImage:'url('+data.thumb+'!/fh/230)'}">
                                <!--<img :src="data.thumb+'!/fh/230'">-->
                            </div>
                        </div>
                        <div v-else>
                            <p class="p3">【消费警示】{{data.title}}</p>
                            <ul class="pic">
                                <li v-for="src in data.pic" :style="{backgroundImage:'url('+src.pic+'!/fh/230)'}"><!--<img :src="src.pic">--></li>
                            </ul>
                        </div>
                    </router-link>
                    <p v-if="showLoading" class="loading">{{load1}}</p>
                </section>
                <section class="seat_list" v-else>
                    <div class="seat_swiper"></div>
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
                <section class="result_list" v-if="resultData.length>0">
                    <router-link :to="'/tousu/detail/'+result.id" class="list" v-for="result in resultData" :key="result">
                        <div class="list_left" :style="{'width':result.default_pic==null ? '100%' : false}">
                            <p class="p1">{{result.title}}</p>
                            <p class="p2" v-if="result.resources_type==1"><span class="sp1">网友回音：</span>{{result.complaint_comment.content}}</p>
                            <p class="p2" v-if="result.resources_type==0"><span class="sp2">处理结果：</span>{{result.complaint_result.content}}</p>
                            <p class="p3">{{result.add_time}}</p>
                        </div>
                        <div v-if="result.default_pic" class="list_right" :style="{backgroundImage:'url('+result.default_pic.pic+'!/fh/230)'}">
                            <!--<img :src="result.default_pic.pic+'!/fh/230'">-->
                        </div>
                    </router-link>
                    <p v-if="showLoading" class="loading">{{load2}}</p>
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
                <section class="cechoice_list" v-if="cechoiceData.length>0">
                    <router-link :to="'/cechoice/detail/'+data.article_id" class="list" v-for="data in cechoiceData" :key="data">
                        <div class="list_left">
                            <p class="p1">{{data.title}}</p>
                            <p class="p2"><span class="cechoice_tag">{{data.type_name}}</span><!--<span>明星潮人</span>--><span>{{data.add_time}}</span></p>
                        </div>
                        <div class="list_right" :style="{backgroundImage:'url('+data.thumb+')'}"></div>
                    </router-link>
                    <p v-if="showLoading" class="loading">{{load3}}</p>
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
                            if(this.recommendData == '' && this.recommendRepeat == false){
                                this.recommendRepeat = true;
                                this.recommendAjax();
                            }
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
                            if(this.cechoiceData == '' && this.cechoiceRepeat == false){
                                this.cechoiceRepeat = true;
                                this.cechoiceAjax();
                            }
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
            scrollC: '',
            load1:'正在加载更多数据...',
            load2:'正在加载更多数据...',
            load3:'正在加载更多数据...',
        }
    },
    components:{
        headTop,
        swiperL,
        tar,
    },
    computed:{
        ...mapState([
            'userInfo',
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
                    if(this.recommendData == '' && this.recommendRepeat == false){
                        this.recommendRepeat = true;
                        this.recommendAjax();
                    }
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
                    if(this.cechoiceData == '' && this.cechoiceRepeat == false){
                        this.cechoiceRepeat = true;
                        this.cechoiceAjax();
                    }
            }
        },
        cechoiceAjax(){
            this.showLoading = true;
            this.axios.get('/v4/cechoice_article/article_list?page='+this.cechoiceI)
                .then(res => {
                    if(res.data.error){
                        this.load3=res.data.msg;
                    }else if(this.cechoiceI==0){
                        this.cechoiceData = res.data.data;
                        this.showLoading = false;
                    }else{
                        this.cechoiceData = this.cechoiceData.concat(res.data.data);
                        this.showLoading = false;
                    }
                    this.cechoiceRepeat = false;
                    console.log(this.cechoiceData);
                })
                .catch(err => {
                    this.showLoading = false;
                    this.cechoiceRepeat = false;
                    console.log(err);
                })
        },
        resultAjax(){
            this.showLoading = true;
            this.axios.get('/v4/home/dynamic_list?page='+this.resultI)
                .then(res => {
                    if(res.data.error){
                        this.load2=res.data.msg;
                    }else if(this.resultI==0){
                        this.resultData = res.data.data;
                        this.showLoading = false;
                    }else{
                        this.resultData = this.resultData.concat(res.data.data);
                        this.showLoading = false;
                    }
                    this.resultRepeat = false;
                    console.log(this.resultData);
                })
                .catch(err => {
                    this.showLoading = false;
                    this.resultRepeat = false;
                    console.log(err);
                })
        },
        recommendAjax(){
            this.showLoading = true;
            this.axios.get('/v4/home/recommend_list?page='+this.recommendI)
                .then(res => {
                    if(res.data.error){
                        this.load1=res.data.msg;
                    }else if(this.recommendI==0){
                        this.recommendData = res.data.data;
                        this.showLoading = false;
                    }else{
                        this.recommendData = this.recommendData.concat(res.data.data);
                        this.showLoading = false;
                    }
                    this.recommendRepeat = false;
                    console.log(this.recommendData);
                })
                .catch(err => {
                    this.showLoading = false;
                    this.recommendRepeat = false;
                    console.log(err);
                })
        },
        menuA() {
            this.scrollA = document.querySelectorAll('.lis')[0].scrollTop;
            if(document.querySelector('.lis').clientHeight + this.scrollA +2 >= document.querySelector('.recommend_list').offsetHeight && this.recommendRepeat==false){
                this.recommendRepeat = true;
                this.recommendI += 1;
                this.recommendAjax();
                console.log(this.recommendI);
            }
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
            if(document.querySelector('.lis').clientHeight + this.scrollC +2 >= document.querySelector('.cechoice_list').offsetHeight && this.cechoiceRepeat==false){
                this.cechoiceRepeat = true;
                this.cechoiceI += 1;
                this.cechoiceAjax();
                console.log(this.cechoiceI);
            }
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
        //首页初始加载
        this.recommendAjax();

    },
    created(){

    }
}
</script>

<style lang="less">
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
            display: block;
            width: calc(~'100% - .44rem');
            overflow: hidden;
            padding: .26rem 0;
            border-bottom: 1px solid rgba(204,204,204,.5);
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
                        line-height: .38rem;
                        border-radius: .1rem;
                        border: 1px solid #999;
                        display: block;
                        text-align: center;
                        margin-top: -.05rem;
                    }
                }
            }
            .list_right{
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
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
        .seat_swiper{
            width: 100%;
            height: 2.5rem;
            background: #f6f6f6;
        }
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
            display: block;
            width: calc(~'100% - .44rem');
            overflow: hidden;
            padding: .28rem 0;
            border-bottom: 1px solid rgba(204,204,204,.5);
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
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
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
            display: block;
            overflow: hidden;
            margin-left: .23rem;
            padding: .23rem 0;
            border-bottom: 1px solid rgba(204,204,204,.5);
            width: calc(~'100% - .23rem');
            .p3{
                width: auto;
                font-size: .32rem;
                line-height: .48rem;
                margin-bottom: .2rem;
                margin-right: .2rem;
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
            }
            .pic{
                overflow: hidden;
                width: 100%;
                li{
                    width: calc(~'33.33% - .2rem');
                    float: left;
                    height: 1.6rem;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    margin-right: .2rem;
                    img{
                        width: 100%;
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
                    margin-bottom: .2rem;
                    margin-right: .2rem;
                    overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                }
                .p2{
                    color: #999;
                    font-size: .26rem;
                    .hot{
                        border: 1px solid #FC405B;
                        border-radius: .04rem;
                        width: .33rem;
                        height: .32rem;
                        line-height: .26rem;
                        font-size: .2rem;
                        color: #FC405B;
                        text-align: center;
                        display: inline-block;
                        float: left;
                        margin-top: .025rem;
                    }
                    span{
                        color: #999;
                        margin-right: .22rem;
                    }
                    .status{
                        float: right;
                        font-size: .22rem;
                        margin-top: .025rem;
                    }
                    .status0{ color: #1491fd}
                    .status1{ color: #FEB10D}
                    .status2{ color: #2dc177}
                    .status3{ color: #2dc177}
                }
            }
            .list_right{
                width: 1.67rem;
                height: 1.4rem;
                margin-right: .22rem;
                float: right;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
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