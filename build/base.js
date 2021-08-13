const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack-cli 3.x: "scripts": { "start:dev": "webpack-dev-server" }
// webpack-cli 4.x: "scripts": { "start:dev": "webpack serve" }

module.exports = {
  entry: { // 入口文件
    index: ['@babel/polyfill', '/src/js/index.js'], // 转换API，promise、Generator、Set、Maps、Proxy
    demo: ['@babel/polyfill', '/src/js/demo.js'],
  },

  output: { // 输出文件
    filename: 'js/[name].js', // js文件文件输出到dist/js/
    clean: true // 输出文件前清理DIST文件夹
  },

  module: {
    // Loader处理不同类型的文件；Plugins扩展功能，提高效率
    rules: [ // 规则
      {
        test: /\.s?css$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          {
            // CSS添加前缀
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                ]
              }
            }
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|gif|webp|png)$/, // 处理图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 20, // url-loader处理100KB以内，输出BASE64
              use: 'file-loader', // 大于100KB修改文件名移动文件
              outputPath: 'images', // 输出路径 file-loader
              name: '[name]-[contenthash:8].[ext]' // 输出文件名
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader', // 兼容JS
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]] // 装饰器
            }
          }
        ],
        exclude: /node_modules/ // 排除该文件
      }
    ],
  },

  plugins: [ // 插件
    new HtmlWebpackPlugin({ // 将JS文件插入HTML中
      template: '/public/demo.html', // 模版
      title: 'DEMO',
      filename: 'demo.html', // 打包后的文件名
      scriptLoading: 'blocking', // script加载方式
      chunks: ['demo', 'vender', 'common'] // 包含的script、vender第三方模块、common公共模块
      // excludeChunks: ['index'] // 排除的script
    }),
    new HtmlWebpackPlugin({
      template: '/public/index.html',
      filename: 'index.html',
      chunks: ['index', 'common'] // common公共模块
    })
  ]
}
