//对于axios进行二次封装--使用请求和响应拦截器
import axios from 'axios'
//引入进度条
import nprogess from 'nprogress'
//映引入进度条样式
import 'nprogress/nprogress.css'
import store from '../store'
//创建一个axios实例对象
 const requests =axios.create({
    //基础路径
    baseURL:'api',
    timeout:5000,//5s

})
//请求拦截器 --发出请求之前
requests.interceptors.request.use((config)=>{
    //进度条开始
    nprogess.start()    
    if(store.state.detail.uuid_token){
        //请求头加字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //是否徐需要携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    //config:配置对象，包含Headers 请求头
    return config;
})

//响应拦截器--收到响应之前
requests.interceptors.response.use(
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
export default requests