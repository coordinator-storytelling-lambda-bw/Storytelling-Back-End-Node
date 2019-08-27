
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {
          story: "story 1",
          user_id: 1,
          type: 'coordinator',
          posted_by: 'Elan Riznis'
        },
        {
          story: "story 2",
          user_id: 1,
          type: 'coordinator',
          posted_by: 'Elan Riznis'
        }
      ]);
    });
};
