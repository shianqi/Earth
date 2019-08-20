const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      LIBS: path.resolve(__dirname, './src/libs')
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, './src/static'),
        to: path.resolve(__dirname, './dist/static')
      }
    ])
  ]
}
