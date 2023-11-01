
// Import database
const { BrandingWatermark, ContentPasteSearch } = require('@mui/icons-material');
const { assertBrandType } = require('../types');
const { Brand } = require('../../shared/types');
const knex = require('./../db');

// Retrieve all books
exports.getAllBrands = (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('brands') // from 'books' table
    .then((brands) => {
      // Send books extracted from database in response
      // res.setHeader('Content-Type', 'application/json');
      res.json(brands);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

// Create new book
exports.createBrand = async (req, res) => {
  const contents = JSON.parse(string(req.body));
  assertBrandType(contents);
  contents = Brand(contents);
  // Add new book to database
  knex('brands')
    .insert({ // insert new record, a book
      'name': contents.brandName,
      'creator': contents.creator,
      'startingDate': contents.startingDate,
      'luxury': contents.luxury,
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

// Remove specific book
exports.booksDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('books')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
    })
}

// Remove all books on the list
exports.booksReset = async (req, res) => {
  // Remove all books from database
  knex
    .select('*') // select all records
    .from('books') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Book list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting book list: ${err}.` })
    })
}