import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let routes = [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hollywood/index',
      name: 'HollyWood',
      component: () => import('@/pages/index/index') // 懒加载引入方式
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test') // 懒加载引入方式
    },
    {
      path: '/hollywood/repo',
      name: 'Repo',
      component: () => import('@/pages/index/personal') // 懒加载引入方式
    },
    {
      path: '/hollywood/repo/orderlist',
      name: 'OrderList',
      component: () => import('@/pages/list/orderList') // 懒加载引入方式
    },
    {
      path: '/hollywood/repo/:name',
      name: 'RepoList',
      component: () => import('@/pages/list/repolist') // 懒加载引入方式
    },
    {
      path: '/hollywood/movielist',
      name: 'Movielist',
      component: () => import('@/pages/list/list') // 懒加载引入方式
    },
    {
      path: '/hollywood/detail',
      name: 'Details',
      component: () => import('@/pages/detail/vod') // 懒加载引入方式
    },
    {
      path: '/hollywood',
      redirect:'/hollywood/index'
    },
    {
      path: '/hollywood/iframe',
      name: 'Iframe',
      component: () => import('@/components/Iframe')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404')
      
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]

// 全局路由钩子
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('路由钩子')
  console.log(to)
  console.log(from)
  next()
})

export default router