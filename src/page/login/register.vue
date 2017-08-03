<template>
    <div>
        <head-i>
            <span class="head_title" slot="title_text">注册</span>
        </head-i>
        <form>
            <div class="inp" style="margin-top: .6rem;"><img src="../../images/icon_shoujihao@2x.png"><input name="mobile" type="text" v-model.trim="mobile" placeholder="输入手机号码" maxlength="11"></div>
            <span class="xian"></span>
            <div class="inp" style="position: relative;"><img src="../../images/icon_yanzhengma@2x.png"><input name="captcha" type="text" v-model.trim="captcha" placeholder="输入验证码" maxlength="4"><div class="code" @click="code">{{codeText}}</div></div>
            <span class="xian"></span>
            <div class="inp"><img src="../../images/icon_mima@2x.png"><input name="password" type="password" v-model.trim="password" placeholder="设置密码"></div>
            <span class="xian"></span>
            <div class="inp"><img src="../../images/icon_zaicishuru@2x.png"><input name="resetPassword" type="password" v-model.trim="resetPassword" placeholder="再次输入密码" maxlength="11"></div>
            <div class="but" :class="butClass" @click="register">注册</div>
        </form>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{
                showLoad:false,
                loadType:null,
                loadText:null,
                mobile:'',
                password:'',
                resetPassword:'',
                captcha:'',
                ajaxRe:false,
                codeText:'获取验证码',
                s:60
            }
        },
        watch:{
            mobile(e){
                if(e.length>=11){
                    this.mobile=e;
                }
            },
            password(e){
                if(e.length>=6){
                    this.password=e;
                }
            },
            resetPassword(e){
                if(e.length>=6){
                    this.resetPassword=e;
                }
            },
            captcha(e){
                if(e.length>=4){
                    this.captcha=e;
                }
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'autoRoute'
            ]),
            butClass(){
                if(this.mobile.length>=11 && this.captcha.length>=4 && this.resetPassword.length>=6){
                    return 'butR';
                }else{
                    return 'butF';
                }
            }
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            register(){
                if(this.mobile.length>=11 && this.captcha.length>=4 && this.password.length>=6 && this.resetPassword.length>=6){
                    if(!(/^1[34578][0-9]{9}$/.test(this.mobile))){
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='请填写正确的手机号码';
                        setTimeout(this.close,1500);
                        console.log('请填写正确的手机号码');
                    }else if(isNaN(this.captcha)){
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='请填写正确的验证码';
                        setTimeout(this.close,1500);
                    }else if(this.password !== this.resetPassword){
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='两次密码设置不一致';
                        setTimeout(this.close,1500);
                    }else if(this.ajaxRe == false){
                        this.ajaxRe = true;
                        this.showLoad=true;
                        this.loadType='load';
                        this.loadText='加载中';
                        this.axios.post('/v4/auth/register',{
                            mobile:this.mobile,
                            password:this.password,
                            captcha:this.captcha,
                            source_type:0
                        })
                        .then(res => {
                            if(res.data.error==1){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                                this.ajaxRe = false;
                            }else{
                                this.showLoad=true;
                                this.loadType='';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                                if(this.$route.query.id){
                                    this.$router.replace(this.autoRoute);
                                }else{
                                    this.$router.push({path:'/member'});
                                }
                            }

                        })
                    }
                }
            },
            code(){
                if(this.mobile.length<11 || !(/^1[34578][0-9]{9}$/.test(this.mobile))){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请填写正确的手机号码';
                    setTimeout(this.close,1500);
                }else if(this.ajaxRe == false){
                    this.ajaxRe = true;
                    this.showLoad=true;
                    this.loadType='load';
                    this.loadText='正在发送';
                    this.axios.post('/v4/auth/send_sms',{
                        'mobile':this.mobile,
                        'register':3
                    })
                        .then(res =>{
                            if(res.data.error){
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                this.ajaxRe = false;
                            }else{
                                this.loadType='';
                                this.loadText='发送成功';
                                this.settime();
                            }
                            setTimeout(this.close,1500);
                            console.log(res.data);
                        })
                }
            },
            settime() {
                if(this.s==0){
                    this.codeText='获取验证码';
                    this.ajaxRe =false;
                    this.s=60;
                    return false;
                }else{
                    this.codeText=this.s+'s';
                    this.s--;
                }
                setTimeout(this.settime,1500);
            },
            close(){
                this.showLoad = false;
            }
        },
        mounted() {
            console.log(this.autoRoute);
        }

    }
</script>

<style lang="less" scoped>
    form{
        padding-top: 1rem;
        width: auto;
        margin: 0 .45rem;
    .inp{
        width: 100%;
        overflow: hidden;
        height: .85rem;
    img{
        width: .3rem;
        height: auto;
        float: left;
        margin-top: .25rem;
    }
    input{
        width: calc(~'100% - .5rem');
        float: right;
        height: .85rem;
        font-size: .32rem;
    }
    .code{
        width: 2rem;
        height: .68rem;
        line-height: .68rem;
        border-radius: .1rem;
        position:absolute;
        right: 0;
        top: .085rem;
        background: #36c078;
        color: #fff;
        font-size: .3rem;
        text-align: center;
    }
    }
    .xian{
        width: calc(~'100% - .5rem');
        float: right;
        border-bottom: 1px solid #ccc;
        margin-bottom: .2rem;
    }
    .but{
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        border-radius: .1rem;
        color: #fff;
        font-size: .32rem;
        margin-top: .2rem;
    }
    .al{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: .4rem;
    a{
        font-size: .28rem;
        display: inline-block;
    }
    .all{
        float: left;
        margin-left: .15rem;
    }
    .alr{
        float: right;
        margin-right: .15rem;
    }
    }
    .butR{
        background: #37C078;
    }
    .butF{
        background: #aaaaaa;
    }
    }
</style>