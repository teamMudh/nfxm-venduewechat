
const restingOrder = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/restingOrder/restingOrder.vue')), 'restingOrder') // 个人中心

const restingOrderRouter =[
  {
    path:'/restingOrder',
    name:'restingOrder',
    component:restingOrder
  },
]
export default restingOrderRouter;
