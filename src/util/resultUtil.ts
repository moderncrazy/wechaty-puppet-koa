/**
 * Create by geekeryoung on 2020/3/30
 *
 * common tools
 */

import {Context} from 'koa';

import keyUtil from './keyUtil';

export default {
  /**
   * return default msg
   */
  defaultMessageByState(state: number) {
    switch (state) {
      case 200:
        return keyUtil.RequestSuccess;
      case 201:
        return keyUtil.CreateSuccess;
      case 400:
        return keyUtil.RequestError;
      case 401:
        return keyUtil.PermissionDenied;
      case 403:
        return keyUtil.TurningDown;
      case 404:
        return keyUtil.NotFound;
      case 410:
        return keyUtil.ResourcesDeleted;
      case 412:
        return keyUtil.MissingParameter;
      case 422:
        return keyUtil.ParameterError;
      case 500:
        return keyUtil.ServerError;
    }
  },
  result(ctx: Context, state: number, data?: any, msg?: string) {
    ctx.status = state;
    ctx.body = {
      state, data,
      message: msg || this.defaultMessageByState(state)
    };
  }
};
