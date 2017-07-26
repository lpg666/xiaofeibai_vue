<template>
    <div class="comment">
        <head-i><span class="head_title" slot="title_text">评论列表</span></head-i>
        <ul v-if="comment.length>0">
            <li v-for="data,key in comment">
                <img :src="data.member && data.member.avatar?data.member.avatar:require('../../images/default_portrait.png')">
                <div>
                    <p class="name" v-if="data.member && data.member.name">{{data.member.name}}<span v-if="$route.query.id==data.member.id">(投诉人)</span></p>
                    <p class="name" v-else>网友保保<span v-if="data.member && $route.query.id==data.member.id">(投诉人)</span></p>
                    <p class="text">{{data.content}}</p>
                    <p class="date">{{data.add_time}}<span v-if="data.client">来自{{data.client}}</span></p>
                </div>
            </li>
        </ul>
        <p v-if="showLoading" class="loading">{{load}}</p>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                re:false,
                comment:'',
                showLoad:false,
                loadType:null,
                loadText:null,
                page:0,
                showLoading:false,
                load:'正在加载更多数据...',
                scrollA:''
            }
        },
        components:{
            loading,
            headI
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            menu(){
                this.scrollA = document.querySelectorAll('.comment')[0].scrollTop;
                if(document.querySelector('.comment').clientHeight + this.scrollA +2 >= document.querySelector('ul').offsetHeight && this.re==false){
                    this.re=true;
                    this.page += 1;
                    this.showLoading=true;
                    this.plBut();
                    console.log(this.page);
                }
            },
            plBut(){
                this.axios.post('/v4/complaint/complaint_comment_list?complaint_id='+this.$route.params.id+'&page='+this.page)
                    .then(res =>{
                        if(res.data.error){
                            this.showLoading=true;
                            this.load=res.data.msg;
                        }else if(this.page==0){
                            this.comment=res.data.data;
                            this.showLoading=false;
                        }else{
                            this.comment=this.comment.concat(res.data.data);
                            this.showLoading=false;
                        }
                        setTimeout(this.close,1500);
                        this.re=false;
                        console.log(res.data.data);
                    })
                    .catch(err =>{
                        this.re=false;
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='网络错误';
                        setTimeout(this.close,1500);
                    });
            },
            close(){
                this.showLoad = false;
            }
        },
        created () {

        },
        mounted(){
            this.plBut();
            document.querySelectorAll('.comment')[0].addEventListener('scroll', this.menu);
        }
    }
</script>

<style lang="less" scoped>
    .loading{
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #333;
        text-align: center;
        background: rgba(153,153,153,.2);
    }
    .comment{
        height: calc(~'100vh');
        padding-top: 1rem;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        background: #fff;
        width: 100%;
        ul{
            width: auto;
            li{
                padding-bottom: .2rem;
                padding-left: .2rem;
                margin-top: .3rem;
                border-bottom: 1px solid rgba(204,204,204,.5);
                overflow: hidden;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 100%;
                    display: block;
                    float: left;
                }
                div{
                    width: 6.2rem;
                    float: right;
                    .name{
                        font-size: .24rem;
                        color: #999;
                        margin-top: .05rem;
                        span{
                            color: #37C078;
                            margin-left: .2rem;
                        }
                    }
                    .text{
                        width: auto;
                        margin-right: .2rem;
                        margin-top: .15rem;
                        font-size: .28rem;
                    }
                    .date{
                        margin-top: .1rem;
                        font-size: .22rem;
                        color: #999;
                        span{
                            margin-left: .35rem;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
</style>