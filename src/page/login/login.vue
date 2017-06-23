<template>
    <p>登录</p>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{

        }
    },
    computed:{
        a(){
            this.RECORD_USERINFO(1);
        }
    },
    methods:{
        ...mapMutations([
            'RECORD_USERINFO'
        ])
    },
    mounted() {

    }

}
</script>

<style></style>