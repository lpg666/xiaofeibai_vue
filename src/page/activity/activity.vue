<template>
    <div style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <a v-for="item in list" :href="'http://m.xfb315.com/'+item.tag">
            <img :src="item.bg">
        </a>
        <tar></tar>
        <router-link to="/tousu/create" id="ts_btn"><span>一键<br/>投诉</span></router-link>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import tar from '../../components/tar/tar'
    import loading from '../../components/common/loading'

    export default {
        data(){
            return{
                list:'',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            headTop,
            tar,
            loading
        },
        computed:{

        },
        methods:{
            close(){
                this.showLoad = false;
            },
            fetchData () {
                this.axios.get('/v4/home/activity_list')
                    .then(res =>{
                        this.list=res.data.data;
                        if(this.list!=''){
                            this.showLoad=false;
                        }
                        console.log(this.list);
                    })
                    .catch(err =>{

                    });
            }
        },
        mounted() {
            this.showLoad=true;
            this.loadType='load';
            this.loadText='正在加载';
            this.fetchData();
        }
    }
</script>

<style lang="less" scoped>
    a{
        height: auto;
        display: block;
        margin: .2rem .1rem;
        img{
            width: 100%;
            display: block;
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
</style>