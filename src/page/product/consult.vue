<template>
    <div style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">咨询客服</span><div class="head_a" slot="head_a" @click="ajaxDatb">发送</div></head-i>
        <textarea v-model="detail" placeholder="请输入您需要咨询的内容"></textarea>
        <div v-if="tk" class="tank">
            <div class="se_error">
                <p class="ts"><img src="../../images/icon_tishi2@2x.png">提示</p>
                <p class="ts1">您咨询的问题已留言提交给客服人员，<br/>请在个人中心消息栏查看客服回复。</p>
                <div class="error_but" @click="fh">关闭</div>
            </div>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail: '',
                re:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                tk:false
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        created(){

        },
        methods:{
            ajaxDatb(){
                if(this.detail==''){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请填写咨询内容';
                    setTimeout(this.close,1500);
                }else if(this.re==false){
                    this.re=true;
                    this.axios.post('/v4/bulter/consult',{'sign':this.userInfo.sign,'butler_service_id':this.$route.params.id,'content':this.detail})
                        .then(res =>{
                            if(res.data.error){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                                this.re=false;
                            }else{
                                this.tk=true;
                            }
                            console.log(res);
                        })
                        .catch(err =>{

                        })
                }
            },
            fh(){
                this.$router.push({path:'/product/list'})
            },
            close(){
                this.showLoad=false;
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>
    textarea{
        outline: none;
        resize: none;
        border: none medium;
        width: 94%;
        min-height: 2.3rem;
        border-radius: .15rem;
        padding: 3%;
        background: #f7f7f7;
        margin: .5rem auto;
        display: block;
        font-family: "Microsoft YaHei";
    }
    .tank{width: 100%; height: 100%; z-index: 999; background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0;  }
    .se_error{  width: 6rem;  height: 3.6rem;  border-radius: .2rem;  background: #fff;  position: fixed;  left: 50%;  top: 50%;  margin-left: -3rem;  margin-top: -1.8rem;  z-index: 999;  }
    .ts{position: relative;  font-size: .36rem;  color: #333;  line-height: .95rem;  text-align: center;  border-bottom: 1px dashed #dcdcdc;  }
    .ts img{width: .42rem; position: absolute; left: 50%; top: .28rem; margin-left: -.92rem;}
    .ts1{font-size: .3rem; color: #939393; margin: .35rem auto; text-align: center;}
    .error_but{background: #2dc176; margin:0 auto; color: #fff; width: 2.2rem; height: .68rem; line-height: .68rem; text-align: center; border-radius: .1rem; font-size: .32rem;}
</style>