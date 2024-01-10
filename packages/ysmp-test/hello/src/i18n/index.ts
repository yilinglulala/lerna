import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from './config.json';
import { find, zipObjectDeep } from 'lodash';
import { Cookies } from '@/shared/index';
import ElementLocale from 'element-ui/lib/locale'
import YlementLocale from 'yl-element-ui/src/locale'
import { langFormatMap } from '@/utils/timezone';
import { app } from '../main'

app.use(VueI18n);


//默认的语言
const DEFAULT_LANGUAGE = 'zh';

const getUrlLang = () => {
  const REG = window.location.search.substr(1).match(new RegExp('(^|&)' + 'lang' + '=([^&]*)(&|$)', 'i'));
  return REG !== null ? unescape(REG[2]) : null;
};

/***
 * 获取所有的语言包种类
 */
export const languages = (config || []).filter(x => {
  if (Array.isArray(window['YL_HOSTED_I18N_CONFIG'])) {
    const config_item = window['YL_HOSTED_I18N_CONFIG'].find(c => c.lang === x.lang);
    if (config_item && Object.prototype.hasOwnProperty.call(config_item, 'display')) {
      return config_item.display;
    }
  }
  return x.display;
});


/**
 * 语言包别名
 * @param lang
 * @returns {string}
 */
export const getLangByAlias = (lang: string) => {
  for (let i = 0; i < languages.length; i++) {
    const config = languages[i];
    const alias = (config.alias || []).filter(x => x).map(j => j.toLocaleLowerCase());
    const _lang = String(lang).toLocaleLowerCase();
    if (lang === config.lang || alias.some(x => x === _lang || new RegExp(x).test(_lang))) {
      return config.lang;
    }
  }
  return DEFAULT_LANGUAGE;
};

/***
 * 获取当前语言值
 * @returns {*}
 */
export const getI18nLanguage = (): string => {
  // 首先使用url传参中的lang
  let lang = getUrlLang();

  // 其次使用cookie当中的lang配置
  if (!lang) {
    lang = Cookies.getCookie('language');
  }

  lang = getLangByAlias(lang || window.navigator.language);
  // 日期格式国际化
  switch (lang) {
    case 'zh':
      window['$DATE_FORMAT_GROUP'] = langFormatMap.zh;
      break;
    case 'en':
      window['$DATE_FORMAT_GROUP'] = langFormatMap.en;
      break;
    default:
      window['$DATE_FORMAT_GROUP'] = langFormatMap.other;
  }
  window['$DATE_FORMAT'] = window['$DATE_FORMAT_GROUP'].date;

  Vue.prototype['$DATE_FORMAT_GROUP'] = window['$DATE_FORMAT_GROUP'];
  Vue.prototype['$DATE_FORMAT'] = window['$DATE_FORMAT'];
  // 匹配符合的语言包名称
  return lang;
};


const lang = getI18nLanguage();
/***
 * 创建VueI18n实例
 * @type {VueI18n}
 */
export const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: lang
});
if (process.env.VUE_APP_VERSION && (process.env.VUE_APP_VERSION.startsWith('develop') || process.env.VUE_APP_VERSION.startsWith(':'))) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const CoffeeI18n = require('coffee-i18n');
  new CoffeeI18n(i18n, 'i18n');
}

/***
 * 设置语言
 * @param lang 语言值
 * @param reload 是否刷新页面
 * @returns {*} 当前语言值
 */
export const setI18nLanguage = (lang: string, reload = true) => {
  if (i18n.locale === lang) {
    return;
  }
  i18n.locale = lang;
  Cookies.setCookie('language', lang, 0.83);

  if (reload) {
    const urlLang = getUrlLang();
    if (urlLang && urlLang !== lang) {
      const { origin, pathname, search } = self.location;
      self.location.replace(`${origin}${pathname}${search.replace(/lang=[\w-]+/, `lang=${lang}`)}`);
    } else {
      self.location.reload();
    }
  }

  return lang;
};

/***
 * 获取当前语言值的名称
 * @returns {*}
 */
export const currentLangName = () => {
  const file = find(languages, { lang });
  return file && file.name || languages[0].name;
};

/***
 * 获取指定UI库支持的国际化格式
 * @param data
 * @returns {*}
 */
export const getZipI18nObject = (data: any) => {
  const mapKeys: Array<string> = [];
  const mapValues: Array<string> = [];
  Object.keys(data).forEach(k => {
    if (k.startsWith('yl.')) {
      mapKeys.push(k);
      mapValues.push(data[k]);
    }
  });
  const uiI18n = zipObjectDeep(mapKeys, mapValues);
  return Object.assign(data, uiI18n);
};

/***
 * 异步加载国际化文件
 * @param lang
 * @returns {Promise<unknown>}
 */
export const loadLanguageAsync = () => {
  return new Promise(resolve => {
    let file = find(languages, { lang }) as any;
    if (!file) file = languages[0];
    import(/* webpackChunkName: 'lang-[request]' */'./lang/' + file['fileName']).then(data => {
      const i18ns = Object.assign(data.default || data, (window['YL_HOSTED_I18N'] && window['YL_HOSTED_I18N'][lang]));
      i18n.setLocaleMessage(lang, i18ns);
      resolve(lang);
    }).catch(e => {
      resolve(DEFAULT_LANGUAGE);
      setI18nLanguage(DEFAULT_LANGUAGE);
      console.error('Internationalized resource file not found', e);
    });
  });
};

ElementLocale.i18n((key: any, value: any) => i18n.t(key, value))
YlementLocale.i18n((key: any, value: any) => i18n.t(key, value))

Cookies.setCookie('language', lang);

interface $tType {
  (key: string | undefined, value?: any): string
}
export const $t: $tType = i18n.t.bind(i18n) as $tType;
export default i18n;
