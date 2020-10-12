'use strict'

const path = require('path')
const webpackModule = require('./webpack-module')

module.exports = {
  entry: path.resolve(__dirname, 'test', 'index.js'),
  output: {
    path: path.resolve(__dirname, '.test'),
    filename: 'index.js'
  },
  module: webpackModule
}
