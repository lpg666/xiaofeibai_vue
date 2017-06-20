<template>
    <ul id="tar">
        <li><router-link to="/home"><img src="../../images/default_portrait.png"><span>首页</span></router-link></li>
        <li><router-link to="/help"><img src="../../images/default_portrait.png"><span>求助</span></router-link></router-link></li>
        <li><router-link to="/activity"><img src="../../images/default_portrait.png"><span>活动</span></router-link></router-link></li>
        <li><router-link to="/product"><img src="../../images/default_portrait.png"><span>管家</span></router-link></router-link></li>
    </ul>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style lang="less">
    #tar{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        z-index: 99;
        background: #fff;
        bottom: 0;
        left: 0;
        box-shadow:0 0 1px rgba(0,0,0,.47);
        li{
            width: 25%;
            float: left;
            a{
                width: 100%;
                height: 1rem;
                font-size: .22rem;
                position: relative;
                text-align: center;
                display: block;
                img{
                    width: .44rem;
                    height: .44rem;
                    display: block;
                    position: absolute;
                    left: 50%;
                    margin-left: -.22rem;
                    top: .12rem;
                    margin-bottom: .11rem;
                }
                span{
                    width: 100%;
                    line-height: 1.5rem;
                    display:block;
                }
            }
        }
    }
</style>