    <template>
    <div id="bcf" style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9; min-height: calc(100vh - 1rem);">
        <head-i><span class="head_title" slot="title_text">我的产品录入</span><router-link class="head_a" slot="head_a" to="/product/info">介绍</router-link></head-i>
        <div class="from">
            <p class="pt"><span class="xing">*</span>产品信息</p>
            <div class="select bor_b" @click="tankan('fenlei')">产品分类<span class="nr">{{fenlei}}</span></div>
            <div class="select" @click="tankan('pinpai')">品牌<span class="nr">{{pinpai}}</span></div>
        </div>
        <div class="from">
            <div :key="data" v-for="data,key in propertiesData" class="bor_b" :class="data.show_type=='text'?'text':'select'">
                <span class="sp" :class="data.name.length>4?'lk':''">{{data.name}}</span>
                <input type="text" value="" v-model="properties[data.id]" placeholder="请输入" v-if="data.show_type=='text'">
                <input type="date" v-model="properties[data.id]" value="" placeholder="请选择" v-else-if="data.show_type=='date'">
                <select v-model="properties[data.id]" v-else="data.show_type=='text'">
                    <option value="">请选择</option>
                    <option v-for="data in fenge(data.values)" :value="data">{{data}}</option>
                </select>
            </div>
        </div>
        <div class="from" style="margin-bottom: 1px;">
            <span class="xing1">*</span><p class="p_up">附件上传（购买发票、商品图片、保修单等）支持单个大小不超过2M，格式为.jpg、.jpeg、.png、.bmp格式。消费保将对您的产品严格保密，请放心上传。</p>
            <div class="upload_box">
                <ul class="pic">
                    <li v-for="data,key in picList">
                        <i class="dl" @click="delPic(key)"></i>
                        <img :src="'http://xiaofeibao.b0.upaiyun.com'+data.src.data">
                        <div class="lk" @click="picShow(key)">
                            <input type="text" v-model="data.text" value="">
                        </div>
                    </li>
                </ul>
                <div id="upload" v-if="picList.length<5"><input @click="onFileChange" @change="onFileChange" type="file" multiple></div>
            </div>
            <div class="up_info"><img src="../../images/icon_tishi@2x.png">产品录入后可以直接与企业售后平台联系或者投诉产品</div>
        </div>
        <div class="form_but" @click="fromBut">保存</div>
        <div v-if="tk" class="tk" @click="qx"></div>
        <div v-if="tkbox" class="tkbox">
            <div class="title">
                <div class="qx" @click="qx">取消</div>
                <div class="but" @click="but">确定</div>
            </div>
            <div class="cent">
                <div v-if="tkData.name=='type'">
                    <div class="tip">分类</div>
                    <ul id="type_id">
                        <li :class="type_id==1?'hover':''" @click="dx('type_id',$event)" value="1">家电产品</li>
                        <li :class="type_id==2?'hover':''" @click="dx('type_id',$event)" value="2">数码手机</li>
                        <li :class="type_id==3?'hover':''" @click="dx('type_id',$event)" value="3">汽车</li>
                    </ul>
                    <div v-if="type_id" class="tip">二级分类</div>
                    <ul id="subtype_id" v-if="data.id==type_id" v-for="data in tkData.data">
                        <li :class="item.id==subtype_id?'hover':''" @click="dx('subtype_id',$event)" v-for="item in data.sub_type" :value="item.id">{{item.name}}</li>
                    </ul>
                </div>
                <div v-else-if="tkData.name=='brand'">
                    <div class="tip">品牌</div>
                    <ul id="brand_id">
                        <li :class="data.id==brand_id?'hover':''" @click="dx('brand_id',$event)" v-for="data in tkData.data" :key="data" :value="data.id">{{data.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="success" class="tk_success">
            <div class="yuan"><img src="../../images/img_baocun@2x.png"></div>
            <p class="ts">保存成功</p>
            <router-link to="/product/list">查看列表</router-link>
            <div class="success_but" @click="sx">继续录入</div>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                tjid1:'',
                tjid2:'',
                type_id:'',
                type_name:'',
                subtype_id:'',
                subtype_name:'',
                brand_id:'',
                brand_name:'',
                properties:{},
                picList:[],
                fenlei:'请选择',
                pinpai:'请选择',
                tkData:'',
                brandData:'',
                typeData:'',
                propertiesData:'',
                consume_time:'',
                consume_expense:'',
                tk:false,
                tkbox:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                load:'正在加载更多数据...',
                re:false,
                success:false,
                fileList: []
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        created(){
            this.ajaxData();
        },
        methods:{
            fromBut(){
                console.log(this.type_id,this.subtype_id,this.brand_id,this.properties,this.picList,this.userInfo.sign);
                var pk = 0;
                for(const name in this.properties){
                    if(this.properties[name]==''){
                        pk += 1;
                    }
                }
                if(this.type_id.length<=0 || this.subtype_id.length<=0){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='分类不能为空';
                    setTimeout(this.close,1500);
                }else if(this.brand_id.length<=0){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='品牌不能为空';
                    setTimeout(this.close,1500);
                }else if(pk!=0){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='所有附加属性都必须填写';
                    setTimeout(this.close,1500);
                }else if(this.re==false){
                    var properties ='';
                    for(const name in this.properties){
                        properties += name+'###'+this.properties[name]+'|||';
                    }
                    console.log(properties.split('|||'));
                    var consume_time = this.properties[this.consume_time];
                    var consume_expense = this.properties[this.consume_expense];
                    console.log(consume_time,consume_expense);
                    this.showLoad=true;
                    this.loadType='load';
                    this.loadText='保存中';
                    this.axios.post('/v4/bulter/store',{
                        'sign':this.userInfo.sign,
                        'type_id':this.type_id,
                        'subtype_id':this.subtype_id,
                        'brand_id':this.brand_id,
                        'properties':properties,
                        'consume_time':consume_time,
                        'consume_expense':consume_expense
                    })
                        .then(res =>{
                            if(res.data.error){
                                this.showLoad=true;
                                this.loadType='alert';
                                this.loadText=res.data.msg;
                            }else{
                                this.showLoad=false;
                                this.tk=true;
                                this.success=true;
                                //setTimeout(this.$router.push({path:'/product/list'}),1500);
                            }
                        })
                        .catch(err =>{
                            this.showLoad=true;
                            this.loadType='alert';
                            this.loadText='网络出错';
                            setTimeout(this.close,1500);
                        })
                }

            },
            //图片上传
            picShow(key){
                this.picList[key].show=!this.picList[key].show;
                console.log(this.picList[key].show);
            },
            delPic(key){
                this.picList.splice(key,1);
                console.log(this.picList);
            },
            onFileChange(e){
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
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
                    if(leng>5 || this.picList.length+leng>5){
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='图片数量不能超过5张';
                        setTimeout(this.close,1500);
                        return false;
                    }
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
                                        vm.picList.push({'src':res.data,'text':''});
                                        console.log(res,vm.picList);
                                        console.log('上传成功');
                                        vm.showLoad=false;
                                    })
                                    .catch(err =>{
                                        vm.showLoad=true;
                                        vm.loadType='alert';
                                        vm.loadText='网络出错';
                                        setTimeout(vm.close,1500);
                                    })
                            };
                        }

                    }
                }
            },
            fenge(i){
                return i.split("|||");
            },
            ajaxData(){
                this.showLoad=true;
                this.loadType='load';
                this.loadText='正在加载';
                this.axios.get('/v4/complaint/types')
                    .then(res => {
                        this.typeData={'name':'type','data':res.data.data};
                        this.close();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            ajaxBrand(i){
                this.showLoad=true;
                this.loadType='load';
                this.loadText='正在加载';
                this.axios.get('/v4/complaint/brands?subtype_id='+i)
                    .then(res => {
                        this.brand_id='';
                        this.brand_name='';
                        this.pinpai='请选择';
                        this.brandData={'name':'brand','data':res.data.data};
                        this.close();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            ajaxFujia(i){
                this.showLoad=true;
                this.loadType='load';
                this.loadText='正在加载';
                this.axios.get('/v4/complaint/properties?subtype_id='+i)
                    .then(res => {
                        this.propertiesData=res.data.data;
                        for(let i=0; i<res.data.data.length; i++){
                            this.$set(this.properties,res.data.data[i].id,'');
                            if(res.data.data[i].data_type==1){
                                this.consume_time=res.data.data[i].id;
                            }
                            if(res.data.data[i].data_type==2){
                                this.consume_expense=res.data.data[i].id;
                            }
                        }
                        console.log(this.properties);
                        this.close();
                    })

                    .catch(err => {
                        console.log(err);
                    })
            },
            dx(name,e){
                console.log(name);
                if(name=='type_id'){
                    this.type_id = e.target.value;
                    this.type_name = e.target.innerHTML;
                    console.log(this.type_id,this.type_name);
                }else if(name=='subtype_id'){
                    this.subtype_id = e.target.value;
                    this.subtype_name = e.target.innerHTML;
                    console.log(this.subtype_id,this.subtype_name);
                }else if(name=='brand_id'){
                    this.brand_id = e.target.value;
                    this.brand_name = e.target.innerHTML;
                    console.log(this.brand_id,this.brand_name);
                }
            },
            but(){
                if(this.tkData.name=='type'){
                    if(this.type_id!='' && this.subtype_id!=''){

                        this.fenlei=this.type_name+' '+this.subtype_name;
                        this.tjid1=this.type_id;
                        this.tjid2=this.subtype_id;
                        this.ajaxBrand(this.type_id);
                        this.ajaxFujia(this.type_id);
                        this.qx();
                        console.log(this.tjid1,this.tjid2);
                    }else{
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='选项不能为空';
                        setTimeout(this.close,1500);
                    }
                }else if(this.tkData.name=='brand'){
                    if(this.type_id!=''){
                        this.pinpai=this.brand_name;
                        this.qx();
                    }else{
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='选项不能为空';
                        setTimeout(this.close,1500);
                    }
                }
            },
            tankan(i){
                if(i=='fenlei'){
                    this.tkData=this.typeData;
                    this.dk();
                }else if(i=='pinpai'){
                    if(this.type_id==''){
                        this.showLoad=true;
                        this.loadType='alert';
                        this.loadText='请先选择分类';
                        setTimeout(this.close,1500);
                    }else {
                        this.tkData = this.brandData;
                        this.dk();
                    }
                }
            },
            dk(){
                this.tk=true;
                this.tkbox=true;
                document.querySelector('body').style.overflow='hidden';
            },
            qx(){
                if(this.tjid1!='' || this.tjid2!=''){
                    this.type_id = this.tjid1;
                    this.subtype_id = this.tjid2;
                }
                this.tk=false;
                this.tkbox=false;
                this.success=false;
                document.querySelector('body').style.overflow='';
            },
            sx(){
                this.$router.go(0);
            },
            close(){
                this.showLoad=false;
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .upload_box{
        overflow: hidden;
        width: auto;
        padding-bottom: .4rem;
        margin-left: .2rem;
        .pic{
            width: 100%;
            height: auto;
            li{
                position: relative;
                width: 1.4rem;
                height: auto;
                float: left;
                margin-top: .25rem;
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
                    input{
                        width: 1.3rem;
                        height: .5rem;
                        border: 1px solid rgba(204,204,204,1);
                        border-radius: .1rem;
                        text-align: center;
                        font-size: .24rem;
                        margin: .2rem auto 0 auto;
                    }
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
    #upload{
        float: left;
        margin-top: .25rem;
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
    .tkbox{
        width: 100%;
        height:6.5rem;
        background: #fff;
        position: fixed;
        left: 0;
        bottom:0;
        z-index: 9999;
        .title{
            width: 100%;
            height: .78rem;
            font-size: .32rem;
            .qx{
                float: left;
                height: .78rem;
                line-height: .78rem;
                padding:0 .2rem;
                color: #8c8c8c;
            }
            .but{
                float: right;
                height: .78rem;
                line-height: .78rem;
                padding:0 .2rem;
            }
        }
        .cent{
            overflow-y: scroll;
            width: 100%;
            height: 5.72rem;
            .tip{
                color: #8c8c8c;
                line-height: .7rem;
                height: .7rem;
                width: 100%;
                font-size: .28rem;
                text-indent: .2rem;
            }
            #type_id,#subtype_id,#brand_id{
                margin: 0 .2rem;
                overflow: hidden;
                li{
                    width: auto;
                    padding: 0 .2rem;
                    margin-right: .2rem;
                    margin-bottom: .2rem;
                    height: .7rem;
                    line-height: .7rem;
                    border-radius: .08rem;
                    font-size: .32rem;
                    color: #666666;
                    background: #efefef;
                    text-align: center;
                    float: left;
                }
                .hover{
                    color: #fff;
                    background: #2dc176;
                }
            }
        }
    }
    .form_but{
        width: 100%;
        background: #2dc176;
        font-size: .4rem;
        color: #fff;
        height: .98rem;
        line-height: .98rem;
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .tk{ width: 100%; height: 100%; z-index: 999; background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0;}
    .from{
        margin-bottom:.2rem;
        background: #fff;
        .p_up{
            font-size: .29rem;
            color: #333;
            padding: .2rem .2rem .3rem .5rem;
        }
        .up_info{
            font-size: .26rem;
            color: #999;
            overflow: hidden;
            line-height: .44rem;
            padding-bottom: .2rem;
            img{
                width: .44rem;
                height: .44rem;
                float: left;
                margin: 0 .2rem;
            }
        }
    }
    .from div:last-child{ border-bottom: none;}
    .bor_b{ border-bottom: 1px dashed rgba(204,204,204,1);}
    .nr{float: right; color: #999; margin-right: .4rem; font-size: .28rem;}
    .select{ height: .85rem; line-height: .85rem; width: auto; margin: 0 .22rem; background:#fff url("../../images/icon_next@2x.png") no-repeat center right; background-size:.18rem auto; font-size: .32rem;}
    .select .sp{float: left;  display: block;  width: 1.4rem;}
    input[type=date]::-webkit-inner-spin-button { visibility: hidden; }
    .text .sp{float: left;  display: block;  width: 1.4rem;}
    .text input{ width: calc(~'100% - 1.7rem'); font-size: .28rem; height: .83rem; float: left; text-align: right; color: #999;}
    .select input{ width: calc(~'100% - 1.7rem'); font-size: .28rem; height: .83rem; float: left; direction: rtl; color: #999;}
    .select select{ width: calc(~'100% - 1.7rem'); font-size: .28rem; height: .83rem; float: left; direction: rtl; color: #999; appearance:none; -moz-appearance:none;  -webkit-appearance:none;}
    .lk{line-height: .425rem;}
    .text{ height: .85rem; line-height: .85rem; width: auto; margin: 0 .22rem; background-size:.18rem auto; font-size: .32rem;}
    .pt{ height: .56rem; line-height: .56rem; background: #f6f7f9; font-size:.26rem; color: #b6b6b6;}
    .xing{ font-size: .4rem; height: .56rem; line-height: .66rem; float: left; color: #2dc176; margin: 0 .2rem 0 .2rem;}
    .xing1{ font-size: .4rem; height: .4rem; line-height: .5rem; float: left; color: #2dc176; margin: .2rem .1rem 0 .2rem;}

    .tk_success{width: 6rem;height: 3.6rem;border-radius: .2rem;background: #fff;position: fixed;left:50%;top: 50%;margin-left: -3rem;margin-top: -1.8rem;z-index: 999;}
    .tk_success .yuan{ width: 1.64rem; height: 1.64rem; border-radius: 50%; position: absolute; left: 50%; margin-left: -.82rem; top: -.82rem; background: #fff; z-index: -1;}
    .tk_success .yuan img{ width: 2.5rem; position: absolute; left: -.5rem; top: -.28rem;}
    .tk_success .ts{ font-size: .36rem; color: #333; line-height: .65rem; margin-top: .3rem; text-align: center; border-bottom: 1px dashed #dcdcdc;}
    .tk_success a{ text-align: center; width: 1.4rem; display:block; margin: .5rem auto; padding-bottom: .02rem; border-bottom: 1px solid #2dc176; font-size: .32rem; color: #2dc176;}
    .tk_success .success_but{ width: 2.2rem; height: .7rem; line-height: .7rem; margin: 0 auto; background:#2dc176; border-radius: .1rem; font-size: .32rem; color: #fff; text-align: center;}

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