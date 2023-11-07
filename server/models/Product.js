
const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  // Define any relation mappings if necessary
  // static relationMappings = { ... };
}

module.exports = Product;