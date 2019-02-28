import Http from './Http';
import Ws from './Ws';
import Auth from './../Auth';
import I18n from "../I18n";

/**
 * api 请求
 * @param scope
 * @param params
 * @param then
 * @param refresh
 * @constructor
 */
const Api = {
  type: null,
  host: null,
  crypto: null,
  setType: (t) => {
    Api.type = t.toUpperCase();
  },
  setHost: (h) => {
    Api.host = h;
  },
  setCrypto: (c) => {
    Api.crypto = c;
  },
  // TODO CACHE
  cache: (scope, params, then) => {
    switch (Api.type) {
      case 'HTTP':
        Http.PathLogin = Auth.getLoginPath();
        Http.cache({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'HTTP.SHARP':
        Http.PathLogin = '/#' + Auth.getLoginPath();
        Http.cache({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'HTTP.REST':
        Http.PathLogin = Auth.getLoginPath();
        Http.cache({
          host: Api.host + scope,
          scope: '',
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS':
        Ws.PathLogin = Auth.getLoginPath();
        Ws.cache({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS.SHARP':
        Ws.PathLogin = '/#' + Auth.getLoginPath();
        Ws.cache({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      default:
        console.error(I18n.translate('apiTypeError'));
        break;
    }
  },
  // TODO REAL
  real: (scope, params, then) => {
    switch (Api.type) {
      case 'HTTP':
        Http.PathLogin = Auth.getLoginPath();
        Http.real({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'HTTP.SHARP':
        Http.PathLogin = '/#' + Auth.getLoginPath();
        Http.real({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'HTTP.REST':
        Http.PathLogin = Auth.getLoginPath();
        Http.real({
          host: Api.host + scope,
          scope: '',
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS':
        Ws.PathLogin = Auth.getLoginPath();
        Ws.real({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      case 'WS.SHARP':
        Ws.PathLogin = '/#' + Auth.getLoginPath();
        Ws.real({
          host: Api.host,
          scope: scope,
          params: params,
          then: then,
          crypto: Api.crypto,
        });
        break;
      default:
        console.error(I18n.translate('apiTypeError'));
        break;
    }
  },
};

export default Api;
