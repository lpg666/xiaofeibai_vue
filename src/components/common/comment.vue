<template>
    <div class="comment">
        <div class="title"><i></i>网友评论({{comment.length}})<div class="but">评论</div></div>
        <ul>
            <li v-for="data in comment">
                <img :src="data.member?data.member.avatar:require('../../images/default_portrait.png')">
                <div>
                    <p class="name" v-if="data.member">{{data.member.name}}<span v-if="type=='tousu' && detail.id==data.member.id">(投诉人)</span></p>
                    <p class="name" v-else>消费保保</p>
                    <p class="text">{{data.content}}</p>
                    <p class="date">{{data.add_time}}<span v-if="data.client">来自{{data.client}}</span></p>
                </div>
            </li>
        </ul>
        <div class="gd" v-if="comment.length>3">查看更多评论</div>
        <p></p>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        props:['comment','detail','type'],
        created () {

        },
        mounted(){

        },
        watch: {

        },
        computed:{

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .comment{
        background: #fff;
        margin-top: .2rem;
        width: 100%;
        .title{
            width:auto;
            margin-left: .2rem;
            height: .68rem;
            line-height: .68rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            font-size: .32rem;
            i{
                width: .32rem;
                height: .32rem;
                display: block;
                float: left;
                margin-top: .17rem;
                margin-right: .15rem;
                background: url("../../images/peopleComment.png") no-repeat center;
                background-size: 100%;
            }
            .but{
                width: 1.07rem;
                height: .48rem;
                line-height: .48rem;
                text-align: center;
                float: right;
                margin-top: .09rem;
                border-radius: .1rem;
                margin-right: .2rem;
                font-size: .26rem;
                color: #fff;
                background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
                background-image:linear-gradient(to right,#37C078,#5BDC99);
            }
        }
        ul{
            margin-left: .2rem;
            width: auto;
            li{
                width: 100%;
                margin-top: .3rem;
                overflow: hidden;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 100%;
                    display: block;
                    float: left;
                }
                div{
                    width: 6.2rem;
                    float: right;
                    .name{
                        font-size: .24rem;
                        color: #999;
                        margin-top: .05rem;
                        span{
                            color: #37C078;
                            margin-left: .2rem;
                        }
                    }
                    .text{
                        width: auto;
                        margin-right: .2rem;
                        margin-top: .15rem;
                        font-size: .28rem;
                    }
                    .date{
                        margin-top: .1rem;
                        font-size: .22rem;
                        color: #999;
                        span{
                            margin-left: .35rem;
                            color: #999;
                        }
                    }
                }
            }
        }
        .gd{
            text-indent: .34rem;
            margin: .4rem auto .5rem auto;
            width: 2.6rem;
            height: .7rem;
            line-height: .7rem;
            border-radius: .1rem;
            border: 1px solid rgba(204,204,204,.5);
            font-size: .26rem;
            background: url("../../images/jt_hui.png") no-repeat center right .2rem;
            background-size: .35rem;
        }
    }
</style>