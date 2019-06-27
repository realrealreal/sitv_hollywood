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
      path: '/index',
      name: 'HollyWood',
      component: () => import('@/pages/index/index') // 懒加载引入方式
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test') // 懒加载引入方式
    },
    {
      path: '/repo',
      name: 'Repo',
      component: () => import('@/pages/index/personal') // 懒加载引入方式
    },
    {
      path: '/repo/:name/:type',
      name: 'RepoList',
      component: () => import('@/pages/list/list') // 懒加载引入方式
    },
    {
      path: '/list/:type',
      name: 'VodList',
      component: () => import('@/pages/list/list') // 懒加载引入方式
    },
    {
      path: '/vod/:programcode',
      name: 'Vod',
      component: () => import('@/pages/detail/vod') // 懒加载引入方式
    },
  ]
})
