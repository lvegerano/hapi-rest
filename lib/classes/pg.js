const Winston = require('winston');
const knex = require('knex');
const Bookshelf = require('bookshelf');

let orm;

module.exports = function _baseModule(options) {
  const defaults = {
    client: 'pg',
  };

  const dbOptions = Object.assign({}, defaults, options);

  if (typeof orm === 'undefined') {
    Winston.info('Connecting to database');
    orm = Bookshelf(knex(dbOptions));
    orm.plugin('registry');
  }
  return orm;
};
