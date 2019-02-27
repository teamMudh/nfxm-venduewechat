
const mymenu = resolve => require.ensure([], () => resolve(require('@/components/mymenu.vue')), 'mymenu') // 个人中心

const mudhRouter =[
  {
    path:'/mymenu',
    name:'mymenu',
    component:mymenu,
    meta: { requiresAuth: true , rank:2}
  },
]
export default mudhRouter;