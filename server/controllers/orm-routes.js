// Assume you have a models index file that exports all your models
const models = require('../models');
const { tableName } = require('../models/Brand');

function processTableName(value) {
    // Convert table name to model name convention (e.g., 'brands' to 'Brand')
    let table = value.charAt(0).toUpperCase() + value.slice(1, -1)
    return models[table];
}

// A general function to get all records from any table
exports.getAllRecords = async (req, res) => {
    console.log("Received getAllRecords payload: ", req.query.table)
    const tablename = req.query.table;
    const model = processTableName(tablename); // Removes 's' assuming plural table names and models are singular
    // Use the model to query all records
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
    model.query()
        .then((brands) => {
            res.json(brands);
        })
        .catch(err => {
            res.json({message: `Error getting all from ${tablename} with error: ${err}`})
        })
}
exports.createRow = async (req, res) => {
  // console.log('Received payload:', req.body);
  // console.log('type: ', typeof req.body);
  // console.log("req.body: ", contents);
  // console.log("tablename: ", req.params.tablename);
    const tablename = req.params.tablename;
    const model = processTableName(tablename);
    const contents = req.body;
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
    model
        .query() 
        .insert(contents)
        .then(() => {
            res.json({message: `Inserted ${JSON.stringify(contents)} into ${tablename}`})
        })
        .catch(err => {
            res.json({message: `Failed to create row for ${tablename} with error: ${err}`})
        })

}
exports.delete = async (req, res) => {
    // Find specific brand in the database and remove it
    console.log('Received params: ', req.params.tablename, req.params.id)
    console.log('Received payload: ', req.body);
    const tablename = req.params.tablename;
    const id = req.params.id;
    const ids = req.body.ids;
    const model = processTableName(tablename);
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
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
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
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

exports.find = (req, res) => {
    const tablename = req.params.tablename;
    const props = req.query;
    const model = processTableName(tablename);
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
    console.log("props", props);
    model
        .query()
        .where(props)
        .then((found) => {
            console.log(found);
            res.json(found);
        })
        .catch(err => {
            res.json({message: `Error finding row with ${props} on ${tablename}: ${err}`})
        })
}
exports.edit = (req, res) => {
    const tablename = req.params.tablename;
    const model = processTableName(tablename);
    if (!model) {
        res.json({message: `model: ${tablename} doesn't exist`});
        return;
    }
    const info = req.body.info;
    // brands in the frontend is stored as a yes or no value
    if (tablename == 'brands') {
        info.luxury = info.luxury == "Yes" ? true : false
    }
    // console.log(info)
    const id = req.body.id;
    const idProp = req.body.idProp;
    // console.log(id)
    model
        .query()
        .where(idProp, id)
        .patch(info)
        .then(() => {
            // console.log(`Updated id: ${id} with ${JSON.stringify(info)} on ${tablename}`)
            res.json({message: `Updated id: ${id} with ${JSON.stringify(info)} on ${tablename}`})
        })
        .catch(err => {
            res.json({message: `Error updating row with ${id} and ${JSON.stringify(info)} on ${tablename}`})
        })
}