<template>
    <div style="width: 100%;">
        <div class="title"><i></i>类似投诉</div>
        <ul>
            <li><router-link to="">类似投诉诉求默默地哈哈</router-link></li>
            <li><router-link to="">类似投诉诉求默默地哈哈</router-link></li>
            <li><router-link to="">类似投诉诉求默默地哈哈</router-link></li>
            <li><router-link to="">类似投诉诉求默默地哈哈</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style lang="less" scoped>
    .title{
        width: auto;
        margin-left: .2rem;
        height: .86rem;
        line-height: .86rem;
        border-bottom: 1px solid rgba(204,204,204,.5);
        font-size:.32rem;
        i{
            width: .34rem;
            height: .34rem;
            margin-top: .26rem;
            margin-right: .2rem;
            float: left;
            background: url("../../images/icon_leisi@2x.png") no-repeat center;
            background-size: 100%;
        }
    }
    ul{
        width: auto;
        margin-left: .2rem;
        overflow: hidden;
        li{
            width: 100%;
            border-bottom: 1px solid rgba(204,204,204,.5);
            font-size: .28rem;
            height: .78rem;
            line-height: .78rem;
            a{
                display: block;
            }
        }
        li:last-child{
            border-bottom: none;
        }
    }
</style>