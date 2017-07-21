<template>
    <ul id="tar">
        <li><router-link to="/home"><i class="ic1"></i><span>首页</span></router-link></li>
        <li><router-link to="/help"><i class="ic2"></i><span>求助</span></router-link></router-link></li>
        <li><router-link to="/activity"><i class="ic3"></i><span>活动</span></router-link></router-link></li>
        <li><router-link to="/product/info1"><i class="ic4"></i><span>管家</span></router-link></router-link></li>
    </ul>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        computed: {
            ...mapState([
                'autoRoute',
                'userInfo'
            ]),
        }
    }
</script>

<style lang="less" scoped>
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
                i{
                    width: .44rem;
                    height: .43rem;
                    display: block;
                    position: absolute;
                    left: 50%;
                    margin-left: -.22rem;
                    top: .12rem;
                    margin-bottom: .11rem;
                    background-position: center top
                }
                .ic1{
                    background: url("../../images/tabbar_home_normal@2x.png") no-repeat;
                    background-size: .44rem;
                }
                .ic2{
                    background: url("../../images/tabbar_tousu_normal@2x.png") no-repeat;
                    background-size: .44rem;
                }
                .ic3{
                    background: url("../../images/tab_huodong@2x.png") no-repeat;
                    background-size: .44rem;
                }
                .ic4{
                    background: url("../../images/tab_guanjia@2x.png") no-repeat;
                    background-size: .44rem;
                }
                span{
                    width: 100%;
                    line-height: 1.5rem;
                    display:block;
                }
            }
            .router-link-active{
                i{
                    background-position: center bottom !important;
                }
                span{
                    color: #37C078;
                }
            }
        }
    }
</style>