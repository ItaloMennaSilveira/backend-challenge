import Router from 'koa-router'
import users from './users-router'
import roles from './roles-router'
import jobs from './jobs-router'
import applications from './applications-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(roles)
api.use(jobs)
api.use(applications)

router.use('/v1', api.routes())

export default router
