import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: () => import('@/pages/index/orderList') // 懒加载引入方式
    },
    {
      path: '/hollywood/repo/:name',
      name: 'RepoList',
      component: () => import('@/pages/list/list') // 懒加载引入方式
    },
    {
      path: '/hollywood/movielist',
      name: 'Movielist',
      component: () => import('@/pages/list/list') // 懒加载引入方式
    },
    {
      path: '/hollywood/vod',
      name: 'Vod',
      component: () => import('@/pages/detail/vod') // 懒加载引入方式
    },
    {
      path: '/hollywood',
      redirect:'/hollywood/index'
    }
  ]
})
