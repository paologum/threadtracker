// Assume you have a models index file that exports all your models
const models = require('../models');
const { tableName } = require('../models/Brand');

function processTableName(value) {
    let table = value.charAt(0).toUpperCase() + value.slice(1, -1)
    return models[table];
}

// A general function to get all records from any table
exports.getAllRecords = async (req, res) => {
    try {
        console.log("Received getAllRecords payload: ", req.query.table)
        // Convert table name to model name convention (e.g., 'brands' to 'Brand')
        const tableName = req.query.table;
        const model = processTableName(tableName); // Removes 's' assuming plural table names and models are singular

        // Get the model class from the models object
        // console.log("models: ", models)

        // Use the model to query all records
        model.query()
            .then((brands) => {
                res.json(brands);
            });
    } catch(e) {
        res.json({message: `Error getting all from ${tableName} with error: ${error}`})
    }
}
exports.createRow = async (req, res) => {
  // console.log('Received payload:', req.body);
  // console.log('type: ', typeof req.body);
  // console.log("req.body: ", contents);
  // console.log("tablename: ", req.params.tablename);
    const tablename = req.params.tablename;
    try {
        const model = processTableName(tablename);
        const contents = req.body;
        model
            .query() 
            .insert(contents)
            .then(() => {
                res.json({message: `Inserted ${JSON.stringify(contents)} into ${tablename}`})
            })

    } catch (e) {
        res.json({message: `Failed to create row for ${tablename} with error: ${e}`})
    }
}
exports.delete = async (req, res) => {
  // Find specific brand in the database and remove it
  console.log('Received params: ', req.params.tablename, req.params.id)
  console.log('Received payload: ', req.body);
  const tablename = req.params.tablename;
  const id = req.params.id;
  const ids = req.body.ids;
  const model = processTableName(tablename);
  model
    .query()
    .whereIn(id,ids)
    .del()
    .then(() => {
      // Send a success message in response
      res.json({ message: `${req.params.id} ${req.body.ids} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${id} ${tablename}: ${err}` })
    })
}
exports.reset = (req, res) => {
    const tablename = req.query.table;
    const model = processTableName(tablename);
    model
        .query()
        .truncate()
        .then(() => {
        // console.log("items: ", items);
            res.json({message: `${tablename} list cleared.`});
        })
        .catch(err => {
        // Send a error message in response
            res.json({ message: `There was an error reseting ${tablename}: ${err}` })
    })
}
