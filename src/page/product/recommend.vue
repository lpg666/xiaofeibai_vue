<template>
    <div style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">产品推荐</span></head-i>
        <div class="box">
            <div class="list" style="overflow: hidden; padding-bottom: .3rem;">
                <router-link to="" v-for="item in 10">
                    <div class="pic"></div>
                    <p>收购 Withings 的果实，诺基 亚推出一系列数码健康产品</p>
                </router-link>
            </div>
            <p v-if="showLoading" class="loading">正在加载更多数据...</p>
        </div>
    </div>
</template>

<script>
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                showLoading:false,
                scrollA: '',
                repeat:false,
                page:0,
            }
        },
        components:{
            headI
        },
        computed:{

        },
        created(){

        },
        methods:{
            ajaxData(){
                this.showLoading = true;
            },
            menu() {
                this.scrollA = document.querySelector('.box').scrollTop;
                if(document.querySelector('.box').clientHeight + this.scrollA +2 >= document.querySelector('.list').offsetHeight && this.repeat==false){
                    this.repeat = true;
                    this.page += 1;
                    this.ajaxData();
                }
            }
        },
        mounted(){
            document.querySelector('.box').addEventListener('scroll',this.menu);
        }
    }
</script>

<style lang="less" scoped>
    .box{
        height: calc(~'100vh - 1rem');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        a{
            float: left;
            width: 3.4rem;
            display: block;
            margin-top: .3rem;
            margin-left: .23rem;
            .pic{
                background: #000;
                width: 100%;
                height: 3.45rem;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            p{
                margin-top: .2rem;
                width: 100%;
                font-size: .26rem;
                line-height: .3rem;
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
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