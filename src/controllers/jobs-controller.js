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

    const job = await new Job({
      description: body.description
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = job.attributes;
  }

  async index(ctx) {
    const jobs = await new Job()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = jobs
  }

  async show(ctx) {
    const job = await new Job({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = job
  }

  async update(ctx) {
    const { body } = ctx.request
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    const job = await new Job({ id: ctx.params.id })
      .save({
        description: body.description
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = job
  }

  async destroy (ctx) {
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    await new Job({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
