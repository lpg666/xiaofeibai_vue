<template>
    <div style="padding-top: 1rem;">
        <head-i><span class="head_title" slot="title_text">我的消息</span></head-i>
        <div>

        </div>
        <p v-if="showLoading" class="loading">正在加载更多数据...</p>
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
                detail:'',
                page:0,
                showLoad:false,
                loadType:null,
                loadText:null,
                showLoading:false
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'userInfo',
            ])
        },
        methods: {
            ajaxData(){
                this.axios.get('/v4/member/message?sign='+this.userInfo.sign+'&page='+this.page)
                    .then(res =>{
                        if(res.data.error){
                            if(res.data.msg_type!=401){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                            }
                        }else{
                            this.detail=res.data.data;
                        }
                        console.log(res.data.data);
                    })
                    .catch(err =>{

                    })
            },
            close(){
                this.showLoad=false;
            }
        },
        created(){
            this.ajaxData();
        },
    }
</script>

<style lang="less" scoped>

</style>