
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('save_story').del()
    .then(function () {
      // Inserts seed entries
      return knex('save_story').insert([
        {
          user_id: 1,
          story_id: 1
        }
      ]);
    });
};
