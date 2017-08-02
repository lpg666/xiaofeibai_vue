<template>
    <header id="headI">
        <div id="head_go" @click="go"></div>
        <slot name="title_text"></slot>
        <slot name="head_a"></slot>
    </header>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            go(){
                if(this.$route.path.indexOf('tousu/detail')>0 || this.$route.path.indexOf('cechoice/detail')>0){
                    if(window.history.length<=1){
                        this.$router.push({path:'/home'});
                    }else{
                        this.$router.go(-1);
                    }
                }else{
                    this.$router.go(-1);
                }
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