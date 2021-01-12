"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 *
 * common tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const keyUtil_1 = tslib_1.__importDefault(require("./keyUtil"));
exports.default = {
    /**
     * return default msg
     */
    defaultMessageByState(state) {
        switch (state) {
            case 200:
                return keyUtil_1.default.RequestSuccess;
            case 201:
                return keyUtil_1.default.CreateSuccess;
            case 400:
                return keyUtil_1.default.RequestError;
            case 401:
                return keyUtil_1.default.PermissionDenied;
            case 403:
                return keyUtil_1.default.TurningDown;
            case 404:
                return keyUtil_1.default.NotFound;
            case 410:
                return keyUtil_1.default.ResourcesDeleted;
            case 412:
                return keyUtil_1.default.MissingParameter;
            case 422:
                return keyUtil_1.default.ParameterError;
            case 500:
                return keyUtil_1.default.ServerError;
        }
    },
    result(ctx, state, data, msg) {
        ctx.status = state;
        ctx.body = {
            state, data,
            message: msg || this.defaultMessageByState(state)
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0VXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc3VsdFV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUlILGdFQUFnQztBQUVoQyxrQkFBZTtJQUNiOztPQUVHO0lBQ0gscUJBQXFCLENBQUMsS0FBYTtRQUNqQyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsY0FBYyxDQUFDO1lBQ2hDLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsYUFBYSxDQUFDO1lBQy9CLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsWUFBWSxDQUFDO1lBQzlCLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsZ0JBQWdCLENBQUM7WUFDbEMsS0FBSyxHQUFHO2dCQUNOLE9BQU8saUJBQU8sQ0FBQyxXQUFXLENBQUM7WUFDN0IsS0FBSyxHQUFHO2dCQUNOLE9BQU8saUJBQU8sQ0FBQyxRQUFRLENBQUM7WUFDMUIsS0FBSyxHQUFHO2dCQUNOLE9BQU8saUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNsQyxLQUFLLEdBQUc7Z0JBQ04sT0FBTyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDO1lBQ2xDLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsY0FBYyxDQUFDO1lBQ2hDLEtBQUssR0FBRztnQkFDTixPQUFPLGlCQUFPLENBQUMsV0FBVyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFZLEVBQUUsS0FBYSxFQUFFLElBQVUsRUFBRSxHQUFZO1FBQzFELEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDVCxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQztTQUNsRCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==