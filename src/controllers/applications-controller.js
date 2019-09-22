import Application from '../../database/models/Application'
import User from '../../database/models/User'
import Job from '../../database/models/Job'
import {
  BadRequest,
  NotFound,
  Unauthorized,
  InternalServerError,
  hashPassword,
  generateJWT
} from '../utils'

export default class Controller {
  async create(ctx) {
    const { body } = ctx.request
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    const authorizedUser = await new User({ id: body.user_id })
      .fetch({ withRelated: ['role'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    const roleName = authorizedUser.related('role').get('name')

    if (roleName != 'candidate') {
      throw new Unauthorized('Only role as candidate')
    }

    const job = await new Job({ id: body.job_id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    const application = await new Application({
      user_id: body.user_id,
      job_id: body.job_id,
      commentary: body.commentary
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = application;
  }

  async index(ctx) {
    const application = await new Application()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = application
  }

  async show(ctx) {
    const application = await new Application({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = application
  }

  async update(ctx) {
    const { body } = ctx.request
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    const application = await new Application({ id: ctx.params.id })
      .save({
        commentary: body.commentary
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = application
  }

  async destroy(ctx) {
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    await new Application({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}