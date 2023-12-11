
const knex = require('../db');
const models = require('../models')

exports.findCategories = (req, res) => {
    let final = []
    models.Product
        .query()
        .select('category')
        .distinct('category')
        .then(result => {
            if (result) {
                const categories = result.map(product => product.category);
                res.json(categories);
            }
        })
        .catch(err => {
        // Send a error message in response
            res.json({ message: `There was an error reseting ${tablename}: ${err}` })
    })
}
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
exports.getProductFilter = (req, res) => {
    const min = req.query.min
    const max = req.query.max
    const name = req.query.name
    const color = req.query.color
    const category = req.query.category
    const material = req.query.material
    models.Product
        .query()
        .where('price', '>=', min)
        .where('price', '<=', max)
        .where('color', 'LIKE', `%${color}%`)
        .where('name', 'LIKE', `%${name}%`)
        .where('category', 'LIKE', `%${category}%`)
        .where('material', 'LIKE', `%${material}%`)
        .then(result => {
            if (result)  {
                res.json(result)
            }
        })
        .catch(err => {
        // Send a error message in response
            res.json({ message: `There was an error reseting ${tablename}: ${err}` })
    })
}