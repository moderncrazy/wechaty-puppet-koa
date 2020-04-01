/**
 * Create by geekeryoung on 2020/3/30
 *
 * room router
 */

const resultUtil = require('../util/resultUtil');
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
    memberList: {
      type: 'array', itemType: 'object', rule: {
        id: {type: 'string'},
        name: {type: 'string'},
        avatar: {type: 'string'},
        roomAlias: {type: 'string', required: false},
        inviterId: {type: 'string', required: false}
      }
    },
    avatar: {type: 'string', required: false},
    ownerId: {type: 'string', required: false},
  }));
  router.put('/room', async (ctx) => {
    const {request} = ctx;
    const {memberList, ...data} = request.body;
    // extract memberIdList
    let memberIdList = memberList.map(async (member) => {
      member.id = `${data.id}_${member.id}`;
      // set roomMemberPayload
      await puppet.cacheRoomMemberPayload.set(member.id, member);
      return member.id;
    });
    // set cache
    await puppet.cacheRoomPayload.set(data.id, Object.assign({memberIdList}, data));
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
    // delete cacheRoomMemberPayload
    let keys = await puppet.cacheRoomMemberPayload.keys();
    for (const key of keys) {
      if (key.indexOf(request.body.id) == 0) {
        await puppet.cacheRoomMemberPayload.delete(key)
      }
    }
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete room member
   */
  router.delete('/room/member', parameterValidate({
    roomId: {type: 'string'},
    memberId: {type: 'string'},
  }));
  router.delete('/room/member', async (ctx) => {
    const {request} = ctx;
    const {roomId, memberId} = request.body;
    // delete cache
    await puppet.cacheRoomMemberPayload.delete(`${roomId}_${memberId}`);
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
    let result = null;
    // query room
    if (request.query.id) {
      result = await puppet.cacheRoomPayload.get(request.body.id);
      result.memberList = result.memberIdList.map(async (memberId) => await puppet.cacheRoomMemberPayload.get(memberId));
      delete result.memberIdList;
    } else {
      result = await puppet.cacheRoomPayload.values();
      result = result.map(async (room) => {
        room.memberList = room.memberIdList.map(async (memberId) => await puppet.cacheRoomMemberPayload.get(memberId));
        delete room.memberIdList;
        return room;
      });
    }
    // response
    resultUtil.result(ctx, 200, result);
  });

  /**
   * join room
   */
  router.post('/room/join', parameterValidate({
    id: {type: 'string'},
    topic: {type: 'string'},
    inviterId: {type: 'string'},
    adminIdList: {type: 'array', itemType: 'string'},
    inviteeIdList: {type: 'array', itemType: 'string'},
    memberIdList: {type: 'array', itemType: 'string'},
    avatar: {type: 'string', required: false},
    ownerId: {type: 'string', required: false},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/join', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-join', data.id, data.inviteeIdList, data.inviterId, timestamp || Date.now());
    // response
    resultUtil.result(ctx, 200);
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
    memberIdList: {type: 'array', itemType: 'string'},
    avatar: {type: 'string', required: false},
    ownerId: {type: 'string', required: false},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/leave', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
    puppet.emit('room-leave', data.id, data.leaverIdList, data.removerId, timestamp || Date.now());
    // response
    resultUtil.result(ctx, 200);
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
    memberIdList: {type: 'array', itemType: 'string'},
    avatar: {type: 'string', required: false},
    ownerId: {type: 'string', required: false},
    timestamp: {type: 'number', required: false}
  }));
  router.post('/room/topic', async (ctx) => {
    const {request} = ctx;
    const {timestamp, ...data} = request.body;
    // set content
    await puppet.cacheRoomPayload.set(data.id, Object.assign({timestamp: timestamp || Date.now()}, data));
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
