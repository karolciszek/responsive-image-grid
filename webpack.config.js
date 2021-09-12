const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'production',
  entry: './src/js/main',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
