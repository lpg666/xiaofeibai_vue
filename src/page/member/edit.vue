<template>
    <div style="padding-top: 1rem; background: #F6F7F9; height: calc(100vh);">
        <header id="headI"><div id="head_go" @click="$router.push({path:'/member'})"></div><span class="head_title" slot="title_text">编辑资料</span><div class="head_a" slot="head_a" @click="butData">保存</div></header>
        <div class="box tx">头像<img :src="editInfo.avatar!=''?editInfo.avatar:''"></div>
        <div class="box" @click="gq('呢称','name')">呢称<span class="rt" v-if="editInfo.name!=''">{{editInfo.name}}</span><span v-else class="rt">请填写呢称</span></div>
        <div class="box mt">手机号<span class="rt">{{editInfo.mobile}}</span></div>
        <div class="box" @click="gq('真实姓名','real_name')">真实姓名<span class="rt" v-if="editInfo.real_name!=''">{{editInfo.real_name}}</span><span v-else style="color: #FEB535;" class="rt">发投诉请补全真实姓名</span></div>
        <div class="box" @click="dz(editInfo.province,editInfo.city)">地区<span class="rt" v-if="editInfo.address!=''">{{editInfo.address}}</span><span v-else style="color: #FEB535;" class="rt">发投诉请选择地区</span></div>
        <div class="box mt" @click="ra('性别','sex')">性别<span class="rt" v-if="editInfo.sex!=''">{{editInfo.sex}}</span><span v-else class="rt">请选择性别</span></div>
        <div class="box" @click="gq('身份证号','idcard')">身份证号<span class="rt" v-if="editInfo.idcard!=''">{{editInfo.idcard}}</span><span v-else class="rt">请填写身份证号</span></div>
        <div class="box" @click="gq('邮箱','email')">邮箱<span class="rt" v-if="editInfo.email!=''">{{editInfo.email}}</span><span v-else class="rt">请填写邮箱</span></div>
        <div v-if="tk" class="tk">
            <div class="tb">
                <div class="title">
                    <div class="qx" @click="qx">取消</div>
                    <div class="but" @click="tj">确定</div>
                </div>
                <div class="dz_box">
                    <p>省份</p>
                    <ul class="ul1">
                        <li v-for="data in dzData" :class="provincecode==data.code?'hover':''" @click="dx('province',$event)" :key="data" :value="data.code">{{data.name}}</li>
                    </ul>
                    <p v-if="provincecode">城市</p>
                    <ul class="ul2" v-for="item in dzData" v-if="item.code==provincecode">
                        <li v-for="s in item.citys" :class="citys==s.code?'hover':''" @click="dx('city',$event)" :value="s.code">{{s.name}}</li>
                    </ul>
                </div>
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
                tk:false,
                dzData:'',
                provincecode:'',
                citys:'',
                add1:'',
                add2:'',
                showLoad:false,
                loadType:null,
                loadText:null,

            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'editInfo'
            ])
        },
        methods:{
            ...mapMutations([
                'EDIT_INFO',
                'RECORD_USERINFO'
            ]),
            butData(){
                this.axios.post('/v4/member/update_info',{
                    'name':this.editInfo.name,
                    'real_name':this.editInfo.real_name,
                    'province':this.editInfo.province,
                    'city':this.editInfo.city,
                    'address':this.editInfo.address,
                    'idcard':this.editInfo.idcard,
                    'sex':this.editInfo.sex,
                    'email':this.editInfo.email,
                    'sign':this.editInfo.sign,
                })
                    .then(res =>{
                        if(res.data.error){
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText=res.data.msg;
                            setTimeout(this.close,1500);
                        }else{
                            this.showLoad=true;
                            this.loadType='';
                            this.loadText=res.data.msg;
                            this.RECORD_USERINFO(this.editInfo);
                            setTimeout(this.close,1500);
                        }
                        console.log(res.data);
                    })
                    .catch(err =>{

                    })
            },
            tj(){
                this.$set(this.editInfo,'province',this.provincecode);
                this.$set(this.editInfo,'city',this.citys);
                this.$set(this.editInfo,'address',this.add1+this.add2);
                this.EDIT_INFO(this.editInfo);
                this.tk=false;
            },
            dx(name,e){
                if(name=='province'){
                    this.provincecode=e.target.value;
                    this.add1=e.target.innerHTML;
                }else{
                    this.citys=e.target.value;
                    this.add2=e.target.innerHTML;
                }
            },
            gq(title,value){
                this.$router.push({path:'/member/from?title='+title+'&value='+value});
            },
            ra(title,value){
                this.$router.push({path:'/member/from?title='+title+'&value='+value+'&ra=1'});
            },
            dz(province,city){
                this.tk=true;
                this.provincecode=province;
                this.citys=city;
            },
            qx(){
                this.tk=false;
            },
            ajaxDz(){
                this.axios.get('/v4/complaint/region')
                    .then(res =>{
                        this.dzData=res.data.data;
                    })
                    .catch(err =>{

                    })
            },
            close(){
                this.showLoad = false;
            }
        },
        mounted() {
            this.ajaxDz();
            console.log(this.editInfo);
        }
    }
