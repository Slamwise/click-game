const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "users"
knex.schema
  // Make sure no "users" table exists
  // before trying to create new
  .hasTable('users')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('users', (table)  => {
          table.increments('token').primary()
          table.string('userName')
          table.integer('wins')
          table.integer('Losses')
          table.string('cookie')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    // .then(() => {
    //   // Log success message
    //   console.log('db created')
    // })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Create a table to list and delist online users"
knex.schema
  // Make sure the table exists
  .hasTable('onlineUsers')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('onlineUsers', (table)  => {
          table.integer('token').primary()
          table.string('userName')
          table.string('cookie')
        })
        .then(() => {
          // Log success message
          console.log('Table \'onlineUsers\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "users" table
// knex.select('*').from('users')
//   .then(data => console.log('data:', data))
//   .catch(err => console.log(err))

knex.select('*').from('onlineUsers')
  .then(data => console.log('online users:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex