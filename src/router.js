import Vue from 'vue'
import Router from 'vue-router'
import mudhRouter from '@/router/mudh/mudhRouter.js'
import zsRouter from '@/router/zs/zsRouter.js'
import loginRouter from '@/router/login.js'
import fundsQueryRouter from '@/router/user/fundsQuery/fundsQuery.js'
import debitFundsQueryRouter from '@/router/user/debitFundsQuery/debitFundsQuery.js'
import userRouter from '@/router/user/user.js'
import restingOrderRouter from '@/router/restingOrder.js'
import restingOrderDetailRouter from '@/router/restingOrderDetail.js'

Vue.use(Router)

export default new Router({
    routes: [
        ...loginRouter,
        ...userRouter,
        ...fundsQueryRouter,
        ...debitFundsQueryRouter,
        ...mudhRouter,
        ...zsRouter,
        ...restingOrderRouter,
        ...restingOrderDetailRouter,
    ]
})
