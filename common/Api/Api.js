import ApiConnect from "./ApiConnect";

/**
 * api 请求
 * @param scope
 * @param params
 * @param then
 * @param refresh
 * @constructor
 */
const Api = {

  setting: {},

  /**
   * 配置host
   * @param key 唯一key
   * @param host 链接
   * @param type 类型 http | ws
   * @param crypto
   */
  setHost: (key, host, type = 'HTTP', crypto = null) => {
    Api.setting[key] = {
      host: host,
      type: type.toUpperCase(),
      crypto: crypto || null,
    };
  },

  /**
   *
   * @param hostKey
   * @returns {ApiConnect}
   */
  connect: (hostKey = 'default') => {
    const setting = Api.setting[hostKey];
    if (setting === null) {
      throw 'setting error';
    }
    return new ApiConnect(setting);
  },

};

export default Api;
