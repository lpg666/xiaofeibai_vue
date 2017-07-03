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
            <div class="text">
                <p :class="userInfo.real_name?'p1':'p2'">真实姓名</p>
                <input :class="userInfo.real_name?'lp1':'lp2'" type="text" :value="userInfo.real_name" v-model="userInfo.real_name">
            </div>
            <!-- -->
            <div class="text">
                <p :class="userInfo.mobile?'p1':'p2'">真实姓名</p>
                <input :class="userInfo.mobile?'lp1':'lp2'" type="text" :value="userInfo.mobile" v-model="userInfo.mobile">
            </div>
            <!-- -->
            <div class="select" @click="tanK(1)">所在地区</div>
            <div class="select" @click="tanK('type')">
                <p :class="from.value.type_id?'p1':'p2'">行业分类</p>
                <div :class="from.value.type_id?'lp1':'lp2'">{{from.name.type_id}} {{from.name.subtype_id}}</div>
            </div>
            <div class="select" @click="tanK('brand')">
                <p style="width: auto;" :class="from.value.brand_id?'p1':'p2'">被投诉企业／品牌</p>
                <div style="width: auto;" :class="from.value.brand_id?'lp1':'lp2'">{{from.name.brand_id}}</div>
            </div>
            <div class="select" @click="tanK('problem')">
                <p :class="from.value.problems?'p1':'p2'">投诉问题</p>
                <div :class="from.value.problems?'lp1':'lp2'">{{from.name.problems}}</div>
            </div>
            <div class="select" @click="tanK('suqiu')">
                <p :class="from.value.suqius?'p1':'p2'">投诉诉求</p>
                <div :class="from.value.suqius?'lp1':'lp2'">{{from.name.suqius}}</div>
            </div>
            <div class="select" style="width: 100%; border-bottom: none;" v-for="data in properties">
                <div class="select" v-if="data.show_type=='select'" @click="tanK('propertie',data.id)">
                    <p :class="textId[data.id]==''?'p2':'p1'">{{data.name}}</p>
                    <div :class="textId[data.id]==''?'lp2':'lp1'">{{textId[data.id]}}</div>
                </div>
                <div class="data" v-else-if="data.show_type=='date'" @click="setDate(data.id)">
                    <p :class="tousuData?'p1':'p2'">{{data.name}}</p>
                    <div :class="tousuData?'lp1':'lp2'">{{tousuData}}</div>
                </div>
                <div class="text" v-else>
                    <p :class="textId[data.id]==''?'p2':'p1'">{{data.name}}</p>
                    <input :class="textId[data.id]==''?'lp2':'lp1'" type="text" value="" v-model="textId[data.id]">
                </div>
            </div>
            <div class="texta">
                <div style="background: #fff; width: 100%; overflow: hidden; border-top: 1px solid rgba(204, 204, 204, 0.5); border-bottom: 1px solid rgba(204, 204, 204, 0.5);">
                    <input type="text" placeholder="一句话说清投诉企业／品牌与事件（不超过30字）">
                    <textarea placeholder="请详细描述事情经过"></textarea>
                </div>
            </div>
            <div style="width: 100%; float: left;">
                <div class="upload_box">
                    <ul class="pic">
                        <li v-for="data,key in picList">
                            <i class="dl" @click="delPic(key)"></i>
                            <img :src="'http://xiaofeibao.b0.upaiyun.com'+data.src.data">
                            <div class="lk" @click="picShow(key)">
                                <i :class="data.show==1?'hover':''"></i>
                                <span v-if="data.show==1">公开</span>
                                <span v-else>不公开</span>
                            </div>
                        </li>
                    </ul>
                    <div id="upload"><input @change="onFileChange" type="file" multiple></div>
                </div>
                <div class="tousuInfo">*投诉时，请注意保护个人隐私，涉及个人隐私或者敏感照片请选择不公开。</div>
                <div class="fromBut" @click="fromBut">提交</div>
            </div>
        </div>
        <transition name="fade">
            <div class="select_tk" v-if="tk" style="overflow-y: scroll" :class="tkData.name=='type'?'type_bg':null">
                <div class="title">
                    <div class="gb" @click="tanG"></div>
                    <div class="but" @click="queRen">确定</div>
                </div>
                <div class="type" v-if="tkData.name=='type'">
                    <div class="mbl"></div>
                    <div v-for="data in tkData.data" :key="data" :value="data.id">
                        <img :src="require('../../images/icon_'+data.id+'.png')">
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
                <div class="propertie" v-if="tkData.name=='propertie'">
                    <div>
                        <p>{{tkData.data.name}}</p>
                        <ul>
                            <li v-for="item in fg(tkData.data.values)" :class="{'hover':item==hc}" @click="radio('propertie',tkData.data.id,item)">{{item}}</li>
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
            checkD:[],
            checkF:[],
            checkG:[],
            checkH:[],
            isShow:true,
            declare:true,
            declareSp:false,
            tk:false,
            tkinp:false,
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            //
            dataShow:false,
            startYear:1988,
            endYear:2050,
            year:(new Date).getFullYear(),
            month:((new Date).getMonth()+1),
            day:(new Date).getDate(),
            dataId:'',
            textId:{},
            hc:'',
            //
            picList:[]
        }
    },
    computed:{
        ...mapState([
            'isDeclare',
            'userInfo',
            'tousuData'
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
        },
    },
    components:{
        headI,
        alertBox,
        comCalendar:calendarComponent
    },
    methods:{
        ...mapMutations([
            'RECORD_DECLARE',
            'TOUSU_DATA'
        ]),
        //
        fromBut(){
            console.log(this.from.value,this.dataId,this.tousuData,this.textId);
        },
        //图片上传
        picShow(key){
            this.picList[key].show=!this.picList[key].show;
            console.log(this.picList[key].show);
        },
        delPic(key){
            this.picList.splice(key,1);
            console.log(this.picList);
        },
        onFileChange(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files);
        },
        createImage(file) {
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            const image = new Image();
            const vm = this;
            const leng=file.length;
            const gs = ['image/jpeg','image/jpg','image/png'];
            for(let i=0;i<leng;i++){
                let isLt2M = file[i].size / 1024 / 1024 < 2;
                if(gs.indexOf(file[i].type)<0){
                    console.log('文件类型不对');
                }else if(!isLt2M){
                    console.log('图片过大');
                }else{
                    console.log('上传中...');
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        vm.axios.post('/v3/tousu/upload-pic',{'pic':e.target.result})
                            .then(res =>{
                                vm.picList.push({'src':res.data,'show':'1'});
                                console.log(res,vm.picList);
                                console.log('上传成功');
                            })
                            .catch(err =>{

                            })
                    };
                }

            }
        },
        //附加text属性
        textSr(el,id){
            this.$set(this.textId,''+id+'',el.target.value);
            console.log(this.textId);
        },
        //
        fg(data){
            let array = data.split('|||');
            console.log(array);
            return array;
        },
        //
        typeImg(id){
            return '../../images/icon_'+id+'.png';
        },
        //
        setDate(id){
            this.dataShow=true;
            this.dataId=id;
        },
        hide(){
            this.dataShow =false;
        },
        onOk(data) {
            this.TOUSU_DATA(data.year+'-'+data.month+'-'+data.day);
            console.log(this.dataId,this.tousuData);
            console.log('确定')
        },
        onCancel(){
            console.log('取消')
        },
        //多选样式显示
        each(id,value){
            if(id=='problems'){
                for (let i in this.checkD) {
                    if (this.checkD[i] == value) return 'hover';
                }
                return false;
            }else if(id=='suqius'){
                for (let i in this.checkG) {
                    if (this.checkG[i] == value) return 'hover';
                }
                return false;
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
                this.textId={};
                this.$set(this.from.value,'type_id',parent.id);
                this.$set(this.from.name,'type_id',parent.name);
            }
            if(id){
                if(id=='propertie'){
                    this.$set(this.textId,''+value+'',name);
                    this.hc=name;
                    console.log(id,value,name);
                }else{
                    this.$set(this.from.value,''+id+'',value);
                    this.$set(this.from.name,''+id+'',name);
                }
            }
        },
        //投诉多选
        check(id,value,name){
            if(id=='problems'){
                if(id && this.checkD.length==0){
                    this.checkD.push(value);
                    this.checkF.push(name);
                }else{
                    if(this.checkD.indexOf(value)<0){
                        this.checkD.push(value);
                        this.checkF.push(name);
                    }else{
                        this.checkD.splice(this.checkD.indexOf(value),1);
                        this.checkF.splice(this.checkF.indexOf(name),1);
                    }
                }

                if(this.checkD.length<=0){
                    this.$set(this.from.value,''+id+'',this.checkD.join(''));
                    this.$set(this.from.name,''+id+'',this.checkF.join(''));
                }else{
                    this.$set(this.from.value,''+id+'',this.checkD.join('|||'));
                    this.$set(this.from.name,''+id+'',this.checkF.join('、'));
                }
                console.log(this.from.value.problems,this.from.name.problems);
            }else if(id=='suqius'){
                if(id && this.checkG.length==0){
                    this.checkG.push(value);
                    this.checkH.push(name);
                }else{
                    if(this.checkG.indexOf(value)<0){
                        this.checkG.push(value);
                        this.checkH.push(name);
                    }else{
                        this.checkG.splice(this.checkG.indexOf(value),1);
                        this.checkH.splice(this.checkH.indexOf(name),1);
                    }
                }

                if(this.checkG.length<=0){
                    this.$set(this.from.value,''+id+'',this.checkG.join(''));
                    this.$set(this.from.name,''+id+'',this.checkH.join(''));
                }else{
                    this.$set(this.from.value,''+id+'',this.checkG.join('|||'));
                    this.$set(this.from.name,''+id+'',this.checkH.join('、'));
                }
                console.log(this.from.value.suqius,this.from.name.suqius);
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
                    for(let i=0;i<this.properties.length;i++){
                        if(this.properties[i].show_type=='text' || this.properties[i].show_type=='select'){
                            this.$set(this.textId,''+this.properties[i].id+'','');
                        }
                    }
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
        tanK(data,id){
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
                    var pro = '';
                    for(let i=0;i<this.properties.length;i++){
                        if(this.properties[i].id==id){
                            pro = this.properties[i];
                        }
                    }
                    this.tkData={'name':data,'data':pro};
                    console.log(this.tkData.data);
                    break;
                default:
                    this.tkData={};
            }

        },
        //关闭弹框按钮
        tanG(){
            if(this.tkData.name=='type' && this.problems==''){
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
                    this.TOUSU_DATA('');
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
                    this.showAlert=false;
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                    setTimeout(this.closeTip,2000);
                }
            }else if(this.tkData.name=='problem'){
                if(this.from.value.problems){
                    this.showAlert=false;
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                    setTimeout(this.closeTip,2000);
                }
            }else if(this.tkData.name=='suqiu'){
                if(this.from.value.suqius){
                    this.showAlert=false;
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                    setTimeout(this.closeTip,2000);
                }
            }else if(this.tkData.name=='propertie'){
                if(this.hc!==''){
                    this.showAlert=false;
                    document.querySelector('body').style.overflow='';
                    this.tk=false;
                }else{
                    this.showAlert=true;
                    this.alertText='确定你妹哦，你都没选';
                    setTimeout(this.closeTip,2000);
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
        this.TOUSU_DATA('');
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
    .tousuInfo{
        font-size: .26rem;
        color: #fd9c33;
        margin:.56rem 1.5rem .42rem 1.5rem;
    }
    .upload_box{
        overflow: hidden;
        width: auto;
        margin-left: .2rem;
        .pic{
            width: 100%;
            height: auto;
            li{
                position: relative;
                width: 1.4rem;
                height: auto;
                float: left;
                margin-top: .5rem;
                margin-right: .4rem;
                img{
                    width: 1.4rem;
                    height: 1.4rem;
                    display: block;
                }
                >i{
                    position: absolute;
                    right: -.2rem;
                    top: -.2rem;
                    width: .4rem;
                    height: .4rem;
                    background: url("../../images/icon_shantupian.png") no-repeat;
                    background-size: 100%;
                }
                 .lk{
                     font-size: .28rem;
                     overflow: hidden;
                     height: .74rem;
                     line-height: .74rem;
                     text-align: center;
                     width: 100%;
                     i{
                         float: left;
                         margin-top: .2rem;
                         margin-left: .05rem;
                         display: block;
                         width: .35rem;
                         height: .35rem;
                         background: url("../../images/icon_tixing_n.png") no-repeat;
                         background-size:.35rem;
                     }
                     .hover{
                         background: url("../../images/icon_tixing_s.png") no-repeat;
                         background-size:.35rem;
                     }
                     span{
                         display: inline-block;
                     }
                 }
            }
        }
    }
    #upload{
        float: left;
        margin-top: .5rem;
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        background: url("../../images/tianjiatupian.png") no-repeat;
        background-size: 100%;
        input{
            width: 100%;
            height: 100%;
            opacity: 0;
            display: block;
        }
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
            .p2{
                width:auto;
                padding-right: .2rem;
                text-align: left;
                float: left;
                display:block;
                line-height: 1.28rem;
                color: #999;
            }
            .lp2{
                float: left;
                width: 5rem;
                display:block;
                height: 100%;
                line-height: 100%;
                font-size: .3rem;
            }
        }
        .p1{
            .sc(.24rem,#999);
            line-height: .84rem;
            height: .64rem;
        }
        .lp1{
            width: 100%;
            .sc(.3rem,#1C2733);
            height: .64rem;
            line-height: .44rem;
            padding-bottom: .2rem;
            float: left;
            margin-top: -1px;
            overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
        }
        .texta{
            float: left;
            width: 100%;
            background: #F6F7F9;
            padding: .2rem 0;
            input{
                float: right;
                width: calc(~'100% - .2rem');
                height: 1.28rem;
                line-height: 1.28rem;
                background: #fff;
                border-bottom: 1px solid rgba(204, 204, 204, 0.5);
                font-size: .3rem;
            }
            textarea{
                width: 100%;
                padding: 0 .2rem;
                margin: .3rem auto;
                height: 2.8rem;
                float: right;
                font-size: .3rem;
                resize: none;
            }
        }
    }
    .type_bg{
        background: none !important;
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
                background: url("../../images/icon_x@2x.png") no-repeat center left .2rem;
                background-size: .37rem .37rem;
            }
            .but{
                float: right;
                text-align: center;
                .wh(1.25rem,1rem);
                line-height:1rem;
                .sc(.32rem,#39C17A);
            }
        }
        .problem,.suqiu,.brand,.propertie{
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
            padding-top:.4rem;
            background: rgba(255,255,255,.95);
            >div{
                width: 100%;
                height: 2rem;
                img{
                    width: .92rem;
                    height: .92rem;
                    display: block;
                    float: left;
                    margin-left: .2rem;
                    margin-right: .3rem;
                }
            }
            p{
                font-size: .32rem;
                font-weight: bold;
            }
            ul{
                overflow: hidden;
                li{
                    font-size: .3rem;
                    margin-right: .3rem;
                    float: left;
                    margin-top: .1rem;
                    padding-right: .25rem;
                    background: url("../../images/icon_next@2x.png") no-repeat center right;
                    background-size: .14rem;
                }
            }
            .hover{
                color: #2dc177;
            }
            .mbl{
                background:#fff;
                -webkit-filter: blur(100px);
                -moz-filter: blur(100px);
                -ms-filter: blur(100px);
                filter: blur(100px);
                position: fixed;
                width: 100%;
                height: 100%;
                left:0;
                top: 0;
                z-index: -1;
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