const base = require('./base'),
      CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserWebpackPlugin = require('terser-webpack-plugin'),
      { merge } = require('webpack-merge') // 合并config配置

module.exports = merge({}, base, {
  mode: 'production',

  output: {
    filename: 'js/[name]-[contenthash:6].js', // 加上hash值，避免缓存
    clean: true, // 打包前清理dist文件
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, // MiniCssExtractPlugin处理CSS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          },
          'sass-loader'
        ],
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css', // CSS资源LINK标签
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(), // 压缩JS
      new CssMinimizerWebpackPlugin() // 压缩CSS
    ],
    // 生成chunk的方式：1.entry 2.splitChunks 3.import()懒加载
    // module（模块） + chunk（多个模块合成的代码块） => bundle（最终输出的文件js）
    // splitChunks: { // 分割代码、体积大才进行分割（会发送更多的HTTP请求）
    //   chunks: 'all', // 同步、异步都分割
    //   cacheGroups: {
    //     vender: { // 第三方模块代码
    //       name: 'vender', // 文件名
    //       test: /node_modules/, // 哪种类型
    //       minSize: 1024 * 5, // 最小的限制，大于该数值解析拆分
    //       priority: 1, // 优先级，第三方模块代码和公共模块代码都符合，优先作为第三方模块处理
    //       minChunks: 1,// 最少引入次数
    //     },
    //     common: { // 公共模块代码
    //       name: 'common',
    //       priority: 0,
    //       minSize: 1024 * 5,
    //       minChunks: 2 // 最少引入次数
    //     }
    //   }
    // }
  }
})
