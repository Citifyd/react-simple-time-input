'use strict'

const path = require('path')
const webpackModule = require('./webpack-module')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src', 'dev', 'index.js'),
  output: {
    path: path.resolve(__dirname, argv.mode === 'development' ? '.dev' : 'docs'),
    filename: 'index.js'
  },
  module: webpackModule,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'dev', 'index.html')
    })
  ]
})
