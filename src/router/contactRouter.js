/**
 * Create by geekeryoung on 2020/3/30
 *
 * contact router
 */

const resultUtil = require('../util/resultUtil');
const parameterValidate = require('../middleware/parameterValidate');

/**
 * contact router
 * @param router
 * @param puppet
 */
module.exports = async (router, puppet) => {

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
  router.put('/contact', async (ctx) => {
    const {request} = ctx;
    // set content
    await puppet.cacheContactPayload.set(request.body.id, request.body);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * delete contact
   */
  router.delete('/contact', parameterValidate({
    id: {type: 'string'},
  }));
  router.delete('/contact', async (ctx) => {
    const {request} = ctx;
    // set content
    await puppet.cacheContactPayload.delete(request.body.id);
    // response
    resultUtil.result(ctx, 200);
  });

  /**
   * query contact
   */
  router.get('/contact', parameterValidate({
    id: {type: 'string', required: false},
  }));
  router.get('/contact', async (ctx) => {
    const {request} = ctx;
    let result = [];
    // get content
    if (request.query.id) {
      result = await puppet.cacheContactPayload.get(request.query.id);
    } else {
      for (let item of await puppet.cacheContactPayload.values()) result.push(item);
    }
    // response
    resultUtil.result(ctx, 200, result);
  });
};
