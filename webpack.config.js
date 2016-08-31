var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');

module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  progress: true,
  colors: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.html'],
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    modulesDirectories: [
      './node_modules'
    ],
    fallback: path.join(__dirname, 'node_modules')
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coding Challenge',
      template: 'src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  }
}