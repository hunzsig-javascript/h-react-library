import Http from './Http';
import Ws from './Ws';
import Auth from './../Auth';
import I18n from "../I18n";

/**
 *
 * @param setting
 * @constructor
 */
const ApiConnect = function (setting) {

  this.type = setting.type;
  this.host = setting.host;
  this.crypto = setting.crypto;
  this.append = setting.append;

  /**
   *
   * @param params
   */
  this.appendParams = (params) => {
    params.auth_uid = Auth.getUid();
    if (this.append === null) {
      return;
    }
    for (let key in this.append) {
      if (typeof params[key] === "undefined") { // 可指定,不覆盖
        params[key] = this.append[key];
      }
    }
    return params;
  };

  /**
   * 有缓存
   * @param scope
   * @param params
   * @param then
   */
  this.cache = (scope, params, then) => {
    params = this.appendParams(params);
    switch (this.type) {
      case 'HTTP':
        Http.PathLogin = Auth.getLoginPath();
        Http.cache({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'HTTP.SHARP':
        Http.PathLogin = '/#' + Auth.getLoginPath();
        Http.cache({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'HTTP.REST':
        Http.PathLogin = Auth.getLoginPath();
        Http.cache({
          host: this.host + scope,
          scope: '',
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'WS':
        Ws.PathLogin = Auth.getLoginPath();
        Ws.cache({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'WS.SHARP':
        Ws.PathLogin = '/#' + Auth.getLoginPath();
        Ws.cache({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      default:
        console.error(I18n.translate('apiTypeError'));
        break;
    }
  };

  /**
   * 无缓存
   * @param scope
   * @param params
   * @param then
   */
  this.real = (scope, params, then) => {
    params = this.appendParams(params);
    switch (this.type) {
      case 'HTTP':
        Http.PathLogin = Auth.getLoginPath();
        Http.real({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'HTTP.SHARP':
        Http.PathLogin = '/#' + Auth.getLoginPath();
        Http.real({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      case 'HTTP.REST':
        Http.PathLogin = Auth.getLoginPath();
        Http.real({
          host: this.host + scope,
          scope: '',
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS':
        Ws.PathLogin = Auth.getLoginPath();
        Ws.real({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS.SHARP':
        Ws.PathLogin = '/#' + Auth.getLoginPath();
        Ws.real({
          host: this.host,
          scope: scope,
          params: params,
          then: then,
          crypto: this.crypto,
        });
        break;
      default:
        console.error(I18n.translate('apiTypeError'));
        break;
    }
  };

};

export default ApiConnect;
