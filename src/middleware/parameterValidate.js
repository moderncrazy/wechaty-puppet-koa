"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * verify request parameters
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parameter_1 = tslib_1.__importDefault(require("parameter"));
const resultUtil_1 = tslib_1.__importDefault(require("../util/resultUtil"));
const parameter = new parameter_1.default({ validateRoot: true });
/**
 * verify request parameters
 */
exports.default = (rule) => {
    return async (ctx, next) => {
        const { body, query } = ctx.request;
        let err = parameter.validate(rule, Object.assign({}, query, body));
        if (!err) {
            return await next();
        }
        else {
            return resultUtil_1.default.result(ctx, 400, { field: err[0].field, message: err[0].message });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1ldGVyVmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbWV0ZXJWYWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBR0gsa0VBQW9EO0FBRXBELDRFQUE0QztBQUU1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUV0RDs7R0FFRztBQUNILGtCQUFlLENBQUMsSUFBb0IsRUFBRSxFQUFFO0lBQ3RDLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUF3QixFQUFFLEVBQUU7UUFDdEQsTUFBTSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNMLE9BQU8sb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztTQUNwRjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9