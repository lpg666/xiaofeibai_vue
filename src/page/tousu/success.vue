<template>
    <div>
        <div class="hear"><router-link to="/home"></router-link></div>
        <img class="zhutu" src="../../images/img_fabuchengong@2x.png">
        <p class="p1">分享到社交圈，让更多人支持关注</p>
        <p class="p1">扩大影响力，维权诉求更容易解决</p>
        <!--<ul class="shareIcon">
            <li><img src="../../images/share_wechat@2x.png"></li>
            <li><img src="../../images/share_weibo@2x.png"></li>
            <li><img src="../../images/share_pengyouquan@2x.png"></li>
            <li><img src="../../images/share_qq@2x.png"></li>
            <li><img src="../../images/share_qzone@2x.png"></li>
        </ul>-->
        <similars v-if="detail.similars" :detail="detail"></similars>
    </div>
</template>

<script>
    import similars from '../../components/common/similars'
    export default {
        data(){
            return{
                detail:'',
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        created () {
            this.fetchData();
        },
        components:{
            similars
        },
        methods:{
            fetchData () {
                this.showLoad=true;
                this.loadType='load';
                this.loadText='加载中';
                this.axios.get('/v4/complaint/detail?complaint_id='+this.$route.params.id+'')
                    .then(res =>{
                        this.detail=res.data.data;
                        if(this.detail!=''){
                            this.showLoad=false;
                        }
                        console.log(this.detail);
                    })
                    .catch(err =>{

                    });
                console.log(this.$route.params.id);
            },
            close(){
                this.showLoad = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .hear{
        width: 100%;
        height: 1rem;
        a{
            width: 1rem;
            height: 1rem;
            background: url("../../images/icon_x@2x.png") no-repeat center left .2rem;
            background-size: .37rem .37rem;
            display: block;
        }
    }
    .zhutu{
        width: 3.88rem;
        height: 3.64rem;
        margin:.5rem auto .8rem auto;
        display: block;
    }
    .p1{
        font-size: .32rem;
        text-align: center;
        margin-bottom: .1rem;
    }
    .shareIcon{
        margin-top: .62rem;
        margin-bottom: .8rem;
        overflow: hidden;
        width: 100%;
        li{
            float: left;
            width: calc(~'(100% - 2.4rem)/5');
            margin-left: .4rem;
            height: auto;
            img{
                width: 100%;
                display: block;
            }
        }
        li:last-child{
            margin-right: 0;
        }
    }
</style>