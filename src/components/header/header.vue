<template>
    <header id="head-top">
        <router-link to="/member" v-if="userInfo==null?true:false" class="user_portrait"><img src="../../images/icon_gerenzhongxin@2x.png"></router-link>
        <router-link to="/member" v-else class="user_info">152****77</router-link>
        <slot name="title_text"></slot>
        <router-link to="/search" class="head_search"><img src="../../images/icon_search.png"></router-link>
        <router-link to="/news" v-if="userInfo!=null" class="head_news"><img src="../../images/icon_xiaoxi@2x.png"><span v-if="size==0" style="display: none"></span><span v-else-if="size<9">{{size}}</span><span v-else>9+</span></router-link>
    </header>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{
                size:null
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
            abc(){
                this.RECORD_USERINFO({
                    userInfo:'aaaa'
                });
            }
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO',
                'QUANJU_TAN',
                'OUT_LOGIN',
                'QUANJU_BUTAN'
            ]),
            news(){
                this.axios.get('/v4/member/message?sign='+this.userInfo.sign)
                    .then(res =>{
                        if(res.data.error){
                            if(res.data.msg_type==401){
                                this.QUANJU_TAN('该账号已在其他设备登录');
                                setTimeout(this.ts,1500);
                            }
                        }else{
                            this.size=res.data.notify;
                        }
                    })
                    .catch(err =>{

                    })
            },
            ts(){
                this.QUANJU_BUTAN();
                this.OUT_LOGIN();
            }
        },
        mounted() {
            if(this.userInfo){
                this.news();
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'news'
        },
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';

    #head-top{
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #cccccc;
        left: 0;
        top: 0;
        background: #fff;
        z-index: 99;
        position: fixed;
        .user_info{
            font-size: .26rem;
            position: absolute;
            left: .24rem;
            top: 0;
            height: 1rem;
            line-height: 1rem;
        }
    }
    .user_portrait{
        width: .48rem;
        height: .48rem;
        display: block;
        position: absolute;
        left: .24rem;
        top: .26rem;
        border-radius: 100%;
        img{
            width: 100%;
            display: block;
        }
    }
    .head_search{
        width: .42rem;
        height: .42rem;
        position: absolute;
        right: .24rem;
        top: .29rem;
        display:block;
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }
    .head_news{
        width: .42rem;
        height: .42rem;
        position: absolute;
        left: 1.65rem;
        top: .29rem;
        span{
            position: absolute;
            right: -.16rem;
            top: -.16rem;
            width: .32rem;
            line-height: .34rem;
            height: .32rem;
            text-align: center;
            display: block;
            background: #FC303D;
            color: #fff;
            font-size: .2rem;
            border-radius: 100%;
            font-family:Helvetica;
        }
        img{
            width: 100%;
            display: block;
        }
    }
</style>