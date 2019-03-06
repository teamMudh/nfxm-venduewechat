
const index = resolve => require.ensure([], () => resolve(require('@/components/index/index.vue')), 'index') // 个人中心
const commoditydetail = resolve => require.ensure([], () => resolve(require('@/components/index/commoditydetail.vue')), 'commoditydetail') // 行情详情
const billApplyList = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/billApply/billApplyList.vue')), 'billApplyList') // 个人中心
const billApplyDetail = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/billApply/billApplyDetail.vue')), 'billApplyDetail') // 个人中心
const acceptanceList = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/acceptance/acceptanceList.vue')), 'acceptanceList') // 个人中心
const acceptanceDetail = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/acceptance/acceptanceDetail.vue')), 'acceptanceDetail') // 个人中心

const mudhRouter =[
  {
    path:'/index',
    name:'index',
    component:index,
    meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/commoditydetail',
    name:'commoditydetail',
    component:commoditydetail,
    meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/billApplyList',
    name:'billApplyList',
    component:billApplyList,
    meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/billApplyDetail',
    name:'billApplyDetail',
    component:billApplyDetail,
    meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/acceptanceList',
    name:'acceptanceList',
    component:acceptanceList,
    meta: { requiresAuth: true , rank:2}
  },
  {
    path:'/acceptanceDetail',
    name:'acceptanceDetail',
    component:acceptanceDetail,
    meta: { requiresAuth: true , rank:2}
  },
]
export default mudhRouter;
