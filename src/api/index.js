//统一管理接口
import axios from './request'
import mockRequests from './mockAjax'
//三级联动的接口 /api/product/getBaseCategoryList get
export const reqCategoryList=()=>{
    //发请求:axios return Promise 对象
   return axios({url:'/product/getBaseCategoryList',method:'get'})
}
//获取banner(mock)
export const reqGetBannerList=()=>mockRequests.get('/banner')
//获取floor数据
export const reqFloorList=()=>mockRequests.get("/floor")
//获取搜索模块接口 /api/list 带参 post params--对象 至少是个null对象
export const reqGetSearchInfo =(params)=>axios({
    url:"/list",
    method:"post",
    data:params//post 请求传参
})
//detail /api/item/{ skuId }
export const reqGoodsInfo=(skuId)=>axios({
    url:`/item/${skuId}`, //get 请求传参
    method:'get'
})
///api/cart/addToCart/{ skuId }/{ skuNum }--属性 添加到购物车
export const  reqAddOrUpdateShopCar=(skuId,skuNum)=>axios({
    url:`cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
})
//获取购物车列表
export const reqGetCarList=()=>axios({
    url:'cart/cartList',
    method:'get'
})
//删除购物车结构 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById=(skuId)=>axios({
    url:`cart/deleteCart/${skuId}`,
    method:'delete'
})
//修改产品状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckById=(skuId,isChecked)=>axios({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>axios({
    url:`/user/passport/sendCode/${phone}`
})
//完成注册 /api/user/passport/register
export const register=(params)=>axios({
    url:'/user/passport/register',
    data:params,
    method:'post'
})
//登录
export const reqUserLogin=(params)=>axios({
    url:'/user/passport/login',
    data:params,
    method:'post'
})
//token 获取用户信息 /user/passport/auth/getUserInfo
export const getUserInfo=()=>axios({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})
//退出登录/api/user/passport/logout
export const reqLoginOut=()=>axios({
    url:'/user/passport/logout',
    method:'get'
})
//获取结算清单数据 /mock/trade
export const reqGetTradeList=()=>axios({
    url:'/order/auth/trade',
    method:'get'
   })
//获取结算清单地址 /api/user/userAddress/auth/findUserAddressList
export const reqGetAddressList=()=>axios({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})
//提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqsubmitOrder=(tradeNo,params)=>axios({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data:params,
    method:'post'
})
//获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqGetPayInfo=(orderId)=>axios({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})
//获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const payStatus=(orderId)=>axios({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
//获取个人中心数据 /api/order/auth/{page}/{limit}
export const reqGetOrderList=(page,limit)=>axios({
    method:'get',
    url:`/order/auth/${page}/${limit}`
})