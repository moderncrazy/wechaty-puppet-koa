"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * friendship router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
const parameterValidate_1 = tslib_1.__importDefault(require("../middleware/parameterValidate"));
/**
 * friendship router
 */
exports.default = async (router, puppet) => {
    /**
     * confirm friendship
     */
    router.post('/friendship', parameterValidate_1.default({
        contactId: { type: 'string' },
        hello: { type: 'string', required: false },
    }));
    router.post('/friendship', async (ctx) => {
        const { request } = ctx;
        const { contactId, hello } = request.body;
        // set content
        await puppet.friendshipAdd(contactId, hello);
        // response
        resultUtil_1.default.result(ctx, 200);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kc2hpcFJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZHNoaXBSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUtILDRFQUE0QztBQUM1QyxnR0FBZ0U7QUFFaEU7O0dBRUc7QUFDSCxrQkFBZSxLQUFLLEVBQUUsTUFBYyxFQUFFLE1BQWtCLEVBQUUsRUFBRTtJQUUxRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLDJCQUFpQixDQUFDO1FBQzNDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO0tBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQ3JDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsTUFBTSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3hDLGNBQWM7UUFDZCxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLFdBQVc7UUFDWCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==