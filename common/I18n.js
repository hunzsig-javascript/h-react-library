import defaultI18n from "./I18n/lang";

const I18n = {
  defaultLang: 'zh_cn',
  externalI18n: {},
  setDefaultLang: (lang) => {
    I18n.defaultLang = lang;
  },
  setExternal: (externalI18n) => {
    I18n.externalI18n = externalI18n;
  },
  translate: (trans, lang = null) => {
    if (lang === null) {
      lang = I18n.defaultLang;
    }
    let l = (I18n.externalI18n[lang] && I18n.externalI18n[lang][trans]) ? I18n.externalI18n[lang][trans] : null;
    if (!l) l = (defaultI18n[lang] && defaultI18n[lang][trans]) ? defaultI18n[lang][trans] : null;
    if (!l) l = (I18n.externalI18n[I18n.defaultLang] && I18n.externalI18n[I18n.defaultLang][trans]) ? I18n.externalI18n[I18n.defaultLang][trans] : null;
    if (!l) l = (defaultI18n[I18n.defaultLang] && defaultI18n[I18n.defaultLang][trans]) ? defaultI18n[I18n.defaultLang][trans] : null;
    if (!l) return trans;
    return l;
  },
};

export default I18n;
