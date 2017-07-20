<template>
    <div style="padding-top: 1rem; min-height: calc(100vh); background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text">产品详情页</span></head-i>
        <div class="list_box">
            <div class="list1">
                <div class="pic"></div>
                <div class="text">
                    <div class="title">产品类型</div>
                    <div class="zl1">
                        <div class="sta1">保修期内已过保</div>
                        <router-link to="" class="yb1">购买延保</router-link>
                        <div class="data1">过保时间</div>
                    </div>
                </div>
                <div class="bz1">
                    <div class="bz1_box">
                        xxxxx
                    </div>
                </div>
            </div>
            <div class="">
                <ul class="deta_zl">
                    <li><div class="pz">12121</div><span>:</span><span class="xz">1212121</span></li>
                </ul>
                <div class="pics">
                    <div class="box">
                        <div class="pics_box">
                            <img src="">
                        </div>
                        <div class="pic_bz">1212121</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="deta_f">
            <a @click="tousu" class="xian"><span><img src="../../images/icon_woyaotousu@2x.png">我要投诉</span></a>
            <router-link :to="'/product/consult/'+this.$route.params.id"><span><img src="../../images/icon_lianxikefu@2x.png">联系客服</span></router-link>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
        <alert-ios v-if="showAlertIos" :showHide="showAlertIos" @closeIos="closeIos" @parent="parent" @iosQd="iosQd" :alertIosText="alertIosText"></alert-ios>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'
    import alertIos from '../../components/common/alertIos'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail: '',
                re:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                showAlertIos:false,
                alertIosText:'您还没有填写真实姓名或者所在地区,点击“设置”前去补全信息'
            }
        },
        components:{
            headI,
            loading,
            alertIos
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
            },
            fh(){
                this.$router.push({path:'/product/list'})
            },
            tousu(){
                console.log(this.userInfo.real_name,this.userInfo.address);
                if(this.userInfo.real_name=='' || this.userInfo.address==''){
                    this.showAlertIos = true;
                }
            },
            iosQd(){
                this.$router.push({path:'/member/edit'});
            },
            parent(){
                this.showAlertIos = false;
            },
            closeIos(){
                this.showAlertIos = false;
            },
            close(){
                this.showLoad=false;
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .deta_f{
        width: 100%;
        height: .98rem;
        background: #2dc176;
        position: fixed;
        left: 0;
        bottom: 0;
        font-size: .36rem;
        color: #fff;
        .xian{
            border-right: 1px solid #fff;
            margin-left: -1px;
        }
        a{
            width: 50%;
            height: .98rem;
            color: #fff;
            text-align: center;
            float: left;
            display: table;
            span{
                display: table-cell;
                vertical-align: middle;
                text-indent: -.7rem;
                color: #fff;
            }
            img{
                width: .44rem;
                height: .44rem;
                display: inline-block;
                float: left;
                margin-top: .025rem;
                margin-left: .9rem;
            }
        }
    }
    .pics{
        width: auto;
        margin: 0 .2rem;
        overflow: hidden;
        .box{
            width: 1.5rem;
            height: auto;
            float: left;
            margin-right: .5rem;
            .pics_box{
                width: 1.5rem;
                height: 1.55rem;
                overflow: hidden;
            }
            .pic_bz{
                width: 1.45rem;
                margin-left: 1px;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                margin-top: .18rem;
                margin-bottom: .3rem;
                box-shadow: 0 1px 1px rgba(0,0,0,.5);
                font-size: .28rem;
                text-align: center;
            }
        }
    }
    .deta_zl{
        font-size: .3rem;
        margin-left: .3rem;
        li{
            color: #808080;
            width: 100%;
            margin-bottom: .1rem;
            div{
                width: 1.3rem;
                height: .42rem;
                line-height: .42rem;
                display: inline-block;
                vertical-align: top;
            }
            .xz{
                font-size: .28rem;
                color: #808080;
                margin-left: .3rem;
            }
        }
    }
    .list_box{
        width: 100%;
        height: auto;
        background: #fff;
        .list1{
            margin: 0 .2rem;
            padding-top: .4rem;
            overflow: hidden;
            .bz1{
                float: left;
                width: 100%;
                .bz1_box{
                    width: 1.5rem;
                    margin-left: .1rem;
                    height: .5rem;
                    line-height: .5rem;
                    border-radius: .1rem;
                    margin-top: .18rem;
                    margin-bottom: .3rem;
                    box-shadow: 0 1px 1px rgba(0,0,0,.5);
                    font-size: .28rem;
                    text-align: center;
                }
            }
            .pic{
                width: 1.5rem;
                height: 1.55rem;
                margin-left: .1rem;
                margin-right: .2rem;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                float: left;
            }
            .text{
                width: auto;
                margin-left: 1.85rem;
                .title{
                    font-size: .32rem;
                    line-height: .32rem;
                }
                .zl1{
                    height: auto;
                    width: 100%;
                    overflow: hidden;
                    padding-top: .05rem;
                    .data1{
                        line-height: .32rem;
                        font-size: .28rem;
                        color: #808080;
                        float: left;
                        width: 100%;
                        margin-top: .05rem;
                    }
                    .sta1{
                        float: left;
                        line-height: .58rem;
                        display: inline-block;
                        color: #808080;
                        font-size: .28rem;
                        padding-left: .35rem;
                        background: url("../../images/icon_baoxiuqinei@2x.png") no-repeat left center;
                        background-size: .27rem;
                    }
                    .sta2{
                        float: left;
                        line-height: .58rem;
                        display: inline-block;
                        color: #808080;
                        font-size: .28rem;
                        padding-left: .35rem;
                        background: url("../../images/icon_yiguobao@2x.png") no-repeat left center;
                        background-size: .27rem;
                    }
                    .yb{
                        float: right;
                        width: 1.25rem;
                        height: .52rem;
                        line-height: .52rem;
                        display: inline-block;
                        border-radius: .1rem;
                        color: #fff;
                        font-size: .26rem;
                        text-align: center;
                        background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
                        background-image:linear-gradient(to right,#37C078,#5BDC99);
                    }
                    .yb1{
                        float: right;
                        width: 1.25rem;
                        height: .52rem;
                        line-height: .52rem;
                        display: inline-block;
                        border-radius: .1rem;
                        color: #a9a9a9;
                        font-size: .26rem;
                        text-align: center;
                        border: 1px solid #a9a9a9;
                    }
                }
            }
        }
    }
</style>