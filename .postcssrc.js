// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem': { // 把px单位换算成rem单位
      rootValue: 21, //换算的基数(设计图1280的根字体为21)
      propList: ['*']
    }
  }
}
