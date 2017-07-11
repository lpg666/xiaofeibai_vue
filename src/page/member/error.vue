<template>
    <div>
        <header id="headI">
            <div id="head_go" @click="fh"></div>
            <span class="head_title">我的投诉</span>
            <span class="head_a"></span>
        </header>
        <img class="yes" src="../../images/img_weigui@2x.png" alt="">
        <p>您发布的投诉存在违规或重复，已被删除。</p>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        methods:{
            fh(){
                this.$router.push({path:'/member/tousu'});
            }
        }
    }
</script>

<style lang="less" scoped>
    p{
        font-size: .28rem;
        text-align: center;
        margin-bottom: .4rem;
    }
    .yes{
        display: block;
        width: 1.18rem;
        height: 1.18rem;
        margin: 1.8rem auto .75rem auto;
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