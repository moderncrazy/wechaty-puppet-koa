/**
 * Create by geekeryoung on 2020/3/30
 *
 * not found
 */

import resultUtil from '../util/resultUtil';

export default () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status == 404 || !ctx.body) {
      resultUtil.result(ctx, 404);
    }
  };
};
