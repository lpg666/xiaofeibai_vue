<template>
    <div style="width: 100%; background: #fff;">
        <div class="title"><i></i>类似投诉</div>
        <ul>
            <li v-for="data in detail.similars"><router-link :to="'/tousu/detail/'+data.id">{{data.title}}</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        props:['detail'],
    }
</script>

<style lang="less" scoped>
    .title{
        width: auto;
        margin-left: .2rem;
        height: .68rem;
        line-height: .68rem;
        border-bottom: 1px solid rgba(204,204,204,.5);
        font-size:.32rem;
        i{
            width: .35rem;
            height: .34rem;
            margin-top: .17rem;
            margin-right: .15rem;
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
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
            }
        }
        li:last-child{
            border-bottom: none;
        }
    }
</style>