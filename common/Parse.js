const Parse = {
  /**
   * 图片处理
   */
  pic: {
    404: require('../assets/img/404.jpg'),
    logo: require('../assets/img/logo.png'),
  },
  getPicture: (key) => {
    return Parse.pic[key];
  },
  setPicture: (key, dataSource) => {
    Parse.pic[key] = dataSource;
  },
  /**
   * 合成地址串
   * @param url
   * @param params
   * @returns {string}
   */
  combineUrl: (url, params) => {
    params = params || null;
    if (typeof url !== 'string' || url.length <= 0) {
      return;
    }
    if (url === 'this') {
      url = location.pathname;
    }
    let paramsStr = '';
    if (params != null) {
      let key;
      for (key in params) {
        const pd = encodeURIComponent(typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]);
        if (paramsStr === '') {
          paramsStr += `?${key}=${pd}`;
        } else {
          paramsStr += `&${key}=${pd}`;
        }
      }
    }
    return url + paramsStr;
  },
  /**
   * 跳转
   * @param location
   */
  locationTo: (location) => {
    if (location.indexOf('?') > 0) {
      location += '&_t=' + (new Date()).getTime();
    } else {
      location += '?_t=' + (new Date()).getTime();
    }
    window.location.href = location;
  },
  /**
   * 重转
   * @param location
   */
  replaceTo: (location) => {
    if (location.indexOf('?') > 0) {
      location += '&_t=' + (new Date()).getTime();
    } else {
      location += '?_t=' + (new Date()).getTime();
    }
    window.location.replace(location);
  },
  /**
   * 获取地址栏参数 _GET
   * search = this.props.location.search
   * 如果找不到 this.props.location.search 会自动读取 location.search
   */
  get: (search) => {
    if (search.length <= 0) {
      search = location.search.replace('/', '');
    }
    search = search.substr(1, search.length - 1);
    search = search.split('&');
    const params = {};
    search.forEach((s) => {
      const eq = s.split('=');
      if (eq.length === 2) {
        params[eq[0]] = decodeURIComponent(eq[1]);
      }
    });
    return params;
  },
  /**
   * 图片路径自适应
   * @param data
   * @param def
   * @returns {string}
   */
  img: (data, def) => {
    def = def || Parse.getPicture(404);
    if (typeof data === 'string' && data.length > 0) {
      return data;
    }
    return def;
  },
  /**
   * 比较两个值的大小
   * data1 > data2返回 1
   * data1 < data2返回 -1
   * data1 = data2返回 0
   * @param data1
   * @param data2
   */
  isBigger: (data1, data2) => {
    // 处理undefined/null 设为 0
    if (data1 === undefined || data1 === null) data1 = 0;
    if (data2 === undefined || data2 === null) data2 = 0;
    // 处理布尔 true -> 1 false -> 0
    if (typeof data1 === 'boolean') data1 = data1 ? 1 : 0;
    if (typeof data2 === 'boolean') data2 = data2 ? 1 : 0;
    // 数字间比较
    if (typeof data1 === 'number' && typeof data2 === 'number') {
      if (parseFloat(data1) > parseFloat(data2)) {
        return 1;
      } else if (parseFloat(data1) < parseFloat(data2)) {
        return -1;
      }
      return 0;
    }
    // 有一方为对象，认为对象较大，都为对象则相等
    if (typeof data1 === 'object' && typeof data2 === 'object') {
      return 0;
    } else if (typeof data1 === 'object' && typeof data2 !== 'object') {
      return 1;
    } else if (typeof data1 !== 'object' && typeof data2 === 'object') {
      return -1;
    }
    // 有一方为函数，认为函数较大，都为函数则相等
    if (typeof data1 === 'function' && typeof data2 === 'function') {
      return 0;
    } else if (typeof data1 === 'function' && typeof data2 !== 'function') {
      return 1;
    } else if (typeof data1 !== 'function' && typeof data2 === 'function') {
      return -1;
    }
    // 有一方为字符串，两个值都以ascii码对比
    if (typeof data1 === 'string' || typeof data2 === 'string') {
      data1 = data1.toString();
      data2 = data2.toString();
      let i = 0;
      let result = 0;
      while (i < data1.length && i < data1.length && result === 0) {
        const char1 = data1.charCodeAt(i);
        const char2 = data2.charCodeAt(i);
        if (char1 > char2) {
          result = 1;
        } else if (char1 < char2) {
          result = -1;
        }
        i += 1;
      }
      return result;
    }
  },
  /**
   * json decode
   * @param data
   * @returns {object}
   */
  jsonDecode: (data) => {
    return JSON.parse(data);
  },
  /**
   * json encode
   * @param json
   * @returns {string}
   */
  jsonEncode: (json) => {
    return JSON.stringify(json);
  },
  /**
   * 多位数四舍五入
   * @param num
   * @param v
   * @returns {number}
   */
  decimal: (num, v) => {
    const vv = Math.pow(10, v);
    const result = Math.round(num * vv) / vv;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(v));
  },
  /**
   * 随机整数
   * @param min
   * @param max
   * @returns {number}
   */
  randInt: (min, max) => {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  },

  /**
   * 数组洗牌
   * @returns {Parse}
   */
  shuffle: function (a) {
    const arr = JSON.parse(JSON.stringify(a));
    let m = arr.length, i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [arr[m], arr[i]] = [arr[i], arr[m]]
    }
    return arr;
  },

};

export default Parse;
