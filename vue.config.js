const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,//打包不需要map文件
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      'api':{
        target:'http://gmall-h5-api.atguigu.cn', 
        changeOrigin:true,
        //pathRewrite:{'^/api':''},
      }
    }
  }
})
