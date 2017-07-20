<template>
    <div style="padding-top: 1rem; background: #F6F7F9; height: calc(100vh);">
        <head-i><span class="head_title" slot="title_text">{{$route.query.title}}</span><div class="head_a" slot="head_a" @click="xg">确定</div></head-i>
        <div v-if="$route.query.ra==1">
            <label>男<input type="radio" value="男" name="sex" v-model="text"></label>
            <label>女<input type="radio" value="女" name="sex" v-model="text"></label>
        </div>
        <textarea v-else v-model="text">{{text}}</textarea>
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
                text:'',
                dt:'',
                showLoad:false,
                loadType:null,
                loadText:null,
            }
        },
        components:{
            headI,
            loading
        },
        computed:{
            ...mapState([
                'editInfo'
            ])
        },
        methods:{
            ...mapMutations([
               'EDIT_INFO'
            ]),
            xg(){
                if(this.$route.query.value=='real_name' && !(/^[\u0391-\uFFE5]+$/.test(this.text))){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请输入中文';
                    setTimeout(this.close,1500);
                }else if(this.$route.query.value=='idcard' && !this.IdentityCodeValid(this.text)){

                }else if(this.$route.query.value=='email' && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.text))){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText='请输入正确的邮箱';
                    setTimeout(this.close,1500);
                }else{
                    this.dt[this.$route.query.value] = this.text;
                    this.EDIT_INFO(this.dt);
                    this.$router.push({path:'/member/edit'});
                }
                console.log(this.dt);
            },
            IdentityCodeValid(code) {
                var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                var tip = "";
                var pass= true;

                if(!code || !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(code)){
                    tip = "身份证号格式错误";
                    pass = false;
                }

                else if(!city[code.substr(0,2)]){
                    tip = "地址编码错误";
                    pass = false;
                }
                else{
                    //18位身份证需要验证最后一位校验位
                    if(code.length == 18){
                        code = code.split('');
                        //∑(ai×Wi)(mod 11)
                        //加权因子
                        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                        //校验位
                        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                        var sum = 0;
                        var ai = 0;
                        var wi = 0;
                        for (var i = 0; i < 17; i++)
                        {
                            ai = code[i];
                            wi = factor[i];
                            sum += ai * wi;
                        }
                        var last = parity[sum % 11];
                        if(parity[sum % 11] != code[17]){
                            tip = "校验位错误";
                            pass =false;
                        }
                    }
                }
                if(!pass){
                    this.showLoad=true;
                    this.loadType='alert';
                    this.loadText=tip;
                    setTimeout(this.close,1500);
                }
                return pass;
            },
            close(){
                this.showLoad = false;
            }
        },
        mounted() {
            this.text = this.editInfo[this.$route.query.value];
            this.dt=this.editInfo;
        }
    }
</script>

<style lang="less" scoped>
    textarea{
        width: 100%;
        height: 2rem;
        padding: .2rem 0;
        text-indent: .2rem;
        display: block;
        margin: .2rem 0;
        border-bottom: 1px solid rgba(204,204,204,.5);
        border-top: 1px solid rgba(204,204,204,.5);
        resize: none;
    }
    label{
        padding-top: .4rem;
        padding-left: .4rem;
        font-size: .3rem;
        float: left;
        display: inline-block;
        input{
            margin-left: .1rem;
            float: right;
            margin-top: 5px;
        }
    }
</style>