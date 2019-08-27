
exports.up = function(knex) {
  return knex.schema.createTable('coordinator', tbl => {
      tbl.increments()
      tbl.string('firstName', 150).notNullable()
      tbl.string('lastName', 150).notNullable()
      tbl.string('email', 100).notNullable().unique()
      tbl.string('username', 200).notNullable().unique()
      tbl.string('password', 300).notNullable()
      tbl.string('country', 100).notNullable()
      tbl.string('workTitle', 200).notNullable()
      tbl.string('type', 100).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('coordinator')
};
