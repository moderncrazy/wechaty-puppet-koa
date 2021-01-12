/**
 * Create by geekeryoung on 2020/3/30
 *
 * friendship router
 */

import Router from '@koa/router';
import PuppetMock from 'wechaty-puppet-mock';

import resultUtil from '../util/resultUtil';
import parameterValidate from '../middleware/parameterValidate';

/**
 * friendship router
 */
export default async (router: Router, puppet: PuppetMock) => {

  /**
   * confirm friendship
   */
  router.post('/friendship', parameterValidate({
    contactId: {type: 'string'},
    hello: {type: 'string', required: false},
  }));
  router.post('/friendship', async ctx => {
    const {request} = ctx;
    const {contactId, hello} = request.body;
    // set content
    await puppet.friendshipAdd(contactId, hello);
    // response
    resultUtil.result(ctx, 200);
  });
};
