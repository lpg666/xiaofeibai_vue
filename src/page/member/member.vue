<template>
    <div style="background: #F6F7F9; height: calc(100vh);">
        <div class="head" v-if="userInfo==null?true:false">
            <div class="top">
                <div id="head_go" @click="$router.go(-1)"></div>
                <div class="title_text">我</div>
            </div>
            <div class="bc">
                <i></i>
                请完善资料，即可快速投诉。
                <router-link to="">立即完善</router-link>
            </div>
            <div class="wd">
                <img class="pic2" src="../../images/default_portrait.png">
                <router-link to="/login" class="login">登录/注册</router-link>
            </div>
        </div>
        <div v-else>
            <div class="head" style="height: 3.3rem;">
                <div class="top">
                    <div id="head_go" @click="$router.go(-1)"><</div>
                    <div class="title_text">我</div>
                </div>
                <div class="wd">
                    <img class="pic2" :src="userInfo.avatar?userInfo.avatar:'../../images/default_portrait.png'">
                    <p class="name">{{userInfo.name}}</p>
                    <p class="mobile">{{userInfo.mobile}}</p>
                </div>
            </div>
            <div class="top_box">
                <span></span>
                <router-link to="">编辑资料</router-link>
                <router-link to="/member/tousu">我的投诉</router-link>
            </div>
        </div>
        <router-link to="/product" class="box" style="margin-top: .2rem; border-top: 1px solid rgba(204,204,204,.5); font-weight: bolder; font-size: .32rem;"><img src="../../images/icon_fuwuguanjia@2x.png">我的服务管家</router-link>
        <div class="box1">
            <router-link to="" class="das"><img src="../../images/myself_volunteer@2x.png">维权志愿者联盟</router-link>
            <span class="xian"></span>
            <router-link to="" class="das"><img src="../../images/myself_game@2x.png">玩游戏拿大奖</router-link>
        </div>
        <div class="box1">
            <router-link to="" class="das"><img src="../../images/myself_focus@2x.png">关注的投诉</router-link>
            <span class="xian"></span>
            <router-link to="" class="das"><img src="../../images/icon_xing.png">收藏</router-link>
        </div>
        <router-link to="/member/setting" class="box" style="margin-top: .2rem; border-top: 1px solid rgba(204,204,204,.5);"><img src="../../images/myself_setting@2x.png">设置</router-link>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState([
            'autoRoute',
            'userInfo'
        ]),
        /*mobile(){
            let m = this.userInfo.mobile;
            //let x = m.substr(2,5);
            //m.replace(x,'*****');
            console.log(m);
            return m;
        },*/
        a(){
            this.RECORD_USERINFO(1);
        }
    },
    methods:{
        ...mapMutations([
            'RECORD_USERINFO'
        ])
    },
    mounted() {
        console.log(this.autoRoute,this.userInfo);
    }

}
</script>

<style lang="less" scoped>
    .head{
        position: relative;
        width: 100%;
        background: url("../../images/bg_gerenzhongxin.png") no-repeat center;
        background-size: 100%;
        padding-bottom: .001rem;
        .bc{
            width: 100%;
            height: .72rem;
            line-height: .72rem;
            font-size: .24rem;
            background: rgb(252,236,147);
            i{
                width: .44rem;
                height: .44rem;
                display: block;
                float: left;
                margin-top: .16rem;
                margin-left: .3rem;
                margin-right: .1rem;
            }
            a{
                margin-top: .08rem;
                width: 1.36rem;
                height: .54rem;
                text-align: center;
                background: #fff;
                line-height: .54rem;
                border: 1px solid #37C078;
                border-radius: .1rem;
                float: right;
                margin-right: .3rem;
                display: block;
                color: #37C078;
            }
        }
        .wd{
            height: 2.5rem;
            background: url("../../images/bg_touxiang.png") no-repeat center;
            background-size: cover;
        }
        .top{
            width: 100%;
            height: .8rem;
            overflow: hidden;
            #head_go{
                width: .8rem;
                height: .8rem;
                font-size: .4rem;
                float: left;
                background: url("../../images/jt_bai.png") no-repeat left .1rem center;
                background-size: .4rem;
            }
            .title_text{
                text-align: center;
                font-size: .42rem;
                color: #fff;
                line-height: .8rem;
                text-indent: -.8rem;
            }
        }
        .pic1{
            width: 1.4rem;
            height: 1.4rem;
            margin: .35rem auto;
            display: block;
        }
        .pic2{
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 100%;
            display: block;
            position: absolute;
            left: .4rem;
            bottom: .45rem;
        }
        .name{
            font-size: .3rem;
            color: #fff;
            position: absolute;
            left: 2.1rem;
            top: 1.7rem;
        }
        .mobile{
            font-size: .28rem;
            color: #fff;
            position: absolute;
            top: 2.2rem;
            left: 2.1rem;
        }
        .login{
            width: 1.65rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            border: 1px solid #fff;
            border-radius: .08rem;
            font-size: .28rem;
            color: #fff;
            display: block;
            position: absolute;
            left: 2.2rem;
            bottom: .85rem;
        }
    }
    .top_box{
        position: relative;
        background: #fff;
        width: 100%;
        border-bottom: 1px solid rgba(204,204,204,.5);
        height: .88rem;
        span{
            width: auto;
            height: .65rem;
            border-left: 1px solid rgba(204,204,204,.5);
            position: absolute;
            left: 50%;
            top: .115rem;
        }
        a{
            width: 50%;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            font-size: .28rem;
            display: block;
            float: left;
        }
    }
    .box{
        width: 100%;
        height: .85rem;
        line-height: .85rem;
        border-bottom:1px solid rgba(204,204,204,.5);
        font-size: .3rem;
        background:#fff url("../../images/jt_hui.png") no-repeat right .2rem center;
        background-size:.3rem;
        display: block;
        img{
            width:.4rem;
            height: .4rem;
            display: block;
            float: left;
            margin: .225rem .3rem;
        }
    }
    .box1{
        width: 100%;
        margin-top: .2rem;
        border-top:1px solid rgba(204,204,204,.5);
        border-bottom:1px solid rgba(204,204,204,.5);
        background: #fff;
        font-size: .3rem;
        .xian{
            width: calc(~'100% - 1rem');
            border-bottom: 1px solid rgba(204,204,204,.5);
            display:block;
            float: right;
        }
        .das{
            display: block;
            width: 100%;
            height: .85rem;
            background: url("../../images/jt_hui.png") no-repeat right .2rem center;
            background-size:.3rem;
            line-height: .85rem;
            img{
                width:.4rem;
                height: .4rem;
                display: block;
                float: left;
                margin: .225rem .3rem;
            }
        }
    }
</style>