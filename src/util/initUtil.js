/**
 * Create by geekeryoung on 2020/4/1
 *
 * config initialization file
 */

const fs = require('fs');

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
    await this.importRoomMember(data.roomMemberList, puppet);
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
   * @param roomMemberList {Array}
   * @param puppet
   */
  async importRoomMember(roomMemberList, puppet) {
    // import roomMember
    for (let roomMember of roomMemberList) {
      // extract the corresponding contact
      let contact = (await puppet.cacheContactPayload.get(roomMember.id)) || {};
      await puppet.cacheRoomMemberPayload.set(roomMember.id, Object.assign({
        name: contact.name || 'mock_name',
        avatar: contact.avatar || 'https://avatars0.githubusercontent.com/u/21285357?s=200&v=4'
      }, roomMember));
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
      await puppet.cacheRoomPayload.set(room.id, room);
    }
  },

};
