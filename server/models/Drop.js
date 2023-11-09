
const { Model } = require('objection');

class Drop extends Model {
  static get tableName() {
    return 'drops';
  }
  static get relationMappings() {
    const Product = require('./Product'); 
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'drops.dropID',
          to: 'products.productID'
        }
      }
    };
  }
}

module.exports = Drop;