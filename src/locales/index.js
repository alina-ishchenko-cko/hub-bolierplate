import { zhCN } from './zhCN';

export default class LocalesManager {
  static get(message) {
    const langs = {
      zh_CN: zhCN
    };

    const lang = localStorage['lang'] || 'en_US';

    if (lang === 'en_US') return message;
    else return langs[lang].get(message);
  }
}
