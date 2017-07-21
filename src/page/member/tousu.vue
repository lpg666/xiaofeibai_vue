<template>
    <div style="padding-top: 1rem;">
        <header id="headI">
            <div id="head_go" @click="$router.push({path:'/member'})"></div>
            <span class="head_title" slot="title_text">我的投诉</span>
        </header>
        <div class="scroll">
            <div class="box">
                <router-link class="lb" :to="'/tousu/detail/'+data.id" v-for="data in detail" :key="data">
                    <div class="yt">
                        <div class="pic" v-if="data.default_pic" :style="{backgroundImage:'url('+data.default_pic.pic+'!/fh/230)'}"></div>
                        <p class="p1"><span>投诉编号：TS{{data.id}}</span><span>{{data.add_time}}</span></p>
                        <p class="p2">{{data.title}}</p>
                    </div>
                    <div class="bt">
                        <span class="status status0" v-if="data.status==0">投诉受理</span>
                        <span class="status status1" v-else-if="data.status==1">企业处理</span>
                        <span class="status status2" v-else-if="data.status==2">结果审核</span>
                        <span class="status status3" v-else>完成</span>
                        <router-link v-if="data.status==3 && data.enterprise_grade==0" :to="'/member/grade?id='+data.id+'&brand='+data.brand.name" class="fx">评价</router-link>
                        <router-link v-if="data.status==3 && data.enterprise_grade!=0" to="" class="ypj">已评价</router-link>
                        <a href="javascript:void(0)" @click="k" class="bc">补充</a>
                    </div>
                </router-link>
                <!--<router-link to="">
                    <div class="yt">
                        <p class="p1"><span>投诉编号：TS125123</span><span>2小时前发布</span></p>
                        <p class="p2">在京东商城买到质量有问题的三星冰箱三星洗衣机三星家用电器</p>
                    </div>
                    <div class="bt">
                        <div class="status status0">投诉受理</div>
                        <div class="fx">分享</div>
                        <div class="bc no">补充</div>
                    </div>
                </router-link>-->
            </div>

            <div v-if="gb" class="layer">
                <div class="layer_yes">
                    <div class="title">
                        <div class="t1"><img src="http://xiaofeibao.b0.upaiyun.com/wap/img/cft/cft_t1.png"></div>
                        <div class="t2"><img src="http://xiaofeibao.b0.upaiyun.com/wap/img/cft/cft_t2.png"></div>
                        <p class="t_p1"><img src="http://xiaofeibao.b0.upaiyun.com/wap/img/cft/cft_logo.png"></p>
                        <p class="t_p2">您的私人维权专家</p>
                    </div>
                    <div class="gb" @click="x"><img src="http://xiaofeibao.b0.upaiyun.com/wap/img/cft/layer_x.png"></div>
                    <p class="p3">请下载消费保APP<br>进行补充</p>
                    <div onclick="location.href='http://m.xfb315.com/appdown'" class="p2">下载消费保APP</div>
                </div>
            </div>

            <p v-if="showLoading" class="loading">{{load}}</p>
        </div>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail:'',
                showLoading:false,
                scrollA: '',
                repeat:false,
                page:0,
                gb:false,
                load:'正在加载更多...'
            }
        },
        components:{
            headI
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods:{
            ajaxData(){
                this.axios.get('/v4/member/complaint_list?page='+this.page+'&sign='+this.userInfo.sign)
                    .then(res =>{
                        if(res.data.data.length==0){
                            this.load='已加载完毕'
                        }else if(this.page==0){
                            this.detail = res.data.data;
                            this.showLoading = false;
                        }else{
                            this.detail = this.detail.concat(res.data.data);
                            this.showLoading = false;
                        }
                        console.log(res.data);
                    })
                    .catch(err =>{

                    })
            },
            menu() {
                this.scrollA = document.querySelector('.scroll').scrollTop;
                if(document.querySelector('.scroll').clientHeight + this.scrollA +2 >= document.querySelector('.box').offsetHeight && this.repeat==false){
                    this.repeat = true;
                    this.page += 1;
                    this.showLoading = true;
                    this.ajaxData();
                }
            },
            k(e){
                e.preventDefault();
                this.gb=true;
            },
            x(){
                this.gb=false;
            }
        },
        mounted() {
            this.ajaxData();
            document.querySelector('.scroll').addEventListener('scroll',this.menu);
        }
    }
