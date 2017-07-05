<template>
    <div>
        <div class="head" v-if="userInfo==null?true:false">
            <div class="top">
                <div id="head_go" @click="$router.go(-1)"><</div>
                <div class="title_text">我</div>
            </div>
            <img class="pic1" src="../../images/default_portrait.png">
            <router-link to="/login" class="login">登录/注册</router-link>
        </div>
        <div v-else>
            <div class="head" style="height: 3.3rem;">
                <div class="top">
                    <div id="head_go" @click="$router.go(-1)"><</div>
                    <div class="title_text">我</div>
                </div>
                <img class="pic2" :src="userInfos.avatar?userInfos.avatar:'../../images/default_portrait.png'">
                <p class="name">{{userInfos.name}}</p>
                <p class="mobile">{{userInfos.mobile}}</p>
            </div>
            <div class="top_box">
                <span></span>
                <router-link to="">编辑资料</router-link>
                <router-link to="">我的投诉</router-link>
            </div>
        </div>

        <router-link to="" class="box" style="font-weight: bold;"><img src="../../images/default_portrait.png">我的服务管家</router-link>
        <div class="box1">
            <router-link to="" class="das"><img src="../../images/default_portrait.png">维权志愿者联盟</router-link>
            <span class="xian"></span>
            <router-link to="" class="das"><img src="../../images/default_portrait.png">玩游戏拿大奖</router-link>
        </div>
        <div class="box1">
            <router-link to="" class="das"><img src="../../images/default_portrait.png">关注的投诉</router-link>
            <span class="xian"></span>
            <router-link to="" class="das"><img src="../../images/default_portrait.png">收藏</router-link>
        </div>
        <router-link to="/member/setting" class="box"><img src="../../images/default_portrait.png">设置</router-link>
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
        userInfos(){
            return JSON.parse(this.userInfo);
        },
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
        background: #000;
        padding-bottom: .001rem;
        .top{
            width: 100%;
            height: .8rem;
            overflow: hidden;
            #head_go{
                width: .8rem;
                height: .8rem;
                font-size: .4rem;
                float: left;
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
            margin: 0 auto .3rem auto;
            font-size: .28rem;
            color: #fff;
            display: block;
        }
    }
    .top_box{
        position: relative;
        width: 100%;
        border-bottom: 1px solid #ccc;
        height: .88rem;
        span{
            width: auto;
            height: .65rem;
            border-left: 1px solid #ccc;
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
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        font-size: .3rem;
        margin-top: .2rem;
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
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        font-size: .3rem;
        .xian{
            width: calc(~'100% - 1rem');
            border-bottom: 1px solid #ccc;
            display:block;
            float: right;
        }
        .das{
            display: block;
            width: 100%;
            height: .85rem;
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