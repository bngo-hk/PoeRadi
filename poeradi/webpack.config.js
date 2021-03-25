var path = require('path');

module.exports = {
  entry: '.srcmain.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: .ts$,
        exclude: node_modules,
        loader: 'ts-loader'
      }
    ]
  }
}