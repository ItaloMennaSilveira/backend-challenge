export const up = (knex, Promise) =>
  knex.schema
    .createTable('applications', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('commentary')
      table.uuid('job_id')
      table.foreign('job_id').references('id').inTable('jobs')
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('applications')