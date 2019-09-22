import bookshelf from '../bookshelf'
import User from './User'
import Job from './Job'

export default bookshelf.Model.extend({
  tableName: 'applications',
  hasTimestamps: true,
  uuid: true,
  user: function () {
    return this.belongsToMany(User)
  },
  job: function () {
    return this.belongsToMany(Job)
  }
})