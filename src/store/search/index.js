import {reqGetSearchInfo} from "../../api"
//模块小仓库
const actions={
    async getSearchList({commit},params={}){
        //params--是当 用户派发action 的时候传递过来的，至少是一个空对象
        const result=await reqGetSearchInfo(params)//参数：至少有一个空对象
        if(result.code==200){
            commit("getSearchList",result.data)
        }
    }
}
//修改数据的唯一途径
const mutations={
    getSearchList(state,value){
        state.searchList=value
    }
}
//存储共享数据
const state={
    searchList:{}
}
//实现计算属性 简化仓库中的数据 
const getters={
    goodsList(state){
        //这是有问题的 undefine 属于以声明而为赋值的类型 不能直接使用
        return state.searchList.goodsList || []//假如网络不给力 goodsList->undefine
    },
    trademarkList(state){
        return state.searchList.trademarkList|| []
    },
    attrsList(state){
       
        return state.searchList.attrsList|| []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}