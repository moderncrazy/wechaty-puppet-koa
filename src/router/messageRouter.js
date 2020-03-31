/**
 * Create by geekeryoung on 2020/3/30
 *
 * message router
 */

const util = require('../util/util');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * message router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  /**
   * send message by room
   */
  router.post('/message/room', parameterValidate({
    id: {type: 'string'},
    roomId: {type: 'string'},
    mentionIdList: {type: 'array', itemType: 'string'},
    type: {type: 'enum', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    text: {type: 'string', require: false},
    toId: {type: 'string', require: false},
    fromId: {type: 'string', require: false},
    filename: {type: 'string', require: false},
    timestamp: {type: 'number', require: false},
  }));
  router.post('/message/room', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheContactPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('message', data.id);
    // response
    util.result(ctx, 200);
  });

  /**
   * send message by single
   */
  router.post('/message/single', parameterValidate({
    id: {type: 'string'},
    toId: {type: 'string'},
    fromId: {type: 'string'},
    mentionIdList: {type: 'array', itemType: 'string'},
    type: {type: 'enum', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    text: {type: 'string', require: false},
    roomId: {type: 'string', require: false},
    filename: {type: 'string', require: false},
    timestamp: {type: 'number', require: false},
  }));
  router.post('/message/single', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheContactPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('message', data.id);
    // response
    util.result(ctx, 200);
  });
};
