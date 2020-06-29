module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/neteasecloudmusic/' : '/',
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({ //这里是配置项，详见官方文档
            rootValue: 37.5, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  },
}