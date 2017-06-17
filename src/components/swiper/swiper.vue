<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide">
            <router-link to="/article/detail/:id">
                <img :src="slide.pic">
            </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data() {
            return {
                swiperOption: {
                    autoplay: 3500,
                    setWrapperSize :true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    observeParents:true,
                },
                swiperSlides:''
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods:{

        },
        created() {
            this.axios.get('/v3/home/flash')
            .then(res => {
                this.swiperSlides = res.data.data;
            })
            .catch(err =>{
                console.log(err);
            })
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    .swiper-slide{
        img{
            width: 100%;
            display: block;
        }
    }
</style>