<template>
    <div class="loading_box">
        <img v-if="loadType=='load'" class="load" src="../../images/loading.png">
        <img v-else-if="loadType=='alert'" style="width: .66rem; height: .66rem;" src="../../images/yuancuo.png">
        <img v-else src="../../images/yuandui.png">
        <p>{{loadText}}</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){

        },
        props: ['loadText','loadType'],
        methods: {
            close(){
                this.$emit('close')
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading_box{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        z-index: 999999;
        background: rgba(0,0,0,.75);
        font-size: .3rem;
        width: 4.8rem;
        height: auto;
        border-radius: .2rem;
        img{
            width: .88rem;
            height: .88rem;
            margin: .3rem auto;
            display: block;
        }
        p{
            text-align: center;
            color: #fff;
            margin: auto .5rem .25rem .5rem;
        }
    }
    @keyframes load{
        0%   { transform:rotate(0deg);}
        100% { transform:rotate(360deg);}
    }
    .load{
        animation:load 1.2s linear infinite;
    }
</style>