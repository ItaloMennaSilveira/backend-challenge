import bookshelf from '../bookshelf'
import User from './User'

export default bookshelf.Model.extend({
  tableName: 'roles',
  uuid: true,
  user: function () {
    return this.hasMany(User)
  }
})
