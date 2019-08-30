localPbConnection = {
    host: 'localhost',
    database: 'Database',
    user: process.env.DB_USERS,
    password: process.env.DB_PASS
  }

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/storytelling.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || localPbConnection,
        migrations: {
          directory: './data/migrations',
        },
        seeds: {
          directory: './data/seeds',
        },
      }
}


// pool: {
//   afterCreate: (conn, done) => {
//   conn.run('PRAGMA foreign_keys = ON', done);
//  }
// },