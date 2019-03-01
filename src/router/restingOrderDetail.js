
const restingOrderDetail = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/restingOrder/restingOrderDetail.vue')), 'restingOrder') // 个人中心

const restingOrderDetailRouter =[
  {
    path:'/restingOrderDetail',
    name:'restingOrderDetail',
    component:restingOrderDetail
  },
]
export default restingOrderDetailRouter;
