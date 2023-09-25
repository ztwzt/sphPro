# sphPro
#summary
api:    
    Mock.js:模拟数据
        // webpack--默认暴露 图片 json数据格式
        //mock数据:（请求的地址，请求参数）
        Mock.mock("/mock/banner.json",{code:200,data:banner}
    axios:二次封装axios,实现拦截器
        axios.create({baseUrl,timeOut})
        //请求拦截器 --发出请求之前
        axios.interceptors.request.use((config)=>{
            config.header.key=value
            return config
        })
        //响应拦截器--收到响应之前
        axios.interceptors.response.use(
            (res)=>{
                //进度条结束
                nprogess.done()
                //成功回调
                return res.data
            },
            (err)=>{
                //失败回调
                return Promise.reject(new Error('faile'))
            }
        )
    nprogess.js:实现进度条
        nprogress/nprogress.css--样式
    uuid:游客登录 限制路由--持久化 本地
    token:标识用户 获取用户信息 --持久化 本地
router:
    $route 是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等
    $router 是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，包含了所有的路由包含了许多关键的对象和属性。例如history对象 
    路由懒加载：
        当打包构建应用时，
        JavaScript 包会变得非常大，影响页面加载。
        如果我们能把不同路由对应的组件分割成不同的代码块，
        然后当路由被访问的时候才加载对应组件，
        这样就会更加高效。
        import Home from '../pages/Home' //直接引用加载
        component:()=>import('@/pages/Home')//路由懒加载
    重写路由方法：解决方法参数问题
    VueRouter.prototype.push=function(location,resolve,reject){
        if(resolve && reject){
        //call || apply相同点:都可以调用函数一次，都可以篡改函数上下文一次
        // 区别：call传递参数用逗号隔开，apply传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
        }
    }
    meta:路由元信息
    路由守卫：
        全局路由守卫：
            beforeEach()
                //当一个导航触发时，全局前置守卫按照创建顺序调用。
                //守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。
            beforeResolve()
                //所有组件内守卫和异步路由组件被解析之后调用
            afterEach()
                //对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
        独享路由守卫：
            beforeEnter() 
                //只在进入路由时触发
        组件内路由守卫：
            beforeRouteEnter
                // 在渲染该组件的对应路由被验证前调用
                // 不能获取组件实例 `this` ！
                // 因为当守卫执行时，组件实例还没被创建
            beforeRouteUpdate
                // 在当前路由改变，但是该组件被复用时调用
                // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
                // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
            beforeRouteLeave
                // 在导航离开渲染该组件的对应路由时调用
                // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
store:
    模块式开发
        modules:{
            home,
            search,
            detail,
            shopCar,
            user,
            trade
        }

App:
    优化ajax
main.js:
    api:
        //统一接受api接口函数
        import * as API from '@/api'
        //注册全局
        Vue.prototype.$API=API
    图片懒加载：
        //引入lazyload
        import VueLazyload from 'vue-lazyload'
        <img v-lazy="goods.defaultImg" />
    事件：
        注册全局组件
        注册全局插件
        注册全局事件总线
        注册路由
        beforeCreate()--生命周期函数
    element-ui:
        按需引入：babel.config.js
        "plugins": 
        [
            [
                "component",
                {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
                }
            ]
        ]   
vue.config.js:
    module.exports = defineConfig({
        productionSourceMap:false,//打包不需要map文件
        transpileDependencies: true,
        lintOnSave:false,
        devServer:{
            proxy:
            {
                'api':{
                    target:'http://gmall-h5-api.atguigu.cn', 
                    changeOrigin:true,
                    //pathRewrite:{'^/api':''},
                    }
            }
        }
    })
login:
    需要判断是否有toPath--query参数--redirect 实现跳转到登录前点击的页面
    let toPath=this.$route.query.redirect || '/home'
register:
    不用store 在组件内存储数据
typeNav:
    api:event.target.dataset //取得目标节点上的 :data—为前缀的参数
    声明式路由:需要加载大量组件逻辑易造成卡顿
    解决方法:
        事件委派+编程式路由导航 -- 解决获取参数
        限制操作次数：
            lodash:
                节流:规定时间间隔内只允许一次目标回调 methodName:throttle(f,time)
                防抖:规定时间间隔后才执行目标回调 methodName:debounce(f,time)
header:
    route参数问题：
        解决params参数可传可不传的问题(由于params参数在route中需要占位):
            route:path:"/Search/:keyword?"
            index:params:{keyword:''|| undefined}
    query参数:
carousel:
    swipper:
        在初始化swipper实例时，需要考虑swipper结构是否完整
        $nextTick(f)--在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
pagination:
    分页器实现:计算stratNum endNum
        1.pageNO
        2.pageSize
        3.total
        4.continues
home:
    组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。 
    组件的销毁操作是先父后子，销毁完成的顺序是先子后父。
search:
    beforeMount()--组件挂载之前可以拿到路由参数
    Object.assign(obj,obj1,boj2)--依靠参数名合并对象中的数据
    面包屑结构:分类展示参数数据
    参数：考虑子组件和兄弟组件参数
    ajax:参数可有可无，如果属性值为空则仍然带上该参数 undefined 则不带
    watch://监听路由信息
        $route(newValue,oldValue)
detail:
    zoom:实现放大镜效果
    鼠标事件：
        clientX和clientY与x，y一样的，都是客户区域坐标，指鼠标的坐标，以浏览器显示区域的左上角开始
        offsetX，offsetY 针对目标元素的左上角坐标（e.target）
        pageX， pageY相对页面左上角的距离
        screenX screenY 相对屏幕左上角的位置
    element.offsetWidth	返回该元素包括padding+border+content的宽度
    element.offsetHeight	返回该元素包括padding+border+content的高度
    异步请求：考虑服务器数据有没有回来 可能先返回undefine
    isNaN()//借助NaN 排除--非number类型数据运算结果为NAN
    async--返回一个promise
    vue是一个单页面应用，都是一个会话
    storage 不可以直接存储对象，转成json字符串
shopcart:
    //修改数量 axios=>Num 最终量 type 区分 cart 目标  节流
    handler:throttle(async function(type,disNum,cart){
        switch(type){
          case 'add':
              disNum=1
              break
          case 'minus':
              disNum=cart.skuNum > 1 ? -1 : 0
              break
          case 'change':
              if(isNaN(disNum) || disNum<1)
              {
                disNum=0
              }else{
                disNum=parseInt(disNum)-cart.skuNum
              }
              break
        }
        try{ 
         await this.$store.dispatch('addOrUpdateShopCar',{skuId:cart.skuId,skuNum:disNum})
         this.getData()
        }catch(error){
          error.message
        }
    },1000)
trade:
   array.find(item,f) 返回符合条件的数据
   QCode:RCode.toDataURL(this.payInfo.codeUrl)//生成二维码
   获取支付状态:不断向服务器发送请求确认支付状态
pay:
    QCode:RCode.toDataURL(this.payInfo.codeUrl)//生成二维码
    获取支付状态:不断向服务器发送请求确认支付状态
paySuccess: //组件内守卫  
    beforeRouteEnter(to,from,next){
      //进入组件前
      //不能this 因为当前路由实例还没被创建
      if(from.path=='pay')
      {
        next()
      }else{
        next(false)
      }
    },
    beforeRouteUpdate(to,from,next){
      //当前组件被复用时调用
      //可以this
    },
    beforeRouteLeave(to,from,next){
      //离开组件时
      //可以this
    }
拓展：组件间通讯
    自定义事件：组件标签 使用原生事件 @click.native="event"
    原生DOM事件：原生标签 自定义事件（没有意义，没办法触发$emit()）
    v-model(组件通信方式的一种):
        可以通过value 和 @input 实现
        实现父子组件数据同步：
            //原生input 事件每次输入出触发
            <input :value="msg" @input="msg=$event.target.value"/>父组件标签
            //自定义"input"事件
            <test :value='msg' @input="msg=$event"></test>
            <test v-model="msg"></test>//子组件标签
    属性修饰符(组件通信方式的一种)：sync
        :money.sync --代表父组件传递一个props['money'] 
                    并且绑定一个update:money 事件
    $attr：组件本身的一个属性，可以获得父组件传递的所有props属性
    $listeners:组件本身的一个属性，可以获得父组件传递的自定义事件    
    $ref:获取某一个组件
    $children:获取所有的子组件实例对象，进而可以操作子组件的数据和方法
    $parent:获取所有的父组件实例对象，进而可以操作父组件的数据和方法
    组件间通讯的六种方式：
        1.props:父=>子
        2.自定义事件：父<=子
        3.pubsub :all
        4.全局事件总线:all
        5.vuex :all
        6.插槽：改变子组件结构
            默认插槽：<slot></slot>
            具名插槽：<slot name=""></slot>
            作用域插槽：<slot scope="atguigu"></slot> 回显数据
    


    

     



        
        
    
