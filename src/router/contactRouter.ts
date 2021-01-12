/**
 * Create by geekeryoung on 2020/3/30
 *
 * contact router
 */

import Router from '@koa/router';
import PuppetMock from 'wechaty-puppet-mock';
import {ContactPayload} from 'wechaty-puppet';

import resultUtil from '../util/resultUtil';
import parameterValidate from '../middleware/parameterValidate';

/**
 * contact router
 */
export default async (router: Router, puppet: PuppetMock) => {

  /**
   * add contact
   */
  router.put('/contact', parameterValidate({
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
  router.put('/contact', async ctx => {
    const {request} = ctx;
    // set content
    await puppet.mocker.createContact(request.body);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete contact
   */
  router.delete('/contact', parameterValidate({
    id: {type: 'string'},
  }));
  router.delete('/contact', async ctx => {
    const {request} = ctx;
    // set content
    await puppet.mocker.cacheContactPayload.delete(request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * query contact
   */
  router.get('/contact', parameterValidate({
    id: {type: 'string', required: false},
  }));
  router.get('/contact', async ctx => {
    const {request} = ctx;
    let result: Array<ContactPayload> | ContactPayload = [];
    // get content
    if (request.query.id) {
      result = await puppet.contactPayload(request.query.id);
    } else {
      for (let id of await puppet.contactList()) result.push(await puppet.contactPayload(id));
    }
    // response
    resultUtil.result(ctx, 200, result);
  });
};
