<template>
    <div class="scroll" style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">我的消息</span></head-i>
        <div class="news_list">
            <div @click="read(data.id)" class="news_box" v-for="data in detail" :key="data" v-if="data.message_type">
                <div class="box_l"><div class="tx" :style="{backgroundImage:'url('+data.volunteer_avatar+')'}"><span v-if="data.readed==0" class="yd"></span></div></div>
                <div class="box_r">
                    <p class="p1">系统消息<span>{{data.add_time}}</span></p>
                    <p class="p2">{{contents(data.content)}}<span v-if="data.message_type">详情></span></p>
                </div>
            </div>
            <div @click="read(data.id)" class="news_box" v-else>
                <div class="box_l"><div class="tx" :style="{backgroundImage:'url('+data.volunteer_avatar+')'}"><span v-if="data.readed==0" class="yd"></span></div></div>
                <div class="box_r">
                    <p class="p1">系统消息<span>{{data.add_time}}</span></p>
                    <p class="p2">{{contents(data.content)}}<span v-if="data.message_type">详情></span></p>
                </div>
            </div>
        </div>
        <p v-if="showLoading" class="loading">{{load}}</p>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail:'',
                page:0,
                scroll:0,
                re:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                showLoading:false,
                load:'正在加载更多数据...'
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        methods: {
            read(id){
                this.axios.post('/v4/member/read_message',{'sign':this.userInfo.sign,'content_id':id})
                    .then(res =>{
                        if(res.data.error){
                            for(let i in this.detail){
                                if(this.detail[i].message_type!='' && this.detail[i].id == id){
                                    let rl = this.url(this.detail[i].message_type,this.detail[i].parent_id);
                                    this.$router.push({'path':rl});
                                }
                            }
                        }else{
                            for(let i in this.detail){
                                if(this.detail[i].id == id){
                                    this.detail[i].readed=1;
                                }
                                if(this.detail[i].message_type!='' && this.detail[i].id == id){
                                    let rl = this.url(this.detail[i].message_type,this.detail[i].parent_id);
                                    this.$router.push({'path':rl});
                                }
                            }
                        }
                        console.log(res.data);
                    })
            },
            url(i,u){
                var url = '';
                if(i=='tousu'){
                    url = '/tousu/detail/'+u;
                }else if(i=='reporter'){
                    url = '/example/'+u+'?id='+i;
                }else if(i=='lawyer'){
                    url = '/example/'+u+'?id='+i;
                }
                return url;
            },
            contents(i){
                if(i.length>36){
                    i= i.substring(0,36)+'...';
                }
                return i;
            },
            ajaxData(){
                this.axios.get('/v4/member/message?sign='+this.userInfo.sign+'&page='+this.page)
                    .then(res =>{
                        if(res.data.error){
                            if(res.data.msg_type!=401){
                                this.showLoading=true;
                                this.load=res.data.msg;
                                this.re =false;
                            }
                        }else if(this.page==0){
                            this.detail=res.data.data;
                            this.showLoading=false;
                            this.re =false;
                        }else{
                            this.detail=this.detail.concat(res.data.data);
                            this.re =false;
                            this.showLoading=false;
                        }
                        console.log(res.data.data);
                    })
                    .catch(err =>{

                    })
            },
            close(){
                this.showLoad=false;
            },
            menu() {
                this.scroll = document.querySelector('.scroll').scrollTop;
                if(document.querySelector('.scroll').clientHeight + this.scroll +2 >= document.querySelector('.news_list').offsetHeight && this.re==false){
                    this.re = true;
                    this.page += 1;
                    this.showLoading=true;
                    this.ajaxData();
                }
            }
        },
        created(){
            this.ajaxData();
        },
        mounted(){
            document.querySelector('.scroll').addEventListener('scroll', this.menu);
        }
    }
</script>

<style lang="less" scoped>
    .scroll{
        width: 100%;
        height: calc(~'100vh');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .news_box{
        display: block;
        overflow: hidden;
        width: 100%;
        height: auto;
        .box_l{
            width: 1.4rem;
            height: 1.8rem;
            float: left;
            .tx{
                position: relative;
                border-radius: 100%;
                float: left;
                margin: .5rem .3rem;
                width: .8rem;
                height: .8rem;
                background: #000000;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                .yd{
                    border-radius: 100%;
                    background: #FC303D;
                    position: absolute;
                    right: .05rem;
                    top: 0;
                    width: .15rem;
                    height: .15rem;
                    display: block;
                }
            }
        }
        .box_r{
            height: 1.8rem;
            float: left;
            width: calc(~'100% - 1.4rem');
            border-bottom: 1px solid rgba(204,204,204,.5);
            .p1{
                margin-bottom: .14rem;
                margin-top: .3rem;
                line-height: .3rem;
                font-size: .28rem;
                span{
                    margin-right: .24rem;
                    float: right;
                    font-size: .22rem;
                    color: #999999;
                }
            }
            .p2{
                text-align: justify;
                padding-right: .3rem;
                font-size: .26rem;
                color: #999;
                line-height: .42rem;
                height: .84rem;
                position: relative;
                span{
                    font-size: .26rem;
                    color: #37C078;
                    right: .24rem;
                    bottom: .05rem;
                    position: absolute;
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