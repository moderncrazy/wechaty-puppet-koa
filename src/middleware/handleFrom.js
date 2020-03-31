/**
 * Create by geekeryoung on 2020/3/30
 *
 * extract fromId & set contactPayload
 */

/**
 * extract fromId & set contactPayload
 * @param puppet
 * @returns {function}
 */
module.exports = (puppet) => {
  return async (ctx, next) => {
    const {from} = ctx.request.body;
    // extract memberIdList
    ctx.request.body.fromId = from.id;
    // set roomMemberPayload
    puppet.cacheContactPayload.set(from.id, from);
    return next();
  }
};
