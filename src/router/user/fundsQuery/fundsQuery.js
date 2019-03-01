
const fundsQuery = resolve => require.ensure([], () => resolve(require('@/components/user/fundsQuery/fundsQuery.vue')), 'fundsQuery') //我的 资金查询

const fundsQueryRouter =[
  {
    path:'/fundsQuery',
    name:'fundsQuery',
    component:fundsQuery,
    // meta: { requiresAuth: true , rank:2}
  },
]
export default fundsQueryRouter;
