import Router from 'koa-router'
import ApplicationController from '../controllers/applications-controller'
import ApplicationValidade from '../schemas/applications-schemas'

const router = new Router()
const ctrl   = new ApplicationController()
const valid  = new ApplicationValidade()

router.post('/applications', valid.create(), ctrl.create)
router.get('/applications', ctrl.index)
router.get('/applications/:id', ctrl.show)
router.put('/applications/:id', valid.update(), ctrl.update)
router.delete('/applications/:id', ctrl.destroy)

export default router.routes()
