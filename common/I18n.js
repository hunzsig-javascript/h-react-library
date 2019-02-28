import defaulti18n from "./I18n/lang";
import youri18n from "../../i18n/i18n";

const I18n = {
  defaultLang: 'zh_cn',
  setDefaultLang: (lang) => {
    I18n.defaultLang = lang;
  },
  translate: (trans, lang = null) => {
    if (lang === null) {
      lang = I18n.defaultLang;
    }
    let l = (youri18n[lang] && youri18n[lang][trans]) ? youri18n[lang][trans] : null;
    if (!l) l = (defaulti18n[lang] && defaulti18n[lang][trans]) ? defaulti18n[lang][trans] : null;
    if (!l) l = (youri18n[I18n.defaultLang] && youri18n[I18n.defaultLang][trans]) ? youri18n[I18n.defaultLang][trans] : null;
    if (!l) l = (defaulti18n[I18n.defaultLang] && defaulti18n[I18n.defaultLang][trans]) ? defaulti18n[I18n.defaultLang][trans] : null;
    if (!l) return trans;
    return l;
  },
};

export default I18n;
