import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
Vue.use(VueRouter);
//导入路由配置
import routes from './routes'
//备份push方法
 let originPush=VueRouter.prototype.push;
 let originReplace=VueRouter.prototype.replace;
 //重写路由方法 
 VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject)
    {
        //call || apply相同点:都可以调用函数一次，都可以篡改函数上下文一次
        // 区别：call传递参数用逗号隔开，apply传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
 }
 VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject)
    {
        //call || apply相同点:都可以调用函数一次，都可以篡改函数上下文一次
        // 区别：call传递参数用逗号隔开，apply传递数组
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
 }
//配置路由
const router=new VueRouter({
    routes,
    scrollBehavior(to,from,scrollBehavior){
        //vue 滚动行为
        //x y 返回值代表滚动条位置
        return {y:0}
    }
})
//全局前置守卫 登录跳转问题 
router.beforeEach(async (to,from,next)=>{
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    console.log(token)
    if(token)
    {
        //是否为toPath login 页面
        if(to.path=='/login' || to.path=='/register' )
        {
            next('/')
        }else{
            //有用户信息
            if(name)
            {
                next()
            }else{
                try{
                    //获取用户信息成功
                   await store.dispatch('getUserInfo')
                   next()
                }catch(error){
                  //清除token token 失效
                    await store.dispatch('reqLoginOut')
                    next('/home')
                }
            }
        }
    }else{
        //未登录
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录时候想去的地方 作为query参数
            next('/login?redirect='+toPath)
        }
        next()
    }
})  
export default router
//  注册完路由，所有组件都有$route $router