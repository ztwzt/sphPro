import { Promise } from "core-js"
import {reqGoodsInfo} from "../../api"
import {reqAddOrUpdateShopCar} from "../../api"
import {getUUID} from '../../util/uuid_token'
const actions={
   async getGoodInfo({commit},skuId){
       let result= await reqGoodsInfo(skuId)
       if(result.code==200){
        commit("getGoodInfo",result.data)
       }
    },
    //添加购物车
    //返回一个promise--async
   async addOrUpdateShopCar({commit},{skuId,skuNum}){
        //存储数据，服务器没有返回多余的数据--不需要三连环
        const result= await reqAddOrUpdateShopCar(skuId,skuNum)
        if(result.code==200){
            console.log('11111')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations={
    getGoodInfo(state,data){
        state.goodInfo=data
    }
}
const state={
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const getters={
    categoryView(state){
        //数据没有回来undefined 至少是返回一个空对象
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}