// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
const { Model } = require('objection');

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
Model.knex(knex);

// Create a table in the database called "brands"
knex.schema
  .hasTable('brands')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('brands', (table)  => {
          table.increments('brandID').primary().index('brands_brandID_index')
          table.string('name')
          table.string('creator')
          table.integer('year')
          table.boolean('luxury')
          table.integer('rating')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Brands\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table brands: ${error}`)
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
          table.string('name').index('product_name_index')
          table.integer('price').index('product_price_index')
          table.string('material').index('product_material_index')
          table.string('category').index('product_category_index')
          table.string('color').index('product_color_index')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Products\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table products: ${error}`)
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
  .hasTable('drops')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('drops', (table)  => {
          table.increments('dropID').primary()
          table.integer('brandID')
          table.string('name')
          table.string('date')
          table.string('season')
        })
        .then(() => {
          // Log success message
          console.log('Table \'drops\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table drops: ${error}`)
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
module.exports = { knex, Model }