</script>

<style lang="less" scoped>
    .layer{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        text-align: center;
        .layer_yes{
            padding-bottom: .45rem;
            text-align: center;
            border-radius: .1rem;
            position: fixed;
            left: 50%;
            width: 6rem;
            top: 50%;
            margin-top: -3rem;
            margin-left: -3rem;
            z-index: 9999;
            font-size: .44rem;
            background: rgba(255,255,255,1);
            color: #fff;
            .p2{
                color: #589eff;
                display: inline-block;
                font-size: .36rem;
                border: 1px solid #589eff;
                padding: .15rem .4rem;
                border-radius: .1rem;
                margin-top: .55rem;
            }
            .p3{
                font-size: .34rem;
                margin-top: .45rem;
            }
            .gb{
                position: absolute;
                right: -.2rem;
                top: -.2rem;
                width: .6rem;
                height: .6rem;
                img{
                    width: 100%;
                    display: block;
                }
            }
            .title{
                border-radius: .1rem .1rem 0 0rem;
                width: 100%;
                background: #2ac78e;
                position: relative;
                padding: .4rem 0;
                .t_p1{
                    width: 1.5rem;
                    margin: 0 auto;
                    img{
                        width: 100%;
                        display: block;
                        margin: 0 auto;
                    }
                }
                .t_p2{
                    font-size: .34rem;
                    margin-top: .1rem;
                    color: #fff;
                }
                .t1{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: .4rem;
                    height: .6rem;
                    opacity: .6;
                }
                .t2{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: .4rem;
                    height: .4rem;
                    opacity: .6;
                }
                .t1,.t2{
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
    .scroll{
        width: 100%;
        height: calc(~'100vh - 1rem');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        a.lb{
            border-bottom: 1px solid rgba(204,204,204,.5);
            display: block;
            margin-left: .22rem;
            padding: .3rem .22rem .3rem 0;
            .bt{
                overflow: hidden;
                margin-top: .2rem;
                .fx{
                    float: right;
                    font-size: .26rem;
                    color: #37C078;
                    width: 1.05rem;
                    height: .48rem;
                    line-height: .48rem;
                    text-align: center;
                    border: 1px solid #37C078;
                    border-radius: .1rem;
                    margin-left: .3rem;
                }
                .ypj{
                    float: right;
                    font-size: .26rem;
                    color: #999;
                    width: 1.05rem;
                    height: .48rem;
                    line-height: .48rem;
                    text-align: center;
                    border: 1px solid #e0e0e0;
                    background: #e0e0e0;
                    border-radius: .1rem;
                    margin-left: .3rem;
                }
                .no{
                    color: #999999 !important;
                    background: rgb(215,216,217) !important;
                }
                .bc{
                    float: right;
                    font-size: .26rem;
                    color: #fff;
                    width: 1.05rem;
                    height: .48rem;
                    line-height: .48rem;
                    text-align: center;
                    background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
                    background-image:linear-gradient(to right,#37C078,#5BDC99);
                    border-radius: .1rem;
                    /*margin-right: .3rem;*/
                }
                .status{
                    margin-top: .06rem;
                    float: left;
                    text-align: center;
                    width: 1.1rem;
                    height: .34rem;
                    line-height: .34rem;
                    border-radius: .16rem;
                    color: #fff;
                    font-size: .2rem;
                }
                .status0{
                    background: #51A4FF;
                }
                .status1{
                    background: #FEB10D;
                }
                .status2{
                    background: #51A4FF;
                }
                .status3{
                    background: #39C17A;
                }
            }
            .yt{
                overflow: hidden;
                .pic{
                    width: 1.4rem;
                    height: 1.4rem;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    float: left;
                    margin-right: .2rem;
                }
                .p1{
                    font-size: .24rem;
                    span{
                        margin-right: .44rem;
                        color: #999;
                    }
                }
                .p2{
                    margin-top: .2rem;
                    font-size: .32rem;
                }

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
</style>