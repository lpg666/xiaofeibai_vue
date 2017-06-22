<template>
    <div style="padding-top: 1rem;">
        <transition name="fade">
            <div class="tank" v-if="tank">
                <div class="declare" v-if="declare">
                    <div class="title">投诉须知</div>
                    <p>1.投诉是非常严肃的事情,请务必输入真实姓名及联系电话，以便我们工作人员能及时与您联系沟通和协助投诉处理事宜，如果投诉人相关信息不属实，则按无效投诉处理。</p>
                    <p>2.投诉人应当对投诉内容的真实性负责，因虚假投诉引起的法律责任，由投诉人承担。</p>
                    <p>3.不得使用诋毁，辱骂性的语言损害他人声誉，否则引起的法律责任，由投诉人承担。</p>
                    <p>4.请不要重复投诉，消费保在收到投诉后会在第一时间联系您并协助维权。</p>
                    <p style="color:#FD9C33; margin-bottom: 0;">5.投诉时请注意保护个人隐私，不要在投诉内容里面填写个人联系电话或帐号信息，涉及个人隐私或者敏感照片请选择不公开。</p>
                    <div class="check">下次不再提醒</div>
                    <div class="btn" @click="tankG">我知道了</div>
                </div>
            </div>
        </transition>
        <head-i>
            <span class="head_title" slot="title_text" @click="tankK">填写投诉</span>
        </head-i>
        <div style="width: 100%; height: 800px; background: #999" :class="{'tanT':tanc,'tanB':tans}">
            伤害都是看机会都是看家爱护都是看家爱护都是看家
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
        </div>
        <div></div>
    </div>
</template>

<script>
import headI from '../../components/header/head'

export default {
    data(){
        return {
            tani:false,
            tank:false,
            tans:false,
            tanc:false,
            declare:false
        }
    },
    components:{
        headI
    },
    methods:{
        tankG(){
            this.tans=true;
            this.tank=false;
            this.tanc=false;
            this.declare=false;
        },
        tankK(){
            this.tani=true;
            if(this.tani==true){
                this.tanc=true;
                this.tans=false;
                this.tank=true;
                this.declare=true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../style/mixin";

    @keyframes boxTop{
        0%   { bottom:-100%;}
        100% { bottom:0;}
    }

    @keyframes boxBottom{
        0%   { bottom:0;}
        100% { bottom:-100%;}
    }

    @keyframes boxT{
        0%   { transform:translateY(0)}
        100% { transform:translateY(-50%)}
    }
    @keyframes boxB{
        0%   { transform:translateY(-50%)}
        100% { transform:translateY(0)}
    }

    .tanT{
        animation:boxT .4s linear;
    }

    .tanB{
        animation:boxB .4s linear;
    }

    .fade-enter-active{
        animation:boxTop .4s linear;
    }
    .fade-leave-active{
        animation:boxBottom .4s linear;
    }

    .tank{
        .wh(100%,100%);
        position: fixed;
        bottom:0;
        left: 0;
        background: #fff/*rgba(0,0,0,.5)*/;
        z-index: 999;
    }
    .declare{
        .center;
        z-index: 1000;
        width: 7rem;
        height: auto;
        background: #fff;
        border-radius: .2rem;
        p{
            font-size: .28rem;
            line-height: .45rem;
            margin:0 .3rem .4rem .3rem;
        }
        .title{
            font-size: .28rem;
            margin: .4rem auto;
            .wh(1.6rem,.35rem);
            background: #000;
        }
        .check{
            .sc(.24rem,#999);
            margin: .35rem auto;
            text-align: center;
        }
        .btn{
            .wh(5.7rem,.73rem);
            .borderRadius(.1rem);
            .sc(.32rem,#fff);
            text-align: center;
            line-height: .73rem;
            margin: 0 auto .4rem auto;
            background: #39C17A;
        }
    }
</style>