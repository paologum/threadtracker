const { Model } = require('objection');

class Brand extends Model {
  static get tableName() {
    return 'brands';
  }
  static get relationMappings() {
    const Product = require('./Product'); // Require the related model here to avoid require loops
    const Drop = require('./Drop');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'brands.brandID',
          to: 'products.brandID'
        }
      },
      drops: {
        relation: Model.HasManyRelation,
        modelClass: Drop,
        join: {
          from: 'brands.brandID',
          to: 'drops.brandID'
        }
      }
    };
  }
}

module.exports = Brand;