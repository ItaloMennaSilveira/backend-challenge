import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        description: Joi.string().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        description: Joi.string().required()
      }
    })
  }
}
