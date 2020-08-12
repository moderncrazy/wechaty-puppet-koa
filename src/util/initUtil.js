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
    await this.importRoom(data.roomList, puppet);
    return data;
  },

  /**
   * import contact
   * @param contactList {Array}
   * @param puppet {PuppetMock}
   */
  async importContact(contactList, puppet) {
    // import contact
    for (let contact of contactList) {
      puppet.mocker.createContact(contact);
    }
  },

  /**
   * import room
   * @param roomList {Array}
   * @param puppet {PuppetMock}
   */
  async importRoom(roomList, puppet) {
    // import room
    for (let room of roomList) {
      puppet.mocker.createRoom(room)
    }
  },

};
