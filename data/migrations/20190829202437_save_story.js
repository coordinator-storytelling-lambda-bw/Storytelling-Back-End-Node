
exports.up = function(knex) {
    return knex.schema.createTable('save_story', tbl => {
        tbl.increments()
        tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('coordinator')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        tbl.integer('story_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('save_story')
};
