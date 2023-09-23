<template>
    <!-- 商品分类导航 -->
<div class="type-nav">
     <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow"> 
            <h2 class="all">全部商品分类</h2>
            <!-- 过度动画 -->
            <transition name="sort">
                <!-- 一级 -->
               <div class="sort" v-show="show">
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                        <h3 @mouseenter="changeIndex(index)">
                            <a :data-categoryname="c1.categoryName" :data-categoryId1="c1.categoryId">{{ c1.categoryName }}</a>
                        </h3>
                        <!-- 二、三级 -->
                        <div class="item-list clearfix" :style="{display:currentIndex==index}">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryname="c2.categoryName" :data-categoryId2="c2.categoryId">{{ c2.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryname="c3.categoryName" :data-categoryId3="c3.categoryId">{{ c3.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </transition>
            
        </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//引入lodash 按需引入
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data(){
        return{
            //鼠标位置
            currentIndex:-1,
            show:true
        }
    },
   methods:{
        // changeIndex(index){
        //     //正常情况：鼠标进入每一个分类都会都会触发鼠标进入事件 
        //     //非正常情况：操作过快，浏览器反应不过来，只有部分分类触发鼠标事件
        //     //如果当前回调函数中存在大量业务，有可能出现卡顿现象
        //     this.currentIndex=index
        // },
        changeIndex:throttle(function(index){//别用箭头函数
            this.currentIndex=index
        },50),
        goSearch(event){
            //声明式路由导航会造成卡顿
            //做好的解决方法 事件委派+编程式路由导航 -- 解决获取参数
            let element=event.target
            let {categoryname,categoryid1,categoryid2,categoryid3}=element.dataset//例如，一个 data-abc-def 属性对应于 dataset.abcDef。
            if(categoryname){
                //整理路由参数
                let location={name:'Search'}
                let query={categoryname:categoryname}
                if(categoryid1){
                    query.categoryId1=categoryid1
            }else if(categoryid2){
                    query.categoryId2=categoryid2
            }else{
                query.categoryId3=categoryid3
            }
            //如果路由跳转的时候，有params参数，要捎带过去
            if(this.$route.params){
            location.params=this.$route.params
            location.query=query
            this.$router.push(location)
            }
        }
    },
    enterShow(){
        //鼠标移入，展示nav
        this.show=true
    },
    leaveShow(){
        this.currentIndex=-1
        if(this.$route.path!='/home'){ 
        this.show=false
        }
    }
},
    mounted() {
        //组件挂载完毕
        if(this.$route.path!='/home'){
           this.show=false
        }
    },
    computed: {
        ...mapState({
            //右侧的是一个函数，当使用这个计算属性的时候，右侧的函数立即会计算一次
            //注入一个参数state,即为一个大仓库中的数据
            categoryList: state => state.home.categoryList
        })
    }
   }
</script>

<style lang="less" scoped>
.type-nav {
    .all-sort-list2 {
    overflow: hidden;
    height: 480px;
}
    border-bottom: 2px solid #e1251b;
    .cur{
        background-color:aqua;
    }
    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 477px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
        //过度动画
        .sort-enter{
            height: 0px;
        }
        .sort-enter-to{
            height: 477px;
        }
        .sort-enter-active{
            transition: all .5s linear;
        }
    }
}
</style>