// Modules
const EventsEmitter = require('events');

// Libs
const _ = require('lodash');
const Winston = require('winston');
const Pluralize = require('pluralize');
const Promise = require('bluebird');

const bookshelf = require('./pg');

function Collection(dbSettings) {
  const defaults = {
    tableName: 'default'
  };
  this.settings = Object.assign({}, defaults, dbSettings);
  this.tableName = this.settings.tableName;
  this.model = null;

  delete this.settings.tableName;

  this.orm = bookshelf(this.settings);
}

const proto = {
  createSchema(schema) {
    if (!schema || !_.isObject(schema)) {
      throw new Error(`Collection Error: ${this.tableName} schema must be an Object`);
    }

    const columnKeys = Object.keys(schema);

    return this.orm.knex.schema.createTableIfNotExists(this.tableName, (table) => {
      let column;

      columnKeys.forEach((columnName) => {
        const method = schema[columnName].type;

        if (schema[columnName].type === 'text' && schema[columnName].hasOwnProperty('textType')) {
          column = table[method](columnName, schema[columnName].textType);
        } else if (schema[columnName].type === 'string' && schema[columnName].hasOwnProperty('maxLength')) {
          column = table[method](columnName, schema[columnName].maxLength);
        } else if (schema[columnName].type === 'binary' && schema[columnName].hasOwnProperty('maxLength')) {
          column = table[method](columnName, schema[columnName].maxLength);
        } else if (schema[columnName].type === 'enu' && schema[columnName].hasOwnProperty('fields')) {
          if (!Array.isArray(schema[columnName].fields)) {
            throw new TypeError('Fields value must be an array');
          }
          column = table[method](columnName, schema[columnName].fields);
        } else if (schema[columnName].type === 'float' && Object.keys(schema[columnName]).length > 1) {
          if (schema[columnName].hasOwnProperty('precision') && schema[columnName].hasOwnProperty('scale')) {
            column = table[method](columnName, schema[columnName].precision, schema[columnName].scale);
          } else if (schema[columnName].hasOwnProperty('precision')) {
            column = table[method](columnName, 8, schema[columnName].scale);
          } else if (schema[columnName].hasOwnProperty('scale')) {
            column = table[method](columnName, schema[columnName].precision, 2);
          }
        } else if (schema[columnName].type === 'decimal' && Object.keys(schema[columnName]).length > 1) {
          if (schema[columnName].hasOwnProperty('precision') && schema[columnName].hasOwnProperty('scale')) {
            column = table[method](columnName, schema[columnName].precision, schema[columnName].scale);
          } else if (schema[columnName].hasOwnProperty('precision')) {
            column = table[method](columnName, 8, schema[columnName].scale);
          } else if (schema[columnName].hasOwnProperty('scale')) {
            column = table[method](columnName, schema[columnName].precision, 2);
          }
        } else {
          column = table[method](columnName);
        }

        if (schema[columnName].hasOwnProperty('index') && schema[columnName].index === true) {
          column.index();
        }

        if (schema[columnName].hasOwnProperty('primary') && schema[columnName].primary === true) {
          column.primary();
        }

        if (schema[columnName].hasOwnProperty('unique') && schema[columnName].unique === true) {
          column.unique();
        }

        if (schema[columnName].hasOwnProperty('references') && _.isString(schema[columnName].references) && !_.isEmpty(schema[columnName].references)) {
          column.references(schema[columnName].references);
        }

        if (schema[columnName].hasOwnProperty('defaultTo') && !_.isEmpty(schema[columnName].defaultTo)) {
          column.defaultTo(schema[columnName].defaultTo);
        }

        if (schema[columnName].hasOwnProperty('unsigned') && schema[columnName].unsigned === true) {
          column.unsigned();
        }

        if (schema[columnName].hasOwnProperty('nullable') && schema[columnName].nullable === true) {
          column.nullable();
        } else {
          column.notNullable();
        }

        if (schema[columnName].hasOwnProperty('first') && schema[columnName].first === true) {
          column.first();
        }

        if (schema[columnName].hasOwnProperty('after') && _.isString(schema[columnName].after) && !_.isEmpty(schema[columnName].after)) {
          column.after(schema[columnName].after);
        }

        if (schema[columnName].hasOwnProperty('comment') && _.isString(schema[columnName].comment) && !_.isEmpty(schema[columnName].comment)) {
          column.comment(schema[columnName].comment);
        }

        if (schema[columnName].hasOwnProperty('collate') && _.isString(schema[columnName].collate) && !_.isEmpty(schema[columnName].collate)) {
          column.collate(schema[columnName].collate);
        }

      });
    });
  },

  setModel(name, model) {
    const defaults = {
      tableName: this.tableName,
    };
    const modelData = Object.assign({}, defaults, model);
    const baseModel = this.orm.Model.extend(modelData);
    this.model = this.orm.model(name, baseModel);
  },

  indexes(indexes) {
    if (!this.settings.tableName) {
      throw new Error('Table is not defined!');
    }

    this.connection.schema.table(this.options.tableName, (table) => {
      _.forEach(indexes, (indexDef) => {
        if (!indexDef.hasOwnProperty('fields')) {
          throw new Error('Your index definition must include the fields key');
        }
        if (indexDef.hasOwnProperty('unique') && indexDef.unique) {
          table.unique(indexDef.fields);
        }

        table.index(indexDef.fields);
      });
    });
  },

  create(record, options) {
  },

  read(record, options) {
  },

  update(search, updateValues, options) {
  },

  delete(record, options) {
  },
};

Collection.prototype = proto;

module.exports = Collection;
