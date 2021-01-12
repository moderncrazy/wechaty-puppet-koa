/**
 * Create by geekeryoung on 2020/4/2
 *
 * common util
 */

export default {
  /**
   * deep copy by json
   */
  copyByJson<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }
};
