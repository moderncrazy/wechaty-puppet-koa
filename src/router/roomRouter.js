/**
 * Create by geekeryoung on 2020/3/30
 *
 * room router
 */

const Aigle = require('aigle');

const resultUtil = require('../util/resultUtil');
const commonUtil = require('../util/commonUtil');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * room router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  /**
   * add | update room
   */
  router.put('/room', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    adminIdList: {type: 'array', itemType: 'string'},
    memberIdList: {type: 'array', itemType: 'string'},
    avatar: {type: 'string', required: false},
    ownerId: {type: 'string', required: false},
  }));
  router.put('/room', async (ctx) => {
    const {request} = ctx;
    // set cache
    await puppet.cacheRoomPayload.set(request.body.id, request.body);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * add | update room member
   */
  router.put('/room/member', parameterValidate({
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    roomAlias: {type: 'string', required: false},
    inviterId: {type: 'string', required: false}
  }));
  router.put('/room/member', async (ctx) => {
    const {request} = ctx;
    // set cache
    await puppet.cacheRoomMemberPayload.set(request.body.id, request.body);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete room
   */
  router.delete('/room', parameterValidate({
    id: {type: 'string'},
  }));
  router.delete('/room', async (ctx) => {
    const {request} = ctx;
    // delete cacheRoomPayload
    await puppet.cacheRoomPayload.delete(request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete room member
   */
  router.delete('/room/member', parameterValidate({
    id: {type: 'string'},
  }));
  router.delete('/room/member', async (ctx) => {
    const {request} = ctx;
    // delete cache
    await puppet.cacheRoomMemberPayload.delete(request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * query room
   */
  router.get('/room', parameterValidate({
    id: {type: 'string', required: false},
  }));
  router.get('/room', async (ctx) => {
    const {request} = ctx;
    let result = [];
    // query room
    if (request.query.id) {
      result = commonUtil.copyByJson(await puppet.cacheRoomPayload.get(request.body.id));
      result.memberList = await Aigle.map(result.memberIdList, async (memberId) => await puppet.cacheRoomMemberPayload.get(memberId));
      delete result.memberIdList;
    } else {
      for (let item of await puppet.cacheRoomPayload.values()) result.push(commonUtil.copyByJson(item));
      result = await Aigle.map(result, async (room) => {
        room.memberList = await Aigle.map(room.memberIdList, async (memberId) => await puppet.cacheRoomMemberPayload.get(memberId));
        delete room.memberIdList;
        return room;
      });
    }
    // response
    resultUtil.result(ctx, 200, result);
  });

  /**
   * query room member
   */
  router.get('/room/member', parameterValidate({
    id: {type: 'string', required: false},
  }));
  router.get('/room/member', async (ctx) => {
    const {request} = ctx;
    let result = [];
    // query room member
    if (request.query.id) {
      result = await puppet.cacheRoomMemberPayload.get(request.body.id);
    } else {
      for (let item of await puppet.cacheRoomMemberPayload.values()) result.push(item);
    }
    // response
    resultUtil.result(ctx, 200, result);
  });

  /**
   * join room
   */
  router.post('/room/join', parameterValidate({
    id: {type: 'string'},
    inviterId: {type: 'string'},
    inviteeIdList: {type: 'array', itemType: 'string'},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/join', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    puppet.emit('room-join', data.id, data.inviteeIdList, data.inviterId, timestamp || Date.now());
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * leave room
   */
  router.post('/room/leave', parameterValidate({
    id: {type: 'string'},
    removerId: {type: 'string'},
    leaverIdList: {type: 'array', itemType: 'string'},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/leave', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    puppet.emit('room-leave', data.id, data.leaverIdList, data.removerId, timestamp || Date.now());
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * topic room
   */
  router.post('/room/topic', parameterValidate({
    id: {type: 'string'},
    newTopic: {type: 'string'},
    oldTopic: {type: 'string'},
    changerId: {type: 'string'},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/topic', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    puppet.emit('room-topic', data.id, data.newTopic, data.oldTopic, data.changerId, timestamp || Date.now());
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * invite room
   */
  router.post('/room/invite', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    avatar: {type: 'string'},
    inviterId: {type: 'string'},
    invitation: {type: 'string'},
    receiverId: {type: 'string'},
    memberCount: {type: 'number'},
    memberIdList: {type: 'array', itemType: 'string'},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/invite', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheRoomInvitationPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-invite', data.id);
    // response
    resultUtil.result(ctx, 200);
  });

};
