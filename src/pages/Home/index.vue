<template>
    <div>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>  
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
  <Brand></Brand>
    </div>
</template>

<script>
//TypeNav 全局组件 不需要引入
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    },
    mounted(){
        console.log('home')//子组件先行
        this.$store.dispatch("getFloorList")
        //获取用户信息展示
    },

}
</script>

<style>

</style>