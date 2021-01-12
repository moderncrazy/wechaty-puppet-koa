"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * message router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wechaty_puppet_1 = require("wechaty-puppet");
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
const parameterValidate_1 = tslib_1.__importDefault(require("../middleware/parameterValidate"));
/**
 * message router
 */
exports.default = async (router, puppet) => {
    /**
     * send message by room
     */
    router.post('/message/room', parameterValidate_1.default({
        roomId: { type: 'string' },
        fromId: { type: 'string' },
        text: { type: 'string', required: false },
        filename: { type: 'string', required: false },
    }));
    router.post('/message/room', async (ctx) => {
        const { request } = ctx;
        const { roomId, text, filename, fromId } = request.body;
        try {
            // set content
            let from = await puppet.mocker.ContactMock.load(fromId);
            let room = await puppet.mocker.RoomMock.load(roomId);
            from.say(text || wechaty_puppet_1.FileBox.fromFile(filename)).to(room);
            // response
            resultUtil_1.default.result(ctx, 200);
        }
        catch (e) {
            resultUtil_1.default.result(ctx, 400, null, e.message);
        }
    });
    /**
     * send message by single
     */
    router.post('/message/single', parameterValidate_1.default({
        toId: { type: 'string' },
        fromId: { type: 'string' },
        text: { type: 'string', required: false },
        filename: { type: 'string', required: false },
    }));
    router.post('/message/single', async (ctx) => {
        const { request } = ctx;
        const { toId, fromId, text, filename } = request.body;
        try {
            let from = await puppet.mocker.ContactMock.load(fromId);
            let to = await puppet.mocker.ContactMock.load(toId);
            from.say(text || wechaty_puppet_1.FileBox.fromFile(filename)).to(to);
            // response
            resultUtil_1.default.result(ctx, 200);
        }
        catch (e) {
            resultUtil_1.default.result(ctx, 400, null, e.message);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUdILG1EQUF1QztBQUd2Qyw0RUFBNEM7QUFDNUMsZ0dBQWdFO0FBRWhFOztHQUVHO0FBQ0gsa0JBQWUsS0FBSyxFQUFFLE1BQWMsRUFBRSxNQUFrQixFQUFFLEVBQUU7SUFFMUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSwyQkFBaUIsQ0FBQztRQUM3QyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDeEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBQ3ZDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztLQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUN2QyxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLE1BQU0sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3RELElBQUk7WUFDRixjQUFjO1lBQ2QsSUFBSSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksd0JBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsV0FBVztZQUNYLG9CQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1Ysb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsMkJBQWlCLENBQUM7UUFDL0MsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztRQUN0QixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztRQUN2QyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7S0FDNUMsQ0FBQyxDQUFDLENBQUM7SUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUN6QyxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLE1BQU0sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3BELElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RCxJQUFJLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSx3QkFBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRCxXQUFXO1lBQ1gsb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9