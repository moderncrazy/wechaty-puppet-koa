/**
 * Create by geekeryoung on 2020/3/30
 *
 * room router
 */

import Router from '@koa/router';
import PuppetMock from 'wechaty-puppet-mock';
import {RoomMemberPayload, RoomPayload} from 'wechaty-puppet';

import resultUtil from '../util/resultUtil';
import commonUtil from '../util/commonUtil';
import parameterValidate from '../middleware/parameterValidate';

/**
 * room router
 */
export default async (router: Router, puppet: PuppetMock) => {

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
  router.put('/room', async ctx => {
    const {request} = ctx;
    // set cache
    await puppet.mocker.createRoom(request.body);
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
  router.put('/room/member', async ctx => {
    const {request} = ctx;
    // set cache
    await puppet.mocker.createContact(request.body);
    await puppet.roomMemberPayload(request.body.id, request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete room
   */
  router.delete('/room', parameterValidate({
    id: {type: 'string'},
  }));
  router.delete('/room', async ctx => {
    const {request} = ctx;
    // delete cacheRoomPayload
    await puppet.roomQuit(request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * query room
   */
  router.get('/room', parameterValidate({
    id: {type: 'string', required: false},
  }));
  router.get('/room', async ctx => {
    const {request} = ctx;
    let result: Array<RoomPayload> | RoomPayload = [];
    // query room
    if (request.query.id) {
      result = commonUtil.copyByJson(await puppet.roomPayload(request.body.id));
    } else {
      for (let id of await puppet.roomList()) result.push(commonUtil.copyByJson(await puppet.roomPayload(id)));
    }
    // response
    resultUtil.result(ctx, 200, result);
  });

  /**
   * query room member
   */
  router.get('/room/member', parameterValidate({
    roomId: {type: 'string', required: true},
    memberId: {type: 'string', required: false},
  }));
  router.get('/room/member', async ctx => {
    const {request} = ctx;
    let result: Array<RoomMemberPayload> | RoomMemberPayload = [];
    // query room member
    if (request.query.id) {
      result = await puppet.roomMemberPayload(request.query.roomId, request.query.memberId);
    } else {
      for (let id of await puppet.roomMemberList(request.query.roomId)) result.push(await puppet.roomMemberPayload(request.query.roomId, id));
    }
    // response
    resultUtil.result(ctx, 200, result);
  });
};
