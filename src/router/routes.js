//引入路由组件
// import Home from '../pages/Home' 直接引用加载
import Login from '../pages/Login'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import groupOrder from '@/pages/Center/groupOrder'
import myOrder from '@/pages/Center/myOrder'
//路由懒加载
// 当打包构建应用时，
// JavaScript 包会变得非常大，
// 影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，
// 这样就会更加高效。
// import Home from '../pages/Home' 直接引用加载
// const foo=()=>{
//     return import('@/pages/Home')
// }
//路由信息
  export default  [
        {
            path:"/home",
            component:()=>import('@/pages/Home'),//路由懒加载
            meta:{show:true}
        },
        {
            path:"/Login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/Search/:keyword?",//指定params 参数keyword 可传可不传
            component:Search,
            meta:{show:true},
            name:'Search',
            //props 简化路由使用参数    
            //props:true //只能传params 参数
            //props:{a:'a'} 额外传参
            // props(){
            //     return{

            //     }
            // }能传params query参数
            
        },
        {
            path:"/Register",
            component:Register,
            meta:{show:false}
        },
        {
            path:"/Detail/:skuId",
            component:Detail,
            meta:{show:true}
        },
        {
            path:'/AddCartSuccess',
            component:AddCartSuccess,
            meta:{show:true},
            name:'AddCartSuccess'
        },
        {
            path:'/ShopCart',
            component:ShopCart,
            meta:{show:true},
            name:'ShopCart'
        },
        {
            path:'/trade',
            component:Trade,
            meta:{show:true},
            name:'trade',
            beforeEnter:(to,from,next)=>{
                //必须是从购物车来
                if(from.path=='/ShopCart'){
                    next()
                }else{
                    //中断路由守卫，停留在当前  
                    next(false)
                }
            }
        },
        {
            path:'/paysuccess',
            component:PaySuccess,
            meta:{show:true},
            name:'paysuccess'
        },
        {
            path:'/pay',
            component:Pay,
            meta:{show:true},
            name:'pay',
            beforeEnter:(to,from,next)=>{
                //
                if(from.path=='/trade'){
                    next()
                }else{
                    //
                    next(false)
                }
            }

        },
        {
            path:'/center',
            component:Center,
            meta:{show:true},
            name:'center',
            children:[
                {
                    path:'myOrder',
                    component:myOrder
                },
                {
                    path:'groupOrder',
                    component:groupOrder
                },
                {//重定向
                    path:'/center',
                    redirect:'/center/myOrder'
                }
            ]
            
        },
        {//重定向
            path:"*",
            redirect:'/home'
        }
    ]