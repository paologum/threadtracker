
const { Model } = require('objection');

class Drop extends Model {
  static get tableName() {
    return 'drops';
  }
  static get relationMappings() {
    const Product = require('./Product'); 
    const Brand = require('./Brand');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'drops.dropID',
          to: 'products.dropID'
        }
      },
      brands: {
        relation: Model.HasOneRelation,
        modelClass: Brand,
        join: {
          from: 'drops.brandID',
          to: 'brands.brandID'
        }
      }
    };
  }
}

module.exports = Drop;