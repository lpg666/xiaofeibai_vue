    <template>
    <div style="padding-top: 1rem; background: #3f7ee8; padding-bottom: 1px;">
        <head-i><span class="head_title" slot="title_text">我的管家介绍</span><router-link class="head_a" slot="head_a" to="/product"></router-link></head-i>

        <img class="info_tu1" src="../../images/product_info.png">
        <div class="info_box">
            <p class="p1">您需要做的</p>
            <p class="p2">自行录入您所购买使用的商品基本信息，建立商品档案</p>
        </div>
        <div class="info_box1">
            <p class="p1">我们提供的</p>
            <ul>
                <li>• 使用和保养常识</li>
                <li>• 三包期提醒</li>
                <li>• 同类产品警示</li>
                <li>• 延保服务</li>
                <li>• 直接对接企业网上客服中心一键售后咨询，一键投诉跟进</li>
                <li>• 您家附近维修网点查询比较</li>
                <li>• 优质产品推荐和试用申请</li>
            </ul>
        </div>
        <div class="info_box2">消费保会保证您的个人隐私信息安全，请放心填写。</div>
        <div class="info_box3">我们会一直不断的完善和改进我们能为您做的。</div>
        <router-link to="/product" class="info_but">去录入产品</router-link>

        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                showLoad:false,
                loadType:null,
                loadText:null,
                load:'正在加载更多数据...',
            }
        },
        components:{
            headI
        },
        computed:{

        },
        created(){
            this.ajaxData();
        },
        methods:{
            ajaxData(){

            },
            menu() {

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
    .info_tu1{width: 6.15rem; height: auto; margin: .4rem auto .3rem auto; display: block;}
    .info_box{width: 6.2rem; height: 1.5rem; margin: 0 auto; font-size: .24rem; color: #fff; text-align: center; background: url("../../images/product_info_box1.png") no-repeat center; background-size: 100%;}
    .info_box .p1{ font-size: .3rem; font-weight: bold; padding: .32rem 0 .15rem 0;}
    .info_box1{width: 6.15rem; height: 4.45rem; color: #fff; margin: -.2rem auto 0 auto; background: url("../../images/product_info_box2.png") no-repeat center; background-size: 100%;}
    .info_box1 .p1{font-size: .3rem; font-weight: bold; padding: .76rem 0 .15rem 0; text-align: center;}
    .info_box1 ul{padding: 0 .24rem;}
    .info_box1 ul li{ font-size: .24rem; color: #fff; line-height: .36rem; letter-spacing:1px;}
    .info_box2{color:#b9d3fe; font-size: .24rem; padding: .35rem 0; text-align: center;}
    .info_box3{width: 5.57rem; height: .43rem; line-height: .38rem; text-indent: .15rem; font-size: .24rem; color: #fff; text-align: center; margin: 0 auto; background: url("../../images/product_info_box3.png") no-repeat center; background-size: 100%;}
    .info_but{ width: 2.9rem; height: .8rem; display: block; margin: .4rem auto; box-shadow: 0 3px 2px #1c4ed8; line-height: .8rem; text-align: center; color: #fff; border-radius: .1rem; background: #209be9; font-size: .3rem;}
    .info_but:active{ box-shadow: 0 -1px 1px #1c4ed8;}
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