
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('donor').del()
    .then(function () {
      // Inserts seed entries
      return knex('donor').insert([
        {
          firstName: 'Jeris',
          lastName: 'Manning',
          email: 'jeris@gmail.com',
          username: 'jmanning',
          password: 'pass',
          country: 'Zimbabwe',
          type: 'donor'
        },
        {
          firstName: 'Logan',
          lastName: 'Karnes',
          email: 'logan@gmail.com',
          username: 'lkarnes',
          password: 'pass',
          country: 'Mongolia',
          type: 'donor'
        }
      ]);
    });
};
