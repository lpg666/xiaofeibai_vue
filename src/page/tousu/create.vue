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
            <div class="text" v-if="userInfo.real_name">
                <label>真实姓名</label>
                <input type="text" :value="userInfo.real_name" readonly>
            </div>
            <div class="text" v-if="userInfo.mobile">
                <label>手机号码</label>
                <input type="text" :value="userInfo.mobile" readonly>
            </div>
            <div class="select" @click="tanK(1)">所在地区</div>
            <div class="select" @click="tanK('type')">
                <label>行业分类</label>
                <div class="xs">{{from.name.type_id}} {{from.name.subtype_id}}</div>
            </div>
            <div class="select" @click="tanK('brand')">
                <label style="line-height: .35rem; margin-top: .15rem">被投诉企业／品牌</label>
                <div class="xs">{{from.name.brand_id}}</div>
            </div>
            <div class="select" @click="tanK('problem')">
                <label>投诉问题</label>
                <div class="xs">{{from.name.problems}}</div>
            </div>
            <div class="select" @click="tanK('suqiu')">
                <label>投诉诉求</label>
                <div class="xs">{{from.name.suqius}}</div>
            </div>
            <div v-for="data in properties">
                <div class="select" v-if="data.show_type=='select'">
                    select
                </div>
                <div class="data" v-else-if="data.show_type=='date'" @click="setDate"></div>
                <div class="text" v-else>
                    <label :style="{'line-height':data.name.length>4?'.35rem':'','margin-top':data.name.length>4?'.15rem':''}">{{data.name}}</label>
                    <input type="text" value="" @change="textSr($event,data.id)">
                </div>
            </div>
            <div>
                <input type="text" placeholder="一句话说清投诉企业／品牌与事件（不超过30字）">
                <textarea placeholder="请详细描述事情经过"></textarea>
            </div>
            <div>
                <div class="fromBut" @click="fromBut">提交</div>
            </div>
        </div>
        <transition name="fade">
            <div class="select_tk" v-if="tk" style="overflow-y: scroll">
                <div class="title">
                    <div class="gb" @click="tanG">X</div>
                    <div class="but" @click="queRen">确定</div>
                </div>
                <div class="type" v-if="tkData.name=='type'">
                    <div v-for="data in tkData.data" :key="data" :value="data.id">
                        <p>{{data.name}}</p>
                        <ul>
                            <li v-for="list in data.sub_type" :class="{'hover':from.value.subtype_id==list.id}" @click="radio('subtype_id',list.id,list.name,data)">{{list.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="brand" v-if="tkData.name=='brand'">
                    <div>
                        <p>品牌</p>
                        <ul>
                            <li v-for="data in tkData.data" :class="{'hover':from.value.brand_id==data.id}" @click="radio('brand_id',data.id,data.name)">{{data.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="problem" v-if="tkData.name=='problem'">
                    <div v-for="(data,key) in tkData.data.types" :key="data">
                        <p>{{data}}<span>(多选)</span></p>
                        <ul>
                            <li v-for="item in tkData.data.lists" v-if="item.problem_type_id==key+1" :class="each('problems',item.id)" @click="check('problems',item.id,item.name)">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="suqiu" v-if="tkData.name=='suqiu'">
                    <div>
                        <p>投诉诉求<span>(多选)</span></p>
                        <ul>
                            <li v-for="data in tkData.data" :class="each('suqius',data.id)" @click="check('suqius',data.id,data.name)">{{data.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <alert-box v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-box>

        <transition name="fade1">
            <div v-show="dataShow">
                <com-calendar
                        :startYear="startYear"
                        :endYear="endYear"
                        :month="month"
                        :year="year"
                        :day="day"
                        :onOk="onOk"
                        :onCancel="onCancel"
                        v-on:hide="hide"
                ></com-calendar>
                <div  class='mark'></div>
                <p></p>
            </div>
        </transition>
    </div>
</template>

<script>
import headI from '../../components/header/head'
import alertBox from '../../components/common/alertBox'
import calendarComponent from '../../components/common/calendar'
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
            from:{
                name:{},
                value:{},
            },
            checkD:'',
            checkF:'',
            checkG:'',
            checkH:'',
            isShow:true,
            declare:true,
            declareSp:false,
            tk:false,
            tkinp:false,
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            //
            data:'日期',
            dataShow:false,
            startYear:1988,
            endYear:2050,
            year:(new Date).getFullYear(),
            month:((new Date).getMonth()+1),
            day:(new Date).getDate(),
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
        headI,
        alertBox,
        comCalendar:calendarComponent
    },
    methods:{
        ...mapMutations([
            'RECORD_DECLARE'
        ]),
        //
        fromBut(){
            console.log(this.from.value);
        },
        //
        setDate(){
            this.dataShow=true;
            let yY = -((new Date).getFullYear() - this.startYear - 3)*34;
            let mY = -((new Date).getMonth()+1 -4)*34;
            let dY = -((new Date).getDate() -4)*34;
            console.log(yY,mY,dY);
        },
        hide(){
            this.dataShow =false;
        },
        onOk(data) {
            this.data= data.year+'-'+data.month+'-'+data.day;
            console.log('确定')
        },
        onCancel(){
            console.log('取消')
        },
        //附加text属性
        textSr(el,id){
            if(!this.from.value.properties){
                this.from.value.properties = id +'###'+ el.target.value;
            }else{
                this.from.value.properties = this.from.value.properties + '|||' + id +'###'+ el.target.value;
            }
            console.log(el,this.from.value.properties);
        },
        //多选样式显示
        each(id,value){
            if(id=='problems'){
                if(!isNaN(this.checkD)){
                    if(this.checkD==value){
                        return 'hover';
                    }else{
                        return false;
                    }
                }else{
                    let arr = this.checkD.split('|||');
                    for (let i in arr) {
                        if (arr[i] == value) return 'hover';
                    }
                    return false;
                }
            }else if(id=='suqius'){
                if(!isNaN(this.checkG)){
                    if(this.checkG==value){
                        return 'hover';
                    }else{
                        return false;
                    }
                }else{
                    let arr = this.checkG.split('|||');
                    for (let i in arr) {
                        if (arr[i] == value) return 'hover';
                    }
                    return false;
                }
            }
        },
        closeTip(){
            this.showAlert = false;
        },
        //投诉单选
        radio(id,value,name,parent){
            if(parent){
                this.from.name={};
                this.from.value={};
                this.$set(this.from.value,'type_id',parent.id);
                this.$set(this.from.name,'type_id',parent.name);
            }
            if(id){
                this.$set(this.from.value,''+id+'',value);
                this.$set(this.from.name,''+id+'',name);
            }
        },
        //投诉多选
        check(id,value,name){
            if(id=='problems'){
                if(id && this.checkD==''){
                    this.checkD = value;
                    this.checkF = name;
                }else {
                    if(this.checkD==value){
                        this.checkD='';
                        this.checkF='';
                    }else{
                        this.checkD=this.checkD.toString();
                        if(this.checkD.indexOf(value) > 0){
                            this.checkD = this.checkD.replace('|||'+value,'');
                        }else{
                            this.checkD = this.checkD +　'|||' + value;
                        }
                        //
                        if(this.checkF.indexOf(name) > 0){
                            this.checkF = this.checkF.replace('、'+name,'');
                        }else{
                            this.checkF = this.checkF +　'、' + name;
                        }
                    }
                }
                this.$set(this.from.value,''+id+'',this.checkD);
                this.$set(this.from.name,''+id+'',this.checkF);
                console.log(this.from.name.problems);
            }else if(id=='suqius'){
                if(id && this.checkG==''){
                    this.checkG = value;
                    this.checkH = name;
                }else {
                    if(this.checkG==value){
                        this.checkG='';
                        this.checkH='';
                    }else{
                        this.checkG=this.checkG.toString();
                        if(this.checkG.indexOf(value) > 0){
                            this.checkG = this.checkG.replace('|||'+value,'');
                        }else{
                            this.checkG = this.checkG +　'|||' + value;
                        }
                        //
                        if(this.checkH.indexOf(name) > 0){
                            this.checkH = this.checkH.replace('、'+name,'');
                        }else{
                            this.checkH = this.checkH +　'、' + name;
                        }
                    }
                }
                this.$set(this.from.value,''+id+'',this.checkG);
                this.$set(this.from.name,''+id+'',this.checkH);
                console.log(this.from.name.suqius);
            }
        },
        ajaxTypes(){
            this.axios.get('/v3/tousu/types')
                .then(res => {
                    this.types=res.data.data;
                    this.tkData={'name':'type','data':res.data.data};
                    this.closeTip();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        ajaxBrands(id){
            this.axios.get('/v3/tousu/brands?subtype_id='+id+'')
                .then(res => {
                    this.brands=res.data.data;
                })
                .catch(err => {

                })
        },
        ajaxQita(id){
            this.axios.get('/v3/tousu/get-problems-suqius-properties-by-subtype?subtype_id='+id+'')
                .then(res => {
                    this.problems=res.data.data.problems;
                    this.suqius=res.data.data.suqius;
                    this.properties=res.data.data.properties;
                    this.closeTip();
                })
                .catch(err => {

                })
        },
        //投诉须知是否不再提示
        Declare(){
            this.declareSp=!this.declareSp;
        },
        //关闭投诉须知
        declareG(){
            this.declare=false;
            this.isShow=false;
            this.RECORD_DECLARE(this.declareSp);
        },
        //点击选项弹出
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
        //关闭弹框按钮
        tanG(){
            if(this.tkData.name=='type'){
                document.querySelector('body').style.overflow='';
                this.tk=false;
                this.showAlert=false;
                this.$router.go(-1);
            }else{
                document.querySelector('body').style.overflow='';
                this.tk=false;
                this.showAlert=false;
            }

        },
        //弹框确认按钮
        queRen(){
            if(this.tkData.name=='type'){
                if(this.from.value.subtype_id){
                    this.showAlert=true;
                    this.alertText='加载中...';
                    this.ajaxBrands(this.from.value.subtype_id);
                    this.ajaxQita(this.from.value.subtype_id);

                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                    setTimeout(this.closeTip,2000);
                }
            }else if(this.tkData.name=='brand'){
                if(this.from.value.brand_id){
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                }
            }else if(this.tkData.name=='problem'){
                if(this.from.value.problems){
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                }
            }else if(this.tkData.name=='suqiu'){
                if(this.from.value.suqius){
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                }
            }
        }
    },
    created(){
        this.show;
        this.tk=true;
        this.showAlert=true;
        this.alertText='加载中...';
        this.ajaxTypes();
    },
    mounted() {
        this.from.value.sign=this.userInfo.sign;
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

    .fade1-enter-active, .fade1-leave-active {
        transition: opacity .3s
    }
    .fade1-enter, .fade1-leave-active {
        opacity: 0
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
            height: 1rem;
            line-height: 1rem;
            float: right;
            border-bottom: 1px solid rgba(204,204,204,.5);
            color: #999;
            font-size: .3rem;
            label{
                width: 1.4rem;
                text-align: left;
                float: left;
                display:block;
                line-height: 1rem;
            }
            input[type='text']{
                float: right;
                width: calc(~'100% - 1.4rem');
                display:block;
                height: 100%;
                line-height: 100%;
                font-size: .3rem;
            }
            .xs{
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
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
                .hover{
                    border: 1px solid #39C17A;
                    color: #fff;
                    background: #39C17A;
                }
            }
        }
        .type{
            p{
                font-size: .4rem;
                font-weight: bold;
            }
            ul{
                overflow: hidden;
                li{
                    font-size: .34rem;
                    margin-right: .4rem;
                    float: left;
                }
            }
            .hover{
                color: #2dc177;
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