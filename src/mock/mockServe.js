//先引入mockjs
import Mock from  'mockjs'
import banner from './banner.json'//没有对外暴露 webpack--默认暴露 图片 json数据格式
import floor from './floor.json'
//mock数据:（请求的地址，请求参数）
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
//export 
//mock需要的图片放到public 文件夹中【public 文件夹在打包的时候，会把相应的资源原封不动的打包到dist文件夹中】
