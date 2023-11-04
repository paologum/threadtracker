const knex = require('../db');

// Retrieve all brands
exports.getAll = (req, res) => {
  knex
    .select('*') // select all records
    .from(req.query.table) // from queried table
    .then((items) => {
      res.json(items);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving brands: ${err}` })
    })
}

exports.createRow = (req, res) => {
  // console.log('Received payload:', req.body);
  // console.log('type: ', typeof req.body);
  const contents = req.body;
  // Add new brand to database
  knex(req.params.tablename)
    .insert(contents)
    .then(() => {
      // Send a success message in response
      res.json({ message: `Brand \'${contents.name}\' by ${contents.creator} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${contents.name} brand: ${err}` })
    })
}