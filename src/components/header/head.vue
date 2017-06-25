<template>
    <header id="headI">
        <div id="head_go" @click="$router.go(-1)"><</div>
        <slot name="title_text"></slot>
        <slot name="head_a"></slot>
    </header>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style lang="less" scoped>
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
            background: #000;
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
        }

    }
</style>