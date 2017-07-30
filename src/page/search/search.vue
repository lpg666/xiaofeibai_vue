<template>
    <div style="background: #EDEEF0; min-height: 100vh; padding-top: 1rem;">
        <div class="hear">
            <div id="head_go" @click="$router.push({path:'/home'})"></div>
            <div class="s_box">
                <i></i>
                <input type="text" class="text" v-model="text" value="" placeholder="请输入关键词" v-focus="focusStatus">
                <i class="gb" v-if="text" @click="gb"></i>
            </div>
            <div class="s_but" @click="sous">搜索</div>
        </div>
        <div v-if="list">
            <div class="lishi" v-if="search && search.length>0">
                <div class="title">搜索历史<i @click="dl"></i></div>
                <p v-for="data in search" :key="data" @click="cs(data)">{{data}}</p>
            </div>
            <div class="remen">
                <div class="title">热门搜索</div>
                <ul>
                    <li v-for="data in remen" :key="data" :value="data.id" @click="cs(data.name,data.id)">{{data.name}}</li>
                </ul>
            </div>
        </div>
        <div v-else style="background: #fff;">
            <div class="list_nav">
                <div @click="cnav(1)" class="le" :class="nav=='tousu'?'hover':''">投诉<span :class="nav=='tousu'?'hover':''"></span></div>
                <div @click="cnav(0)" :class="nav!='tousu'?'hover':''">文章<span :class="nav!='tousu'?'hover':''"></span></div>
                <span class="dx"></span>
            </div>
            <div class="ts_list" v-if="nav=='tousu'">
                <div class="kong" v-if="kong1">
                    <img src="../../images/iimg_neirongkong@3x.png">
                    <p>这里还没有内容</p>
                </div>
                <div class="thd" v-else>
                    <router-link :to="'/tousu/detail/'+data.id" class="list_b" v-for="data in Td" :key="data">
                        <div class="box" :style="data.default_pic?'width: 5rem; padding-right: 0;':''">
                            <p class="p1" v-html="data.title"></p>
                            <p class="p2" v-html="data.content"></p>
                        </div>
                        <div class="pic" v-if="data.default_pic" :style="{backgroundImage:'url('+data.default_pic.pic+')'}"></div>
                        <p class="p3">
                            <span class="sp1" v-if="data.tousukeyword">{{data.tousukeyword.name}}</span>
                            <span v-else class="sp1">其他</span>
                            <span class="sp2">{{data.add_time}}</span>
                            <span class="sp3" :class="'status_'+data.status" v-if="data.status==0">投诉受理</span>
                            <span class="sp3" :class="'status_'+data.status" v-else-if="data.status==1">企业处理</span>
                            <span class="sp3" :class="'status_'+data.status" v-else-if="data.status==2">结果审核</span>
                            <span class="sp3" :class="'status_'+data.status" v-else-if="data.status==3">完成</span>
                        </p>
                    </router-link>
                </div>
                <p v-if="showLoading" class="loading">{{load1}}</p>
            </div>
            <div class="ar_list" v-else>
                <div class="kong" v-if="kong2">
                    <img src="../../images/iimg_neirongkong@3x.png">
                    <p>这里还没有内容</p>
                </div>
                <div class="ahd" v-else>
                    <router-link :to="'/article/detail/'+data.id" class="list_b" v-for="data in Ad" :key="data">
                        <div class="box" :style="data.default_pic?'width: 5rem; padding-right: 0;':''">
                            <p class="p1" v-html="data.title"></p>
                            <p class="p2" v-html="data.content"></p>
                        </div>
                        <div class="pic" v-if="data.default_pic" :style="{backgroundImage:'url('+data.default_pic.pic+')'}"></div>
                        <p class="p3">
                            <span class="sp1" v-if="data.type_name">{{data.type_name}}</span>
                            <span v-else class="sp1">其他</span>
                            <span class="sp2">{{data.add_time}}</span>
                        </p>
                    </router-link>
                </div>
                <p v-if="showLoading" class="loading">{{load2}}</p>
            </div>
        </div>
        <loading v-if="showLoad" :showHide="showLoad" @close="close" :loadType="loadType" :loadText="loadText"></loading>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return {
                showLoading:false,
                load1:'正在加载更多数据...',
                load2:'正在加载更多数据...',
                showLoad:false,
                loadType:null,
                loadText:null,
                list:true,
                text:'',
                lishi:[],
                remen:'',
                gbz:'',
                focusStatus:false,
                Apage:0,
                Tpage:0,
                type:'complaint',
                nav:'tousu',
                Ad:[],
                Td:[],
                scrollA:0,
                scrollB:0,
                Are:false,
                Tre:false,
                kong1:false,
                kong2:false,
            }
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        },
        components:{
            loading
        },
        computed:{
            ...mapState([
                'search',
                'userInfo'
            ])
        },
        methods:{
            ...mapMutations([
               'SEARCH_LISHI',
               'SEARCH_DEL'
            ]),
            cs(text,rm){
                if(text){
                    this.text=text;
                    this.tc('load','加载中...');
                    if(rm){
                        this.sou(rm);
                    }else{
                        this.sou();
                    }

                }
            },
            cnav(i){
                if(i==1){
                    this.nav='tousu';
                    this.type='complaint';
                    if(this.Tpage==0){
                        this.tc('load','加载中...');
                        this.sou();
                    }
                }else{
                    this.nav='';
                    this.type='';
                    if(this.Apage==0){
                        this.tc('load','加载中...');
                        this.sou();
                    }
                }
            },
            sous(){
                this.tc('load','加载中...');
                this.sou();
            },
            sou(rm){
                if(this.text){
                    this.list=false;
                    if(this.lishi.indexOf(this.text)<0){
                        this.lishi=this.lishi.concat(this.text);
                    }
                    this.SEARCH_LISHI(this.lishi);
                    if(rm){
                        for(let i = 0; i<this.remen.length; i++){
                            if(this.remen[i].name==rm){
                                alert(1);
                                this.$set(this.remen[i],'hover','1')
                            }
                            console.log(this.remen[i]);
                        }
                    }
                    this.axios.get('/v4/home/search?source_type=0&keyword='+this.text+'&type='+this.type+'&page='+this.Apage)
                        .then(res =>{
                            if(res.data.error){
                                if(this.Tpage==0 || this.Apage==0){
                                    if(this.type=='complaint' && this.Td.length==0){
                                        this.kong1=true;
                                    }else if(this.type=='' && this.Ad.length==0){
                                        this.kong2=true;
                                    }
                                }else{
                                    if(this.type=='complaint'){
                                        this.load1=res.data.msg;
                                    }else{
                                        this.load2=res.data.msg;
                                    }
                                }
                            }else{
                                this.kong1=false;
                                this.kong2=false;
                                if(this.type=='complaint'){
                                    if(this.Tpage==0){
                                        this.Td = res.data.data;
                                        this.Tpage +=1;
                                        this.Tre=false;
                                        this.th(this.Td);
                                    }else{
                                        this.Td = this.Td.concat(res.data.data);
                                        this.Tpage +=1;
                                        this.Tre=false;
                                        this.th(this.Td);
                                    }
                                }else{
                                    if(this.Apage==0){
                                        this.Ad = res.data.data;
                                        this.Apage +=1;
                                        this.Are=false;
                                        this.th(this.Ad);
                                    }else{
                                        this.Ad = this.Ad.concat(res.data.data);
                                        this.Apage +=1;
                                        this.Are=false;
                                        this.th(this.Ad);
                                    }
                                }
                            }
                            this.showLoading = false;
                            this.close();
                            console.log(res.data);
                            document.querySelector('.ts_list').addEventListener('scroll', this.menuA);
                            document.querySelector('.ar_list').addEventListener('scroll', this.menuB);
                            document.querySelector('.list_nav').addEventListener("touchmove", function (event) {
                                event.preventDefault();
                            },false);
                        })
                        .catch(err =>{

                        })
                }else{
                    this.tc('alert','请输入搜索内容');
                    setTimeout(this.close,1500);
                }

            },
            dl(){
                this.SEARCH_DEL();
            },
            gb(){
                this.kong1=false;
                this.kong2=false;
                this.list=true;
                this.text='';
                this.focusStatus=true;
                this.Apage=0;
                this.Tpage=0;
                this.Ad=[];
                this.Td=[];
            },
            rm(){
                this.axios.get('/v4/home/hot_keyword')
                    .then(res =>{
                        if(res.data.error){

                        }else{
                            this.remen=res.data.data;
                        }
                    })
                    .catch(err =>{

                    })
            },
            tc(a,b){
                this.showLoad=true;
                this.loadType=a;
                this.loadText=b;
            },
            close(){
                this.showLoad=false;
            },
            menuA() {
                this.scrollA = document.querySelector('.ts_list').scrollTop;
                console.log(document.querySelector('.ts_list').clientHeight,this.scrollA+2,document.querySelector('.thd').offsetHeight,);
                if(document.querySelector('.ts_list').clientHeight + this.scrollA +2 >= document.querySelector('.thd').offsetHeight && this.Tre==false){
                    this.Tre = true;
                    if(this.Tpage!=0){
                        this.showLoading = true;
                    }
                    this.showLoading = true;
                    this.sou();
                }
            },
            menuB() {
                this.scrollA = document.querySelector('.ar_list').scrollTop;
                if(document.querySelector('.ar_list').clientHeight + this.scrollA +2 >= document.querySelector('.ahd').offsetHeight && this.Are==false){
                    this.Are = true;
                    if(this.Apage!=0){
                        this.showLoading = true;
                    }
                    this.sou();
                }
            },
            th(text){
                for(let i = 0; i<text.length; i++){
                    text[i].title = text[i].title.replace(new RegExp(this.text,'g'),'<span style="color:#37C078;">'+this.text+'</span>');
                    text[i].content = text[i].content.replace(new RegExp(this.text,'g'),'<span style="color:#37C078;">'+this.text+'</span>');
                }
                return text;
            }

        },
        mounted() {
            document.querySelector('.hear').addEventListener("touchmove", function (event) {
                event.preventDefault();
            },false);
            this.lishi=this.search;
            this.rm();
            this.focusStatus=true;
        }
    }
