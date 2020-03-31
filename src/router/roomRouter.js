/**
 * Create by geekeryoung on 2020/3/30
 *
 * room router
 */

const util = require('../util/util');
const handleMemberList = require('../middleware/handleMemberList');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * room router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

  const ROOM_MEMBER_RULE = {
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    roomAlias: {type: 'string', require: false},
    inviterId: {type: 'string', require: false}
  };

  /**
   * join room
   */
  router.post('/room/join', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    inviterId: {type: 'string'},
    adminIdList: {type: 'array', itemType: 'string'},
    inviteeIdList: {type: 'array', itemType: 'string'},
    memberList: {type: 'array', itemType: 'object', rule: ROOM_MEMBER_RULE},
    avatar: {type: 'string', require: false},
    ownerId: {type: 'string', require: false},
    timestamp: {type: 'number', require: false}
  }));
  router.post('/room/join', handleMemberList(puppet));
  router.post('/room/join', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-join', data.id);
    // response
    util.result(ctx, 200);
  });

  /**
   * leave room
   */
  router.post('/room/leave', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    removerId: {type: 'string'},
    adminIdList: {type: 'array', itemType: 'string'},
    leaverIdList: {type: 'array', itemType: 'string'},
    memberList: {type: 'array', itemType: 'object', rule: ROOM_MEMBER_RULE},
    avatar: {type: 'string', require: false},
    ownerId: {type: 'string', require: false},
    timestamp: {type: 'number', require: false}
  }));
  router.post('/room/leave', handleMemberList(puppet));
  router.post('/room/leave', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-leave', data.id);
    // response
    util.result(ctx, 200);
  });

  /**
   * topic room
   */
  router.post('/room/topic', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    newTopic: {type: 'string'},
    oldTopic: {type: 'string'},
    changerId: {type: 'string'},
    adminIdList: {type: 'array', itemType: 'string'},
    memberIdList: {type: 'array', itemType: 'object', rule: ROOM_MEMBER_RULE},
    avatar: {type: 'string', require: false},
    ownerId: {type: 'string', require: false},
    timestamp: {type: 'number', require: false}
  }));
  router.post('/room/topic', handleMemberList(puppet));
  router.post('/room/topic', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-topic', data.id);
    // response
    util.result(ctx, 200);
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
    memberIdList: {type: 'array', itemType: 'object', rule: ROOM_MEMBER_RULE},
    timestamp: {type: 'number', require: false}
  }));
  router.post('/room/invite', handleMemberList(puppet));
  router.post('/room/invite', (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    puppet.cacheRoomInvitationPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-invite', data.id);
    // response
    util.result(ctx, 200);
  });

};
