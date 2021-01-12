/**
 * Create by geekeryoung on 2020/3/30
 *
 * system router
 */

import Router from '@koa/router';
import PuppetMock from 'wechaty-puppet-mock';

import resultUtil from '../util/resultUtil';
import parameterValidate from '../middleware/parameterValidate';

/**
 * system router
 */
export default async (router: Router, puppet: PuppetMock) => {

  /**
   * login
   */
  router.post('/login', parameterValidate({
    id: {type: 'string'},
    name: {type: 'string'},
    avatar: {type: 'string'},
    type: {type: 'enum', values: [0, 1, 2]},
    gender: {type: 'enum', values: [0, 1, 2]},
    city: {type: 'string', required: false},
    alias: {type: 'string', required: false},
    star: {type: 'boolean', required: false},
    weixin: {type: 'string', required: false},
    friend: {type: 'boolean', required: false},
    address: {type: 'string', required: false},
    province: {type: 'string', required: false},
  }));
  router.post('/login', async ctx => {
    const {request} = ctx;
    // set content
    let contact = await puppet.mocker.createContact(request.body);
    await puppet.mocker.login(contact);
    puppet.emit('login', {contactId: request.body.id});
    // response
    resultUtil.result(ctx, 200);
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
    city: {type: 'string', required: false},
    alias: {type: 'string', required: false},
    star: {type: 'boolean', required: false},
    weixin: {type: 'string', required: false},
    friend: {type: 'boolean', required: false},
    address: {type: 'string', required: false},
    province: {type: 'string', required: false},
  }));
  router.post('/logout', async ctx => {
    const {request} = ctx;
    const {reason} = request.body;
    // set content
    await puppet.mocker.createContact(request.body);
    puppet.emit('logout', {
      contactId: request.body.id,
      data: reason,
    });
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * reset
   */
  router.post('/reset', parameterValidate({
    reason: {type: 'string'}
  }));
  router.post('/reset', ctx => {
    const {request} = ctx;
    const {reason} = request.body;
    puppet.emit('reset', {data: reason});
    // response
    resultUtil.result(ctx, 200);
  });
};
