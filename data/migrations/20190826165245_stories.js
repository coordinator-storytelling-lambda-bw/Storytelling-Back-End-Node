
exports.up = function(knex) {
    return knex.schema.createTable('stories', tbl => {
        tbl.increments()
        tbl.string('story', 1000).notNullable()
        tbl.integer('user_id').notNullable()
        tbl.string('type', 100).notNullable()
        tbl.string('posted_by', 100).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stories')
};
