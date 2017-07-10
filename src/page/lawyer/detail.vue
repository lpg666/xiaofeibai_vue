<template>
    <div style="padding-top: 1rem; background: #fff; padding-bottom: 1rem;">
        <head-i><span class="head_title" slot="title_text">律师详情</span></head-i>
        <div class="tx" :style="{backgroundImage:'url('+detail.avatar+'!/fh/230)'}"></div>
        <p class="name">{{detail.name}}</p>
        <p class="mobile">{{detail.license_number}}</p>
        <p class="good">{{detail.good_at}}</p>
        <p class="memo">{{detail.memo}}</p>
        <router-link :to="'/lawyer/commit/'+detail.id">我要咨询</router-link>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'

    export default {
        data(){
            return {
                detail:'',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            loading,
            headI
        },
        computed:{

        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.axios.get('/v3/lawyer/detail?id='+this.$route.params.id)
                    .then(res =>{
                        this.detail=res.data.data;
                        console.log(this.detail);
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .tx{
        margin: .7rem auto .2rem auto;
        width: 1.78rem;
        height: 1.78rem;
        border-radius: .2rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .name{
        font-size: .36rem;
        font-weight: bold;
        text-align: center;
    }
    .mobile,.good,.memo{
        margin: .1rem auto 0 auto;
        text-align: center;
        font-size: .3rem;
    }
    .memo{
        width: calc(~'100% - .8rem');
        text-align: justify;
        margin-top: .2rem;
        color: #999;
    }
    a{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .3rem;
        color: #fff;
        background: #2dc177;
        display: block;
        letter-spacing:1px;
    }
</style>