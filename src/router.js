import Vue from 'vue'
import Router from 'vue-router'
import mudhRouter from '@/router/mudh/mudhRouter.js'
import zsRouter from '@/router/zs/zsRouter.js'

const HelloWorld = resolve => require.ensure([], () => resolve(require('@/components/HelloWorld.vue')), 'HelloWorld') // 个人中心


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    ...mudhRouter,
    ...zsRouter,
  ]
})
