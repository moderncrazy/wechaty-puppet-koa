"use strict";
/**
 * Create by geekeryoung on 2020/4/1
 *
 * config initialization file
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
exports.default = {
    /**
     * import init file
     */
    async importInitFile(file, puppet) {
        const data = JSON.parse(fs_1.default.readFileSync(file, { encoding: 'utf8' }));
        await this.importContact([data.login], puppet);
        await this.importContact(data.contactList, puppet);
        await this.importRoom(data.roomList, puppet);
        return data;
    },
    /**
     * import contact
     */
    async importContact(contactList, puppet) {
        // import contact
        for (let contact of contactList) {
            await puppet.mocker.createContact(contact);
        }
    },
    /**
     * import room
     */
    async importRoom(roomList, puppet) {
        // import room
        for (let room of roomList) {
            await puppet.mocker.createRoom(room);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdFV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbml0VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBRUgsb0RBQWdDO0FBSWhDLGtCQUFlO0lBQ2I7O09BRUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLElBQWMsRUFBRSxNQUFrQjtRQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQWtDLEVBQUUsTUFBa0I7UUFDeEUsaUJBQWlCO1FBQ2pCLEtBQUssSUFBSSxPQUFPLElBQUksV0FBVyxFQUFFO1lBQy9CLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQTRCLEVBQUUsTUFBa0I7UUFDL0QsY0FBYztRQUNkLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0NBRUYsQ0FBQyJ9