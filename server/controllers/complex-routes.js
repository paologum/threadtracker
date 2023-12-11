const models = require('../models');

function processTableName(value) {
    // Convert table name to model name convention (e.g., 'brands' to 'Brand')
    let table = value.charAt(0).toUpperCase() + value.slice(1, -1)
    return models[table];
}

// A general function to get all records from any table
exports.getBrandSummary = async (req, res) => {
    console.log("Received getBrandSummary payload")
    models.Brand
        .query()
        .select('brandID', 'name')
        .withGraphFetched('drops.[products]')
        .then(summary => {
            console.log(summary)
            summary = summary.map(brand => {
                let totalProducts = 0;
                let totalProductPrice = 0;
            
                brand.drops.forEach(drop => {
                    totalProducts += drop.products.length;
                    totalProductPrice += drop.products.reduce((acc, product) => acc + product.price, 0);
                });
            
                let averagePrice = totalProducts > 0 ? totalProductPrice / totalProducts : 0;
                brand['average_price'] = averagePrice.toFixed(2);
                brand['total_products'] = totalProducts;
                brand['total_drops'] = brand.drops.length;
                return brand
            })
            console.log(summary)
            res.json(summary);
        })
        .catch(err => {
            res.json({message: `Error getting summary for brands with error ${err}`})
            console.error(err);
        });
}