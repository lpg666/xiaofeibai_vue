<template>
    <div style="padding-top: 1rem;">
        <transition name="router-fade" v-if="ifDeclare">
            <div class="tank">
                <div class="declare" v-if="declare">
                    <div class="title">投诉须知</div>
                    <p>1.投诉是非常严肃的事情,请务必输入真实姓名及联系电话，以便我们工作人员能及时与您联系沟通和协助投诉处理事宜，如果投诉人相关信息不属实，则按无效投诉处理。</p>
                    <p>2.投诉人应当对投诉内容的真实性负责，因虚假投诉引起的法律责任，由投诉人承担。</p>
                    <p>3.不得使用诋毁，辱骂性的语言损害他人声誉，否则引起的法律责任，由投诉人承担。</p>
                    <p>4.请不要重复投诉，消费保在收到投诉后会在第一时间联系您并协助维权。</p>
                    <p style="color:#FD9C33; margin-bottom: 0;">5.投诉时请注意保护个人隐私，不要在投诉内容里面填写个人联系电话或帐号信息，涉及个人隐私或者敏感照片请选择不公开。</p>
                    <div class="check"><span :class="{sp1:declareSp}" @click="Declare">{{declareSp}}</span>下次不再提醒</div>
                    <div class="btn" @click="declareG">我知道了</div>
                </div>
            </div>
        </transition>
        <head-i>
            <span class="head_title" slot="title_text">填写投诉</span>
        </head-i>
        <div class="inp" :class="tki">
            <div class="select" @click="tanK(1)">所在地区</div>
            <div class="select" @click="tanK(2)">行业分类</div>
            <div class="select" @click="tanK(3)">被投诉企业／品牌</div>
            <div class="select" @click="tanK(4)">投诉问题</div>
            <div class="select" @click="tanK(5)">投诉诉求</div>
            <div class="">交易订单号<input type="text"></div>
            <div class="">购买时间<input type="date"></div>
            <div class="">消费金额</div>
            <div>
                <input type="text" placeholder="一句话说清投诉企业／品牌与事件（不超过30字）">
                <textarea placeholder="请详细描述事情经过"></textarea>
            </div>
            <div>
                <div>提交</div>
            </div>
        </div>
        <transition name="fade">
            <div class="select_tk" v-if="tk">
                <div class="title">
                    <div class="gb" @click="tanG">X</div>
                    <div class="but" @click="tanG">确定</div>
                </div>

            </div>
        </transition>
    </div>
</template>

<script>
import headI from '../../components/header/head'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return {
            declare:true,
            declareSp:false,
            tk:false,
            tkinp:false
        }
    },
    computed:{
        ...mapState([
            'isDeclare'
        ]),
        ifDeclare(){
            if(this.isDeclare==null){
                return true;
            }else{
                return false;
            }
        },
        tki(){
            if(this.tkinp){
                if(this.tk){
                    return 'tanT';
                }else{
                    return 'tanB';
                }
            }else{
                return '';
            }
        }
    },
    components:{
        headI
    },
    methods:{
        ...mapMutations([
            'RECORD_DECLARE'
        ]),
        Declare(){
            this.declareSp=!this.declareSp;
        },
        declareG(){
            this.declare=false;
            this.RECORD_DECLARE(this.declareSp);
        },
        tanK(i){
            this.tkinp=true;
            this.tk=true;
        },
        tanG(){
            this.tk=false;
        }
    },
    created(){

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
    .inp{
        overflow: hidden;
        width:100%;
        div{
            width: calc(~'100% - .2rem');
            height: 1.28rem;
            line-height: 1.28rem;
            float: right;
            border-bottom: 1px solid rgba(204,204,204,.5);
            color: #999;
            font-size: .3rem;
        }
    }
    .select_tk{
        .wh(100%,100%);
        position: fixed;
        bottom:0;
        left: 0;
        background:#fff;
        z-index: 999;
        .title{
            width: 100%;
            height: 1rem;
            overflow: hidden;
            .gb{
                float: left;
                .wh(1rem,1rem);
                background: #2dc177;
            }
            .but{
                float: right;
                text-align: center;
                .wh(1.25rem,1rem);
                line-height:1rem;
                .sc(.32rem,#39C17A);
            }
        }
    }
    .tank{
        .wh(100%,100%);
        position: fixed;
        bottom:0;
        left: 0;
        background: rgba(0,0,0,.5);
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
            span{
                width: .28rem;
                height: .28rem;
                border-radius: 100%;
                border: 1px solid #cdcdcd;
                display: inline-block;
                margin-right: .15rem;
            }
            .sp1{
                background: #2dc177;
            }
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