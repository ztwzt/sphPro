<template>
  <div>
     <Header></Header>
     <!-- 路由组件出口 -->
     <router-view></router-view>
     <!--  在home 和 search 显示的，在登陆、注册隐藏-->
     <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
     <Footer v-show="$route.meta.show"></Footer> 
  </div>
</template>

<script>
 import Header from './components/Header'
 import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //优化ajax 请求只发一次
    //通知vuex发请求，获取数据，存储在仓库中
     this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
