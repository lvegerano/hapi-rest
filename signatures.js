const RestCollection = require('modue').RestCollection;

const Users = new RestCollection({
  table: 'users',
  uuid: false,
  routes: { // or boolean
    create: true,
    read: true,
    update: true,
    delete: true
  }
});

// id field is automatic
Users.db.define({
  phone: {
    type: 'int',
    index: true
  },
  name: {
    type: 'sting',
    nullable: true
  },
  info: 'text',
  author_id: {
    type: 'bigint',
    references: {
      table: 'authors',
      col: 'id'
    }
  },
  email_verified: {
    type: 'boolean',
    default: false
  },
  role: {
    type: 'enum',
    values: ['admin', 'user']
  },

});

Users.db.hook.before('create', (data, next) => {});
Users.db.hook.before('read', (data, next) => {});
Users.db.hook.before('update', (data, next) => {});
Users.db.hook.before('delete', (data, next) => {});

Users.db.hook.after('create', (data, next) => {});
Users.db.hook.after('read', (data, next) => {});
Users.db.hook.after('update', (data, next) => {});
Users.db.hook.after('delete', (data, next) => {});

Users.db.on('create', (recordCreated) => {});
Users.db.on('update', (updatedRecord) => {});
Users.db.on('update_with_history', (updatedRecord, oldRecord) => {});
Users.db.on('delete', (deletedRecord) => {});

Users.rest.route.get('/create-batch', (res, reply) => {})
Users.rest.route.put('/create-batch', (res, reply) => {})
Users.rest.route.post('/create-batch', (res, reply) => {})
Users.rest.route.delete('/create-batch', (res, reply) => {})


