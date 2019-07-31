import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let routes = [
    {
      path: '/',
      //name: 'HelloWorld',
      //component: HelloWorld,
      redirect: { path: '/hollywood/index' }
    },
    {
      path: '/hollywood/index',
      name: 'Index',
      component: () => import('@/pages/index/index'), // 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test'), // 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/hollywood/repo',
      name: 'Repo',
      component: () => import('@/pages/index/personal'), // 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/hollywood/repo/orderlist',
      name: 'OrderList',
      component: () => import('@/pages/list/orderList'), // 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/hollywood/repo/:name',
      name: 'RepoList',
      component: () => import('@/pages/list/repolist'),// 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/hollywood/movielist',
      name: 'Movielist',
      component: () => import('@/pages/list/list'), // 懒加载引入方式
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/hollywood/detail',
      name: 'Details',
      component: () => import('@/pages/detail/vod'), // 懒加载引入方式
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/hollywood',
      redirect:'/hollywood/index'
    },
    {
      path: '/hollywood/iframe',
      name: 'Iframe',
      component: () => import('@/components/Iframe'),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404'),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]

// 全局路由钩子
const router = new Router({
  //mode: 'history',  默认hash模式
  routes
})

router.beforeEach((to, from, next) => {
  console.log('路由钩子')
  console.log(to)
  console.log(from)
  if(to.name == 'Movielist'){
    if(from.name == 'Details'){
      to.meta.isBack = true;
    }else{
      to.meta.isBack = false;
    } 
  }
  next()
})

export default router