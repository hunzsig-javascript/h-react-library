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
   * @param crypto 加密方式
   * @param append 附加参数
   */
  set: (key, host, type = 'HTTP', crypto, append) => {
    Api.setting[key] = {
      host: host,
      type: type.toUpperCase(),
      crypto: crypto || null,
      append: append || null,
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
