import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        commentary: Joi.string().optional(),
        user_id: Joi.string().guid().required(),
        job_id: Joi.string().guid().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        commentary: Joi.string().optional()
      }
    })
  }
}
