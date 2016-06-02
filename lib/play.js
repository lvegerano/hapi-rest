const Rest = require('index');

const Promise = require('bluebird');

const connection = {
  connection: {
    host: '192.168.99.100',
    port: 5432,
    user: 'pgUser',
    password: 'password',
    database: 'local'
  }
};
const User = new Rest({}, connection);
const Comments = new Rest({}, connection);

const promise = [
  Comments.db.createSchema({
    comment: {type: 'text'},
    user_id: {type: 'integer'}
  }),
  User.db.createSchema({
    id: { type: 'increments' },
    email: { type: 'string' },
    first: { type: 'string' },
    last: { type: 'string' },
    age: { type: 'integer' },
  })
];

Promise.all(promise).then(() => {
  Comments.db.setModel({
    user() {
      return this.belongsTo(User.db.model);
    }
  });
  User.db.setModel({
    firstName() {
      return this.get('first') + ' ' + this.get('last');
    },
    comments() {
      return this.hasMany(Comments.db.model);
    }
  });
}).catch((err) => {
  console.log('An error has occurred');
  console.error(err.stack || err);
});


console.log('Rest', Rest);
