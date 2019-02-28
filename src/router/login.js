
const login = resolve => require.ensure([], () => resolve(require('@/components/login.vue')), 'login') // 个人中心

const loginRouter =[
  {
    path:'/',
    name:'login',
    component:login
  },
]
export default loginRouter;
