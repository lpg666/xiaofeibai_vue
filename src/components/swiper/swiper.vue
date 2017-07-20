<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide">
            <router-link :to="slide.url">
                <img :src="slide.pic+'!/fh/230'">
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
                    loop:true
                },
                swiperSlides:''
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed:{

        },
        methods:{

        },
        beforeCreate() {

        },
        created() {
            this.axios.get('/v4/home/home_flash')
                .then(res => {
                    this.swiperSlides = res.data.data;
                    for(let i=0; i<res.data.data.length; i++){
                        this.swiperSlides[i].url = res.data.data[i].url.substr(res.data.data[i].url.indexOf('com')+3);
                    }
                })
                .catch(err =>{
                    console.log(err);
                });
        },
        beforeMount() {
        },
        mounted() {

        }
    }
</script>

<style lang="less">
#home_swiper{
    .swiper-container{
        padding-bottom: .2rem;
    }
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
        bottom: 0;
        height: .15rem;
        width: 1.2rem;
        left: 50%;
        margin-left: -.6rem;
    }
    .swiper-pagination-bullet{
        width: .12rem !important;
        height: .12rem !important;
        float: left;
        background: #EAEAEA;
        opacity: 1;
        margin: 0 .06rem !important;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #37C078;
    }
    .swiper-slide img{
        width: 100%;
        display: block;
    }
}
</style>