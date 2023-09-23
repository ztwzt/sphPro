import {reqGetCode,register,reqUserLogin,getUserInfo,reqLoginOut} from '@/api'
import {setToken,getToken,removeToken} from '@/util/token'
const actions={
    //获取验证码
   async getCode({commit},phone){
      let result=await reqGetCode(phone)
      if(result.code==200)
      {
        commit('getCode',result.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    //完成注册
   async userRegister({commit},user){
       let result=await register(user)
       if(result.code=200)
       {
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //登录--token--服务器下发，前台持久化token 并且拿着token向服务器请求数据
    async userLogin({commit},params){
       let result= await reqUserLogin(params)
       if(result.code=200)
       {
         //持久化token
        setToken(result.data.token)
        commit('userLogin',result.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //token 获取用户信息
    async getUserInfo({commit}){
        let result= await getUserInfo()
        if(result.code==200)
        {
            commit('getUserInfo',result.data)
            return 'ok'
        }
     },
     //退出登录
    async reqLoginOut({commit}){
        //通知服务亲清除数据
        let result=await reqLoginOut()
        if(result.code==200)
        {
            commit('clearLoginInfo')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
     }
}
const mutations={
    getCode(state,code){
        state.code=code
    },
    userLogin(state,data){
        state.token=data.token
    },
    getUserInfo(state,data){
        state.userInfo=data
    },
    clearLoginInfo(state){
        state.token=''
        state.userInfo=''
        removeToken()
    }
}
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const getters={}
export default{
    state,
    actions,
    getters,
    mutations
}