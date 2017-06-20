<template>
    <header id="head-top">
        <router-link to="/login" v-if="userInfo==null?true:false" class="user_portrait"></router-link>
        <router-link to="/member" v-else class="user_info">152****77</router-link>
        <slot name="title_text"></slot>
        <router-link to="/search" class="head_search"><img src="http://m.xfb315.com/mobile/img/index/logo_share.png"></router-link>
        <router-link to="/news" class="head_news"></router-link>
    </header>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        mounted() {
            console.log(this.userInfo);
        }
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
    }
    .head_search{
        width: .5rem;
        height: .5rem;
        position: absolute;
        right: .24rem;
        top: .25rem;
        display:block;
        img{
            width: .36rem;
            height: .36rem;
            display: block;
            margin:.07rem auto;
        }
    }
    .head_news{

    }
</style>