/**
 * Create by geekeryoung on 2020/3/30
 *
 * system router
 */

const util = require('../util/util');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * system router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  /**
   * login
   */
  router.post('/login', parameterValidate({
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    type: {type: 'enum', values: [0, 1, 2]},
    gender: {type: 'enum', values: [0, 1, 2]},
    city: {type: 'string', require: false},
    alias: {type: 'string', require: false},
    star: {type: 'boolean', require: false},
    weixin: {type: 'string', require: false},
    friend: {type: 'boolean', require: false},
    address: {type: 'string', require: false},
    province: {type: 'string', require: false},
  }));
  router.post('/login', (ctx) => {
    const {request} = ctx;
    // set content
    puppet.cacheContactPayload.set(request.body.id, request.body);
    puppet.emit('login', request.body.id);
    // response
    util.result(ctx, 200);
  });

  /**
   * logout
   */
  router.post('/logout', parameterValidate({
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    reason: {type: 'string'},
    type: {type: 'enum', values: [0, 1, 2]},
    gender: {type: 'enum', values: [0, 1, 2]},
    city: {type: 'string', require: false},
    alias: {type: 'string', require: false},
    star: {type: 'boolean', require: false},
    weixin: {type: 'string', require: false},
    friend: {type: 'boolean', require: false},
    address: {type: 'string', require: false},
    province: {type: 'string', require: false},
  }));
  router.post('/logout', (ctx) => {
    const {request} = ctx;
    const {reason} = request.body;
    // set content
    puppet.cacheContactPayload.set(request.body.id, request.body);
    puppet.emit('logout', request.body.id, reason);
    // response
    util.result(ctx, 200);
  });

  /**
   * reset
   */
  router.post('/reset', parameterValidate({
    reason: {type: 'string'}
  }));
  router.post('/reset', (ctx) => {
    const {request} = ctx;
    const {reason} = request.body;
    puppet.emit('reset', reason);
    // response
    util.result(ctx, 200);
  });
};
