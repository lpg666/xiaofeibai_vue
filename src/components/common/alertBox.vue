<template>
    <div class="alert_box">{{alertText}}</div>
</template>

<script>
    export default {
        data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){

        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="less" scoped>
    .alert_box{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        background: rgba(0,0,0,.75);
        font-size: .3rem;
        padding: .1rem .3rem;
        border-radius: .05rem;
    }
</style>