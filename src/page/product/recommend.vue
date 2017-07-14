<template>
    <div style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">产品推荐</span></head-i>
        <div class="box">
            <div class="list" style="overflow: hidden; padding-bottom: .3rem;">
                <router-link :to="'/cechoice/detail/'+item.article_id" v-for="item in detail" :key="item">
                    <div class="pic" :style="{backgroundImage:'url('+item.thumb+')'}"></div>
                    <p>{{item.title}}</p>
                </router-link>
            </div>
            <p v-if="showLoading" class="loading">{{load}}</p>
        </div>
    </div>
</template>

<script>
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                showLoading:false,
                load:'正在加载更多数据...',
                scrollA: '',
                repeat:false,
                page:0,
                detail:''
            }
        },
        components:{
            headI
        },
        computed:{

        },
        created(){
            this.ajaxData();
        },
        methods:{
            ajaxData(){
                this.showLoading = true;
                this.axios.get('/v4/cechoice_article/article_list?type_id=2&page='+this.page)
                    .then(res =>{
                        if(res.data.error){
                            this.load=this.data.msg;
                        }else if(this.page==0){
                            this.detail= res.data.data;
                        }else{
                            this.detail= this.detail.concat(res.data.data);
                        }
                        this.repeat = false;
                        this.showLoading = false;
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            },
            menu() {
                this.scrollA = document.querySelector('.box').scrollTop;
                //console.log(this.scrollA,document.querySelector('.box').clientHeight,document.querySelector('.list').offsetHeight);
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
                width: 100%;
                height: 3.45rem;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            p{
                height: .6rem;
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