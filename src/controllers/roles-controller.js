import Role from '../../database/models/Role'
import { InternalServerError, NotFound, BadRequest, Unauthorized } from '../utils'

class Controller {
  async index (ctx) {
    const roles = await new Role()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = roles
  }

  async show (ctx) {
    const role = await new Role({ id: ctx.params.id })
      .fetch({ require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = role
  }

  async create (ctx) {
    const { body } = ctx.request
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    const role = await new Role({
      name: body.name
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = role
  }

  async update (ctx) {
    const { body } = ctx.request
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    const role = await new Role({ id: ctx.params.id })
      .save({
        name: body.name
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = role
  }

  async destroy (ctx) {
    const { user } = ctx.state

    if (user.sub.roleName != 'admin') {
      throw new Unauthorized('You are not ADMIN')
    }

    await new Role({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}

export default Controller
