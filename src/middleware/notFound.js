/**
 * Create by geekeryoung on 2020/3/30
 *
 * not found
 */

const util = require('../util/util');

module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status == 404 || !ctx.body) {
      util.result(ctx, 404);
    }
  }
};
