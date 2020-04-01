/**
 * Create by geekeryoung on 2020/4/1
 *
 * config initialization file
 */

const fs = require('fs');
const Aigle = require('aigle');

module.exports = {
  /**
   * import init file
   * @param file
   * @param puppet
   */
  async importInitFile(file, puppet) {
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}));
    await this.importContact([data.login], puppet);
    await this.importContact(data.contactList, puppet);
    await this.importRoom(data.roomList, puppet);
    return data;
  },

  /**
   * import contact
   * @param contactList {Array}
   * @param puppet
   */
  async importContact(contactList, puppet) {
    // import contact
    for (let contact of contactList) {
      await puppet.cacheContactPayload.set(contact.id, contact);
    }
  },

  /**
   * import room
   * @param roomList {Array}
   * @param puppet
   */
  async importRoom(roomList, puppet) {
    // import room
    for (let room of roomList) {
      // import roomMember
      room.memberIdList = await Aigle.map(room.memberList, async (member) => {
        member.id = `${room.id}_${member.id}`;
        await puppet.cacheRoomMemberPayload.set(member.id, member);
        return member.id;
      });
      delete room.memberList;
      await puppet.cacheRoomPayload.set(room.id, room);
    }
  },

};
