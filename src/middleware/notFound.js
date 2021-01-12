"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * not found
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
exports.default = () => {
    return async (ctx, next) => {
        await next();
        if (ctx.status == 404 || !ctx.body) {
            resultUtil_1.default.result(ctx, 404);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Rm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RGb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBRUgsNEVBQTRDO0FBRTVDLGtCQUFlLEdBQUcsRUFBRTtJQUNsQixPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDekIsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNiLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2xDLG9CQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9