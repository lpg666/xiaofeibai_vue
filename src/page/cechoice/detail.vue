<template>
    <div id="cechoice" style="padding-top: 1rem; background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text" v-if="detail">{{detail.title.substr(0,12)}}<span style="color: #37C078;" v-if="detail.title.length>12">...</span></span></head-i>
        <div class="main">
            <div class="title">{{detail.title}}</div>
            <div class="info">
                <span v-if="detail.add_time">{{detail.add_time}}</span>
                <span v-if="detail.source">{{detail.source}}</span>
                <span v-if="detail.editor">{{detail.editor}}</span>
            </div>
            <div class="cent" v-html="detail.content"></div>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'

    export default {
        data(){
            return{
                detail:'',
                comment:'',
                type:'article',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            headI,
            loading
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.showLoad=true;
            this.loadType='load';
            this.loadText='正在加载';
            this.fetchData();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            close(){
                this.showLoad = false;
            },
            fanhui(){
                document.body.scrollTop=0;
            },
            fetchData () {
                this.axios.get('/v4/cechoice_article/article_details?article_id='+this.$route.params.id+'')
                    .then(res =>{
                        this.detail=res.data.data;
                        if(this.detail!=''){
                            this.showLoad=false;
                            this.fanhui();
                        }
                        console.log(this.detail);
                    })
                    .catch(err =>{

                    });
                console.log(this.$route.params.id);
            }
        }

    }
</script>

<style lang="less">
#cechoice{
    .main{
        width: auto;
        background: #fff;
        padding: 0 .22rem;
        .title{
            font-size: .4rem;
            line-height: .56rem;
            padding: .4rem 0 .2rem 0;
        }
        .info{
            width: 100%;
            margin-bottom: .2rem;
            font-size: .22rem;
            span{
                color: #999;
                margin-right: .5rem;
            }
        }
        .cent{
            padding-bottom: .35rem;
            width: 100%;
            p{
                margin-bottom: .2rem;
                font-size: .3rem !important;
                line-height: .5rem;
                img{
                    width: 100% !important;
                    height: auto !important;
                    display: block;
                }
            }
            span{
                text-align: justify;
                font-size: .3rem !important;
                img{
                    display: block;
                }
            }
        }
    }
}
</style>