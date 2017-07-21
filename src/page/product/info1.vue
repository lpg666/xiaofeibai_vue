    <template>
    <div style=" padding-bottom: 1px;">
        <header id="headI">
            <span class="head_title" slot="title_text">服务管家</span>
        </header>
        <div class="new">
            <router-link id="but" to="/product"></router-link>
            <img src="../../images/Butler_service_bg_5@2x.png">
        </div>
        <router-link to="/tousu/create" id="ts_btn"><span>一键<br/>投诉</span></router-link>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
        <tar></tar>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import tar from '../../components/tar/tar'

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
            headI,
            tar
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
    .new{
        position: relative;
        width: 100%;
        img{
            width: 100%;
            display: block;
        }
        #but{
            width: 3rem;
            height: .9rem;
            position: absolute;
            left: 50%;
            margin-left: -1.5rem;
            top: 9.2rem;
        }
    }
    #ts_btn{
        margin: 0;
        display: table;
        position: fixed;
        right: .2rem;
        bottom: 1.32rem;
        background: url("../../images/FAB@2x.png") no-repeat center;
        background-size: 100%;
        z-index: 999;
        width: 1.22rem;
        height: 1.22rem;
    span{
        text-align: center;
        font-size: .24rem;
        color: #fff;
        vertical-align: middle;
        display: table-cell;
    }
    }

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
    #headI{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 1rem;
    #head_go{
        float: left;
        width: 1rem;
        height: 1rem;
        background: url("../../images/head_jt.png") no-repeat left .1rem center;
        background-size: .4rem;
    }
    span.head_title{
        width: calc(~'100% - 2rem');
        text-align: center;
        display: block;
        height: 1rem;
        line-height: 1rem;
        font-size: .34rem;
        color: #fff;
        margin: 0 auto;
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