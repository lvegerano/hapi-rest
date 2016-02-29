/**
 * Created by Luis on 2/28/16.
 */
'use strict';

const Util = require('util');
const _ = require('lodash');
const Promise = require('promise');


function Collection(options) {
  const defaults = {};

  this.db = {};
  this.options = Object.assign({}, defaults, options);

}

module.exports = Collection;
