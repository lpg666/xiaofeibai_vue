<template>
    <div style="background: #F6F7F9; min-height:calc(100vh);">
        <div style="background: #fff;">
            <div class="hear"><router-link to="/member/tousu"></router-link><div class="title">商家满意度调查</div></div>
            <div class="brand">对<span>{{$route.query.brand}}</span>服务评价</div>
            <ul v-if="m==0">
                <li v-for="item,key in 5" @click="pj" :value="key+1"></li>
            </ul>
            <ul v-else>
                <li @click="pj" class="hover" v-for="data,key in m" :value="key+1"></li>
                <li @click="pj" v-for="data,key in (5-m)" :value="key+m+1"></li>
            </ul>
            <p class="p1" v-if="m==0">未评价</p>
            <p class="p2" v-else>{{text}}</p>
            <textarea v-if="m!=0" v-model="cent" placeholder="写点对企业处理结果的意见，帮助企业改进服务"></textarea>
        </div>
        <div v-if="m!=0" class="but" @click="but">提交</div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                m:0,
                text:'',
                cent:'',
                showLoad:false,
                loadType:null,
                loadText:null,
                re:false
            }
        },
        components:{
            loading
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        methods:{
            but(){
                if(this.cent.length<=0){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='写点对企业处理结果的意见';
                    setTimeout(this.close,1500);
                }else if(this.re==false){
                    this.re=true;
                    this.axios.post('/v4/complaint/user_evaluation',{
                        'complaint_id':this.$route.query.id,
                        'content':this.cent,
                        'enterprise_grade':this.m,
                        'sign':this.userInfo.sign
                    })
                        .then(res =>{
                            if(res.data.error){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                                this.re=false;
                            }else{
                                this.showLoad=true;
                                this.loadType='';
                                this.loadText='提交成功';
                                setTimeout(this.close1,1500);
                            }
                        })
                }
            },
            pj(e){
                this.m = e.target.value;
                if(e.target.value == 1){
                    this.text = '一星，很不满意';
                }else if(e.target.value == 2){
                    this.text = '二星，不满意';
                }else if(e.target.value == 3){
                    this.text = '三星，可以接受';
                }else if(e.target.value == 4){
                    this.text = '四星，满意';
                }else if(e.target.value == 5){
                    this.text = '五星，非常满意';
                }
            },
            close(){
                this.showLoad=false;
            },
            close1(){
                this.showLoad=false;
                this.$router.push({path:'/member/tousu'});
            }
        }
    }
</script>

<style lang="less" scoped>
    .but{
        margin: .6rem auto 0 auto;
        border-radius: .1rem;
        width: 5.7rem;
        height: .73rem;
        line-height: .73rem;
        text-align: center;
        background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
        background-image:linear-gradient(to right,#37C078,#5BDC99);
        font-size: .32rem;
        color: #fff;
    }
    textarea{
        border-top: 1px solid rgba(204,204,204,.5);
        width: 100%;
        padding: .5rem .22rem;
        height: 3.2rem;
        resize: none;
        font-size: .28rem;
    }
    .p1{
        margin-top: .4rem;
        font-size: .26rem;
        color: #999;
        text-align: center;
        padding-bottom: .6rem;
    }
    .p2{
        margin-top: .4rem;
        font-size: .26rem;
        text-align: center;
        margin-bottom: .6rem;
    }
    ul{
        margin: 0 auto;
        width: 4.86rem;
        overflow: hidden;
        li{
            margin-right: .44rem;
            float: left;
            width: .62rem;
            height: .6rem;
            background-image: url("../../images/star_n@2x.png");
            background-position: top;
            background-size: 100%;
            background-repeat: no-repeat;
        }
        .hover{
            background-position: bottom;
        }
        li:last-child{
            margin-right: 0;
        }
    }
    .brand{
        font-size: .3rem;
        text-align: center;
        margin: .5rem auto .7rem auto;
        span{
            color: #37C078;
        }
    }
    .hear{
        background: #fff;
        width: 100%;
        border-bottom: 1px solid rgba(204,204,204,.5);
        height: 1rem;
        a{
            float: left;
            width: 1rem;
            height: 1rem;
            background: url("../../images/icon_x@2x.png") no-repeat center left .2rem;
            background-size: .37rem .37rem;
            display: block;
        }
        .title{
            width: calc(~'100% - 2rem');
            text-align: center;
            height: 1rem;
            line-height: 1rem;
            font-size: .34rem;
            color: #37C078;
            float: left;
        }
    }
</style>