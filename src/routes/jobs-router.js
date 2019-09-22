import Router from 'koa-router'
import JobController from '../controllers/jobs-controller'
import JobsValidate from '../schemas/jobs-schemas'

const router = new Router()
const ctrl = new JobController()
const valid = new JobsValidate()

router.post('/jobs', valid.create(), ctrl.create)
router.get('/jobs', ctrl.index)
router.get('/jobs/:id', ctrl.show)
router.put('/jobs/:id', valid.update(), ctrl.update)
router.delete('/jobs/:id', ctrl.destroy)

export default router.routes()