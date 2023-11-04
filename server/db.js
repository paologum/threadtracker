// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
  typeCast: (field, next) => {
    if (field.type === 'TINY' && field.length === 1) {
      return field.string() === '1'; // 1 for true, 0 for false
    }
    return next();
  },
})

// Create a table in the database called "brands"
knex.schema
  .hasTable('brands')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('brands', (table)  => {
          table.increments('brandID').primary()
          table.string('name')
          table.string('creator')
          table.integer('year')
          table.string('luxury')
          table.integer('rating')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Brands\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
knex.schema
  .hasTable('products')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('products', (table)  => {
          table.increments('productID').primary()
          table.integer('dropID')
          table.integer('brandID')
          table.string('name')
          table.integer('price')
          table.string('material')
          table.string('category')
          table.string('color')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Products\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Export the database
module.exports = knex