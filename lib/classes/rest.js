const Winston = require('winston');
const _ = require('lodash');

const Collection = require('./collection');

class Rest {
  constructor(server, pgSettings) {
    this.server = server;
    this.db = new Collection(pgSettings);
    this.route = {};
    this.route.before = [];
    this.route.after = [];
  }

  connect(server) {
    // build all the routes
  }

  disallow(routeName) {
    this.settings.allowed[routeName] = false;
  }

  routeFactory() {
    // const allowedRoutes = _.filter(this.settings.allowed, (route, collection) => collection[route]);
  }
}

module.exports = Rest;
