<template>
    <div>
        <div @click="outLogin">退出登录</div>
        <alert-box v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-box>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import alertBox from '../../components/common/alertBox'
    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        components:{
            alertBox
        },
        methods:{
            ...mapMutations([
                'OUT_LOGIN'
            ]),
            outLogin(){
                this.showAlert=true;
                this.alertText='退出成功';
                setTimeout(this.then,1000);

            },
            then(){
                this.$router.go(-1);
                this.OUT_LOGIN();
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }
</script>

<style></style>