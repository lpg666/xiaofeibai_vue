<template>
    <div>
        <head-i>
            <span class="head_title" slot="title_text">登录</span>
            <router-link to="" class="head_a" slot="head_a">注册</router-link>
        </head-i>
    </div>
</template>

<script>
import headI from '../../components/header/head'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{

        }
    },
    components:{
        headI
    },
    computed:{
        ...mapState([
            'autoRoute'
        ]),
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
        console.log(this.autoRoute);
    }

}
</script>

<style lang="less">

</style>