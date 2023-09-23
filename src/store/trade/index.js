import {reqGetTradeList,reqGetAddressList} from '@/api'
const actions={
    //获取地址列表
    async getAddressList({commit}){
         let result=await reqGetAddressList()
         commit('getAddressList',result.data)
         if(result.code==200){
            return 'ok'
         }else{
            return Promise.reject(new Error('faile'))
         }
         
    },
    //获取交易清单商品
   async getTradeList({commit}){
        let result=await reqGetTradeList()
        commit('getTradeList',result.data)
        if(result.code==200){
            return 'ok'
         }else{
            return Promise.reject(new Error('faile'))
         }
    }
}
const mutations={
    getTradeList(state,data){
        state.tradeList=data
    },
    getAddressList(state,data){
        state.addressList=data
    }
}
const state={
    tradeList:{},
    addressList:[]
}
const getters={}
export default{
    state,
    actions,
    mutations,
    getters
}