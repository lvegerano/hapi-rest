/**
 * Created by Luis on 2/28/16.
 */

'use strict';

const Knex = require('kenx');

const defaults = {
  client: 'pg',
  connection: {
    host: '',
    user: '',
    password: '',
    database: ''
  },
  pool: {
    min: 0,
    max: 10
  }
};

module.exports.register = pbBase;

function pgBase(server, options, next) {
  const setup = Object.assign({}, defaults, options);

}
