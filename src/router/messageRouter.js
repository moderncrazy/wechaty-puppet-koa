/**
 * Create by geekeryoung on 2020/3/30
 *
 * message router
 */

const resultUtil = require('../util/resultUtil');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * message router
 * @param router
 * @param puppet {PuppetMock}
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
    text: {type: 'string', required: false},
    toId: {type: 'string', required: false},
    fromId: {type: 'string', required: false},
    filename: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/message/room', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.mocker.MockMessage.create(Object.assign({timestamp: timestamp || Date.now()}, data))
    puppet.emit('message', {messageId: data.id});
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * send message by single
   */
  router.post('/message/single', parameterValidate({
    id: {type: 'string'},
    toId: {type: 'string'},
    fromId: {type: 'string'},
    type: {type: 'enum', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    text: {type: 'string', required: false},
    filename: {type: 'string', required: false},
    timestamp: {type: 'number', required: false},
  }));
  router.post('/message/single', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.mocker.MockMessage.create(Object.assign({timestamp: timestamp || Date.now()}, data))
    puppet.emit('message', {messageId: data.id});
    // response
    resultUtil.result(ctx, 200);
  });
};
