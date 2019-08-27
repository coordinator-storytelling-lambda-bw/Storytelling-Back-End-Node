
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('coordinator').del()
    .then(function () {
      // Inserts seed entries
      return knex('coordinator').insert([
        {
          firstName: 'Elan',
          lastName: 'Riznis',
          email: 'elan@gmail.com',
          username: 'eriznis',
          password: 'pass',
          country: 'Brazil',
          workTitle: 'Team Lead',
          type: 'coordinator'
        },
        {
          firstName: 'Deshauna',
          lastName: 'Rainer',
          email: 'Deshauna@gmail.com',
          username: 'drainer',
          password: 'pass',
          country: 'Philippines',
          workTitle: 'UI dev',
          type: 'coordinator'
        }
      ]);
    });
};
