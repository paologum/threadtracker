
// Import database
const { assertBrandType } = require('../types');
const knex = require('../db');

// Create new brand 
exports.createBrand = (req, res) => {
  // console.log('Received payload:', req.body);
  // console.log('type: ', typeof req.body);
  const contents = req.body;
  try {
    assertBrandType(contents);
  } catch (error) {
      console.log(`There was an error creating a brand from the request with error: `, error );
      process.exit(1);
  }
  // Add new brand to database
  knex('brands')
    .insert({ // insert new record, a brand
      'name': contents.brandName,
      'creator': contents.brandCreator,
      'year': contents.startingDate,
      'luxury': contents.luxury ? "true" : "false",
      'rating': contents.rating
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Brand \'${contents.name}\' by ${contents.creator} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${contents.name} brand: ${err}` })
    })
}

// Remove specific brand
exports.deleteBrand = async (req, res) => {
  // Find specific brand in the database and remove it
  // console.log('Received payload: ', req.body);
  knex('brands')
    .whereIn('brandID', req.body.ids) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `brands ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} brand: ${err}` })
    })
}

// Remove all brand on the list
exports.brandReset = async (req, res) => {
  // Remove all brand from database
  knex
    .select('*') // select all records
    .from('brands') // from 'brand' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Brands list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting brand list: ${err}.` })
    })
}

exports.findBrand = async(req, res) => {
  console.log('Received payload: ', req.query);
  knex
    .select('*')
    .from('brands')
    .where({
      'name': req.query.name,
      'creator': req.query.creator,
      'year': req.query.year,
      'luxury': req.query.luxury,
    })
    .limit(1)
    .then((brand) => {
      res.json(brand)
    })
}