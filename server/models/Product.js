
const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }
  static get relationMappings() {
    const Drop = require('./Drop');
    return {
      drops: {
        relation: Model.BelongsToOneRelation,
        modelClass: Drop,
        join: {
          from: 'products.brandID',
          to: 'drops.brandID'
        }
      }
    };
  }
}

module.exports = Product;