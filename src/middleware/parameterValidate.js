/**
 * Create by geekeryoung on 2020/3/30
 *
 * verify request parameters
 */

const Parameter = require('parameter');

const resultUtil = require('../util/resultUtil');

const parameter = new Parameter({validateRoot: true});

/**
 * verify request parameters
 * @param rule
 * @returns {function}
 */
module.exports = (rule) => {
  return async (ctx, next) => {
    const {body, query} = ctx.request;
    let err = parameter.validate(rule, Object.assign({}, query, body));
    if (!err) {
      return await next();
    } else {
      return resultUtil.result(ctx, 400, {field: err[0].field, message: err[0].message});
    }
  }
};
