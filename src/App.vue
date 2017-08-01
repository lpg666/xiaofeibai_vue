<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <alert-box v-if="tanQ" :showHide="tanQ" :alertText="tanQzi"></alert-box>
  </div>
</template>

<script>
import alertBox from './components/common/alertBox'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{

        }
    },
    components:{
        alertBox
    },
    computed:{
        ...mapState([
            'tanQ',
            'tanQzi'
        ])
    },
    mounted(){
        let url = encodeURIComponent(window.location.href.split('#')[0]);
        //alert(url);
        this.axios.get('/v4/weixin?url='+url)
            .then(res =>{
                console.log(res.data);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            });
    }

}
</script>

<style lang="less">
    @import "./style/common";
    .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
    }
</style>
