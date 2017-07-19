    <template>
    <div style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">我的产品列表</span><router-link class="head_a" slot="head_a" to="/product"></router-link></head-i>
        <div v-if="detail=='a'" class="wu">您暂时没有录入数据哦</div>
        <div v-else class="box">
            <router-link :to="'/product/detail/'+data.id" class="list" v-for="data in detail" :key="data">
                <div class="pic" v-if="data.pic.length>0" :style="{backgroundImage:'url('+data.pic+')'}"></div>
                <div class="pic" v-else style="background:#f6f7f9;"></div>
                <div class="text">
                    <div class="title">{{data.brand.name}} {{data.subtype.name}}<!--<span v-for="item in data.property" v-if="item.name=='产品类型'">{{item.pivot.property_value}}--></span></div>
                    <div class="zl">
                        <span class="data">购于{{data.consume_time}}</span>
                        <div class="sta1" v-if="data.is_over==0">保修期内</div>
                        <div class="sta2" v-else>已过保</div>
                        <!--<router-link to="" class="yb">购买延保</router-link>-->
                        <router-link to="" class="yb1">购买延保</router-link>
                    </div>
                    <div class="list_but">
                        <router-link :to="'/product/consult/'+data.id" class="list_but_r">联系客服</router-link>
                        <router-link to="" class="list_but_l">我要投诉</router-link>
                        <div class="dun"></div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                detail:''
            }
        },
        components:{
            headI
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        created(){
            this.ajaxData();
        },
        methods:{
            ajaxData(){
                this.showLoading = true;
                this.axios.get('/v4/bulter/content_list?sign='+this.userInfo.sign)
                    .then(res =>{
                        if(res.data.error){
                            this.detail='a';
                        }else{
                            this.detail= res.data.data;
                        }
                        console.log(res);
                    })
                    .catch(err =>{

                    })
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .list{
        display: block;
        margin: 0 .2rem;
        padding-top: .4rem;
        border-bottom: 1px dashed #dcdcdc;
        overflow: hidden;
        .pic{
            width: 1.75rem;
            height: 1.55rem;
            margin-right: .2rem;
            overflow: hidden;
            float: left;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .text{
            width: auto;
            margin-left: 2rem;
            .title{
                font-size: .32rem;
                line-height: .32rem;
            }
            .zl{
                height: .58rem;
                width: 100%;
                .data{
                    float: left;
                    line-height: .58rem;
                    font-size: .26rem;
                    color: #808080;
                }
                .sta1{
                    float: left;
                    margin-left: .25rem;
                    line-height: .58rem;
                    display: inline-block;
                    color: #808080;
                    font-size: .26rem;
                    padding-left: .35rem;
                    background: url(../../images/icon_baoxiuqinei@2x.png) no-repeat left center;
                    background-size: .27rem;
                }
                .sta2{
                    float: left;
                    margin-left: .25rem;
                    line-height: .58rem;
                    display: inline-block;
                    color: #808080;
                    font-size: .26rem;
                    padding-left: .35rem;
                    background: url(../../images/icon_yiguobao@2x.png) no-repeat left center;
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
            .list_but{
                margin: .32rem 0;
                overflow: hidden;
                .list_but_r{
                    margin-left: .3rem;
                }
                a{
                    font-size: .26rem;
                    color: #fff;
                    background: #ff9d1f;
                    width: 1.3rem;
                    height: .56rem;
                    line-height: .56rem;
                    text-align: center;
                    border-radius: .1rem;
                    display: block;
                    float: right;
                }
                .dun{
                    float: right;
                    margin-right: .1rem;
                    width: .3rem;
                    height: .56rem;
                    background: url(../../images/icon_tishi3@2x.png) no-repeat center;
                    background-size: .3rem;
                }
            }
        }
    }
    .head_a{
        background: url("../../images/icon_addblack@2x.png") no-repeat center;
        background-size: .33rem;
    }
    .loading{
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #333;
        text-align: center;
        background: rgba(153,153,153,.2);
    }
</style>