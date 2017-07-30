<template>
    <div style="padding-top: 1rem;">
        <head-i>
            <span class="head_title" slot="title_text">关注的投诉</span>
        </head-i>
        <div class="scroll">
            <div class="box">
                <router-link :to="'/tousu/detail/'+data.id" v-for="data in detail" :key="data">
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
                        <!--<div class="fx">分享</div>-->
                        <!--<div class="bc">补充</div>-->
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
                this.axios.get('/v4/member/list_complaint_collect?page='+this.page+'&sign='+this.userInfo.sign)
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
                        console.log(res.data,res.data.data.length);
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
            }
        },
        mounted() {
            this.ajaxData();
            document.querySelector('.scroll').addEventListener('scroll',this.menu);
        }
    }
</script>

<style lang="less" scoped>
    .scroll{
        width: 100%;
        height: calc(~'100vh - 1rem');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        a{
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
                    margin-right: .3rem;
                }
                .status{
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
</style>