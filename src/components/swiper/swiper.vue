<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide">
            <router-link :to="slide.url">
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
            flash:function () {
                this.axios.get('/v3/home/flash')
                .then(res => {
                    this.swiperSlides = res.data.data;
                    for(let i=0; i<res.data.data.length; i++){
                        console.log(res.data.data[i].url);
                    }

                })
                .catch(err =>{
                    console.log(err);
                })
            }

        },
        created() {
            console.log(2);
        },
        mounted() {
            this.flash();
            console.log(3);
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