/**
 * Create by geekeryoung on 2020/4/1
 *
 * config initialization file
 */

import fs, {PathLike} from 'fs';
import PuppetMock from 'wechaty-puppet-mock';
import {ContactPayload, RoomPayload} from 'wechaty-puppet';

export default {
  /**
   * import init file
   */
  async importInitFile(file: PathLike, puppet: PuppetMock) {
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}));
    await this.importContact([data.login], puppet);
    await this.importContact(data.contactList, puppet);
    await this.importRoom(data.roomList, puppet);
    return data;
  },

  /**
   * import contact
   */
  async importContact(contactList: Array<ContactPayload>, puppet: PuppetMock) {
    // import contact
    for (let contact of contactList) {
      await puppet.mocker.createContact(contact);
    }
  },

  /**
   * import room
   */
  async importRoom(roomList: Array<RoomPayload>, puppet: PuppetMock) {
    // import room
    for (let room of roomList) {
      await puppet.mocker.createRoom(room);
    }
  },

};
