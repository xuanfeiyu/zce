const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10 * 1024,
          name: '[name].[ext]'
        }
      }
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '"/"'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'fed-zce-task-02-02',
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}
