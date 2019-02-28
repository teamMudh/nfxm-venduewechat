
const dataQuery = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/dataQuery.vue')), 'dataQuery') // 个人中心

const zsRouter =[
  {
    path:'/dataQuery',
    name:'dataQuery',
    component:dataQuery,
    meta: { requiresAuth: true , rank:2}
  },
]
export default zsRouter;
