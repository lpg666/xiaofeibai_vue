<template>
    <header id="head-top">
        <slot name="user_portrait"></slot>
        <slot name="title_text"></slot>
        <router-link to="/search" class="head_search">1</router-link>
        <router-link to="/news" class="head_news">2</router-link>
    </header>
</template>

<script>
    export default {
        data(){
            return{

            }
        }

    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';

    .head_search{

    }

    .head_news{

    }
</style>