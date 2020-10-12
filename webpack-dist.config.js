'use strict'

const path = require('path')
const webpackModule = require('./webpack-module')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ReactSimpleTimeInput',
    libraryTarget: 'umd'
  },
  module: webpackModule,
  externals: {
    react: 'react',
    'prop-types': 'prop-types'
  }
}
