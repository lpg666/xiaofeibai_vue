<template>
    <div>
        <head-top>
            <span slot="user_portrait">abc</span>
            <span slot="title_text">标题</span>
        </head-top>
        <nav></nav>
        <swiper></swiper>
    </div>
</template>

<script>
import headTop from '../../components/header/header'
import swiper from '../../components/swiper/swiper'

export default {
    data(){
        return{

        }
    },
    components:{
        headTop,
        swiper
    }
}
</script>

<style></style>