</script>

<style lang="less" scoped>
    .tk{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: 9999;
        .dz_box{
            height: 6.12rem;
            overflow-y: scroll;
            p{
                font-size: .32rem;
                text-indent: .2rem;
                margin-bottom: .2rem;
            }
            .ul1{
                margin-bottom: .2rem;
                margin-left: .2rem;
                margin-right: .2rem;
                overflow: hidden;
                li{
                    font-size: .28rem;
                    float: left;
                    width: 1.18rem;
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                }
                .hover{
                    border-radius: .1rem;
                    background: #2dc177;
                    color: #fff;
                }
            }
            .ul2{
                margin-left: .2rem;
                margin-right: .2rem;
                overflow: hidden;
                li{
                    font-size: .28rem;
                    float: left;
                    width: auto;
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                    margin-right: .3rem;
                    padding: 0 .15rem;
                }
                .hover{
                    border-radius: .1rem;
                    background: #2dc177;
                    color: #fff;
                }
            }
        }
        .tb{
            width: 100%;
            height: 7rem;
            background: #fff;
            position: fixed;
            left: 0;
            bottom: 0;
        }
        .title{
            width: 100%;
            height: .78rem;
            font-size: .32rem;
            .qx{
                float: left;
                height: .78rem;
                line-height: .78rem;
                margin-left: .2rem;
                color: #8c8c8c;
            }
            .but{
                float: right;
                height: .78rem;
                line-height: .78rem;
                margin-right: .2rem;
                color: #333333;
            }
        }
    }
    .box{
        width: 100%;
        border-bottom: 1px solid rgba(204,204,204,.5);
        background:#fff url("../../images/jt_hui.png") no-repeat right .2rem center;
        background-size:.3rem;
        line-height: 1rem;
        text-indent: .3rem;
        overflow: hidden;
        font-size: .3rem;
        img{
            width: 1.35rem;
            height: 1.35rem;
            border-radius: 100%;
            overflow: hidden;
            margin: .2rem .9rem .2rem 0;
            float: right;
        }
        .rt{
            font-size: .26rem;
            float:right;
            margin-right: .9rem;
        }
    }
    .tx{
        line-height: 1.75rem;
    }
    .mt{
        margin-top: .2rem;
    }
    #headI{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #cccccc;
        background: #fff;
        #head_go{
            float: left;
            width: 1rem;
            height: 1rem;
            background: url("../../images/head_jt.png") no-repeat left .1rem center;
            background-size: .4rem;
        }
        span.head_title{
            float: left;
            width: calc(~'100% - 2rem');
            text-align: center;
            display: block;
            height: 1rem;
            line-height: 1rem;
            font-size: .34rem;
            color: #37C078;
        }
        .head_a{
            float: right;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            color: #37C078;
            font-size: .3rem;
            text-align: center;
        }

    }
</style>