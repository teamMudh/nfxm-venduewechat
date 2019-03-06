
import contractQuery from '@/components/dataQuery/contractQuery/contractQuery.vue'
import contractDetails from '@/components/dataQuery/contractQuery/contractDetails.vue'
import entrustQuery from '@/components/dataQuery/entrustQuery/entrustQuery.vue'
import tradeQuery from '@/components/dataQuery/tradeQuery/tradeQuery.vue'

const dataQuery = resolve => require.ensure([], () => resolve(require('@/components/dataQuery/dataQuery.vue')), 'dataQuery') // 个人中心

const zsRouter =[
  {
    path:'/dataQuery',
    name:'dataQuery',
    component:dataQuery,
    meta: { requiresAuth: true , rank:2}
  },{
    path:'/contractQuery',
    name:'contractQuery',
    component:contractQuery,
  },{
    path:'/contractDetails',
    name:'contractDetails',
    component:contractDetails,
  },{
    path:'/entrustQuery',
    name:'entrustQuery',
    component:entrustQuery,
  },{
    path:'/tradeQuery',
    name:'tradeQuery',
    component:tradeQuery,
  }
]
export default zsRouter;
