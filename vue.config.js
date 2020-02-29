module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: 'px', //将要转化的单位
            viewportWidth: 375, //(Number)视图的宽度,这是iphone6的标准
            viewportHeight: 667,
            unitPrecision: 3, //(Number)指定`px`转换为视窗单位值的小数位数，默认是5
            propList: ['*'], //(Array)指定可以转换的css属性，默认是['*']，代表全部属性进行转换
            viewportUnit: 'vw', //(String)指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', //(String)指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) 指定不转换为视窗单位的类，保留px，值为string或正则regexp，建议定义一至两个通用的类名
            minPixelValue: 1, //(Number) 默认值1，小于或等于`1px`不转换为视窗单位,
            mediaQuery: false, // (Boolean) 是否在媒体查询时也转换px，默认false
            replace: true, //替换包含vw的规则，而不是添加回退。
            exclude: [],  // (Array or Regexp) 设置忽略文件，如node_modules
            landscape: false,//是否添加根据landscapeWidth生成的媒体查询条件
            landscapeUnit: 'vw',//横屏时使用的单位
            landscapeWidth: 568
          })
        ]
      }
    }
  }
}
