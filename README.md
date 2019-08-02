# SITV EPG3.0 HollyWood

|Author|Project|
|-|-|
|shanjing|SITV EPG3.0 点播系统(VUE)|

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目目录结构
- sitv_hollywood
  - build #构建脚本目录
    - build.js #生产环境构建脚本
    - check-versions.js
    - logo.png
    - utils.js #构建相关工具方法
    - vue-loader.conf.js
    - webpack.base.conf.js  #webpack基础配置
    - webpack.dev.conf.js   #webpack开发环境配置
    - webpack.prod.conf.js  #webpack生产环境配置
  - config #配置目录，包括端口号等
    - dev.env.js #开发环境变量
    - index.js #项目配置文件
    - prod.env.js #生产环境变量
  - src #开发源码目录
    - api
        - auth
          - auth.service.js  #鉴权api
        - data
          - data.service.js  #数据api
        - user
          - user.service.js  #获取用户信息
        - global-config.js #全局常量配置
        - http.js #axios 简单封装
        - url-config.js #接口地址配置
        - utils.js #全局通用方法
    - assets #（放置一些图片，如logo等）
      - css
        - animations.css #动画css
        - app.css #全局css
        - index.styl #styl全局变量
        - reset.css #样式重置
      - images
      - js
        - logo.png
    - components #公共组件目录
        - Carousel.vue #轮播图组件
        - DetailHead.vue #详情页头部组件
        - HandleWindow.vue #弹出层组件
        - Iframe.vue #iframe组件(暂时未用 有需求跳转外链或者epg其他系统使用)
        - Poster.vue #海报组件(集成获得焦点滚动、删除、左上角角标 按需求使用 页面上海报链接均使用此组件) 
        - ScrollList.vue #瀑布流组件(用于数据量较大 图片较多时 分批次刷新数据 控制滚动距离)
        - YaoFeng.vue #腰封组件
        - YourLike.vue #猜你喜欢
        - SeriesContainer.vue #多剧集底部
        - Toast.vue #Toast组件
        - Toast.js #Toast安装js
    - pages #页面
      - detail
        - vod.vue #详情页
      - index
        - index.vue  #首页
        - personal.vue #个人中心
      - list
        - list.vue #影片列表页
        - orderList.vue #订购列表页
        - repoList.vue #历史或者收藏列表页
      - 404.vue #404页面
      - test.vue #测试专用页面（可以删除）
    - router
      - index.js #路由
    - vuex
      - store.js #vue状态管理模式
    - App.vue #根组件
    - main.js #入口js文件
  - static  #纯静态资源，不会被wabpack构建
    - css
  - .babelrc
  - .editorconfig
  - .gitignore
  - .postcssrc.js
  - README.md
  - index.html #入口页面
  - package-lock.json 
  - package.json #项目配置文件

## 主要插件
|PostCSS|axios&&vue-axios|vue-router|vuex&&vuex-persistedstate|stylus&&style-loader|animate.css
|-|-|-|-|-|-|
|转换 CSS 代码的工具|基于 promise 的 HTTP 库|Vue.js 官方的路由管理器|Vue.js 官方的状态管理&&状态持久化|CSS 的预处理框架|animate库（配合vue transtiion使用）|



## 注意事项

1. 针对发布生产，有虚拟路径时，便出现js、css均报错404 在config的index.js文件中，将build assetsPublicPath修改为'./'
2. 
