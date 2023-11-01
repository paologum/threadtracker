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

// Create a table in the database called "books"
knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('brands')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
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
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('products')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return knex.schema.createTable('products', (table)  => {
          table.increments('productID').primary()
          table.string('name')
          table.integer('brandID')
          table.integer('price')
          table.date('releaseDate')
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