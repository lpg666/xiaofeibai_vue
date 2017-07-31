<template>
    <div style="padding-top: 1rem;">
        <head-i>
            <span class="head_title" slot="title_text">我的收藏</span>
        </head-i>
        <div class="scroll">
            <div class="box">
                <router-link :to="'/article/detail/'+data.id" v-for="data in detail" :key="data ">
                    <div class="pic" v-if="data.default_pic" :style="{backgroundImage:'url('+data.default_pic.pic+'!/fh/230)'}"></div>
                    <p class="p1">{{data.title}}</p>
                    <p class="p2">{{getTimeWord(data.add_time)}}</p>
                </router-link>
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
                this.axios.get('/v4/member/list_article_collect?page='+this.page+'&sign='+this.userInfo.sign)
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
    .scroll {
        width: 100%;
        height: calc(~'100vh - 1rem');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .box{
            margin-left: .22rem;
            width: calc(~'100% - .22rem');
            height: auto;
            a{
                position: relative;
                border-bottom: 1px solid rgba(204,204,204,.5);
                padding: .28rem 0;
                overflow: hidden;
                width: 100%;
                display: block;
                .p1{
                    font-size: .32rem;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .p2{
                    left: 1.9rem;
                    bottom: .22rem;
                    position: absolute;
                    font-size: .26rem;
                    color: #999;
                }
                .pic{
                    margin-right: .2rem;
                    float: left;
                    width: 1.7rem;
                    height: 1.4rem;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
        }
    }
</style>