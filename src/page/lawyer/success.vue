<template>
    <div>
        <header id="headI">
            <div id="head_go" @click="fh($route.query.id)"></div>
            <span class="head_title">提交成功</span>
            <span class="head_a"></span>
        </header>
        <img class="yes" src="../../images/evaluate_success@2x.png" alt="">
        <div v-if="$route.params.id=='lawyer'">
            <p>您咨询的问题已提交给律师{{$route.query.name}}</p>
            <p>律师回复后将以消息形式反馈给您，请留意。</p>
        </div>
        <div v-else>
            <p>您咨询的问题已提交给记者{{$route.query.name}}</p>
            <p>记者回复后将以消息形式反馈给您，请留意。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            fh(id){
                if(id=='lawyer'){
                    this.$router.push({path:'/lawyer/list'});
                }else{
                    this.$router.push({path:'/reporter/list'});
                }
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