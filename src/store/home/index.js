import {reqCategoryList,reqGetBannerList,reqFloorList} from "../../api"
//模块小仓库
const actions={
    //异步请求
    async categoryList({commit}){
        let result= await reqCategoryList()
        if(result.code==200)
        {
            commit("CATEGORYLIST",result.data)
        }
    },
     async getBannerList({commit}){
        let result= await reqGetBannerList()
        if(result.code==200){
            commit("getBannerList",result.data)
        }
     },
     async getFloorList({commit}){
        let result= await reqFloorList()
        if(result.code==200){
            commit("getFloorList",result.data)
        }
     }
}
//修改数据的唯一途径
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    getBannerList(state,bannerList){
        state.bannerList=bannerList
    },
    getFloorList(state,floorList){
        state.floorList=floorList
    }

}
//存储共享数据
const state={
    //state中的默认值
    categoryList:[],
    bannerList:[],
    floorList:[]
}
//实现计算属性
const getters={

}
export default {
    state,
    mutations,
    actions,
    getters
}