</script>

<style lang="less" scoped>
    .kong{
        img{
            display: block;
            width: 2.68rem;
            height: 2rem;
            margin: 1.4rem auto .8rem auto;
        }
        p{
            text-align: center;
            font-size: .26rem;
            color: #8E8F8F;
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
    .ts_list,.ar_list{
        width: 100%;
        height: calc(~'100vh - 2rem - 1px');
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .list_b{
            display: block;
            margin-left: .22rem;
            border-bottom: 1px solid rgba(204,204,204,.5);
            padding-bottom: .2rem;
            overflow: hidden;
        }
        .pic{
            margin: .25rem .22rem 0 0;
            float: right;
            width: 1.67rem;
            height: 1.4rem;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .box{
            float: left;
            padding-right: .22rem;
            margin-top: .2rem;
            .p1{
                width: 100%;
                font-size: .32rem;
                line-height: .48rem;
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                span{
                    color: #37C078;
                }
            }
            .p2{
                overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                width: 100%;
                margin-top: .1rem;
                font-size: .28rem;
                color: #6B6B6B;
                span{
                    color: #37C078;
                }
            }
        }
        .p3{
            float: left;
            width: 100%;
            overflow: hidden;
            margin-top: .1rem;
            span{
                display: block;
            }
            .sp1{
                float: left;
                font-size: .26rem;
                color: #37C078;
                margin-right: .2rem;
            }
            .sp2{
                float: left;
                font-size: .24rem;
                color: #999999;
            }
            .sp3{
                margin-right: .22rem;
                float: right;
                font-size: .2rem;
            }
            .status_0{ color: #1491fd}
            .status_1{ color: #FEB10D}
            .status_2{ color: #2dc177}
            .status_3{ color: #2dc177}
        }
    }
    .list_nav{
        width: 100%;
        height: 1rem;
        .le{
            margin-left:calc(~'50% - 2em - 1.1rem');
        }
        div{
            position: relative;
            font-weight: bold;
            height: 1rem;
            line-height: 1rem;
            font-size: .34rem;
            display: block;
            float: left;
            width: auto;
            padding: 0 .55rem;
            span{
                left: 50%;
                margin-left: -.205rem;
                position: absolute;
                bottom: .1rem;
                width: .41rem;
                height: .04rem;
                display: block;
                background: #1D2733;
            }
            .hover{
                background: #37C078;
            }
        }
        .hover{
            color: #37C078;
        }
        .dx{
            float: right;
            width: calc(~'100% - .22rem');
            border-bottom: 1px solid rgba(204,204,204,.5);
        }
    }
    #head_go{
        float: left;
        width: .5rem;
        height: 1rem;
        background: url("../../images/head_jt.png") no-repeat left .1rem center;
        background-size: .4rem;
    }
    .remen{
        .title{
            width: 100%;
            font-weight: bold;
            margin-top: .3rem;
            text-indent: .22rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .26rem;
        }
        ul{
            margin: 0 .22rem;
            overflow: hidden;
            li{
                background: #fff;
                margin-bottom: .38rem;
                margin-right: .28rem;
                border: 1px solid rgba(204,204,204,.5);
                float: left;
                border-radius: .04rem;
                padding: .05rem .15rem;
                font-size: .3rem;
            }
        }
    }
    .lishi{
        p{
            font-size: .3rem;
            line-height: .42rem;
            margin-left: .22rem;
            margin-bottom: .15rem;
        }
        .title{
            font-weight: bold;
            margin-top: .3rem;
            margin-left: .22rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .26rem;
            i{
                margin-right: .43rem;
                float: right;
                display: block;
                width: .8rem;
                height: .8rem;
                background: url("../../images/icon_delete@3x.png") no-repeat center;
                background-size: .3rem;
            }
        }
    }
    .hear{
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 1rem;
        background: #fff;
        .s_but{
            float: left;
            width: calc(~'100% - 6.36rem');
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            font-size: .3rem;
            color: #37C078;
        }
        .s_box{
            position: relative;
            float: left;
            margin: .19rem 0 .19rem .22rem;
            border-radius: .31rem;
            background: #EDEEF0;
            width: 5.64rem;
            overflow: hidden;
            height: .62rem;
            i{
                float: left;
                display: block;
                width: .62rem;
                height: .62rem;
                background: url("../../images/icon_search@3x.png") no-repeat center;
                background-size: .24rem;
            }
            .gb{
                top: 0;
                right: 0;
                position: absolute;
                background: url("../../images/icon_guanbisousuo@3x.png") no-repeat center;
                background-size: .24rem;
            }
            .text{
                float: left;
                width: 5.02rem;
                height: .62rem;
                border: none medium;
                background: none;
                font-size: .22rem;
            }
        }
    }
</style>