/**
 * Create by geekeryoung on 2020/3/30
 *
 * friendship router
 */

const {FriendshipType} = require('wechaty-puppet');

const resultUtil = require('../util/resultUtil');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * friendship router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  /**
   * confirm friendship
   */
  router.post('/friendship/confirm', parameterValidate({
    id: {type: 'string'},
    contactId: {type: 'string'},
    hello: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/friendship/confirm', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheFriendshipPayload.set(data.id, Object.assign({
      timestamp: timestamp || Date.now(),
      type: FriendshipType.Confirm
    }, data));
    puppet.emit('friendship', data.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * receive friendship
   */
  router.post('/friendship/receive', parameterValidate({
    id: {type: 'string'},
    ticket: {type: 'string'},
    contactId: {type: 'string'},
    hello: {type: 'string', required: false},
    stranger: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
    scene: {type: 'enum', values: [1, 2, 3, 12, 14, 15, 17, 18, 25, 29, 30], required: false},
  }));
  router.post('/friendship/receive', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheFriendshipPayload.set(data.id, Object.assign({
      timestamp: timestamp || Date.now(),
      type: FriendshipType.Receive
    }, data));
    puppet.emit('friendship', data.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * verify friendship
   */
  router.post('/friendship/verify', parameterValidate({
    id: {type: 'string'},
    contactId: {type: 'string'},
    hello: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/friendship/verify', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheFriendshipPayload.set(data.id, Object.assign({
      timestamp: timestamp || Date.now(),
      type: FriendshipType.Verify
    }, data));
    puppet.emit('friendship', data.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * unknown friendship
   */
  router.post('/friendship/unknown', parameterValidate({
    id: {type: 'string'},
    contactId: {type: 'string'},
    hello: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/friendship/unknown', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheFriendshipPayload.set(data.id, Object.assign({
      timestamp: timestamp || Date.now(),
      type: FriendshipType.Unknown
    }, data));
    puppet.emit('friendship', data.id);
    // response
    resultUtil.result(ctx, 200);
  });
};
