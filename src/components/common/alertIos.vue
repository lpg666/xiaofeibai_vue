<template>
    <div class="alert_ios">
        <div class="box">
            <div class="text">{{alertIosText}}</div>
            <div class="but">
                <div class="qx" @click="qx">取消</div>
                <div class="qd" @click="qd">确定</div>
            </div>
        </div>
    </div>
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
        props: ['alertIosText'],
        methods: {
            qd(){
                this.$emit('iosQd');
            },
            qx(){
                this.$emit('parent');
            },
            closeIos(){
                this.$emit('closeIos');
            }
        }
    }
</script>

<style lang="less" scoped>
    .alert_ios{
        position: fixed;
        left: 0;
        top: 0;
        color: #fff;
        background: rgba(0,0,0,.45);
        z-index: 9999;
        width: 100%;
        height: 100%;
        .box{
            overflow: hidden;
            border-radius: .2rem;
            background: #fff;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .text{
                width: 5.2rem;
                padding: .3rem .4rem;
                font-size: .3rem;
                font-weight: bold;
                border-bottom: 1px solid #dad9de;
            }
            .but{
                overflow: hidden;
                .qx{border-right: 1px solid #dad9de;}
                div{
                    height: .9rem;
                    line-height: .9rem;
                    float: left;
                    width: 50%;
                    text-align: center;
                    font-size: .3rem;
                    font-weight: bold;
                    color: #007aff;
                    &:active{
                        background: rgb(234,234,234);
                    }
                }
            }
        }
    }
</style>