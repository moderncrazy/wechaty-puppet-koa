/**
 * Create by geekeryoung on 2020/3/30
 *
 * verify request parameters
 */

import {Context} from 'koa';
import Parameter, {ParameterRules} from 'parameter';

import resultUtil from '../util/resultUtil';

const parameter = new Parameter({validateRoot: true});

/**
 * verify request parameters
 */
export default (rule: ParameterRules) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const {body, query} = ctx.request;
    let err = parameter.validate(rule, Object.assign({}, query, body));
    if (!err) {
      return await next();
    } else {
      return resultUtil.result(ctx, 400, {field: err[0].field, message: err[0].message});
    }
  };
};
