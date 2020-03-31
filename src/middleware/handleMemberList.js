/**
 * Create by geekeryoung on 2020/3/30
 *
 * extract memberIdList & set roomMemberPayload
 */

/**
 * extract memberIdList & set roomMemberPayload
 * @param puppet
 * @returns {function}
 */
module.exports = (puppet) => {
  return async (ctx, next) => {
    const {memberList} = ctx.request.body;
    // extract memberIdList
    ctx.request.body.memberIdList = memberList.map((member) => {
      // set roomMemberPayload
      puppet.cacheRoomMemberPayload.set(member.id, member);
      return member.id;
    });
    return next();
  }
};
