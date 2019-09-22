import bookshelf from '../bookshelf'
import Application from './Application'

export default bookshelf.Model.extend({
  tableName: 'jobs',
  hasTimestamps: true,
  uuid: true,
  application: function () {
    return this.belongsToMany(Application)
  }
})
