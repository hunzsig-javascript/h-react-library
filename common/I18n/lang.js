/* 默认的i18n 会被外置的覆盖 主要处理组件内文本 */
import * as ZH_CN from "./zh_cn.json";
import * as ZH_HK from "./zh_hk.json";
import * as ZH_TW from "./zh_tw.json";
import * as EN_US from "./en_us.json";
import * as JA_JP from "./ja_jp.json";
import * as KO_KR from "./ko_kr.json";

const lang = {
  zh_cn: ZH_CN.default,
  zh_hk: ZH_HK.default,
  zh_tw: ZH_TW.default,
  en_us: EN_US.default,
  ja_jp: JA_JP.default,
  ko_kr: KO_KR.default,
};

export default lang;
