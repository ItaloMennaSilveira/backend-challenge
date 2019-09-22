import Job from '../../database/models/Job'
import { stringGenerator } from '../../src/utils'

export default async () => {

  const job = await new Job({
    description: stringGenerator()
  }).save()

  return job
}