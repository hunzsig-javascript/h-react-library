import I18n from "./I18n";

const randCharArr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_~!@$[]-·';
const randNum = (Min, Max) => {
  return (Min + Math.round(Math.random() * (Max - Min)));
};
const randChar = (length) => {
  let char = '';
  while (length > 0) {
    char += randCharArr[randNum(0, randCharArr.length - 1)];
    length -= 1;
  }
  return char;
};
const Auth = {
  uid: '_HU1359',
  account: '_IDT4425',
  remember: '_REB1873',
  loginPath: '/sign/in',
  apiUrl: null,
  /**
   * 设置登录路径
   * @returns {*|string}
   */
  setLoginPath: (path) => {
    Auth.loginPath = path;
  },
  /**
   * 获取登录路径
   * @returns {*|string}
   */
  getLoginPath: () => {
    return Auth.loginPath;
  },
  /**
   * 设置Api网址
   * @returns {*|string}
   */
  setApiUrl: (u) => {
    Auth.apiUrl = u;
  },
  /**
   * 获取Api网址
   * @returns {*|string}
   */
  getApiUrl: () => {
    return Auth.apiUrl;
  },
  /**
   * 获取客户端ID
   */
  getClientId: () => {
    if (localStorage.cid === undefined) {
      localStorage.cid = randChar(128) + (new Date()).getTime().toString() + randChar(128);
    }
    return localStorage.cid;
  },
  /**
   * 记住账号
   * @returns {*|string}
   */
  getAccount: () => {
    return localStorage[Auth.account];
  },
  setAccount: (val) => {
    localStorage[Auth.account] = val;
  },
  /**
   * 是否记住账号
   * @returns {*|string}
   */
  getRemember: () => {
    return localStorage[Auth.remember] === '1';
  },
  setRemember: (val) => {
    localStorage[Auth.remember] = val;
  },
  /**
   * 用户ID
   * @returns {*|string}
   */
  getUid: () => {
    return localStorage[Auth.uid];
  },
  setUid: (val) => {
    localStorage[Auth.uid] = val;
  },
  clearUid: () => {
    localStorage[Auth.uid] = '';
  },
  /**
   * 登录检验
   * @returns {boolean}
   */
  isOnline: () => {
    let is = false;
    if (Auth.getUid() && Auth.getUid().length > 0) {
      is = true;
    }
    return is;
  },
  /**
   * 用户名自适应
   * @param data
   * @returns {string}
   */
  userName: (data) => {
    let name = '';
    if (typeof data !== 'object') {
      name = I18n.translate('loading');
    }
    if (data.user_mobile) name = data.user_mobile;
    if (data.user_email) name = data.user_email;
    if (data.user_login_name) name = data.user_login_name;
    if (data.user_identity_name) name = data.user_identity_name;
    if (data.user_info_nickname) name = data.user_info_nickname;
    return name;
  },
};

export default Auth;
