
exports.up = function(knex) {
    return knex.schema.createTable('stories', tbl => {
        tbl.increments()
        tbl.string('story', 1000).notNullable()
        tbl.string('country').notNullable()
        tbl.string('title', 100).notNullable().unique()
        tbl.timestamps(true, true)
        tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('coordinator')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        tbl.string('type', 100).notNullable()
        tbl.string('posted_by', 100).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stories')
};
