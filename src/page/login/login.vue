<template>
    <div>
        <head-i>
            <span class="head_title" slot="title_text">登录</span>
            <router-link to="/register" class="head_a" slot="head_a">注册</router-link>
        </head-i>
        <form>
            <div class="inp" style="margin-top: .6rem;"><img src="../../images/icon_shoujihao@2x.png"><input name="mobile" type="text" v-model="mobile" placeholder="手机号码" maxlength="11"></div>
            <span class="xian"></span>
            <div class="inp"><img src="../../images/icon_mima@2x.png"><input name="password" type="password" v-model="password" placeholder="密码"></div>
            <div class="but" :class="butClass" @click="login">登录</div>
            <div class="al">
                <router-link class="all" to="/login1">短信登录</router-link>
                <router-link class="alr" to="/resetPassword">忘记密码?</router-link>
            </div>
        </form>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
import alertBox from '../../components/common/alertBox'
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
        alertBox,
        loading
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
            'RECORD_USERINFO',
            'EDIT_INFO'
        ]),
        login(){
            if(this.mobile.length>=11 && this.password.length>=6){
                if(!(/^1[34578][0-9]{9}$/.test(this.mobile))){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请填写正确的手机号码';
                    setTimeout(this.close,1000);
                    console.log('请填写正确的手机号码');
                }else if(this.ajaxRe == false){
                    this.ajaxRe = true;
                    this.showLoad=true;
                    this.loadType='load';
                    this.loadText='加载中';
                    this.axios.post('/v4/auth/login',{
                        mobile:this.mobile,
                        password:this.password,
                        source_type:0
                    })
                    .then(res => {
                        if(res.data.error==1){
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText=res.data.msg;
                            setTimeout(this.close,1000);
                            this.ajaxRe = false;
                        }else{
                            this.RECORD_USERINFO(res.data.data);
                            this.EDIT_INFO(res.data.data);
                            this.showLoad=true;
                            this.loadType='';
                            this.loadText=res.data.msg;
                            setTimeout(this.close,1000);
                            if(this.$route.query.id){
                                console.log(this.autoRoute);
                                this.$router.replace(this.autoRoute);
                            }else{
                                this.$router.push({path:'/member'});
                            }
                        }

                    })
                }
            }
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
        }
        .xian{
            width: calc(~'100% - .5rem');
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