import Vue from "vue"
import Vuex from "vuex"
import home from "./home"
import search from "./search"
import detail from "./detail"
import shopCar from "./shopCar"
import user from "./user"
import trade from './trade'
Vue.use(Vuex)
// //处理action 实现业务逻辑、异步请求
// const actions={
    
// }
// //修改数据的唯一途径
// const mutations={
    
// }
// //存储共享数据
// const state={

// }
// //实现计算属性
// const getters={

// }
export default new Vuex.Store({ 
    //实现vuex模块化开发
    modules:{
        home,
        search,
        detail,
        shopCar,
        user,
        trade
    }
})