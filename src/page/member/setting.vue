<template>
    <div>
        <div @click="outLogin">退出登录</div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import loading from '../../components/common/loading'

    export default {
        data(){
            return {
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            loading
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods:{
            ...mapMutations([
                'OUT_LOGIN'
            ]),
            outLogin(){
                this.axios.post('/v4/auth/logout',{'sign':this.userInfo.sign})
                    .then(res =>{
                        if(res.data.error){
                            this.showLoad=true;
                            if(res.data.msg=='请先登录'){
                                this.loadType='';
                                this.loadText='退出成功';
                                setTimeout(this.then,1500);
                            }else{
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                                setTimeout(this.close,1500);
                            }
                        }else{
                            this.showLoad=true;
                            this.loadType='';
                            this.loadText='退出成功';
                            setTimeout(this.then,1500);
                            console.log(res.data);
                        }

                    });

            },
            then(){
                this.showLoad = false;
                this.$router.go(-1);
                this.OUT_LOGIN();
            },
            close(){
                this.showLoad = false;
            }
        }
    }
</script>

<style></style>