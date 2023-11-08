const { Model } = require('objection');

class Brand extends Model {
  static get tableName() {
    return 'brands';
  }
  static get relationMappings() {
    const Product = require('./Product'); // Require the related model here to avoid require loops
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'brands.brandID',
          to: 'products.brandID'
        }
      }
    };
  }
  // Define any relation mappings if necessary
  // static relationMappings = { ... };
}

module.exports = Brand;