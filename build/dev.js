const base = require('./base')

module.exports = Object.assign({}, base, {
  mode: 'development',

  devServer: { // 打包在内存中而不是dist文件夹
    // open: true, // 自动打开网址 localhost:3000
    port: 3000,
    contentBase: '/dist',
    compress: true, // gzip压缩
    proxy: {
      '/api/cities': {
        target: 'https://router-izilongwan.vercel.app',// https://router-izilongwan.vercel.app/api/cities
        changeOrigin: true,
        pathRewrite: {
          '^/api.': '' // https://router-izilongwan.vercel.app/cities
        }
      },
      '/api': {
        target: 'https://router-izilongwan.vercel.app',// https://router-izilongwan.vercel.app/api
        changeOrigin: true,
      },
    }
  }

})
