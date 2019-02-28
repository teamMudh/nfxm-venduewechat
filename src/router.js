import Vue from 'vue'
import Router from 'vue-router'
import mudhRouter from '@/router/mudh/mudhRouter.js'
import zsRouter from '@/router/zs/zsRouter.js'
import loginRouter from '@/router/login.js'
import fundsQueryRouter from '@/router/user/fundsQuery/fundsQuery.js'
import userRouter from '@/router/user/user.js'

Vue.use(Router)

export default new Router({
    routes: [
        ...loginRouter,
        ...userRouter,
        ...fundsQueryRouter,
        ...mudhRouter,
        ...zsRouter,
    ]
})
