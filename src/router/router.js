"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * main router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const router_1 = tslib_1.__importDefault(require("@koa/router"));
const rootRouter_1 = tslib_1.__importDefault(require("./rootRouter"));
const roomRouter_1 = tslib_1.__importDefault(require("./roomRouter"));
const messageRouter_1 = tslib_1.__importDefault(require("./messageRouter"));
const contactRouter_1 = tslib_1.__importDefault(require("./contactRouter"));
const friendshipRouter_1 = tslib_1.__importDefault(require("./friendshipRouter"));
/**
 * register router
 */
exports.default = async (app, puppet) => {
    const router = new router_1.default({ prefix: puppet.prefix });
    // root router
    await rootRouter_1.default(router, puppet);
    // room router
    await roomRouter_1.default(router, puppet);
    // contact router
    await contactRouter_1.default(router, puppet);
    // message router
    await messageRouter_1.default(router, puppet);
    // friendship router
    await friendshipRouter_1.default(router, puppet);
    // register router
    app.use(router.routes());
    app.use(router.allowedMethods());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFFSCxpRUFBaUM7QUFFakMsc0VBQXNDO0FBQ3RDLHNFQUFzQztBQUN0Qyw0RUFBNEM7QUFDNUMsNEVBQTRDO0FBQzVDLGtGQUFrRDtBQUVsRDs7R0FFRztBQUNILGtCQUFlLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFFbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBRW5ELGNBQWM7SUFDZCxNQUFNLG9CQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLGNBQWM7SUFDZCxNQUFNLG9CQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixNQUFNLHVCQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLGlCQUFpQjtJQUNqQixNQUFNLHVCQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLG9CQUFvQjtJQUNwQixNQUFNLDBCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV2QyxrQkFBa0I7SUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyJ9