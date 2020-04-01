/**
 * Create by geekeryoung on 2020/3/30
 *
 * not found
 */

const resultUtil = require('../util/resultUtil');

module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status == 404 || !ctx.body) {
      resultUtil.result(ctx, 404);
    }
  }
};
