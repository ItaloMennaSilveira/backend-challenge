import bookshelf from '../bookshelf'
import Role from './Role'
import Application from './Application'

export default bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  uuid: true,
  role: function () {
    return this.belongsTo(Role)
  },
  application: function () {
    return this.belongsToMany(Application)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.password
    delete attrs.role_id
    delete attrs.created_at
    delete attrs.updated_at

    return attrs
  }
})
