"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * room router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
const commonUtil_1 = tslib_1.__importDefault(require("../util/commonUtil"));
const parameterValidate_1 = tslib_1.__importDefault(require("../middleware/parameterValidate"));
/**
 * room router
 */
exports.default = async (router, puppet) => {
    /**
     * add | update room
     */
    router.put('/room', parameterValidate_1.default({
        id: { type: 'string' },
        topic: { type: 'string' },
        adminIdList: { type: 'array', itemType: 'string' },
        memberIdList: { type: 'array', itemType: 'string' },
        avatar: { type: 'string', required: false },
        ownerId: { type: 'string', required: false },
    }));
    router.put('/room', async (ctx) => {
        const { request } = ctx;
        // set cache
        await puppet.mocker.createRoom(request.body);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
    /**
     * add | update room member
     */
    router.put('/room/member', parameterValidate_1.default({
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        roomAlias: { type: 'string', required: false },
        inviterId: { type: 'string', required: false }
    }));
    router.put('/room/member', async (ctx) => {
        const { request } = ctx;
        // set cache
        await puppet.mocker.createContact(request.body);
        await puppet.roomMemberPayload(request.body.id, request.body.id);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
    /**
     * delete room
     */
    router.delete('/room', parameterValidate_1.default({
        id: { type: 'string' },
    }));
    router.delete('/room', async (ctx) => {
        const { request } = ctx;
        // delete cacheRoomPayload
        await puppet.roomQuit(request.body.id);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
    /**
     * query room
     */
    router.get('/room', parameterValidate_1.default({
        id: { type: 'string', required: false },
    }));
    router.get('/room', async (ctx) => {
        const { request } = ctx;
        let result = [];
        // query room
        if (request.query.id) {
            result = commonUtil_1.default.copyByJson(await puppet.roomPayload(request.body.id));
        }
        else {
            for (let id of await puppet.roomList())
                result.push(commonUtil_1.default.copyByJson(await puppet.roomPayload(id)));
        }
        // response
        resultUtil_1.default.result(ctx, 200, result);
    });
    /**
     * query room member
     */
    router.get('/room/member', parameterValidate_1.default({
        roomId: { type: 'string', required: true },
        memberId: { type: 'string', required: false },
    }));
    router.get('/room/member', async (ctx) => {
        const { request } = ctx;
        let result = [];
        // query room member
        if (request.query.id) {
            result = await puppet.roomMemberPayload(request.query.roomId, request.query.memberId);
        }
        else {
            for (let id of await puppet.roomMemberList(request.query.roomId))
                result.push(await puppet.roomMemberPayload(request.query.roomId, id));
        }
        // response
        resultUtil_1.default.result(ctx, 200, result);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb21Sb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQU1ILDRFQUE0QztBQUM1Qyw0RUFBNEM7QUFDNUMsZ0dBQWdFO0FBRWhFOztHQUVHO0FBQ0gsa0JBQWUsS0FBSyxFQUFFLE1BQWMsRUFBRSxNQUFrQixFQUFFLEVBQUU7SUFFMUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwyQkFBaUIsQ0FBQztRQUNwQyxFQUFFLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ3BCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDdkIsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDO1FBQ2hELFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQztRQUNqRCxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFDekMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO0tBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQzlCLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsWUFBWTtRQUNaLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLDJCQUFpQixDQUFDO1FBQzNDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDcEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztRQUN0QixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztRQUM1QyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7S0FDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSixNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDckMsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixZQUFZO1FBQ1osTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRSxXQUFXO1FBQ1gsb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBRUg7O09BRUc7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSwyQkFBaUIsQ0FBQztRQUN2QyxFQUFFLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO0tBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQ2pDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsMEJBQTBCO1FBQzFCLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDJCQUFpQixDQUFDO1FBQ3BDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztLQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUM5QixNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksTUFBTSxHQUFxQyxFQUFFLENBQUM7UUFDbEQsYUFBYTtRQUNiLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDcEIsTUFBTSxHQUFHLG9CQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0U7YUFBTTtZQUNMLEtBQUssSUFBSSxFQUFFLElBQUksTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRztRQUNELFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUg7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSwyQkFBaUIsQ0FBQztRQUMzQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7UUFDeEMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO0tBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQ3JDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxNQUFNLEdBQWlELEVBQUUsQ0FBQztRQUM5RCxvQkFBb0I7UUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNwQixNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RjthQUFNO1lBQ0wsS0FBSyxJQUFJLEVBQUUsSUFBSSxNQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pJO1FBQ0QsV0FBVztRQUNYLG9CQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==