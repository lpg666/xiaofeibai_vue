<template>
    <div style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <div class="dz">
            <div class="title">今日当值</div>
            <div class="box">
                <router-link to="" class="box_top">律师<span>查看全部</span></router-link>
                <div class="box_info">
                    <img src="">
                    <div class="box_x">
                        <p class="name">杨河</p>
                        <p class="dw">广东格林律师事务所</p>
                        <p class="dt">3分钟前回复了Kelly</p>
                        <router-link to="">向Ta咨询</router-link>
                    </div>
                </div>
            </div>
            <div class="box">
                <router-link to="" class="box_top">记者<span>查看全部</span></router-link>
                <div class="box_info" style="border-bottom: none;">
                    <img src="">
                    <div class="box_x">
                        <p class="name">媛媛</p>
                        <p class="dw">媒体志愿者</p>
                        <p class="dt">3分钟前回复了Kelly</p>
                        <router-link to="">向Ta爆料</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="js">
            <router-link to="/article" class="title">消费警示<span>实用消费警示，远离消费陷阱</span></router-link>
            <router-link to="/article/detail/666" class="box">
                <div class="box_top">警惕网购新警惕网购新骗局，对到付包裹要先核查或拒收。</div>
                <ul class="box_pic">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </router-link>
        </div>
        <div class="tuij">
            <router-link to="" class="title">产品推荐<span>消费电子行业最新产品测评</span></router-link>
            <router-link to="" class="box">
                <div class="box_top">平民价的高级享受 JBL CM102高保真有源监听音箱体验评测</div>
                <ul class="box_pic">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </router-link>
        </div>
        <div class="tongj">
            <router-link to="" class="title">行业统计<span>消各行业投诉数据</span></router-link>
            <router-link to="" class="box">
                <div class="box_pic"></div>
                <div class="box_top">2017年第一季度消费舆情分析报告分析报告</div>
            </router-link>
        </div>
        <tar></tar>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import tar from '../../components/tar/tar'

    export default {
        data(){
            return {}
        },
        components:{
            headTop,
            tar
        }
    }
</script>

<style lang="less" scoped>
    .dz{
        background: #fff;
        margin-bottom: .2rem;
        width: 100%;
        .title{
            font-size: .34rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            width: auto;
            margin-left: .2rem;
            height: 1rem;
            line-height: 1rem;
            font-weight: bold;
        }
        .box{
            margin-left: .2rem;
            width:auto;
            .box_top{
                display: block;
                width: 100%;
                font-size: .32rem;
                font-weight: bold;
                background: url("../../images/list_jt.png") no-repeat right .2rem center;
                background-size:.34rem;
                height: .9rem;
                line-height: .9rem;
                span{
                    font-size: .26rem;
                    float: right;
                    margin-right: .7rem;
                }
            }
            .box_info{
                width: 100%;
                padding-bottom: .35rem;
                border-bottom: 1px solid rgba(204,204,204,.5);
                img{
                    width: 1.9rem;
                    height:2.4rem;
                    float: left;
                }
                .box_x{
                    width: auto;
                    margin-left: 2.8rem;
                    p{ margin-bottom: .1rem}
                    .name{  font-size: .32rem; font-weight: bold;}
                    .dw{  font-size: .28rem;  }
                    .dt{  font-size: .28rem; color: #6b6b6b; }
                    a{ width: 1.6rem; height: .6rem; margin-top: .4rem; line-height: .6rem; text-align: center; border-radius: .1rem; font-size: .3rem; color: #fff; display: block; background: linear-gradient(to right, #37C078, #5BDC99)}
                }
            }
        }
    }
    .js,.tuij,.tongj{
        background: #fff;
        margin-bottom: .2rem;
        width: 100%;
        .title{
            width: auto;
            margin-left: .2rem;
            height: 1rem;
            display: block;
            line-height: 1rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            background: url("../../images/list_jt.png") no-repeat right .2rem center;
            background-size:.34rem;
            font-size: .34rem;
            font-weight: bold;
            span{
                font-size: .26rem;
                float: right;
                margin-right: .7rem;
            }
        }
        .box{
            width: auto;
            margin-left: .2rem;
            padding-bottom: .3rem;
            display: block;
            .box_top{
                font-size: .32rem;
                line-height: .48rem;
                padding: .3rem 0;
            }
            .box_pic{
                width: 100%;
                display: block;
                overflow: hidden;
                li{
                    width: calc(~'100%/3 - .2rem');
                    float: left;
                    height: 1.9rem;
                    background: #000;
                    margin-right: .2rem;
                }
            }
        }
    }
    .tongj .box{
        .box_pic{
            width: 1.65rem;
            height: 1.4rem;
            display: block;
            float: left;
            margin-top: .3rem;
            margin-right: .3rem;
        }
    }
</style>