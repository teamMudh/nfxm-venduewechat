
const debitFundsQuery = resolve => require.ensure([], () => resolve(require('@/components/user/debitFundsQuery/debitFundsQuery.vue')), 'fundsQuery') //我的 资金查询

const debitFundsQueryRouter =[
  {
    path:'/debitFundsQuery',
    name:'debitFundsQuery',
    component:debitFundsQuery,
    // meta: { requiresAuth: true , rank:2}
  },
]
export default debitFundsQueryRouter;
