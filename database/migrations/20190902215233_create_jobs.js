export const up = (knex, Promise) =>
  knex.schema
    .createTable('jobs', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('description').notNullable()
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('jobs')