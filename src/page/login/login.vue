<template>
    <div>
        <head-i>
            <span class="head_title" slot="title_text">登录</span>
            <router-link to="" class="head_a" slot="head_a">注册</router-link>
        </head-i>
        <form>
            <div class="inp" style="margin-top: .6rem;"><img src="../../images/default_portrait.png"><input name="mobile" type="text" v-model="mobile" placeholder="手机号码" maxlength="11"></div>
            <span class="xian"></span>
            <div class="inp"><img src="../../images/default_portrait.png"><input name="password" type="password" v-model="password" placeholder="密码"></div>
            <div class="but" :class="butClass" @click="login">登录</div>
        </form>
        <alert-box v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-box>
    </div>
</template>

<script>
import alertBox from '../../components/common/alertBox'
import headI from '../../components/header/head'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            mobile:'',
            password:'',
            ajaxRe:false,
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
        }
    },
    components:{
        headI,
        alertBox
    },
    computed:{
        ...mapState([
            'autoRoute'
        ]),
        butClass(){
            if(this.mobile.length>=11 && this.password.length>=6){
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
        login(){
            if(this.mobile.length>=11 && this.password.length>=6){
                if(!(/^1[34578][0-9]{9}$/.test(this.mobile))){
                    console.log('请填写正确的手机号码');
                }else if(this.ajaxRe == false){
                    this.ajaxRe = true;
                    this.showAlert=true;
                    this.alertText='加载中...';
                    this.axios.post('/v4/auth/login',{
                        mobile:this.mobile,
                        password:this.password,
                        source_type:0
                    })
                    .then(res => {
                        if(res.data.error==1){
                            this.showAlert=true;
                            this.alertText=res.data.msg;
                            setTimeout(this.closeTip,2000);
                            this.ajaxRe = false;
                        }else{
                            this.RECORD_USERINFO(res.data.data);
                            this.showAlert=true;
                            this.alertText=res.data.msg;
                            setTimeout(this.closeTip,2000);
                            if(this.$route.query){
                                this.$router.replace(this.autoRoute);
                            }else{
                                this.$router.go(-1);
                            }

                        }

                    })
                }
            }
        },
        closeTip(){
            this.showAlert = false;
        }
    },
    mounted() {
        console.log(this.autoRoute);
    }

}
</script>

<style lang="less">
    form{
        padding-top: 1rem;
        width: auto;
        margin: 0 .45rem;
        .inp{
            width: 100%;
            overflow: hidden;
            height: .85rem;
            img{
                width: .26rem;
                height: .38rem;
                float: left;
                margin-top: .235rem;
            }
            input{
                width: calc(~'100% - .5rem');
                float: right;
                height: .85rem;
                line-height: .85rem;
                font-size: .32rem;
            }
        }
        .xian{
            width: calc(~'100% - .3rem');
            float: right;
            border-bottom: 1px solid #ccc;
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
        .butR{
            background: #37C078;
        }
        .butF{
            background: #aaaaaa;
        }
    }
</style>