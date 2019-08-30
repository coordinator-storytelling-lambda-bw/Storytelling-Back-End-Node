
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {
          title: 'story 1 title',
          country: "Bolivia",
          story: "story 1",
          user_id: 1,
          type: 'coordinator',
          posted_by: 'Elan Riznis'
        },
        {
          title: 'story 2 title',
          country: "Brazil",
          story: "story 2",
          user_id: 1,
          type: 'donor',
          posted_by: 'Elan Riznis'
        }
      ]);
    });
};

// created at, title, country
