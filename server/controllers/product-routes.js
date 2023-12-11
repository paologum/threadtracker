
const knex = require('../db');
const models = require('../models')

exports.findRange = (req, res) => {
    let final = {minPrice: 0, maxPrice: 0}
    models.Product
        .query()
        .max('price as maxPrice')
        .first()
        .as('maxPrice')
        .then(result => {
            if (result) {
                final.maxPrice = result.maxPrice;
            }
        })
        .catch(err => {
        // Send a error message in response
            res.json({ message: `There was an error reseting ${tablename}: ${err}` })
    })
    models.Product
        .query()
        .min('price as minPrice')
        .first()
        .then(result => {
            if (result)  {
                final.minPrice = result.minPrice
                res.json(final);
            }
        })
        .catch(err => {
        // Send a error message in response
            res.json({ message: `There was an error reseting ${tablename}: ${err}` })
    })
}