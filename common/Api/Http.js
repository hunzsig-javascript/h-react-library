import {message} from 'antd';
import axios from 'axios';
import Crypto from '../Crypto';
import Parse from '../Parse';
import Auth from '../Auth';
import I18n from '../I18n';

const ApiSave = (key, res) => {
  try {
    localStorage[key] = Parse.jsonEncode(res);
    localStorage[`${key}#EXPIRE`] = (new Date()).getTime() + 6e4;
  } catch (e) {
    localStorage.clear();
  }
};
const ApiLoad = (key) => {
  if (localStorage[`${key}#EXPIRE`] === undefined || localStorage[`${key}#EXPIRE`] < (new Date()).getTime()) {
    localStorage[key] = null;
  }
  return localStorage[key] ? Parse.jsonDecode(localStorage[key]) : null;
};

/**
 * api 请求
 * @param scope
 * @param params
 * @param then
 * @param refresh
 * @constructor
 */
const Http = {
  CacheKeyLimit: 3000,
  PathLogin: null,
  TipsLogin: I18n.translate('loginTimeout'),
  Tips403: I18n.translate('loginTimeoutOrNotPermission'),
  cache: (conf) => {
    if (Array.isArray(conf.scope)) {
      Http.runAll(conf, false);
    } else if (typeof conf.scope === 'string') {
      Http.run(conf, false);
    } else {
      message.error(I18n.translate('scopeError'));
    }
  },
  real: (conf) => {
    if (Array.isArray(conf.scope)) {
      Http.runAll(conf, true);
    } else if (typeof conf.scope === 'string') {
      Http.run(conf, true);
    } else {
      message.error(I18n.translate('scopeError'));
    }
  },
  run: (conf, refresh) => {
    const host = conf.host || null;
    const scope = conf.scope || null;
    const params = conf.params || {};
    const then = conf.then || function () {
    };
    const crypto = conf.crypto || null;
    const header = conf.header || {};
    refresh = typeof refresh === 'boolean' ? refresh : false;
    params.auth_uid = Auth.getUid();
    const key = scope + Parse.jsonEncode(params);
    if (refresh === false && key.length < Http.CacheKeyLimit && ApiLoad(key) !== null) {
      then(ApiLoad(key));
      return;
    }
    axios
      .post(host, Crypto.encode({client_id: Auth.getClientId(), scope: scope, ...params}, crypto), header)
      .then((response) => {
        if (Crypto.is(crypto)) {
          response.data = Crypto.decode(response.data, crypto);
        }
        if (typeof response.data === 'object') {
          if (typeof response.data.code === 'number' && response.data.code === 403) {
            if (Auth.getUid() !== undefined) {
              message.error(Http.TipsLogin, 2.00, () => {
                Parse.locationTo(Http.PathLogin);
              });
            }
            then({code: 500, response: I18n.translate('limitedOperation'), data: null});
            return;
          }
          then(response.data);
          if (refresh === false && typeof response.data.code === 'number' && response.data.code === 200 && key.length < Http.CacheKeyLimit) {
            ApiSave(key, response.data);
          }
        } else {
          then({code: 500, response: I18n.translate('apiError'), data: null});
        }
      })
      .catch((error) => {
        const status = (error.response && error.response.status) ? error.response.status : -1;
        switch (status) {
          case 400:
            error.message = I18n.translate('apiErrorQuery');
            break;
          case 401:
            error.message = I18n.translate('apiErrorNotAuth');
            break;
          case 403:
            error.message = I18n.translate('apiErrorReject');
            break;
          case 404:
            error.message = I18n.translate('apiErrorAbort');
            break;
          case 408:
            error.message = I18n.translate('apiErrorTimeout');
            break;
          case 500:
            error.message = I18n.translate('apiErrorServer');
            break;
          case 501:
            error.message = I18n.translate('apiErrorNotService');
            break;
          case 502:
            error.message = I18n.translate('apiErrorNet');
            break;
          case 503:
            error.message = I18n.translate('apiErrorServiceDisable');
            break;
          case 504:
            error.message = I18n.translate('apiErrorNetTimeout');
            break;
          case 505:
            error.message = I18n.translate('apiErrorNotSupportHttp');
            break;
          default:
            error.message = `${I18n.translate('apiErrorDefault')}(${status})!`;
        }
        then({code: status, response: error.message, data: null});
      });
  },
  runAll: (conf, refresh) => {
    const host = conf.host || null;
    const scope = conf.scope || null;
    const params = conf.params || {};
    const then = conf.then || function () {
    };
    const crypto = conf.crypto || null;
    const header = conf.header || {};
    refresh = typeof refresh === 'boolean' ? refresh : true;
    if (Array.isArray(params)) {
      params.forEach((p) => {
        p.auth_uid = Auth.getUid();
      });
    } else {
      params.auth_uid = Auth.getUid();
    }
    const realKey = [];
    const real = [];
    const result = [];
    let resultQty = 0;
    scope.forEach((s, idx) => {
      const key = s + Parse.jsonEncode(Array.isArray(params) ? params[idx] : params);
      if (refresh === false && key.length < Http.CacheKeyLimit && ApiLoad(key) !== null) {
        result[idx] = ApiLoad(key);
        resultQty += 1;
      } else {
        realKey[idx] = key;
        real.push(axios.post(host, Crypto.encode({
          client_id: Auth.getClientId(),
          scope: s, ...(Array.isArray(params) ? params[idx] : params)
        }, crypto), header));
      }
    });
    if (resultQty === scope.length) {
      then(result);
      return;
    }
    axios
      .all(real)
      .then((all) => {
        let hasNotAuth = false;
        all.forEach((response, idx) => {
          let pushIdx = idx;
          while (result[pushIdx] !== undefined) {
            pushIdx += 1;
          }
          if (Crypto.is(crypto)) {
            response.data = Crypto.decode(response.data, crypto);
          }
          if (typeof response.data === 'object') {
            if (typeof response.data.code === 'number' && response.data.code === 403) {
              hasNotAuth = true;
            } else if (typeof response.data.code === 'number' && response.data.code === 200) {
              result[pushIdx] = response.data;
              if (refresh === false && realKey[pushIdx].length < Http.CacheKeyLimit) {
                ApiSave(realKey[pushIdx], response.data);
              }
            }
          } else {
            result[pushIdx] = {code: 500, response: I18n.translate('apiError'), data: null};
          }
        });
        if (hasNotAuth === true) {
          if (Auth.getUid() !== undefined) {
            message.error(Http.Tips403, 2.00, () => {
              Parse.locationTo(Http.PathLogin);
            });
          } else {
            message.warning(I18n.translate('operationNotPermission'));
          }
        } else {
          then(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default Http;
