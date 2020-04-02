/**
 * Create by geekeryoung on 2020/4/2
 *
 * common util
 */

module.exports = {
  /**
   * deep copy by json
   * @param data
   */
  copyByJson(data) {
    return JSON.parse(JSON.stringify(data));
  }
};
