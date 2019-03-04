
const login = resolve => require.ensure([], () => resolve(require('@/components/login.vue')), 'login') //我的 资金查询
const user = resolve => require.ensure([], () => resolve(require('@/components/user/user.vue')), 'user') //我的 资金查询
const debitFundsQuery = resolve => require.ensure([], () => resolve(require('@/components/user/debitFundsQuery/debitFundsQuery.vue')), 'debitFundsQuery') //我的 资金查询
const fundsQuery = resolve => require.ensure([], () => resolve(require('@/components/user/fundsQuery/fundsQuery.vue')), 'fundsQuery') //我的 资金查询
const restingOrder = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/restingOrder/restingOrder.vue')), 'restingOrder') //我的 资金查询
const restingOrderDetail = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/restingOrder/restingOrderDetail.vue')), 'restingOrderDetail') //我的 资金查询

const userRouter =[
  {
    path:'/',
    name:'login',
    component:login
  },
  {
    path:'/user',
    name:'user',
    component:user,
    // meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/debitFundsQuery',
    name:'debitFundsQuery',
    component:debitFundsQuery,
    // meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/fundsQuery',
    name:'fundsQuery',
    component:fundsQuery,
    // meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/restingOrder',
    name:'restingOrder',
    component:restingOrder
  },
  {
    path:'/restingOrderDetail',
    name:'restingOrderDetail',
    component:restingOrderDetail
  },
]
export default userRouter;
