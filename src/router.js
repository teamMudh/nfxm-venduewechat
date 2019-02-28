import Vue from 'vue'
import Router from 'vue-router'
import mudhRouter from '@/router/mudh/mudhRouter.js'
import zsRouter from '@/router/zs/zsRouter.js'
import loginRouter from '@/router/login.js'
import fundsQueryRouter from '@/router/user/fundsQuery.js'

Vue.use(Router)

export default new Router({
    routes: [
        ...loginRouter,
        ...fundsQueryRouter,
        ...mudhRouter,
        ...zsRouter,
    ]
})
