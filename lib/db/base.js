/**
 * Created by Luis on 2/28/16.
 */

'use strict';

const Winston = require('winston');

let db;

module.exports = function _baseModule(options) {
  const defaults = {
    client: 'pg',
  };
  const dbOptions = Object.assign({}, defaults, options);

  if (typeof db === 'undefined') {
    Winston.info('Connecting to database');
    db = require('knex')(dbOptions);
  }
  return db;
};
