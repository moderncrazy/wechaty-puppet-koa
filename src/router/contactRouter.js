"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * contact router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
const parameterValidate_1 = tslib_1.__importDefault(require("../middleware/parameterValidate"));
/**
 * contact router
 */
exports.default = async (router, puppet) => {
    /**
     * add contact
     */
    router.put('/contact', parameterValidate_1.default({
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        type: { type: 'enum', values: [0, 1, 2] },
        gender: { type: 'enum', values: [0, 1, 2] },
        city: { type: 'string', required: false },
        alias: { type: 'string', required: false },
        star: { type: 'boolean', required: false },
        weixin: { type: 'string', required: false },
        friend: { type: 'boolean', required: false },
        address: { type: 'string', required: false },
        province: { type: 'string', required: false },
    }));
    router.put('/contact', async (ctx) => {
        const { request } = ctx;
        // set content
        await puppet.mocker.createContact(request.body);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
    /**
     * delete contact
     */
    router.delete('/contact', parameterValidate_1.default({
        id: { type: 'string' },
    }));
    router.delete('/contact', async (ctx) => {
        const { request } = ctx;
        // set content
        await puppet.mocker.cacheContactPayload.delete(request.body.id);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
    /**
     * query contact
     */
    router.get('/contact', parameterValidate_1.default({
        id: { type: 'string', required: false },
    }));
    router.get('/contact', async (ctx) => {
        const { request } = ctx;
        let result = [];
        // get content
        if (request.query.id) {
            result = await puppet.contactPayload(request.query.id);
        }
        else {
            for (let id of await puppet.contactList())
                result.push(await puppet.contactPayload(id));
        }
        // response
        resultUtil_1.default.result(ctx, 200, result);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQU1ILDRFQUE0QztBQUM1QyxnR0FBZ0U7QUFFaEU7O0dBRUc7QUFDSCxrQkFBZSxLQUFLLEVBQUUsTUFBYyxFQUFFLE1BQWtCLEVBQUUsRUFBRTtJQUUxRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLDJCQUFpQixDQUFDO1FBQ3ZDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDcEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztRQUN0QixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztRQUN2QyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7UUFDekMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBQ3ZDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztRQUN4QyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFDeEMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1FBQ3pDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztRQUMxQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFDMUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO0tBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQ2pDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsY0FBYztRQUNkLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLDJCQUFpQixDQUFDO1FBQzFDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7S0FDckIsQ0FBQyxDQUFDLENBQUM7SUFDSixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDcEMsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixjQUFjO1FBQ2QsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLDJCQUFpQixDQUFDO1FBQ3ZDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQztLQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUNqQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksTUFBTSxHQUEyQyxFQUFFLENBQUM7UUFDeEQsY0FBYztRQUNkLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDcEIsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxLQUFLLElBQUksRUFBRSxJQUFJLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsV0FBVztRQUNYLG9CQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==