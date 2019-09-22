import Router from 'koa-router'
import UserController from '../controllers/users-controller'
import UserValidate from '../schemas/users-schemas'

const router = new Router()
const ctrl = new UserController()
const valid = new UserValidate()

router.post('/users/signup', valid.create(), ctrl.create)
router.post('/users/login', ctrl.login)
router.post('/users/register_candidate', valid.create(), ctrl.createCandidate)
router.get('/users', ctrl.index)
router.get('/users/:id', ctrl.show)
router.put('/users/:id', valid.update(), ctrl.update)
router.delete('/users/:id', ctrl.destroy)

export default router.routes()
