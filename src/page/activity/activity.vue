<template>
    <div style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9;">
        <head-top>
            <span slot="title_text"></span>
        </head-top>
        <a v-for="item in list" :href="'http://m.xfb315.com/'+item.tag">
            <img :src="item.bg">
        </a>
        <tar></tar>
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
                this.axios.get('/v3/home/activities')
                    .then(res =>{
                        this.list=res.data;
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
</style>