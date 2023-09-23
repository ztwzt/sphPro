import { Promise } from 'core-js'
import {reqGetCarList,reqDeleteCartById,reqUpdateCheckById} from '../../api'
const actions={
    async getShopCarList({commit}){
        let result= await reqGetCarList()
        if(result.code==200)
        {
            commit('getShopCarList',result.data)
        }
    },
    async deleteCart({commit},skuId){
        let result= await reqDeleteCartById(skuId)
        if(result.code==200)
        {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async UpdateCheckById({commit},{skuId,isChecked}){
        let result= await reqUpdateCheckById(skuId,isChecked)
        if(result.code==200)
        {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除勾选的产品
    deleteAllCheckCart({dispatch,getters},isChecked){
        // console.log(context)
        //返回值->promise->deleteCart
        let promiseAll=[]
        getters.carList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
                let promise= dispatch('deleteCart',item.skuId)
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll)//返回成功或者失败的结果
    },
    //修改全部产品的状态
    updateAllCartChecked({dispatch,state},isChecked){
        let promiseAll=[]
        state.shopCarList[0].cartInfoList.forEach(item=>{
        let promise=dispatch('UpdateCheckById',{skuId:item.skuId,isChecked})
        console.log('xx')
        promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations={
    getShopCarList(state,data){
        state.shopCarList=data
    }
}
const state={
    shopCarList:[]
}
const getters={
    carList(state){
        return state.shopCarList[0] || {}
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}