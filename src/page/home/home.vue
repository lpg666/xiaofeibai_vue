<template>
    <div style="padding-top: 2rem;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <nav>
            <div class="recommend" :class="{hover: hover=='recommend'}" @click="navClick('recommend')">推荐<span></span></div>
            <div class="result" :class="{hover: hover=='result'}" @click="navClick('result')">动态<span></span></div>
            <div class="cechoice" :class="{hover: hover=='cechoice'}" @click="navClick('cechoice')">消费电子<span></span></div>
        </nav>
        <swiper></swiper>
        <tar></tar>
    </div>
</template>

<script>
import headTop from '../../components/header/header'
import swiper from '../../components/swiper/swiper'
import tar from '../../components/tar/tar'

export default {
    data(){
        return{
            userInfo:false,
            titleText:false,
            hover:'recommend'
        }
    },
    components:{
        headTop,
        swiper,
        tar
    },
    methods:{
        navClick(data){
            this.hover=data;
        }
    }
}
</script>

<style lang="less">
    nav{
        text-align: center;
        overflow: hidden;
        width: 100%;
        position: fixed;
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