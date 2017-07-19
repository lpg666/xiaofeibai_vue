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
