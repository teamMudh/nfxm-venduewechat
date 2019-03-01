
const user = resolve => require.ensure([], () => resolve(require('@/components/user/user.vue')), 'user') //我的 资金查询

const userRouter =[
  {
    path:'/user',
    name:'user',
    component:user,
    // meta: { requiresAuth: true , rank:2}
  },
]
export default userRouter;
