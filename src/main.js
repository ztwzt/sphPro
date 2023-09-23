import Vue from 'vue'
import App from './App.vue'
import router from '../src/router'
import TypeNav from './components/TypeNav'
import {reqCategoryList,reqGetBannerList} from './api'
import store from './store'
//引入mock 执行
import './mock/mockServe'
//引入swiper css
import "swiper/css/swiper.css"
//全局组件
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
//统一接受api接口函数
import * as API from '@/api'
//element-ui
import { MessageBox } from 'element-ui';
//引入lazyload
import VueLazyload from 'vue-lazyload'
import defaultImg from '@/assets/1.jpg'
//validate  引入表单校验插件
import '@/plugins/validate'


//全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
//element-ui 注册组件的一种方式
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:defaultImg
})
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  router,// 组件上有$route--获取路由信息【路径，query,params】 $router--编程式路由【push replace】 
  store//组件上有$store
  
}).$mount('#app')
