<template>
    <div style="padding-top: 1rem; background: #F6F7F9;">
        <head-i><span class="head_title" slot="title_text">我要咨询</span></head-i>
        <div class="com">
            <input class="title" value="" v-model="title" placeholder="咨询标题（5-30个字）">
            <textarea class="cent" placeholder="请详细描述相关事件（不少于20个字）" v-model="cent"></textarea>
        </div>
        <div class="picbox">
            <ul class="pic">
                <li v-for="data,key in picList">
                    <i class="dl" @click="delPic(key)"></i>
                    <img :src="'http://xiaofeibao.b0.upaiyun.com'+data.src.data">
                    <!--<div class="lk" @click="picShow(key)">
                        <i :class="data.show==1?'hover':''"></i>
                        <span v-if="data.show==1">公开</span>
                        <span v-else>不公开</span>
                    </div>-->
                </li>
            </ul>
            <div id="upload" v-if="inputShows">
                <div @click="jsdk" style="width: 100%; height: 100%;" v-if="isWeiXin && isAndroid"></div>
                <input v-else @change="onFileChange" type="file" accept="image/png,image/jpeg,image/gif,image/jpg" multiple>
            </div>
        </div>
        <div class="gk"><i :class="gk==false?'bt':''" @click="gkc"></i>对外公开<span>您的事件可作为典型案例对所有人显示</span></div>
        <div style="background: #fff;"><div class="but" @click="but">提交</div></div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import headI from '../../components/header/head'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                inputShows:true,
                title:'',
                cent:'',
                picList:[],
                gk:true,
                re:false,
                showLoad:false,
                loadType:null,
                loadText:null
            }
        },
        components:{
            loading,
            headI
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
            isAndroid(){
                let u = navigator.userAgent;
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                return isAndroid;
            },
            isWeiXin(){
                let ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            },
        },
        created(){

        },
        methods:{
            but(){
                if(this.title.length<5 || this.title.length>30){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='标题字符长度不能小于5或大于30';
                    setTimeout(this.close,1500);
                }else if(this.cent.length<20){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='内容字符长度不能小于20';
                    setTimeout(this.close,1500);
                }else if(this.re==false){
                    this.close();
                    this.re=true;

                    this.showLoad=true;
                    this.loadType='load';
                    this.loadText='提交中';

                    var text = [];
                    if(this.picList.length>0){
                        for(let i=0;i<this.picList.length;i++){
                            text[i] = 'http://xiaofeibao.b0.upaiyun.com'+this.picList[i].src.data;//+'###'+this.picList[i].show
                        }
                        this.picList = text.join('|||');
                    }

                    this.axios.post('/v4/lawyer/commit',{
                        'lawyer_id':parseInt(this.$route.params.id),
                        'title':this.title,
                        'content':this.cent,
                        'pics':this.picList,
                        'sign':this.userInfo.sign,
                        'is_show':this.gk,
                    })
                    .then(res =>{
                        this.re=false;
                        if(res.data.error){
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText=res.data.msg;
                            setTimeout(this.close,1500);
                        }else{
                            this.$router.push({path:'/commit/success/lawyer?id='+this.$route.params.id+'&name='+this.$route.query.name});
                        }
                    })
                    .catch(err =>{
                        this.re=false;
                    });
                }
                console.log(this.title,this.cent,this.picList,this.gk,this.$route.params.id);
            },
            close(){
                this.showLoad = false;
            },
            gkc(){
                this.gk = !this.gk;
            },
            //图片上传
            picShow(key){
                this.picList[key].show=!this.picList[key].show;
            },
            delPic(key){
                this.picList.splice(key,1);
                if(5 - this.picList.length > 0){
                    this.inputShows=true;
                }
            },
            jsdk(){
                const vm = this;
                let size = 5 - vm.picList.length;
                wx.chooseImage({
                    count: size, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        for(let i=0; i<res.localIds.length;i++){
                            wx.uploadImage({
                                localId: res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 0, // 默认为1，显示进度提示
                                success: function (res) {
                                    let serverId = res.serverId; // 返回图片的服务器端ID
                                    console.log(serverId);
                                    vm.showLoad=true;
                                    vm.loadType='load';
                                    vm.loadText='上传中';
                                    vm.axios.get('/v4/weixin/upload?media_id='+serverId)
                                        .then(res =>{
                                            //vm.picList.push({'src':res.data,'show':'1'});
                                            vm.picList.push({'src':res.data});
                                            vm.showLoad=false;
                                            console.log(res.data);
                                        })
                                        .catch(err =>{
                                            vm.showLoad=true;
                                            vm.loadType='alert';
                                            vm.loadText='网络出错';
                                            setTimeout(vm.close,1500);
                                        })
                                }
                            });
                        }
                        console.log(vm.picList);
                        if(vm.picList.length >= 5){
                            vm.inputShows=false;
                        }
                    }
                });
            },
            onFileChange(e){
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                if (parseInt(this.picList.length + files.length) > 5){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='上传图片最大数为5';
                    setTimeout(this.close,1500);
                    return;
                }
                this.createImage(files);
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='您的浏览器不支持图片上传，请升级您的浏览器';
                    setTimeout(this.close,1500);
                }else{
                    const image = new Image();
                    const vm = this;
                    const leng=file.length;
                    const gs = ['image/jpeg','image/jpg','image/png'];
                    for(let i=0;i<leng;i++){
                        let isLt2M = file[i].size / 1024 / 1024 < 2;
                        if(gs.indexOf(file[i].type)<0){
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText='文件类型不对';
                            setTimeout(this.close,1500);
                        }else if(!isLt2M){
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText='图片过大';
                            setTimeout(this.close,1500);
                        }else{
                            this.showLoad=true;
                            this.loadType='load';
                            this.loadText='上传中';
                            let reader = new FileReader();
                            reader.readAsDataURL(file[i]);
                            reader.onload =function(e){
                                vm.axios.post('/v4/complaint/upload_pic',{'pic':e.target.result})
                                    .then(res =>{
                                        //vm.picList.push({'src':res.data,'show':'1'});
                                        vm.picList.push({'src':res.data});
                                        if(vm.picList.length>=5){
                                            vm.inputShows=false;
                                        }else{
                                            vm.inputShows=true;
                                        }
                                        vm.close();
                                    })
                                    .catch(err =>{

                                    })
                            };
                        }

                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .com{
        border-bottom: 1px solid rgba(204,204,204,.5);
        background: #fff;
        .title{
            font-size: .3rem;
            display: block;
            height: 1.3rem;
            width: calc(~'100% - .22rem');
            margin-left: .22rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
        }
        .cent{
            display: block;
            margin-top: .4rem;
            height: 2.8rem;
            line-height: .45rem;
            font-size: .3rem;
            width: calc(~'100% - .44rem');
            margin-left: .22rem;
            margin-right: .22rem;
            resize: none;
        }
    }
    .but{
        width: 5.7rem;
        height: .73rem;
        line-height: .73rem;
        text-align: center;
        border-radius: .1rem;
        margin: 0 auto;
        font-size: .32rem;
        color: #fff;
        background-image:-webkit-linear-gradient(to right, #37C078, #5BDC99);
        background-image:linear-gradient(to right,#37C078,#5BDC99);
    }
    .gk{
        padding-top: .8rem;
        padding-bottom: .75rem;
        background: #fff;
        font-size: .28rem;
        width: 100%;
        i{
            margin-left: .22rem;
            background: url("../../images/icon_gongkai.png") no-repeat top;
            background-size: 100%;
            margin-right: .22rem;
            float: left;
            width: .38rem;
            height: .38rem;
            display: block;
        }
        .bt{
            background: url("../../images/icon_gongkai.png") no-repeat bottom;
            background-size: 100%;
        }
        span{
            margin-left: .22rem;
            font-size: .26rem;
            color: #999;
        }
    }
    .picbox{
        margin-top: .2rem;
        background: #fff;
        border-top: 1px solid rgba(204,204,204,.5);
        overflow: hidden;
        width: auto;
        padding-left: .2rem;
    #upload{
        float: left;
        margin-top: .5rem;
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        background: url("../../images/tianjiatupian.png") no-repeat;
        background-size: 100%;
    input{
        width: 100%;
        height: 100%;
        opacity: 0;
        display: block;
    }
    }
    .pic{
        width: 100%;
        height: auto;
    li{
        position: relative;
        width: 1.4rem;
        height: auto;
        float: left;
        margin-top: .5rem;
        margin-right: .4rem;
    img{
        width: 1.4rem;
        height: 1.4rem;
        display: block;
    }
    >i{
         position: absolute;
         right: -.2rem;
         top: -.2rem;
         width: .4rem;
         height: .4rem;
         background: url("../../images/icon_shantupian.png") no-repeat;
         background-size: 100%;
     }
    .lk{
        font-size: .28rem;
        overflow: hidden;
        height: .74rem;
        line-height: .74rem;
        text-align: center;
        width: 100%;
    i{
        float: left;
        margin-top: .2rem;
        margin-left: .05rem;
        display: block;
        width: .35rem;
        height: .35rem;
        background: url("../../images/icon_tixing_n.png") no-repeat;
        background-size:.35rem;
    }
    .hover{
        background: url("../../images/icon_tixing_s.png") no-repeat;
        background-size:.35rem;
    }
    span{
        display: inline-block;
    }
    }
    }
    }
    }
</style>