/* 默认的i18n 会被外置的覆盖 主要处理组件内文本 */
import * as ZH_CN from "./zh_cn.json";
import * as EN_US from "./en_us.json";

const lang = {
  zh_cn: ZH_CN.default,
  en_us: EN_US.default,
};

export default lang;
