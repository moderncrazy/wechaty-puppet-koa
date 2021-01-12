/**
 * Create by geekeryoung on 2020/3/30
 *
 * message router
 */

import Router from '@koa/router';
import {FileBox} from 'wechaty-puppet';
import PuppetMock from 'wechaty-puppet-mock';

import resultUtil from '../util/resultUtil';
import parameterValidate from '../middleware/parameterValidate';

/**
 * message router
 */
export default async (router: Router, puppet: PuppetMock) => {

  /**
   * send message by room
   */
  router.post('/message/room', parameterValidate({
    roomId: {type: 'string'},
    fromId: {type: 'string'},
    text: {type: 'string', required: false},
    filename: {type: 'string', required: false},
  }));
  router.post('/message/room', async ctx => {
    const {request} = ctx;
    const {roomId, text, filename, fromId} = request.body;
    try {
      // set content
      let from = await puppet.mocker.ContactMock.load(fromId);
      let room = await puppet.mocker.RoomMock.load(roomId);
      from.say(text || FileBox.fromFile(filename)).to(room);
      // response
      resultUtil.result(ctx, 200);
    } catch (e) {
      resultUtil.result(ctx, 400, null, e.message);
    }
  });

  /**
   * send message by single
   */
  router.post('/message/single', parameterValidate({
    toId: {type: 'string'},
    fromId: {type: 'string'},
    text: {type: 'string', required: false},
    filename: {type: 'string', required: false},
  }));
  router.post('/message/single', async ctx => {
    const {request} = ctx;
    const {toId, fromId, text, filename} = request.body;
    try {
      let from = await puppet.mocker.ContactMock.load(fromId);
      let to = await puppet.mocker.ContactMock.load(toId);
      from.say(text || FileBox.fromFile(filename)).to(to);
      // response
      resultUtil.result(ctx, 200);
    } catch (e) {
      resultUtil.result(ctx, 400, null, e.message);
    }
  });
};
