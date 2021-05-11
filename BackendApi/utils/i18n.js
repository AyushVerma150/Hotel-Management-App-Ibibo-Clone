const i18n = require("i18n");
const i18nConf = () => {
  //configuring the i18n module with languages we need to use and the folder location..
  i18n.configure({
    locales: ["en", "zh", "de-ch"],
    directory: __dirname + "/locales",
    defaultLocale: "en",
    register: global,
  });
};
module.exports = i18nConf;
