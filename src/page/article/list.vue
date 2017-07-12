<template>
    <div class="scroll" style="padding-top: 1rem; background: #fff;">
        <head-i>
            <span v-if="$route.query.type==1" class="head_title" slot="title_text">消费警示</span>
            <span v-else class="head_title" slot="title_text">行业统计</span>
        </head-i>
        <section class="recommend_list" v-if="recommendData.length>0">
            <router-link v-for="data in recommendData" :key="data" :to="'/article/detail/'+data.id" class="list">
                <div v-if="data.default_pic==null">
                    <div class="list_left">
                        <p class="p1">{{data.title}}</p>
                        <p class="p2">{{data.add_time}}</p>
                    </div>
                    <div class="list_right" :style="{backgroundImage:'url('+data.thumb+'!/fh/230)'}">
                        <!--<img :src="data.thumb+'!/fh/230'">-->
                    </div>
                </div>
                <div v-else>
                    <p class="p3">{{data.title}}</p>
                    <ul class="pic">
                        <li v-if="key<3" v-for="src,key in data.default_pic" :style="{backgroundImage:'url('+src.pic+'!/fh/230)'}"><!--<img :src="src.pic">--></li>
                    </ul>
                </div>
            </router-link>
            <p v-if="showLoading" class="loading">正在加载更多数据...</p>
        </section>
    </div>
</template>

<script>
    import headI from '../../components/header/head'

    export default {
        data(){
            return{
                showLoading:false,
                recommendData:'',
                recommendRepeat:false,
                recommendI:0,
                scrollA: '',
            }
        },
        components:{
            headI,
        },
        methods:{
            recommendAjax(){
                this.showLoading = true;
                this.axios.get('/v4/article/article_list?type_id='+this.$route.query.type+'&page='+this.recommendI)
                    .then(res => {
                        if(this.recommendI==0){
                            this.recommendData = res.data.data;
                        }else{
                            this.recommendData = this.recommendData.concat(res.data.data);
                        }
                        this.showLoading = false;
                        this.recommendRepeat = false;
                        console.log(this.recommendData);
                    })
                    .catch(err => {
                        this.showLoading = false;
                        this.recommendRepeat = false;
                        console.log(err);
                    })
            },
            menuA() {
                this.scrollA = document.querySelectorAll('.scroll')[0].scrollTop;
                if(document.querySelector('.scroll').clientHeight + this.scrollA +2 >= document.querySelector('.recommend_list').offsetHeight && this.recommendRepeat==false){
                    this.recommendRepeat = true;
                    this.recommendI += 1;
                    this.recommendAjax();
                    console.log(this.recommendI);
                }
            }
        },
        mounted(){
            document.querySelectorAll('.scroll')[0].addEventListener('scroll', this.menuA);
            this.recommendAjax();
        }
    }
</script>

<style lang="less" scoped>
    .scroll{
        width: 100%;
        height: calc(100vh);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .recommend_list{
    .list:last-child{
        border-bottom: none;
    }
    .list{
        display: block;
        overflow: hidden;
        margin-left: .23rem;
        padding: .23rem 0;
        border-bottom: 1px solid rgba(204,204,204,.5);
        width: calc(~'100% - .23rem');
    .p3{
        width: auto;
        font-size: .32rem;
        line-height: .48rem;
        margin-bottom: .2rem;
        margin-right: .2rem;
        overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .pic{
        overflow: hidden;
        width: 100%;
    li{
        width: calc(~'33.33% - .2rem');
        float: left;
        height: 1.6rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        margin-right: .2rem;
    img{
        width: 100%;
        display: block;
        margin: 0 auto;
    }
    }
    }
    .list_left{
        float: left;
        width: 5.3rem;
    .p1{
        font-size: .32rem;
        line-height: .48rem;
        margin-bottom: .2rem;
        margin-right: .2rem;
        overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .p2{
        font-size: .26rem;
    .hot{
        border: 1px solid #FC405B;
        border-radius: .04rem;
        width: .33rem;
        height: .32rem;
        line-height: .26rem;
        font-size: .2rem;
        color: #FC405B;
        text-align: center;
        display: inline-block;
        float: left;
        margin-top: .025rem;
    }
    span{
        color: #999;
        margin-right: .22rem;
    }
    .status{
        float: right;
        font-size: .22rem;
        margin-top: .025rem;
    }
    .status0{ color: #1491fd}
    .status1{ color: #FEB10D}
    .status2{ color: #2dc177}
    .status3{ color: #2dc177}
    }
    }
    .list_right{
        width: 1.67rem;
        height: 1.4rem;
        margin-right: .22rem;
        float: right;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        overflow: hidden;
    img{
        width: 100%;
        height: auto;
        display:block;
    }
    }
    }

    }
    .loading{
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #333;
        text-align: center;
        background: rgba(153,153,153,.2);
    }
</style>