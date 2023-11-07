const { Model } = require('objection');

class Brand extends Model {
  static get tableName() {
    return 'brands';
  }

  // Define any relation mappings if necessary
  // static relationMappings = { ... };
}

module.exports = Brand;