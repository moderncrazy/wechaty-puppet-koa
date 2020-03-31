/**
 * Create by geekeryoung on 2020/3/30
 *
 * message router
 */

const util = require('../util/util');
const handleFrom = require('../middleware/handleFrom');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * message router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  const FROM_RULE = {
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    reason: {type: 'string'},
    type: {type: 'enum', values: [0, 1, 2]},
    gender: {type: 'enum', values: [0, 1, 2]},
    city: {type: 'string', required: false},
    alias: {type: 'string', required: false},
    star: {type: 'boolean', required: false},
    weixin: {type: 'string', required: false},
    friend: {type: 'boolean', required: false},
    address: {type: 'string', required: false},
    province: {type: 'string', required: false},
  };

  /**
   * send message by room
   */
  router.post('/message/room', parameterValidate({
    id: {type: 'string'},
    roomId: {type: 'string'},
    mentionIdList: {type: 'array', itemType: 'string'},
    type: {type: 'enum', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    text: {type: 'string', required: false},
    toId: {type: 'string', required: false},
    filename: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
    from: {type: 'object', rule: FROM_RULE, required: false},
  }));
  router.post('/message/room', handleFrom(puppet));
  router.post('/message/room', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheMessagePayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
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
    from: {type: 'object', rule: FROM_RULE},
    type: {type: 'enum', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    text: {type: 'string', required: false},
    filename: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/message/single', handleFrom(puppet));
  router.post('/message/single', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheMessagePayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('message', data.id);
    // response
    util.result(ctx, 200);
  });
};
