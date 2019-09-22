import User from '../../database/models/User'
import Job from '../../database/models/Job'
import Role from '../../database/models/Role'
import Application from '../../database/models/Application'
import JobFactory from './job-factory'
import {
  hashPassword,
  stringGenerator,
  emailGenerator
} from '../../src/utils'

export default async () => {
  const password = 'test123'

  let role = await new Role({ name: 'candidate' })
    .fetch({ require: true })

  let user = await new User({
    name: stringGenerator(),
    email: emailGenerator(),
    password: await hashPassword(password),
    role_id: role.id
  }).save()

  let job = await JobFactory()

  let application = await new Application({
    commentary: "Commentary Test",
    user_id: user.id,
    job_id: job.id
  }).save()

  return application
}
