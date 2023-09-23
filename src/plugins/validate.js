//表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from './zh_CN'
Vue.use(VeeValidate)
//表单验证
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field) => `${field}必须与密码相同`//修改内置规则的messag,让确认密码和密码相同
    },
    attributes:{//给校验的filed属性映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'确认密码',
        agree:'协议'
    }
})
//自定义校验规则
// VeeValidate.Validator.extend("ty",{
//     Validate:(value)=>{
//         return value
//     },
//     getMessage:(field)=>field + "必须同意"
// })