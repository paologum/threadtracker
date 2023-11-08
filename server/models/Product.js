
const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }
  // Define any relation mappings if necessary
  // static relationMappings = { ... };
  static get relationMappings() {
    const Brand = require('./Brand'); // Require the related model here to avoid require loops
    return {
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'products.brandID',
          to: 'brands.brandID'
        }
      }
    };
  }
}

module.exports = Product;