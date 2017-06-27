<template>
    <div style="padding-top: 1rem;">
        <transition name="router-fade" v-if="isShow">
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
            <div class="text" v-if="userInfo.real_name" @click="qh">
                <p class="p1">真实姓名</p>
                <p class="p2">{{userInfo.real_name}}</p>
            </div>
            <div class="text" v-if="userInfo.mobile">
                <p class="p1">手机号码</p>
                <p class="p2">{{userInfo.mobile}}</p>
            </div>
            <div class="select" @click="tanK(1)">所在地区</div>
            <div class="select" @click="tanK('type')">
                <p class="p1">行业分类</p>
                <p class="p2">天猫</p>
            </div>
            <div class="select" @click="tanK('brand')">被投诉企业／品牌</div>
            <div class="select" @click="tanK('problem')">投诉问题</div>
            <div class="select" @click="tanK('suqiu')">投诉诉求</div>
            <div v-for="data in properties">
                <div class="select" v-if="data.show_type=='select'">
                    select
                </div>
                <div class="data" v-else-if="data.show_type=='date'">
                    data
                </div>
                <div class="text" v-else>
                    text
                </div>
            </div>
            <div>
                <input type="text" placeholder="一句话说清投诉企业／品牌与事件（不超过30字）">
                <textarea placeholder="请详细描述事情经过"></textarea>
            </div>
            <div>
                <div class="fromBut">提交</div>
            </div>
        </div>
        <transition name="fade">
            <div class="select_tk" v-if="tk" style="overflow-y: scroll">
                <div class="title">
                    <div class="gb" @click="tanG">X</div>
                    <div class="but" @click="tanG">确定</div>
                </div>
                <div v-if="tkData.name=='type'" v-for="data in tkData.data" :key="data">
                    <ul>
                        <li>{{data.name}}</li>
                    </ul>
                </div>
                <div class="brand" v-if="tkData.name=='brand'">
                    <div>
                        <p>品牌</p>
                        <ul>
                            <li v-for="data in tkData.data">{{data.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="problem" v-if="tkData.name=='problem'">
                    <div v-for="(data,key) in tkData.data.types" :key="data">
                        <p>{{data}}<span>(多选)</span></p>
                        <ul>
                            <li v-for="item in tkData.data.lists" v-if="item.problem_type_id==key+1">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="suqiu" v-if="tkData.name=='suqiu'">
                    <div>
                        <p>投诉诉求<span>(多选)</span></p>
                        <ul>
                            <li v-for="data in tkData.data">{{data.name}}</li>
                        </ul>
                    </div>
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
            types:'',
            brands:'',
            problems:'',
            suqius:'',
            properties:'',
            tkData:{},
            from:{},
            isShow:true,
            declare:true,
            declareSp:false,
            tk:false,
            tkinp:false
        }
    },
    computed:{
        ...mapState([
            'isDeclare',
            'userInfo'
        ]),
        tki(){
            if(this.tkinp){
                if(this.tk){
                    return 'tanT';
                }else{
                    return 'tanB ovh';
                }
            }else{
                return '';
            }
        },
        show(){
            if(this.isDeclare==true || this.isDeclare=='true'){
                this.isShow=false;
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
        ajaxTypes(){
            this.axios.get('/v3/tousu/types')
                .then(res => {
                    this.types=res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        ajaxBrands(){
            this.axios.get('/v3/tousu/brands?subtype_id=2')
                .then(res => {
                    this.brands=res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {

                })
        },
        ajaxProblems(){
            this.axios.get('/v3/tousu/problems?subtype_id=2')
                .then(res => {
                    this.problems=res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {

                })
        },
        ajaxSuqius(){
            this.axios.get('/v3/tousu/suqius?subtype_id=2')
                .then(res => {
                    this.suqius=res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {

                })
        },
        ajaxProperties(){
            this.axios.get('/v3/tousu/properties?subtype_id=2')
                .then(res => {
                    this.properties=res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {

                })
        },
        Declare(){
            this.declareSp=!this.declareSp;
        },
        declareG(){
            this.declare=false;
            this.isShow=false;
            this.RECORD_DECLARE(this.declareSp);
        },
        tanK(data){
            document.querySelector('body').style.overflow='hidden';
            this.tkinp=true;
            this.tk=true;
            console.log(data);
            switch (data){
                case 'type':
                    this.tkData={'name':data,'data':this.types};
                    break;
                case 'brand':
                    this.tkData={'name':data,'data':this.brands};
                    break;
                case 'problem':
                    this.tkData={'name':data,'data':this.problems};
                    break;
                case 'suqiu':
                    this.tkData={'name':data,'data':this.suqius};
                    break;
                case 'propertie':
                    this.tkData={'name':data,'data':this.properties};
                    break;
                default:
                    this.tkData={};
            }

        },
        tanG(){
            document.querySelector('body').style.overflow='';
            this.tk=false;
        },
        qh(el){
            console.log(el);
        }
    },
    directives: {
        focus: {
            inserted: function (el, {value}) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
    created(){
        this.show;
        this.ajaxTypes();
        this.ajaxBrands();
        this.ajaxProblems();
        this.ajaxSuqius();
        this.ajaxProperties();
    },
    mounted() {

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

    .fromBut{
        width: 5.7rem;
        height: .72rem;
        line-height: .72rem;
        text-align: center;
        border-radius: .1rem;
        color: #fff;
        margin: .2rem auto .8rem auto;
        font-size: .32rem;
        background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
        background-image:linear-gradient(to right,#37C078,#5BDC99);
    }

    .inp{
        overflow: hidden;
        width:100%;
        .select,.text,.data{
            width: calc(~'100% - .2rem');
            height: 1.28rem;
            line-height: 1.28rem;
            float: right;
            border-bottom: 1px solid rgba(204,204,204,.5);
            color: #999;
            font-size: .3rem;
            label{
                display: inline-block;
                line-height: 1.28rem;
            }
        }
        .p1{
            .sc(.24rem,#999);
            line-height: .84rem;
            height: .64rem;
        }
        .p2{
            .sc(.3rem,#1C2733);
            height: .64rem;
            line-height: .44rem;
        }
    }
    .select_tk{
        .wh(100%,100%);
        position: fixed;
        bottom:0;
        left: 0;
        background:#fff;
        padding-top: 1rem;
        z-index: 999;
        .title{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 1rem;
            background: #fff;
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
        .problem,.suqiu,.brand{
            padding-bottom: .4rem;
            width:100%;
            p{
                font-size: .32rem;
                font-weight: bold;
                margin:.4rem .22rem 0 .22rem;
                span{
                    font-weight: normal;
                    font-size: .24rem;
                    color: #999;
                    margin-left: .5rem;
                }
            }
            ul{
                width: auto;
                margin: 0 .22rem;
                overflow: hidden;
                li{
                    float: left;
                    border: 1px solid #ccc;
                    border-radius: .04rem;
                    padding: .08rem .17rem;
                    font-size: .26rem;
                    margin-top: .4rem;
                    margin-right: .35rem;
                }
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