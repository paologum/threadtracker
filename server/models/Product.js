
const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }
  static get relationMappings() {
    const Brand = require('./Brand'); 
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