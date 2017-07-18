    <template>
    <div style="padding-top: 1rem; padding-bottom: 1rem; background: #F6F7F9; min-height: calc(100vh - 1rem);">
        <head-i><span class="head_title" slot="title_text">我的产品录入</span><router-link class="head_a" slot="head_a" to="/product/info">介绍</router-link></head-i>
        <div class="from">
            <p class="pt"><span class="xing">*</span>产品信息</p>
            <div class="select bor_b" @click="tankan('fenlei')">产品分类<span class="nr">{{fenlei}}</span></div>
            <div class="select" @click="tankan('pinpai')">品牌<span class="nr">{{pinpai}}</span></div>
        </div>
        <div class="from">
            <div :key="data" v-for="data,key in propertiesData" class="bor_b" :class="data.show_type=='text'?'text':'select'">
                <span class="sp" :class="data.name.length>4?'lk':''">{{data.name}}</span>
                <input type="text" value="" placeholder="请输入" v-if="data.show_type=='text'">
                <input type="date" value="" placeholder="请选择" v-else-if="data.show_type=='date'">
                <select v-else="data.show_type=='text'">
                    <option>请选择</option>
                    <option v-for="data in fenge(data.values)">{{data}}</option>
                </select>
            </div>
        </div>
        <div class="from" style="margin-bottom: 1px;">
            <span class="xing1">*</span><p class="p_up">附件上传（购买发票、商品图片、保修单等）支持单个大小不超过2M，格式为.jpg、.jpeg、.png、.bmp格式。消费保将对您的产品严格保密，请放心上传。</p>
            <div id="uploader">
                <div id="fileList" class="uploader-list"></div>
                <div style="clear: both;"></div>
            </div>
            <div class="up_info"><img src="../../images/icon_tishi@2x.png">产品录入后可以直接与企业售后平台联系或者投诉产品</div>
        </div>
        <div class="form_but">保存</div>
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
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import headI from '../../components/header/head'
    import loading from '../../components/common/loading'

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
                fenlei:'请选择',
                pinpai:'请选择',
                tkData:'',
                brandData:'',
                typeData:'',
                propertiesData:'',
                tk:false,
                tkbox:false,
                showLoad:false,
                loadType:null,
                loadText:null,
                load:'正在加载更多数据...',
            }
        },
        components:{
            headI,
            loading
        },
        computed:{

        },
        created(){
            this.ajaxData();
        },
        methods:{
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
                document.querySelector('body').style.overflow='';
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
    .select input{ width: calc(~'100% - 1.7rem'); font-size: .28rem; height: .83rem; float: left; text-align: right; color: #999;}
    .select select{ width: calc(~'100% - 1.7rem'); font-size: .28rem; height: .83rem; float: left; direction: rtl; color: #999; appearance:none; -moz-appearance:none;  -webkit-appearance:none;}
    .lk{line-height: .425rem;}
    .text{ height: .85rem; line-height: .85rem; width: auto; margin: 0 .22rem; background-size:.18rem auto; font-size: .32rem;}
    .pt{ height: .56rem; line-height: .56rem; background: #f6f7f9; font-size:.26rem; color: #b6b6b6;}
    .xing{ font-size: .4rem; height: .56rem; line-height: .66rem; float: left; color: #2dc176; margin: 0 .2rem 0 .2rem;}
    .xing1{ font-size: .4rem; height: .4rem; line-height: .5rem; float: left; color: #2dc176; margin: .2rem .1rem 0 .2rem;}
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