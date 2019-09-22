export const up = (knex, Promise) =>
  knex.schema.table('users', function(table) {
    table.string('phone')
    table.string('cpf').unique()
  })

export const down = (knex, Promise) =>
  knex.schema.table('users', function(table) {
    table.dropColumn('phone')
    table.dropColumn('cpf')
  })
